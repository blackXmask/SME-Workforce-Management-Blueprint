/* ============================================
   WorkForce Pro v4 — App Logic & Data
   ============================================ */

// ---- Mock Data ----
const employees = [
  { id:1, name:'Sarah Chen', title:'Operations Director', dept:'Management', initials:'SC', color:'indigo', role:'admin', email:'sarah.chen@company.local', phone:'+65 8123 4567', status:'active', manager:null },
  { id:2, name:'James Okafor', title:'Shift Supervisor', dept:'Operations', initials:'JO', color:'teal', role:'manager', email:'james.okafor@company.local', phone:'+65 8234 5678', status:'active', manager:1 },
  { id:3, name:'Mei Ling Tan', title:'Team Lead', dept:'Logistics', initials:'ML', color:'purple', role:'manager', email:'meiling.tan@company.local', phone:'+65 8345 6789', status:'active', manager:1 },
  { id:4, name:'David Kim', title:'Warehouse Operative', dept:'Logistics', initials:'DK', color:'blue', role:'employee', email:'david.kim@company.local', phone:'+65 8456 7890', status:'active', manager:2 },
  { id:5, name:'Priya Sharma', title:'Customer Service Rep', dept:'Customer Care', initials:'PS', color:'pink', role:'employee', email:'priya.sharma@company.local', phone:'+65 8567 8901', status:'active', manager:7 },
  { id:6, name:'Tom Walker', title:'Delivery Driver', dept:'Logistics', initials:'TW', color:'amber', role:'employee', email:'tom.walker@company.local', phone:'+65 8678 9012', status:'leave', manager:2 },
  { id:7, name:'Aisha Rahman', title:'HR Coordinator', dept:'Human Resources', initials:'AR', color:'green', role:'manager', email:'aisha.rahman@company.local', phone:'+65 8789 0123', status:'active', manager:1 },
  { id:8, name:'Lucas Müller', title:'IT Support Officer', dept:'IT', initials:'LM', color:'blue', role:'employee', email:'lucas.muller@company.local', phone:'+65 8890 1234', status:'active', manager:7 },
  { id:9, name:'Emma Rodriguez', title:'Finance Officer', dept:'Finance', initials:'ER', color:'purple', role:'employee', email:'emma.rodriguez@company.local', phone:'+65 8901 2345', status:'active', manager:1 },
  { id:10, name:'Kenji Watanabe', title:'Quality Analyst', dept:'Operations', initials:'KW', color:'teal', role:'employee', email:'kenji.watanabe@company.local', phone:'+65 9012 3456', status:'active', manager:3 },
  { id:11, name:'Fatima Al-Zahra', title:'Procurement Officer', dept:'Operations', initials:'FA', color:'amber', role:'employee', email:'fatima.zahra@company.local', phone:'+65 9123 4567', status:'active', manager:3 },
  { id:12, name:'Daniel Park', title:'Warehouse Operative', dept:'Logistics', initials:'DP', color:'indigo', role:'employee', email:'daniel.park@company.local', phone:'+65 9234 5678', status:'active', manager:2 },
  { id:13, name:'Nadia Hassan', title:'Marketing Coordinator', dept:'Marketing', initials:'NH', color:'pink', role:'employee', email:'nadia.hassan@company.local', phone:'+65 9345 6789', status:'active', manager:7 },
  { id:14, name:'Oliver Schmidt', title:'Maintenance Tech', dept:'Operations', initials:'OS', color:'green', role:'employee', email:'oliver.schmidt@company.local', phone:'+65 9456 7890', status:'active', manager:3 },
  { id:15, name:'Yuki Tanaka', title:'Data Entry Clerk', dept:'Finance', initials:'YT', color:'blue', role:'employee', email:'yuki.tanaka@company.local', phone:'+65 9567 8901', status:'active', manager:9 }
];

