(function(){
  'use strict';

  const BUILD='24.255';
  const THEME_KEY='duckie-days-task-shelf-theme-v255';
  const SHELF_THEMES=[
    {id:'berry',label:'Berry',main:'#a56d7c',line:'#7c5060',paper:'#fff9fb'},
    {id:'mint',label:'Mint',main:'#87a98f',line:'#65806c',paper:'#f7fff8'},
    {id:'blue',label:'Blue',main:'#7d95b6',line:'#5d7394',paper:'#f8fbff'},
    {id:'peach',label:'Peach',main:'#cda183',line:'#a67d61',paper:'#fffaf6'},
    {id:'lavender',label:'Lavender',main:'#9c8fc1',line:'#7768a0',paper:'#fcf9ff'},
    {id:'cream',label:'Cream',main:'#c9b58c',line:'#9b845f',paper:'#fffdf7'}
  ];

  function whenReady(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }

  function buttonsIn(root){
    return Array.from((root||document).querySelectorAll('button'));
  }

  function findByText(root, pattern){
    return buttonsIn(root).find(btn=>pattern.test((btn.textContent||'').replace(/\s+/g,' ').trim()));
  }

  function taskTabStrip(root){
    return root.querySelector('.task-tabs,.tasks-tabs,[role="tablist"]')
      || Array.from(root.querySelectorAll('div,nav,section')).find(el=>/today/i.test(el.textContent||'') && /tomorrow/i.test(el.textContent||''));
  }

  function syncTaskHeader(){
    const panel=document.querySelector('#tasksPanel');
    if(!panel) return;
    const content=panel.querySelector('section') || panel;
    const tabs=taskTabStrip(content);
    if(!tabs) return;

    let compact=document.querySelector('#taskCompactHeaderV255');
    if(!compact){
      compact=document.createElement('div');
      compact.id='taskCompactHeaderV255';
      compact.className='task-compact-header-v255';

      const title=document.createElement('h1');
      title.id='taskCompactTitleV255';
      title.className='task-compact-title-v255';
      title.textContent='Tasks';

      const actions=document.createElement('div');
      actions.id='taskCompactActionsV255';
      actions.className='task-compact-actions-v255';

      compact.append(title,actions);
      content.insertBefore(compact,tabs);
    }

    panel.classList.add('tasks-panel-v255-compact');

    const actions=compact.querySelector('#taskCompactActionsV255');
    const shop=panel.querySelector('#openTaskShopButton') || findByText(panel,/task\s*shop/i);
    const completed=panel.querySelector('#completedTab') || findByText(panel,/completed/i);
    const addTask=panel.querySelector('#addTaskButton,#openTaskFormButton,#showTaskFormButton') || findByText(panel,/add\s*task/i);

    [shop,completed,addTask].forEach(btn=>{
      if(!btn) return;
      btn.classList.add('task-compact-action-v255');
      actions.appendChild(btn);
    });

    const originalTitle=Array.from(panel.querySelectorAll('h1,h2')).find(el=>el!==compact.querySelector('h1') && /tasks/i.test(el.textContent||''));
    if(originalTitle) originalTitle.classList.add('task-title-replaced-v255');

    const oldActions=panel.querySelector('.tasks-header-actions');
    if(oldActions && !compact.contains(oldActions)) oldActions.classList.add('task-actions-replaced-v255');
  }

  function currentTheme(){
    try{return localStorage.getItem(THEME_KEY) || 'berry';}
    catch(error){return 'berry';}
  }

  function saveTheme(id){
    try{ localStorage.setItem(THEME_KEY,id); }catch(error){}
    try{
      if(window.save && typeof window.save==='object'){
        if(!window.save.taskProgression || typeof window.save.taskProgression!=='object') window.save.taskProgression={};
        window.save.taskProgression.collectibleShelfTheme=id;
        if(typeof window.persist==='function') window.persist();
      }
    }catch(error){}
  }

  function applyShelfTheme(id){
    const wing=document.querySelector('#taskCollectibleWing');
    if(!wing) return;
    const safe=THEME_KEY && SHELF_THEMES.some(theme=>theme.id===id) ? id : 'berry';
    wing.dataset.shelfTheme=safe;
    wing.setAttribute('data-shelf-theme',safe);
    document.querySelectorAll('.task-shelf-theme-choice-v255').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.theme===safe);
      btn.setAttribute('aria-pressed',btn.dataset.theme===safe?'true':'false');
    });
  }

  function mountShelfThemePicker(){
    const wing=document.querySelector('#taskCollectibleWing');
    const slots=document.querySelector('#taskCollectibleSlots');
    if(!wing || !slots) return;
    wing.classList.add('duck-shelf-layout-v255');
    slots.classList.add('duck-shelf-layout-v255');

    const title=wing.querySelector('.task-collectible-title-v254');
    if(title){
      title.innerHTML='';
      const eyebrow=document.createElement('span');
      eyebrow.textContent='YOUR COLLECTION';
      const strong=document.createElement('strong');
      strong.textContent='Collectibles Shelf';
      title.append(eyebrow,strong);
    }

    let bar=wing.querySelector('#taskShelfThemeBarV255');
    if(!bar){
      bar=document.createElement('div');
      bar.id='taskShelfThemeBarV255';
      bar.className='task-shelf-theme-bar-v255';
      const label=document.createElement('span');
      label.className='task-shelf-theme-label-v255';
      label.textContent='Shelf Color';
      const swatches=document.createElement('div');
      swatches.className='task-shelf-theme-swatches-v255';
      SHELF_THEMES.forEach(theme=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='task-shelf-theme-choice-v255';
        btn.dataset.theme=theme.id;
        btn.title=theme.label;
        btn.setAttribute('aria-label',`Use ${theme.label} shelf color`);
        btn.innerHTML=`<span style="--swatch-main:${theme.main};--swatch-line:${theme.line};--swatch-paper:${theme.paper}"></span>`;
        btn.addEventListener('click',()=>{saveTheme(theme.id);applyShelfTheme(theme.id);});
        swatches.appendChild(btn);
      });
      bar.append(label,swatches);
      wing.insertBefore(bar,slots);
    }
    applyShelfTheme(currentTheme());
  }

  function syncRoomArrowAndObjects(){
    const left=document.querySelector('#roomWingButton');
    const right=document.querySelector('#taskShelfButton');
    const mirror=document.querySelector('#roomMirrorImage');
    const book=document.querySelector('#roomBookImage');

    if(right){
      right.classList.add('task-shelf-button-v255');
      if(left){
        const cs=getComputedStyle(left);
        if(cs.top && cs.top!=='auto') right.style.top=cs.top;
        right.style.bottom='auto';
        right.style.left='auto';
      }
    }
    if(mirror) mirror.style.translate='0 -12%';
    if(book) book.style.translate='0 -10%';
  }

  function refresh(){
    syncTaskHeader();
    mountShelfThemePicker();
    syncRoomArrowAndObjects();
  }

  whenReady(()=>{
    refresh();
    const observer=new MutationObserver(()=>refresh());
    observer.observe(document.body,{subtree:true,childList:true});
    window.addEventListener('resize',syncRoomArrowAndObjects,{passive:true});
    window.DUCKIE_DAYS_TASK_LAYOUT_V255=BUILD;
  });
})();
