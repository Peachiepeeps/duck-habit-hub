(()=>{
  "use strict";

  const BUILD="24.273";
  const DEFAULT_LEAD=60;
  const REMINDER_KEY="remindersV271";
  const taskForm=document.querySelector("#taskForm");
  const taskRepeat=document.querySelector("#taskRepeat");
  const saveTemplateToggle=document.querySelector("#saveTemplateToggle");
  const tasksPanel=document.querySelector("#tasksPanel");
  const taskConfirmYes=document.querySelector("#taskConfirmYes");
  let editingTaskId=null;

  function safeToast(message){
    try{ if(typeof showToast==="function") showToast(message); else console.log(message); }
    catch(error){ console.log(message); }
  }

  function progress(){
    try{
      if(window.DuckieTaskProgressV254?.ensureProgress) return window.DuckieTaskProgressV254.ensureProgress();
    }catch(error){}
    if(typeof save!=="undefined"){
      if(!save.taskProgression || typeof save.taskProgression!=="object") save.taskProgression={};
      return save.taskProgression;
    }
    return {};
  }

  function settingsMap(){
    const p=progress();
    if(!p[REMINDER_KEY] || typeof p[REMINDER_KEY]!=="object" || Array.isArray(p[REMINDER_KEY])) p[REMINDER_KEY]={};
    return p[REMINDER_KEY];
  }

  function saveNow(){
    try{ if(typeof persist==="function") persist(); }catch(error){}
  }

  function taskById(id){
    try{return Array.isArray(save?.tasks)?save.tasks.find(task=>task.id===id)||null:null;}catch(error){return null;}
  }

  function readSettings(id){
    const raw=settingsMap()[id] || {};
    return {
      enabled:Boolean(raw.enabled),
      deadlineTime:/^\d{2}:\d{2}$/.test(String(raw.deadlineTime||""))?String(raw.deadlineTime):"",
      leadMinutes:Math.max(1,Math.min(10080,Number(raw.leadMinutes)||DEFAULT_LEAD))
    };
  }

  function writeSettings(id,value){
    settingsMap()[id]={
      enabled:Boolean(value.enabled),
      deadlineTime:String(value.deadlineTime||""),
      leadMinutes:Math.max(1,Math.min(10080,Number(value.leadMinutes)||DEFAULT_LEAD))
    };
    saveNow();
    return readSettings(id);
  }

  function removeSettings(id){
    const map=settingsMap();
    if(Object.prototype.hasOwnProperty.call(map,id)){
      delete map[id];
      saveNow();
    }
  }

  function prettyTime(value){
    if(!value) return "";
    const [h,m]=value.split(":").map(Number);
    const date=new Date();
    date.setHours(h||0,m||0,0,0);
    return date.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"});
  }

  function prettyLead(minutes){
    minutes=Math.max(1,Number(minutes)||DEFAULT_LEAD);
    if(minutes%1440===0) return `${minutes/1440} day${minutes===1440?"":"s"} before`;
    if(minutes%60===0) return `${minutes/60} hr${minutes===60?"":"s"} before`;
    return `${minutes} min before`;
  }

  function isAnytime(task){ return task?.repeat?.type==="anytime"; }

  function dateForTask(task,time){
    if(!task || !time || isAnytime(task)) return null;
    const due=task.nextDue || (typeof localDateKey==="function"?localDateKey():new Date().toISOString().slice(0,10));
    const date=new Date(`${due}T${time}:00`);
    return Number.isNaN(date.getTime())?null:date;
  }

  function notificationUrl(){
    const url=new URL("./",location.href);
    url.search="";
    url.hash="";
    url.searchParams.set("openTasks","1");
    return url.href;
  }

  async function cancelRemote(taskId){
    const api=window.DuckieFirebaseRemindersV271;
    if(!api?.cancelReminder) return;
    try{ await api.cancelReminder(taskId); }catch(error){ console.warn("Could not cancel reminder",error); }
  }

  async function syncTask(task,{quiet=true}={}){
    if(!task) return {scheduled:false,reason:"missing-task"};
    const s=readSettings(task.id);
    const api=window.DuckieFirebaseRemindersV271;
    if(!s.enabled || !s.deadlineTime || isAnytime(task)){
      await cancelRemote(task.id);
      return {scheduled:false,reason:"disabled"};
    }

    const deadline=dateForTask(task,s.deadlineTime);
    if(!deadline){
      await cancelRemote(task.id);
      return {scheduled:false,reason:"no-deadline"};
    }

    const apiState=api?.getState?.() || {};
    if(!api?.upsertReminder || apiState.permission!=="granted" || !apiState.fid){
      // Registration can finish after the page opens. Keep an existing remote
      // reminder alive while a permitted device is reconnecting.
      if(apiState.permission!=="granted") await cancelRemote(task.id);
      if(!quiet) safeToast("Reminder saved. Tap 🔔 Notifications to enable phone alerts.");
      return {scheduled:false,reason:"notifications-off"};
    }

    if(deadline.getTime()<=Date.now()){
      await cancelRemote(task.id);
      if(!quiet) safeToast(`Deadline is already past for "${task.name}".`);
      return {scheduled:false,reason:"deadline-passed"};
    }

    let sendAt=new Date(deadline.getTime()-(s.leadMinutes*60000));
    if(sendAt.getTime()<=Date.now()) sendAt=new Date();

    await api.upsertReminder({
      taskId:task.id,
      title:"Duckie Days ♡",
      body:`“${task.name}” is due at ${prettyTime(s.deadlineTime)}.`,
      url:notificationUrl(),
      sendAt,
      deadlineAt:deadline,
      leadMinutes:s.leadMinutes
    });

    if(!quiet) safeToast(`🔔 Reminder set for ${prettyLead(s.leadMinutes)}.`);
    return {scheduled:true,sendAt,deadline};
  }

  async function syncAll(){
    let tasks=[];
    try{tasks=Array.isArray(save?.tasks)?save.tasks.slice():[];}catch(error){}
    const ids=new Set(tasks.map(task=>task.id));
    const map=settingsMap();
    for(const id of Object.keys(map)){
      if(!ids.has(id)){
        delete map[id];
        cancelRemote(id);
      }
    }
    saveNow();
    let failures=0;
    for(const task of tasks){
      if(!readSettings(task.id).enabled) continue;
      try{ await syncTask(task,{quiet:true}); }
      catch(error){ console.warn("Reminder sync failed",error); failures++; }
    }
    if(failures) safeToast("Some phone reminders could not be scheduled. Open a reminder and tap Save to retry.");
  }

  function ensureFormFields(){
    if(!taskForm || document.querySelector("#taskReminderFieldsV271")) return;
    const wrap=document.createElement("section");
    wrap.id="taskReminderFieldsV271";
    wrap.className="task-reminder-fields-v271";
    wrap.innerHTML=`
      <div class="task-reminder-field-head-v271">
        <span>Deadline & phone reminder</span>
        <small>Optional</small>
      </div>
      <label class="form-field task-deadline-field-v271">
        <span>Deadline time</span>
        <input id="taskDeadlineTimeV271" type="time" />
        <small>Uses the task's due date. Repeating tasks reuse this time each time they're due.</small>
      </label>
      <label class="task-reminder-toggle-v271">
        <input id="taskReminderEnabledV271" type="checkbox" />
        <span><b>🔔 Remind me before the deadline</b><small id="taskReminderToggleNoteV271">Choose how early Duckie Days should notify you.</small></span>
      </label>
      <div id="taskReminderOptionsV271" class="task-reminder-options-v271 hidden">
        <label class="form-field">
          <span>Remind me</span>
          <select id="taskReminderLeadV271">
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60" selected>1 hour before</option>
            <option value="180">3 hours before</option>
            <option value="360">6 hours before</option>
            <option value="720">12 hours before</option>
            <option value="1440">1 day before</option>
            <option value="custom">Custom…</option>
          </select>
        </label>
        <div id="taskReminderCustomV271" class="task-reminder-custom-v271 hidden">
          <input id="taskReminderCustomAmountV271" type="number" min="1" max="10080" inputmode="numeric" value="1" />
          <select id="taskReminderCustomUnitV271">
            <option value="1">minutes</option>
            <option value="60">hours</option>
            <option value="1440">days</option>
          </select>
          <span>before</span>
        </div>
      </div>
      <p id="taskReminderFormStatusV271" class="task-reminder-form-status-v271"></p>
    `;
    if(saveTemplateToggle) saveTemplateToggle.insertAdjacentElement("beforebegin",wrap);
    else taskForm.querySelector(".task-form-actions")?.insertAdjacentElement("beforebegin",wrap);

    document.querySelector("#taskReminderEnabledV271")?.addEventListener("change",updateFormReminderUi);
    document.querySelector("#taskReminderLeadV271")?.addEventListener("change",updateFormReminderUi);
    taskRepeat?.addEventListener("change",updateFormReminderUi);
    updateFormReminderUi();
  }

  function formLeadMinutes(){
    const select=document.querySelector("#taskReminderLeadV271");
    if(!select) return DEFAULT_LEAD;
    if(select.value!=="custom") return Math.max(1,Number(select.value)||DEFAULT_LEAD);
    const amount=Math.max(1,Number(document.querySelector("#taskReminderCustomAmountV271")?.value)||1);
    const unit=Math.max(1,Number(document.querySelector("#taskReminderCustomUnitV271")?.value)||1);
    return Math.min(10080,amount*unit);
  }

  function updateFormReminderUi(){
    const enabled=document.querySelector("#taskReminderEnabledV271");
    const options=document.querySelector("#taskReminderOptionsV271");
    const custom=document.querySelector("#taskReminderCustomV271");
    const status=document.querySelector("#taskReminderFormStatusV271");
    const deadline=document.querySelector("#taskDeadlineTimeV271");
    const anytime=taskRepeat?.value==="anytime";
    if(enabled){
      enabled.disabled=anytime;
      if(anytime) enabled.checked=false;
    }
    options?.classList.toggle("hidden",!enabled?.checked || anytime);
    custom?.classList.toggle("hidden",document.querySelector("#taskReminderLeadV271")?.value!=="custom");
    if(deadline) deadline.disabled=anytime;
    if(status){
      if(anytime) status.textContent="Anytime tasks don't have a dated deadline, so phone reminders are off for them.";
      else {
        const state=window.DuckieFirebaseRemindersV271?.getState?.()||{};
        status.textContent=state.permission==="granted"&&state.fid
          ?"Phone notifications are connected. ♡"
          :"You can save the reminder now, then enable 🔔 Notifications from the Tasks screen.";
      }
    }
  }

  function resetFormReminderFields(){
    ensureFormFields();
    const deadline=document.querySelector("#taskDeadlineTimeV271");
    const enabled=document.querySelector("#taskReminderEnabledV271");
    const lead=document.querySelector("#taskReminderLeadV271");
    const customAmount=document.querySelector("#taskReminderCustomAmountV271");
    const customUnit=document.querySelector("#taskReminderCustomUnitV271");
    if(deadline) deadline.value="";
    if(enabled) enabled.checked=false;
    if(lead) lead.value=String(DEFAULT_LEAD);
    if(customAmount) customAmount.value="1";
    if(customUnit) customUnit.value="60";
    updateFormReminderUi();
  }

  function readFormSettings(){
    const enabled=Boolean(document.querySelector("#taskReminderEnabledV271")?.checked);
    return {
      enabled,
      deadlineTime:String(document.querySelector("#taskDeadlineTimeV271")?.value||""),
      leadMinutes:formLeadMinutes()
    };
  }

  function installFormHook(){
    ensureFormFields();
    if(!taskForm || taskForm.dataset.reminderHookV271==="1") return;
    taskForm.dataset.reminderHookV271="1";
    taskForm.addEventListener("submit",event=>{
      const settings=readFormSettings();
      if(settings.enabled && taskRepeat?.value==="anytime"){
        event.preventDefault();
        event.stopImmediatePropagation();
        safeToast("Anytime tasks need a dated repeat before they can have a reminder.");
        return;
      }
      if(settings.enabled && !settings.deadlineTime){
        event.preventDefault();
        event.stopImmediatePropagation();
        safeToast("Choose a deadline time for this reminder. ♡");
        document.querySelector("#taskDeadlineTimeV271")?.focus();
        return;
      }

      let before=new Set();
      try{before=new Set((save.tasks||[]).map(task=>task.id));}catch(error){}
      setTimeout(()=>{
        let created=null;
        try{created=(save.tasks||[]).find(task=>!before.has(task.id))||null;}catch(error){}
        if(!created) return;
        writeSettings(created.id,settings);
        syncTask(created,{quiet:false}).catch(error=>{
          console.warn("Reminder sync failed",error);
          safeToast("Phone reminder could not be scheduled. Open it and tap Save to retry.");
        });
        try{ if(typeof renderTasks==="function") renderTasks(); }catch(error){}
      },0);
    },true);
  }

  function ensureHeaderButton(){
    if(document.querySelector("#taskNotificationsButtonV271")) return;
    const host=document.querySelector("#taskActionsRowV256")
      ||document.querySelector(".tasks-header-actions-v257")
      ||document.querySelector(".tasks-header-actions");
    if(!host) return;
    const button=document.createElement("button");
    button.id="taskNotificationsButtonV271";
    button.type="button";
    button.className="task-notifications-button-v271";
    button.innerHTML="<span>🔔</span><b>Notifications</b><small>Checking…</small>";
    button.addEventListener("click",enableNotificationsFromButton);
    host.prepend(button);
    updateHeaderButton();
  }

  function updateHeaderButton(){
    const button=document.querySelector("#taskNotificationsButtonV271");
    if(!button) return;
    const small=button.querySelector("small");
    const state=window.DuckieFirebaseRemindersV271?.getState?.()||{};
    const on=state.permission==="granted"&&Boolean(state.fid);
    button.classList.toggle("active",on);
    if(small) small.textContent=on?"On":state.permission==="denied"?"Blocked":"Off";
    button.title=on?"Phone reminders are enabled":"Tap to enable phone reminders";
  }

  async function enableNotificationsFromButton(){
    const api=window.DuckieFirebaseRemindersV271;
    if(!api?.enableNotifications){
      safeToast("Firebase is still loading. Try again in a moment. ♡");
      return;
    }
    try{
      safeToast("Connecting phone notifications…");
      await api.enableNotifications();
      updateHeaderButton();
      updateFormReminderUi();
      await syncAll();
      safeToast("🔔 Phone reminders are enabled! ♡");
    }catch(error){
      console.warn(error);
      const isiOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
      const standalone=window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone===true;
      if(isiOS && !standalone){
        safeToast("On iPhone/iPad, add Duckie Days to your Home Screen and open it from the icon before enabling notifications.");
      }else{
        safeToast(error?.message||"Notifications could not be enabled.");
      }
      updateHeaderButton();
    }
  }

  function modal(){
    let root=document.querySelector("#taskReminderModalV271");
    if(root) return root;
    root=document.createElement("div");
    root.id="taskReminderModalV271";
    root.className="task-reminder-modal-v271 hidden";
    root.setAttribute("aria-hidden","true");
    root.innerHTML=`
      <button class="task-reminder-backdrop-v271" type="button" aria-label="Close reminder settings"></button>
      <section class="task-reminder-card-v271" role="dialog" aria-modal="true" aria-label="Task reminder">
        <button id="closeTaskReminderV271" class="task-reminder-close-v271" type="button" aria-label="Close">×</button>
        <p class="task-reminder-kicker-v271">PHONE REMINDER</p>
        <h2 id="taskReminderTitleV271">Task</h2>
        <p id="taskReminderDueDateV271" class="task-reminder-due-v271"></p>
        <label class="form-field">
          <span>Deadline time</span>
          <input id="taskReminderModalTimeV271" type="time" />
        </label>
        <label class="task-reminder-toggle-v271">
          <input id="taskReminderModalEnabledV271" type="checkbox" />
          <span><b>🔔 Remind me</b><small>Send a phone notification before this deadline.</small></span>
        </label>
        <label class="form-field" id="taskReminderModalLeadWrapV271">
          <span>How early?</span>
          <select id="taskReminderModalLeadV271">
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60">1 hour before</option>
            <option value="180">3 hours before</option>
            <option value="360">6 hours before</option>
            <option value="720">12 hours before</option>
            <option value="1440">1 day before</option>
            <option value="custom">Custom…</option>
          </select>
        </label>
        <div id="taskReminderModalCustomV271" class="task-reminder-custom-v271 hidden">
          <input id="taskReminderModalCustomAmountV271" type="number" min="1" max="10080" inputmode="numeric" value="1" />
          <select id="taskReminderModalCustomUnitV271">
            <option value="1">minutes</option>
            <option value="60">hours</option>
            <option value="1440">days</option>
          </select>
          <span>before</span>
        </div>
        <p id="taskReminderModalStatusV271" class="task-reminder-modal-status-v271"></p>
        <div class="task-reminder-modal-actions-v271">
          <button id="taskReminderEnablePushV271" type="button" class="secondary-button">Enable Notifications</button>
          <button id="taskReminderSaveV271" type="button" class="primary-button">Save Reminder</button>
        </div>
      </section>
    `;
    document.body.append(root);
    root.querySelector(".task-reminder-backdrop-v271")?.addEventListener("click",closeModal);
    root.querySelector("#closeTaskReminderV271")?.addEventListener("click",closeModal);
    root.querySelector("#taskReminderModalEnabledV271")?.addEventListener("change",updateModalUi);
    root.querySelector("#taskReminderModalLeadV271")?.addEventListener("change",updateModalUi);
    root.querySelector("#taskReminderEnablePushV271")?.addEventListener("click",enableNotificationsFromButton);
    root.querySelector("#taskReminderSaveV271")?.addEventListener("click",saveModal);
    return root;
  }

  function closeModal(){
    editingTaskId=null;
    const root=document.querySelector("#taskReminderModalV271");
    root?.classList.add("hidden");
    root?.setAttribute("aria-hidden","true");
  }

  function openModal(task){
    if(!task) return;
    editingTaskId=task.id;
    const root=modal();
    const s=readSettings(task.id);
    root.querySelector("#taskReminderTitleV271").textContent=task.name;
    root.querySelector("#taskReminderDueDateV271").textContent=isAnytime(task)
      ?"Anytime tasks do not have a dated deadline."
      :`Due date: ${typeof formatFriendlyDate==="function"?formatFriendlyDate(task.nextDue):task.nextDue||"Today"}`;
    const time=root.querySelector("#taskReminderModalTimeV271");
    const enabled=root.querySelector("#taskReminderModalEnabledV271");
    const lead=root.querySelector("#taskReminderModalLeadV271");
    time.value=s.deadlineTime;
    time.disabled=isAnytime(task);
    enabled.checked=s.enabled && !isAnytime(task);
    enabled.disabled=isAnytime(task);
    const available=[15,30,60,180,360,720,1440];
    if(available.includes(s.leadMinutes)){
      lead.value=String(s.leadMinutes);
    }else{
      lead.value="custom";
      const amount=root.querySelector("#taskReminderModalCustomAmountV271");
      const unit=root.querySelector("#taskReminderModalCustomUnitV271");
      if(s.leadMinutes%1440===0){ amount.value=String(s.leadMinutes/1440); unit.value="1440"; }
      else if(s.leadMinutes%60===0){ amount.value=String(s.leadMinutes/60); unit.value="60"; }
      else { amount.value=String(s.leadMinutes); unit.value="1"; }
    }
    root.classList.remove("hidden");
    root.setAttribute("aria-hidden","false");
    updateModalUi();
  }

  function updateModalUi(){
    const root=document.querySelector("#taskReminderModalV271");
    if(!root || !editingTaskId) return;
    const task=taskById(editingTaskId);
    const enabled=root.querySelector("#taskReminderModalEnabledV271")?.checked;
    root.querySelector("#taskReminderModalLeadWrapV271")?.classList.toggle("hidden",!enabled||isAnytime(task));
    const leadSelect=root.querySelector("#taskReminderModalLeadV271");
    root.querySelector("#taskReminderModalCustomV271")?.classList.toggle("hidden",!enabled||isAnytime(task)||leadSelect?.value!=="custom");
    const state=window.DuckieFirebaseRemindersV271?.getState?.()||{};
    const pushOn=state.permission==="granted"&&Boolean(state.fid);
    const status=root.querySelector("#taskReminderModalStatusV271");
    if(status) status.textContent=isAnytime(task)
      ?"Choose a dated task/repeat if you want a phone reminder."
      :pushOn
        ?"Phone notifications are connected. ♡"
        :"The reminder can be saved now, but phone alerts need Notifications enabled.";
    root.querySelector("#taskReminderEnablePushV271")?.classList.toggle("hidden",pushOn);
  }

  async function saveModal(){
    const task=taskById(editingTaskId);
    if(!task) return closeModal();
    if(isAnytime(task)){
      safeToast("Anytime tasks don't have a dated deadline.");
      return;
    }
    const root=document.querySelector("#taskReminderModalV271");
    const enabled=Boolean(root?.querySelector("#taskReminderModalEnabledV271")?.checked);
    const deadlineTime=String(root?.querySelector("#taskReminderModalTimeV271")?.value||"");
    const leadValue=root?.querySelector("#taskReminderModalLeadV271")?.value;
    let leadMinutes=DEFAULT_LEAD;
    if(leadValue==="custom"){
      const amount=Math.max(1,Number(root?.querySelector("#taskReminderModalCustomAmountV271")?.value)||1);
      const unit=Math.max(1,Number(root?.querySelector("#taskReminderModalCustomUnitV271")?.value)||1);
      leadMinutes=Math.min(10080,amount*unit);
    }else{
      leadMinutes=Math.max(1,Number(leadValue)||DEFAULT_LEAD);
    }
    if(enabled && !deadlineTime){
      safeToast("Choose a deadline time first. ♡");
      root?.querySelector("#taskReminderModalTimeV271")?.focus();
      return;
    }
    writeSettings(task.id,{enabled,deadlineTime,leadMinutes});
    await syncTask(task,{quiet:false}).catch(error=>{
      console.warn(error);
      safeToast("Reminder saved locally. Phone sync will retry when notifications connect.");
    });
    closeModal();
    try{ if(typeof renderTasks==="function") renderTasks(); }catch(error){}
  }

  function decorateTaskCard(task,card){
    if(!card || !task) return card;
    card.dataset.taskId=task.id;
    const s=readSettings(task.id);
    const meta=card.querySelector(".task-card-meta");
    if(meta && s.deadlineTime && !isAnytime(task)){
      const detail=document.createElement("span");
      detail.className="task-reminder-meta-v271";
      detail.textContent=s.enabled
        ? `⏰ ${prettyTime(s.deadlineTime)} · 🔔 ${prettyLead(s.leadMinutes)}`
        : `⏰ ${prettyTime(s.deadlineTime)}`;
      meta.append(detail);
    }
    const actions=card.querySelector(".task-card-actions");
    if(actions){
      const button=document.createElement("button");
      button.type="button";
      button.className=`task-reminder-button-v271${s.enabled?" active":""}`;
      button.textContent=s.enabled?"🔔 Reminder On":"🔔 Reminder";
      button.disabled=isAnytime(task);
      button.title=isAnytime(task)?"Anytime tasks don't have a deadline":"Set a phone reminder";
      button.addEventListener("click",()=>openModal(task));
      actions.append(button);
    }
    return card;
  }

  if(typeof renderTaskCard==="function" && !window.DuckieReminderCardHookV271){
    const previousRenderTaskCard=renderTaskCard;
    renderTaskCard=function(task,options){
      return decorateTaskCard(task,previousRenderTaskCard.apply(this,arguments));
    };
    window.DuckieReminderCardHookV271=true;
  }

  if(typeof openTaskForm==="function" && !window.DuckieReminderFormOpenHookV271){
    const previousOpenTaskForm=openTaskForm;
    openTaskForm=function(){
      const result=previousOpenTaskForm.apply(this,arguments);
      resetFormReminderFields();
      return result;
    };
    window.DuckieReminderFormOpenHookV271=true;
  }

  if(typeof completeTask==="function" && !window.DuckieReminderCompleteHookV271){
    const previousCompleteTask=completeTask;
    completeTask=function(id){
      const hadSettings=readSettings(id);
      const result=previousCompleteTask.apply(this,arguments);
      const remaining=taskById(id);
      if(remaining){
        if(hadSettings.enabled) syncTask(remaining,{quiet:true}).catch(()=>{});
      }else{
        removeSettings(id);
        cancelRemote(id);
      }
      return result;
    };
    window.DuckieReminderCompleteHookV271=true;
  }

  for(const name of ["sendTaskToTomorrow","sendTaskToToday","toggleTaskPinned"]){
    try{
      const previous=eval(name);
      if(typeof previous!=="function") continue;
      const wrapped=function(id){
        const result=previous.apply(this,arguments);
        const task=taskById(id);
        if(task && readSettings(id).enabled) syncTask(task,{quiet:true}).catch(()=>{});
        return result;
      };
      if(name==="sendTaskToTomorrow") sendTaskToTomorrow=wrapped;
      if(name==="sendTaskToToday") sendTaskToToday=wrapped;
      if(name==="toggleTaskPinned") toggleTaskPinned=wrapped;
    }catch(error){}
  }

  taskConfirmYes?.addEventListener("click",()=>{
    try{
      if(pendingTaskRemoval?.type==="task"){
        const id=pendingTaskRemoval.id;
        removeSettings(id);
        cancelRemote(id);
      }
    }catch(error){}
  },true);

  window.addEventListener("duckie-notification-state-v271",()=>{
    ensureHeaderButton();
    updateHeaderButton();
    updateFormReminderUi();
    updateModalUi();
    const state=window.DuckieFirebaseRemindersV271?.getState?.()||{};
    if(state.permission==="granted"&&state.fid) syncAll().catch(()=>{});
  });

  window.addEventListener("duckie-foreground-notification-v271",event=>{
    const payload=event.detail||{};
    safeToast(payload.notification?.body || "🔔 You have a Duckie Days reminder!");
  });

  document.addEventListener("visibilitychange",()=>{
    if(document.visibilityState==="visible"){
      updateHeaderButton();
      const state=window.DuckieFirebaseRemindersV271?.getState?.()||{};
      if(state.permission==="granted"&&state.fid) syncAll().catch(()=>{});
    }
  });

  function openTasksFromNotification(){
    const url=new URL(location.href);
    if(url.searchParams.get("openTasks")!=="1") return;
    setTimeout(()=>{
      try{
        if(typeof openTasks==="function") openTasks();
        url.searchParams.delete("openTasks");
        history.replaceState(null,"",url.href);
      }catch(error){}
    },350);
  }

  ensureFormFields();
  installFormHook();
  ensureHeaderButton();
  updateHeaderButton();
  openTasksFromNotification();
  setTimeout(()=>{
    ensureHeaderButton();
    updateHeaderButton();
    const state=window.DuckieFirebaseRemindersV271?.getState?.()||{};
    if(state.permission==="granted"&&state.fid) syncAll().catch(()=>{});
  },1200);

  window.DuckieTaskRemindersV271={
    BUILD,
    syncAll,
    openTaskReminder:openModal,
    settingsFor:readSettings
  };
})();