const tasks = [
  { id:1, title:'Review Q3 shift rosters', priority:'high', assignee:'Sarah Chen', initials:'SC', color:'indigo', due:'Aug 22', tags:['Planning'], status:'todo' },
  { id:2, title:'Stock count — Zone B', priority:'medium', assignee:'David Kim', initials:'DK', color:'blue', due:'Aug 21', tags:['Warehouse'], status:'todo' },
  { id:3, title:'Update employee handbook', priority:'low', assignee:'Aisha Rahman', initials:'AR', color:'green', due:'Aug 28', tags:['HR'], status:'todo' },
  { id:4, title:'Procure safety equipment', priority:'high', assignee:'Fatima Al-Zahra', initials:'FA', color:'amber', due:'Aug 20', tags:['Procurement'], status:'todo' },
  { id:5, title:'Onboard new driver', priority:'medium', assignee:'James Okafor', initials:'JO', color:'teal', due:'Aug 20', tags:['Onboarding'], status:'progress' },
  { id:6, title:'Fix time-clock terminal #2', priority:'high', assignee:'Lucas Müller', initials:'LM', color:'blue', due:'Aug 20', tags:['IT'], status:'progress' },
  { id:7, title:'Customer feedback report', priority:'low', assignee:'Priya Sharma', initials:'PS', color:'pink', due:'Aug 25', tags:['Customer'], status:'progress' },
  { id:8, title:'Q3 budget reconciliation', priority:'medium', assignee:'Emma Rodriguez', initials:'ER', color:'purple', due:'Aug 30', tags:['Finance'], status:'progress' },
  { id:9, title:'Safety inspection — Warehouse', priority:'high', assignee:'Mei Ling Tan', initials:'ML', color:'purple', due:'Aug 19', tags:['Safety'], status:'review' },
  { id:10, title:'Monthly timesheet approval', priority:'medium', assignee:'James Okafor', initials:'JO', color:'teal', due:'Aug 31', tags:['Finance'], status:'review' },
  { id:11, title:'Fire drill coordination', priority:'medium', assignee:'Aisha Rahman', initials:'AR', color:'green', due:'Aug 18', tags:['Safety'], status:'done' },
  { id:12, title:'Update delivery routes', priority:'low', assignee:'Tom Walker', initials:'TW', color:'amber', due:'Aug 17', tags:['Logistics'], status:'done' },
  { id:13, title:'Quality audit — Zone A', priority:'medium', assignee:'Kenji Watanabe', initials:'KW', color:'teal', due:'Aug 16', tags:['Quality'], status:'done' }
];

const leaveRequests = [
  { id:1, emp:'Tom Walker', type:'Annual Leave', from:'Aug 20', to:'Aug 22', days:3, status:'approved', reason:'Family trip' },
  { id:2, emp:'Priya Sharma', type:'Medical Leave', from:'Aug 23', to:'Aug 24', days:2, status:'pending', reason:'Dental surgery' },
  { id:3, emp:'David Kim', type:'Annual Leave', from:'Sep 02', to:'Sep 06', days:5, status:'pending', reason:'Holiday' },
  { id:4, emp:'Lucas Müller', type:'Compassionate', from:'Aug 25', to:'Aug 26', days:2, status:'pending', reason:'Family matter' },
  { id:5, emp:'Mei Ling Tan', type:'Annual Leave', from:'Sep 10', to:'Sep 12', days:3, status:'approved', reason:'Personal' },
  { id:6, emp:'James Okafor', type:'Training Leave', from:'Sep 15', to:'Sep 17', days:3, status:'rejected', reason:'Conflict with roster' },
  { id:7, emp:'Emma Rodriguez', type:'Medical Leave', from:'Aug 28', to:'Aug 28', days:1, status:'pending', reason:'Doctor appointment' }
];

