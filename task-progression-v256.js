(function(){
  const BUILD='24.256';
  const THEME_KEY='duckie_days_collectible_shelf_theme_v256';
  const THEMES=[
    {id:'linen',label:'Linen',main:'#d6c9bb',line:'#8d7b68',paper:'#f7f0e6'},
    {id:'cocoa',label:'Cocoa',main:'#8b5f45',line:'#1f1714',paper:'#efe2d5'},
    {id:'espresso',label:'Espresso',main:'#5d4337',line:'#161110',paper:'#eadfda'}
  ];

  function ready(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }
  function buttonsIn(root){ return Array.from((root||document).querySelectorAll('button')); }
  function findByText(root, pattern){
    return buttonsIn(root).find(btn=>pattern.test((btn.textContent||'').replace(/\s+/g,' ').trim()));
  }
  function taskTabStrip(root){
    return root.querySelector('.task-tabs,.tasks-tabs,[role="tablist"]')
      || Array.from(root.querySelectorAll('div,nav,section')).find(el=>/today/i.test(el.textContent||'') && /tomorrow/i.test(el.textContent||''));
  }
  function getTasksPanel(){ return document.querySelector('#tasksPanel'); }

  function ensureShelfState(){
    try{
      if(!window.save || typeof window.save!=='object') return null;
      if(!window.save.taskProgression || typeof window.save.taskProgression!=='object') window.save.taskProgression={};
      const p=window.save.taskProgression;
      if(!Array.isArray(p.shelfSlots)) p.shelfSlots=[];
      const original=p.shelfSlots.slice(0,24);
      while(original.length<24) original.push(null);
      const changed=JSON.stringify(original)!==JSON.stringify(p.shelfSlots);
      p.shelfSlots=original;
      if(!p.collectibleShelfTheme) p.collectibleShelfTheme='cocoa';
      if(changed && typeof window.persist==='function') window.persist();
      return p;
    }catch(error){ return null; }
  }

  function currentTheme(){
    let candidate='cocoa';
    try{ candidate=localStorage.getItem(THEME_KEY) || (window.save&&window.save.taskProgression&&window.save.taskProgression.collectibleShelfTheme) || 'cocoa'; }
    catch(error){}
    return THEMES.some(t=>t.id===candidate) ? candidate : 'cocoa';
  }
  function saveTheme(id){
    try{ localStorage.setItem(THEME_KEY,id); }catch(error){}
    try{
      const p=ensureShelfState();
      if(p){ p.collectibleShelfTheme=id; if(typeof window.persist==='function') window.persist(); }
    }catch(error){}
  }
  function applyShelfTheme(id){
    const wing=document.querySelector('#taskCollectibleWing');
    if(!wing) return;
    const safe=THEMES.some(t=>t.id===id) ? id : 'cocoa';
    wing.dataset.shelfTheme=safe;
    wing.setAttribute('data-shelf-theme',safe);
    document.querySelectorAll('.task-shelf-theme-choice-v256').forEach(btn=>{
      const active=btn.dataset.theme===safe;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
  }

  function mountShelfLayout(){
    ensureShelfState();
    const wing=document.querySelector('#taskCollectibleWing');
    const slots=document.querySelector('#taskCollectibleSlots');
    if(!wing || !slots) return;

    wing.classList.add('task-shelf-v256');
    slots.classList.add('task-shelf-grid-v256');

    const title=wing.querySelector('.task-collectible-title-v254');
    if(title){
      title.innerHTML='';
      const eyebrow=document.createElement('span');
      eyebrow.textContent='TASK TREASURES';
      const strong=document.createElement('strong');
      strong.textContent='Collectible Shelf';
      title.append(eyebrow,strong);
    }

    let bar=wing.querySelector('#taskShelfThemeBarV256');
    if(!bar){
      bar=document.createElement('div');
      bar.id='taskShelfThemeBarV256';
      bar.className='task-shelf-theme-bar-v256';
      THEMES.forEach(theme=>{
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='task-shelf-theme-choice-v256';
        btn.dataset.theme=theme.id;
        btn.title=theme.label;
        btn.setAttribute('aria-label',`Use ${theme.label} shelf color`);
        btn.innerHTML='<span></span>';
        btn.style.setProperty('--swatch-main',theme.main);
        btn.style.setProperty('--swatch-line',theme.line);
        btn.style.setProperty('--swatch-paper',theme.paper);
        btn.addEventListener('click',()=>{ saveTheme(theme.id); applyShelfTheme(theme.id); });
        bar.appendChild(btn);
      });
      wing.appendChild(bar);
    }

    applyShelfTheme(currentTheme());
  }

  function syncShelfArrowAndRoom(){
    const left=document.querySelector('#roomWingButton');
    const right=document.querySelector('#taskShelfButton');
    const book=document.querySelector('#roomBookImage');
    const bookHotspot=document.querySelector('.book-hotspot');
    if(right){
      right.classList.add('task-shelf-button-v256');
      if(left){
        const cs=getComputedStyle(left);
        if(cs.top && cs.top!=='auto') right.style.top=cs.top;
        right.style.bottom='auto';
        right.style.left='auto';
        right.style.right='3%';
      }
    }
    if(book) book.style.translate='0 -28%';
    if(bookHotspot) bookHotspot.style.top='69.5%';
  }

  function buildTaskHeader(panel, content, tabs){
    let shell=content.querySelector('#taskTopShellV256');
    if(!shell){
      shell=document.createElement('div');
      shell.id='taskTopShellV256';
      shell.className='task-top-shell-v256';
      const titleWrap=document.createElement('div');
      titleWrap.className='task-heading-v256';
      titleWrap.innerHTML='<p class="task-eyebrow-v256">YOUR TASKS</p><h1 class="task-title-v256">Tasks</h1>';

      const actions=document.createElement('div');
      actions.id='taskActionsRowV256';
      actions.className='task-actions-row-v256';

      shell.append(titleWrap,actions);
      content.insertBefore(shell, tabs || content.firstChild);
    }

    const actions=shell.querySelector('#taskActionsRowV256');
    const shop=panel.querySelector('#openTaskShopButton') || findByText(panel,/task\s*shop/i);
    const completed=panel.querySelector('#completedTab') || findByText(panel,/completed/i);
    const addTask=panel.querySelector('#addTaskButton,#openTaskFormButton,#showTaskFormButton') || findByText(panel,/add\s*task/i);
    [shop,completed,addTask].forEach(btn=>{
      if(!btn) return;
      btn.classList.add('task-header-action-v256');
      actions.appendChild(btn);
    });

    Array.from(panel.querySelectorAll('h1,h2,.tasks-header-actions')).forEach(el=>{
      if(shell.contains(el)) return;
      if(el.matches('h1,h2') && /tasks/i.test(el.textContent||'')) el.classList.add('task-replaced-title-v256');
      if(el.classList.contains('tasks-header-actions')) el.classList.add('task-replaced-actions-v256');
    });
  }

  function arrangeTaskPanel(){
    const panel=getTasksPanel();
    if(!panel) return;
    const content=panel.querySelector('section') || panel;
    const tabs=taskTabStrip(content);
    if(!tabs) return;
    panel.classList.add('tasks-panel-v256');
    buildTaskHeader(panel, content, tabs);

    const treasure=panel.querySelector('.task-treasure-card-v254');
    if(tabs && treasure && tabs.nextElementSibling!==treasure){
      tabs.after(treasure);
    }

    const tasksContent=panel.querySelector('#tasksContent,.tasks-content');
    if(treasure && tasksContent && treasure.nextElementSibling!==tasksContent){
      treasure.after(tasksContent);
    }

    const note=panel.querySelector('.task-kind-note');
    if(tasksContent && note && tasksContent.nextElementSibling!==note){
      tasksContent.after(note);
    }
  }

  function refresh(){
    mountShelfLayout();
    syncShelfArrowAndRoom();
    arrangeTaskPanel();
  }

  ready(()=>{
    refresh();
    const observer=new MutationObserver(()=>refresh());
    observer.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('resize',syncShelfArrowAndRoom,{passive:true});
    window.DUCKIE_DAYS_TASK_LAYOUT_V256=BUILD;
  });
})();