const shifts = {
  1:{mon:'morning',tue:'morning',wed:'morning',thu:'morning',fri:'morning',sat:'off',sun:'off'},
  2:{mon:'morning',tue:'evening',wed:'morning',thu:'evening',fri:'morning',sat:'off',sun:'off'},
  3:{mon:'evening',tue:'evening',wed:'morning',thu:'morning',fri:'evening',sat:'morning',sun:'off'},
  4:{mon:'morning',tue:'morning',wed:'evening',thu:'evening',fri:'morning',sat:'off',sun:'off'},
  5:{mon:'evening',tue:'off',wed:'evening',thu:'morning',fri:'evening',sat:'off',sun:'off'},
  6:{mon:'off',tue:'off',wed:'off',thu:'off',fri:'off',sat:'off',sun:'off'},
  7:{mon:'morning',tue:'morning',wed:'morning',thu:'morning',fri:'morning',sat:'off',sun:'off'},
  8:{mon:'off',tue:'morning',wed:'off',thu:'morning',fri:'off',sat:'morning',sun:'off'},
  9:{mon:'morning',tue:'morning',wed:'off',thu:'morning',fri:'morning',sat:'off',sun:'off'},
  10:{mon:'evening',tue:'evening',wed:'morning',thu:'off',fri:'evening',sat:'off',sun:'off'},
  11:{mon:'morning',tue:'off',wed:'morning',thu:'morning',fri:'off',sat:'morning',sun:'off'},
  12:{mon:'morning',tue:'morning',wed:'morning',thu:'evening',fri:'morning',sat:'off',sun:'off'},
  13:{mon:'off',tue:'morning',wed:'morning',thu:'morning',fri:'off',sat:'off',sun:'off'},
  14:{mon:'evening',tue:'off',wed:'evening',thu:'off',fri:'evening',sat:'off',sun:'off'},
  15:{mon:'morning',tue:'morning',wed:'off',thu:'off',fri:'morning',sat:'off',sun:'off'}
};

const shiftTypes = {
  morning:{label:'06:00-14:00',class:'shift-morning',name:'Morning',short:'M'},
  evening:{label:'14:00-22:00',class:'shift-evening',name:'Evening',short:'E'},
  night:{label:'22:00-06:00',class:'shift-night',name:'Night',short:'N'},
  off:{label:'—',class:'shift-off',name:'Off',short:'—'}
};

// ---- Helpers ----
function avatarGradient(c){const g={indigo:'linear-gradient(135deg,#6366F1,#818CF8)',teal:'linear-gradient(135deg,#14B8A6,#2DD4BF)',purple:'linear-gradient(135deg,#8B5CF6,#A78BFA)',blue:'linear-gradient(135deg,#3B82F6,#60A5FA)',pink:'linear-gradient(135deg,#EC4899,#F472B6)',amber:'linear-gradient(135deg,#F59E0B,#FBBF24)',green:'linear-gradient(135deg,#10B981,#34D399)'};return g[c]||g.indigo}

function showToast(msg,type='success'){const t=document.getElementById('toast');if(!t)return;const ic=type==='success'?icons.checkCircle:icons.x;t.innerHTML=`<span style="color:${type==='success'?'var(--success)':'var(--danger)'}">${ic}</span> ${msg}`;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800)}

// ---- Counter ----
function animateCounter(el,target,dur=800){if(!el)return;const s=0,st=performance.now();function u(n){const p=Math.min((n-st)/dur,1);const e=1-Math.pow(1-p,3);el.textContent=Math.floor(s+(target-s)*e);if(p<1)requestAnimationFrame(u);else el.textContent=target}requestAnimationFrame(u)}
function triggerCounters(){document.querySelectorAll('.section.active [data-count]').forEach(el=>{const t=parseInt(el.dataset.count);const c=parseInt(el.textContent)||0;if(c!==t)animateCounter(el,t,600)})}

// ---- Scroll Animations ----
function initScrollAnimations(){const o=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')})},{threshold:.1});document.querySelectorAll('.fade-in,.fade-in-left,.fade-in-right,.scale-in').forEach(el=>o.observe(el))}

// ---- Navigation ----
function initNavigation(){const ni=document.querySelectorAll('.nav-item'),sc=document.querySelectorAll('.section');ni.forEach(i=>{i.addEventListener('click',()=>{const t=i.dataset.section;if(!t)return;ni.forEach(n=>n.classList.remove('active'));i.classList.add('active');sc.forEach(s=>s.classList.toggle('active',s.id===t));const bc=document.querySelector('.breadcrumb span');if(bc)bc.textContent=i.querySelector('.nav-text')?.textContent||i.textContent.trim();closeSidebar();window.scrollTo({top:0,behavior:'smooth'});setTimeout(triggerCounters,150)})})}

// ---- Mobile Sidebar ----
function initMobileSidebar(){const tg=document.querySelector('.menu-toggle'),sb=document.querySelector('.sidebar'),bd=document.querySelector('.sidebar-backdrop');if(tg)tg.addEventListener('click',()=>{sb?.classList.toggle('open');bd?.classList.toggle('show')});if(bd)bd.addEventListener('click',closeSidebar)}
function closeSidebar(){document.querySelector('.sidebar')?.classList.remove('open');document.querySelector('.sidebar-backdrop')?.classList.remove('show')}

// ---- Charts ----
function renderDashboardCharts(){const c=document.getElementById('attendance-chart');if(!c)return;const d=[{d:'Mon',v:92},{d:'Tue',v:88},{d:'Wed',v:95},{d:'Thu',v:90},{d:'Fri',v:85},{d:'Sat',v:60},{d:'Sun',v:30}];c.innerHTML=d.map((b,i)=>`<div class="chart-bar" style="height:${b.v}%;background:${i<5?'#6366F1':'#14B8A6'}" title="${b.d}: ${b.v}%"><span class="bar-value">${b.v}%</span><span class="bar-label">${b.d}</span></div>`).join('')}

// ---- Time Clock ----
let clockedIn=false;
function initTimeClock(){const b=document.getElementById('clock-btn');if(!b)return;updateClockDisplay();setInterval(updateClockDisplay,1000);b.addEventListener('click',()=>{clockedIn=!clockedIn;if(clockedIn){b.className='clock-btn clocked-in';b.innerHTML=icons.stop+' Clock Out';showToast('Clocked in at '+new Date().toLocaleTimeString())}else{b.className='clock-btn clocked-out';b.innerHTML=icons.play+' Clock In';showToast('Clocked out at '+new Date().toLocaleTimeString())}})}
function updateClockDisplay(){const t=document.getElementById('clock-time'),d=document.getElementById('clock-date');if(!t)return;const n=new Date();t.textContent=n.toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit',second:'2-digit'});if(d)d.textContent=n.toLocaleDateString('en-SG',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}

// ---- Kanban ----
function renderKanban(){const b=document.getElementById('kanban-board');if(!b)return;const cols=[{id:'todo',title:'To Do',color:'#A1A1AA',items:tasks.filter(t=>t.status==='todo')},{id:'progress',title:'In Progress',color:'#3B82F6',items:tasks.filter(t=>t.status==='progress')},{id:'review',title:'In Review',color:'#F59E0B',items:tasks.filter(t=>t.status==='review')},{id:'done',title:'Done',color:'#22C55E',items:tasks.filter(t=>t.status==='done')}];b.innerHTML=cols.map(c=>`<div class="kanban-col" data-col="${c.id}"><div class="kanban-col-header"><span class="col-dot" style="background:${c.color}"></span>${c.title}<span class="col-count">${c.items.length}</span></div>${c.items.map(i=>`<div class="kanban-card" draggable="true" data-id="${i.id}"><div class="kc-title">${i.title}</div><div class="kc-meta">${renderPriority(i.priority)}<span>${icons.calendar}</span>${i.due}</div><div class="kc-meta" style="margin-top:6px">${i.tags.map(t=>`<span class="kc-tag">${t}</span>`).join('')}<span class="kc-assignee"><span class="avatar-xs" style="background:${avatarGradient(i.color)}">${i.initials}</span></span></div></div>`).join('')}</div>`).join('');initKanbanDrag()}

function renderPriority(p){const c={high:'#EF4444',medium:'#F59E0B',low:'#22C55E'};const l={high:'High',medium:'Med',low:'Low'};return`<span class="kc-priority" style="color:${c[p]}"><span style="width:6px;height:6px;border-radius:50%;background:${c[p]};display:inline-block"></span> ${l[p]}</span>`}

function initKanbanDrag(){let d=null;document.querySelectorAll('.kanban-card').forEach(c=>{c.addEventListener('dragstart',e=>{d=c;c.classList.add('dragging');e.dataTransfer.effectAllowed='move'});c.addEventListener('dragend',()=>{c.classList.remove('dragging');d=null})});document.querySelectorAll('.kanban-col').forEach(c=>{c.addEventListener('dragover',e=>{e.preventDefault();c.classList.add('drag-over')});c.addEventListener('dragleave',()=>c.classList.remove('drag-over'));c.addEventListener('drop',e=>{e.preventDefault();c.classList.remove('drag-over');if(!d)return;c.appendChild(d);document.querySelectorAll('.kanban-col').forEach(x=>{x.querySelector('.col-count').textContent=x.querySelectorAll('.kanban-card').length});showToast('Task moved')})})}

// ---- Roster ----
function renderRoster(){const g=document.getElementById('roster-grid');if(!g)return;const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],keys=['mon','tue','wed','thu','fri','sat','sun'];let h='<div class="roster-header">Employee</div>';days.forEach(d=>h+=`<div class="roster-header">${d}</div>`);employees.slice(0,12).forEach(e=>{h+=`<div class="roster-cell roster-emp"><span class="avatar-sm" style="background:${avatarGradient(e.color)}">${e.initials}</span><span>${e.name.split(' ').slice(-2).join(' ')}</span></div>`;keys.forEach(d=>{const s=shifts[e.id]?.[d]||'off';const st=shiftTypes[s];if(s==='off')h+=`<div class="roster-cell" style="text-align:center;color:var(--text-quaternary)">—</div>`;else h+=`<div class="roster-cell"><span class="shift-badge ${st.class}" onclick="cycleShift(${e.id},'${d}',this)">${st.label}</span></div>`})});g.innerHTML=h}
function cycleShift(eid,day,el){const o=['morning','evening','night','off'];const c=shifts[eid]?.[day]||'off';const n=o[(o.indexOf(c)+1)%o.length];if(!shifts[eid])shifts[eid]={};shifts[eid][day]=n;const st=shiftTypes[n];if(n==='off'){el.outerHTML=`<span class="shift-badge shift-off" onclick="cycleShift(${eid},'${day}',this)">—</span>`}else{el.className=`shift-badge ${st.class}`;el.textContent=st.label}showToast(`Shift updated: ${st.name}`)}

// ---- Org Chart ----
function renderOrgChart(){const c=document.getElementById('org-chart');if(!c)return;c.innerHTML=`<div class="org-tree"><div class="org-node ceo" onclick="showOrgDetail(1)"><div class="org-avatar" style="background:${avatarGradient('indigo')}">SC</div><div class="org-name">Sarah Chen</div><div class="org-title">Director</div></div><div class="org-children"><div class="org-branch"><div class="org-node manager" onclick="showOrgDetail(2)"><div class="org-avatar" style="background:${avatarGradient('teal')}">JO</div><div class="org-name">James Okafor</div><div class="org-title">Supervisor</div></div><div class="org-children" style="gap:6px"><div class="org-branch"><div class="org-node" onclick="showOrgDetail(4)"><div class="org-avatar" style="background:${avatarGradient('blue')}">DK</div><div class="org-name">David Kim</div><div class="org-title">Warehouse</div></div></div><div class="org-branch"><div class="org-node" onclick="showOrgDetail(6)"><div class="org-avatar" style="background:${avatarGradient('amber')}">TW</div><div class="org-name">Tom Walker</div><div class="org-title">Driver</div></div></div><div class="org-branch"><div class="org-node" onclick="showOrgDetail(12)"><div class="org-avatar" style="background:${avatarGradient('indigo')}">DP</div><div class="org-name">Daniel P.</div><div class="org-title">Warehouse</div></div></div></div></div><div class="org-branch"><div class="org-node manager" onclick="showOrgDetail(3)"><div class="org-avatar" style="background:${avatarGradient('purple')}">ML</div><div class="org-name">Mei Ling Tan</div><div class="org-title">Team Lead</div></div><div class="org-children" style="gap:6px"><div class="org-branch"><div class="org-node" onclick="showOrgDetail(10)"><div class="org-avatar" style="background:${avatarGradient('teal')}">KW</div><div class="org-name">Kenji W.</div><div class="org-title">Quality</div></div></div><div class="org-branch"><div class="org-node" onclick="showOrgDetail(14)"><div class="org-avatar" style="background:${avatarGradient('green')}">OS</div><div class="org-name">Oliver S.</div><div class="org-title">Maintenance</div></div></div></div></div><div class="org-branch"><div class="org-node manager" onclick="showOrgDetail(7)"><div class="org-avatar" style="background:${avatarGradient('green')}">AR</div><div class="org-name">Aisha Rahman</div><div class="org-title">HR Coord.</div></div><div class="org-children" style="gap:6px"><div class="org-branch"><div class="org-node" onclick="showOrgDetail(5)"><div class="org-avatar" style="background:${avatarGradient('pink')}">PS</div><div class="org-name">Priya S.</div><div class="org-title">Service</div></div></div><div class="org-branch"><div class="org-node" onclick="showOrgDetail(8)"><div class="org-avatar" style="background:${avatarGradient('blue')}">LM</div><div class="org-name">Lucas M.</div><div class="org-title">IT Support</div></div></div><div class="org-branch"><div class="org-node" onclick="showOrgDetail(13)"><div class="org-avatar" style="background:${avatarGradient('pink')}">NH</div><div class="org-name">Nadia H.</div><div class="org-title">Marketing</div></div></div></div></div></div></div>`}
function showOrgDetail(id){const e=employees.find(x=>x.id===id);if(e)showToast(`${e.name} — ${e.title}`)}

// ---- Leave ----
function renderLeaveList(){const c=document.getElementById('leave-list');if(!c)return;const sorted=[...leaveRequests].sort((a,b)=>{const o={pending:0,approved:1,rejected:2};return o[a.status]-o[b.status]});c.innerHTML=sorted.map(r=>`<tr><td><strong>${r.emp}</strong></td><td>${r.type}</td><td>${r.from} to ${r.to}</td><td class="text-center">${r.days}</td><td>${r.reason}</td><td>${r.status==='pending'?`<div class="flex gap-2"><button class="btn btn-sm btn-primary" onclick="approveLeave(${r.id})">Approve</button><button class="btn btn-sm btn-secondary" onclick="rejectLeave(${r.id})">Reject</button></div>`:`<span class="badge ${r.status==='approved'?'badge-green':'badge-red'}">${r.status}</span>`}</td></tr>`).join('')}
function approveLeave(id){const r=leaveRequests.find(x=>x.id===id);if(r){r.status='approved';renderLeaveList();renderLeaveCalendar();showToast(`Leave approved for ${r.emp}`)}}
function rejectLeave(id){const r=leaveRequests.find(x=>x.id===id);if(r){r.status='rejected';renderLeaveList();renderLeaveCalendar();showToast(`Leave rejected for ${r.emp}`,'error')}}

function renderLeaveCalendar(){const c=document.getElementById('leave-calendar');if(!c)return;const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],firstDay=6,daysInMonth=31,today=20;let h=days.map(d=>`<div class="cal-day-header">${d}</div>`).join('');for(let i=0;i<firstDay;i++)h+='<div class="cal-day other-month"></div>';for(let d=1;d<=daysInMonth;d++){let p='';leaveRequests.forEach(r=>{if(r.status==='rejected')return;const fd=parseInt(r.from.split(' ')[1]),td=parseInt(r.to.split(' ')[1]);if(d>=fd&&d<=td){const cl=r.status==='approved'?'badge-green':'badge-amber';p+=`<span class="leave-pill ${cl}">${r.emp.split(' ')[0]}</span>`}});h+=`<div class="cal-day ${d===today?'today':''}"><div class="cal-date">${d}</div>${p}</div>`}c.innerHTML=h}

// ---- Employee Table ----
function renderEmployeeTable(){const tb=document.getElementById('employee-tbody');if(!tb)return;const rl={admin:'Administrator',manager:'Manager',employee:'Employee'},sb={active:'badge-green',leave:'badge-amber'},sl={active:'Active',leave:'On Leave'};tb.innerHTML=employees.map(e=>`<tr><td><div class="flex items-center gap-2"><span class="avatar-sm" style="width:30px;height:30px;border-radius:50%;background:${avatarGradient(e.color)};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff">${e.initials}</span><div><div style="font-weight:600">${e.name}</div><div class="text-xs text-muted">${e.email}</div></div></div></td><td>${e.title}</td><td>${e.dept}</td><td>${e.phone}</td><td><span class="badge ${sb[e.status]}">${sl[e.status]}</span></td><td><span class="badge badge-indigo">${rl[e.role]}</span></td></tr>`).join('')}

// ---- Login Tabs ----
function initLoginTabs(){const t=document.querySelectorAll('.login-tab'),p=document.querySelectorAll('.login-panel');t.forEach(x=>x.addEventListener('click',()=>{t.forEach(y=>y.classList.remove('active'));x.classList.add('active');p.forEach(y=>y.classList.toggle('active',y.dataset.panel===x.dataset.tab))}));document.querySelectorAll('.auth-method-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.auth-method-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));const lb=document.getElementById('demo-login');if(lb)lb.addEventListener('click',()=>{showToast('Demo mode: Navigating to dashboard...');setTimeout(()=>document.querySelector('[data-section="dashboard"]')?.click(),700)})}

// ---- Backlog Filters ----
function initBacklogFilters(){document.querySelectorAll('.backlog-filter').forEach(f=>f.addEventListener('click',()=>{document.querySelectorAll('.backlog-filter').forEach(x=>x.classList.remove('active'));f.classList.add('active');const t=f.dataset.filter;document.querySelectorAll('.milestone-card').forEach(c=>c.style.display=(!t||c.dataset.milestone===t)?'':'none')}))}

// ---- Mobile Preview ----
function initMobilePreview(){const b=document.getElementById('show-mobile'),o=document.getElementById('mobile-overlay');if(b)b.addEventListener('click',()=>o?.classList.add('show'));if(o)o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('show')})}

// ---- Inject Icons ----
function injectIcons(){document.querySelectorAll('[data-icon]').forEach(el=>{const n=el.dataset.icon;if(icons[n])el.innerHTML=icons[n]})}

// ---- Inject Tech Logos ----
function injectTechLogos(){
  if(typeof techLogos==='undefined')return;
  // Architecture diagram logos
  const logoMap={'logo-chrome':'chrome','logo-apple':'apple','logo-android':'android','logo-nginx':'nginx','logo-jwt':'jwt','logo-node':'nodejs','logo-postgres':'postgres','logo-redis':'redis'};
  Object.entries(logoMap).forEach(([id,key])=>{const el=document.getElementById(id);if(el&&techLogos[key])el.innerHTML=techLogos[key]});
  // Tech stack pills
  const pills=document.getElementById('tech-stack-pills');
  if(pills){
    const stack=[['react','React Native 0.74'],['expo','Expo SDK 51'],['typescript','TypeScript 5.4'],['nodejs','Node.js 20 LTS'],['express','Express 4.19'],['postgres','PostgreSQL 16'],['prisma','Prisma ORM'],['jwt','JWT + bcrypt'],['redis','Redis 7'],['docker','Docker'],['nginx','Nginx'],['github','Expo EAS']];
    pills.innerHTML=stack.map(([k,label])=>`<span class="tech-pill">${techLogos[k]||''}<span>${label}</span></span>`).join('');
  }
}

// ---- Init ----
document.addEventListener('DOMContentLoaded',()=>{
  injectIcons();
  injectTechLogos();
  initNavigation();
  initMobileSidebar();
  initTimeClock();
  renderDashboardCharts();
  renderKanban();
  renderRoster();
  renderOrgChart();
  renderLeaveList();
  renderLeaveCalendar();
  renderEmployeeTable();
  initLoginTabs();
  initBacklogFilters();
  initMobilePreview();
  initScrollAnimations();
  setTimeout(triggerCounters,200);
  if(window.location.hash){const t=window.location.hash.substring(1);document.querySelector(`.nav-item[data-section="${t}"]`)?.click()}
});
