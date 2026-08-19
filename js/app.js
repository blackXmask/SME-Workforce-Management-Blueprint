/* WorkForce Pro v2 — App Logic & Animations */

// ---- Mock Data ----
const employees = [
  { id:1, name:'Sarah Chen', title:'Operations Director', dept:'Management', initials:'SC', color:'indigo', role:'admin', email:'sarah.chen@company.local', phone:'+65 8123 4567', status:'active' },
  { id:2, name:'James Okafor', title:'Shift Supervisor', dept:'Operations', initials:'JO', color:'teal', role:'manager', email:'james.okafor@company.local', phone:'+65 8234 5678', status:'active' },
  { id:3, name:'Mei Ling Tan', title:'Team Lead', dept:'Logistics', initials:'ML', color:'purple', role:'manager', email:'meiling.tan@company.local', phone:'+65 8345 6789', status:'active' },
  { id:4, name:'David Kim', title:'Warehouse Operative', dept:'Logistics', initials:'DK', color:'blue', role:'employee', email:'david.kim@company.local', phone:'+65 8456 7890', status:'active' },
  { id:5, name:'Priya Sharma', title:'Customer Service Rep', dept:'Customer Care', initials:'PS', color:'pink', role:'employee', email:'priya.sharma@company.local', phone:'+65 8567 8901', status:'active' },
  { id:6, name:'Tom Walker', title:'Delivery Driver', dept:'Logistics', initials:'TW', color:'amber', role:'employee', email:'tom.walker@company.local', phone:'+65 8678 9012', status:'leave' },
  { id:7, name:'Aisha Rahman', title:'HR Coordinator', dept:'Human Resources', initials:'AR', color:'green', role:'manager', email:'aisha.rahman@company.local', phone:'+65 8789 0123', status:'active' },
  { id:8, name:'Lucas Müller', title:'IT Support Officer', dept:'IT', initials:'LM', color:'blue', role:'employee', email:'lucas.muller@company.local', phone:'+65 8890 1234', status:'active' },
  { id:9, name:'Emma Rodriguez', title:'Finance Officer', dept:'Finance', initials:'ER', color:'purple', role:'employee', email:'emma.rodriguez@company.local', phone:'+65 8901 2345', status:'active' },
  { id:10, name:'Kenji Watanabe', title:'Quality Analyst', dept:'Operations', initials:'KW', color:'teal', role:'employee', email:'kenji.watanabe@company.local', phone:'+65 9012 3456', status:'active' },
  { id:11, name:'Fatima Al-Zahra', title:'Procurement Officer', dept:'Operations', initials:'FA', color:'amber', role:'employee', email:'fatima.zahra@company.local', phone:'+65 9123 4567', status:'active' },
  { id:12, name:'Daniel Park', title:'Warehouse Operative', dept:'Logistics', initials:'DP', color:'indigo', role:'employee', email:'daniel.park@company.local', phone:'+65 9234 5678', status:'active' },
  { id:13, name:'Nadia Hassan', title:'Marketing Coordinator', dept:'Marketing', initials:'NH', color:'pink', role:'employee', email:'nadia.hassan@company.local', phone:'+65 9345 6789', status:'active' },
  { id:14, name:'Oliver Schmidt', title:'Maintenance Tech', dept:'Operations', initials:'OS', color:'green', role:'employee', email:'oliver.schmidt@company.local', phone:'+65 9456 7890', status:'active' },
  { id:15, name:'Yuki Tanaka', title:'Data Entry Clerk', dept:'Finance', initials:'YT', color:'blue', role:'employee', email:'yuki.tanaka@company.local', phone:'+65 9567 8901', status:'active' }
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
  morning:{label:'06:00-14:00',class:'shift-morning',name:'Morning'},
  evening:{label:'14:00-22:00',class:'shift-evening',name:'Evening'},
  night:{label:'22:00-06:00',class:'shift-night',name:'Night'},
  off:{label:'Off',class:'shift-off',name:'Off'}
};

// ---- Helpers ----
function avatarGradient(c) {
  const g = {indigo:'linear-gradient(135deg,#6366F1,#818CF8)',teal:'linear-gradient(135deg,#14B8A6,#2DD4BF)',purple:'linear-gradient(135deg,#8B5CF6,#A78BFA)',blue:'linear-gradient(135deg,#3B82F6,#60A5FA)',pink:'linear-gradient(135deg,#EC4899,#F472B6)',amber:'linear-gradient(135deg,#F59E0B,#FBBF24)',green:'linear-gradient(135deg,#10B981,#34D399)'};
  return g[c]||g.indigo;
}

function showToast(msg, type='success') {
  const toast = document.getElementById('toast');
  if(!toast) return;
  const iconSvg = type==='success' ? icons.checkCircle : icons.x;
  toast.innerHTML = `<span style="color:${type==='success'?'var(--green-500)':'var(--red-500)'}">${iconSvg}</span> ${msg}`;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),3000);
}

// ---- Animated Counter ----
function animateCounter(el, target, duration=1200) {
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed/duration, 1);
    const eased = 1 - Math.pow(1-progress, 3);
    el.textContent = Math.floor(start + (target-start)*eased);
    if(progress<1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.1});
  document.querySelectorAll('.fade-in,.fade-in-left,.fade-in-right,.scale-in').forEach(el=>observer.observe(el));
}

// ---- Navigation ----
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  navItems.forEach(item=>{
    item.addEventListener('click',()=>{
      const target = item.dataset.section;
      if(!target) return;
      navItems.forEach(n=>n.classList.remove('active'));
      item.classList.add('active');
      sections.forEach(s=>s.classList.toggle('active', s.id===target));
      const bc = document.querySelector('.breadcrumb span');
      if(bc) bc.textContent = item.querySelector('.nav-text')?.textContent || item.textContent.trim();
      closeSidebar();
      window.scrollTo({top:0,behavior:'smooth'});
      // Trigger counter animations
      setTimeout(()=>{ document.querySelectorAll('.section.active [data-count]').forEach(el=>{
        animateCounter(el, parseInt(el.dataset.count));
      });},200);
    });
  });
}

// ---- Mobile Sidebar ----
function initMobileSidebar() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');
  if(toggle) toggle.addEventListener('click',()=>{ sidebar.classList.toggle('open'); backdrop.classList.toggle('show'); });
  if(backdrop) backdrop.addEventListener('click', closeSidebar);
}
function closeSidebar() {
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-backdrop')?.classList.remove('show');
}

// ---- Dashboard Charts ----
function renderDashboardCharts() {
  const c = document.getElementById('attendance-chart');
  if(!c) return;
  const data = [{d:'Mon',v:92},{d:'Tue',v:88},{d:'Wed',v:95},{d:'Thu',v:90},{d:'Fri',v:85},{d:'Sat',v:60},{d:'Sun',v:30}];
  c.innerHTML = data.map((b,i)=>`<div class="chart-bar" style="height:${b.v}%;background:${i<5?'#6366F1':'#14B8A6'};animation-delay:${i*.08}s" title="${b.d}: ${b.v}%"><span class="bar-value">${b.v}%</span><span class="bar-label">${b.d}</span></div>`).join('');
}

// ---- Time Clock ----
let clockedIn = false;
function initTimeClock() {
  const btn = document.getElementById('clock-btn');
  if(!btn) return;
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
  btn.addEventListener('click',()=>{
    clockedIn = !clockedIn;
    if(clockedIn) { btn.className='clock-btn clocked-in'; btn.innerHTML=icons.stop+' Clock Out'; showToast('Clocked in at '+new Date().toLocaleTimeString()); }
    else { btn.className='clock-btn clocked-out'; btn.innerHTML=icons.play+' Clock In'; showToast('Clocked out at '+new Date().toLocaleTimeString()); }
  });
}
function updateClockDisplay() {
  const t = document.getElementById('clock-time'), d = document.getElementById('clock-date');
  if(!t) return;
  const now = new Date();
  t.textContent = now.toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  if(d) d.textContent = now.toLocaleDateString('en-SG',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}

// ---- Kanban ----
function renderKanban() {
  const board = document.getElementById('kanban-board');
  if(!board) return;
  const cols = [
    {id:'todo',title:'To Do',color:'var(--slate-400)',items:tasks.filter(t=>t.status==='todo')},
    {id:'progress',title:'In Progress',color:'var(--blue-500)',items:tasks.filter(t=>t.status==='progress')},
    {id:'review',title:'In Review',color:'var(--amber-500)',items:tasks.filter(t=>t.status==='review')},
    {id:'done',title:'Done',color:'var(--green-500)',items:tasks.filter(t=>t.status==='done')}
  ];
  board.innerHTML = cols.map(col=>`
    <div class="kanban-col" data-col="${col.id}">
      <div class="kanban-col-header"><span class="col-dot" style="background:${col.color}"></span>${col.title}<span class="col-count">${col.items.length}</span></div>
      ${col.items.map(item=>`
        <div class="kanban-card" draggable="true" data-id="${item.id}">
          <div class="kc-title">${item.title}</div>
          <div class="kc-meta">${renderPriority(item.priority)}<span>${icons.calendar}</span>${item.due}</div>
          <div class="kc-meta" style="margin-top:6px">
            ${item.tags.map(tag=>`<span class="kc-tag" style="background:var(--slate-100);color:var(--navy-600)">${tag}</span>`).join('')}
            <span class="kc-assignee"><span class="avatar-xs" style="background:${avatarGradient(item.color)}">${item.initials}</span></span>
          </div>
        </div>`).join('')}
    </div>`).join('');
  initKanbanDrag();
}

function renderPriority(p) {
  const colors = {high:'var(--red-500)',medium:'var(--amber-500)',low:'var(--green-500)'};
  return `<span class="kc-priority" style="color:${colors[p]}">${p==='high'?'●':p==='medium'?'●':'●'} ${p.charAt(0).toUpperCase()+p.slice(1)}</span>`;
}

function initKanbanDrag() {
  let dragged = null;
  document.querySelectorAll('.kanban-card').forEach(card=>{
    card.addEventListener('dragstart',e=>{ dragged=card; card.classList.add('dragging'); e.dataTransfer.effectAllowed='move'; });
    card.addEventListener('dragend',()=>{ card.classList.remove('dragging'); dragged=null; });
  });
  document.querySelectorAll('.kanban-col').forEach(col=>{
    col.addEventListener('dragover',e=>{ e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave',()=>col.classList.remove('drag-over'));
    col.addEventListener('drop',e=>{
      e.preventDefault(); col.classList.remove('drag-over');
      if(!dragged) return;
      col.appendChild(dragged);
      document.querySelectorAll('.kanban-col').forEach(c=>{ c.querySelector('.col-count').textContent = c.querySelectorAll('.kanban-card').length; });
      showToast('Task moved');
    });
  });
}

// ---- Roster ----
function renderRoster() {
  const grid = document.getElementById('roster-grid');
  if(!grid) return;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const keys = ['mon','tue','wed','thu','fri','sat','sun'];
  let html = '<div class="roster-header">Employee</div>';
  days.forEach(d=>html+=`<div class="roster-header">${d}</div>`);
  employees.slice(0,12).forEach(emp=>{
    html += `<div class="roster-cell roster-emp"><span class="avatar-sm" style="background:${avatarGradient(emp.color)}">${emp.initials}</span><span>${emp.name.split(' ').slice(-2).join(' ')}</span></div>`;
    keys.forEach(day=>{
      const shift = shifts[emp.id]?.[day]||'off';
      const st = shiftTypes[shift];
      html += `<div class="roster-cell"><span class="shift-badge ${st.class}" onclick="cycleShift(${emp.id},'${day}',this)">${st.label}</span></div>`;
    });
  });
  grid.innerHTML = html;
}

function cycleShift(empId,day,el) {
  const order = ['morning','evening','night','off'];
  const current = shifts[empId]?.[day]||'off';
  const next = order[(order.indexOf(current)+1)%order.length];
  if(!shifts[empId]) shifts[empId]={};
  shifts[empId][day] = next;
  const st = shiftTypes[next];
  el.className = `shift-badge ${st.class}`;
  el.textContent = st.label;
  showToast(`Shift updated: ${st.name}`);
}

// ---- Org Chart ----
function renderOrgChart() {
  const c = document.getElementById('org-chart');
  if(!c) return;
  c.innerHTML = `
    <div class="org-tree">
      <div class="org-node ceo" onclick="showOrgDetail(1)">
        <div class="org-avatar" style="background:${avatarGradient('indigo')}">SC</div>
        <div class="org-name">Sarah Chen</div><div class="org-title">Operations Director</div>
      </div>
      <div class="org-children">
        <div class="org-branch">
          <div class="org-node manager" onclick="showOrgDetail(2)">
            <div class="org-avatar" style="background:${avatarGradient('teal')}">JO</div>
            <div class="org-name">James Okafor</div><div class="org-title">Shift Supervisor</div>
          </div>
          <div class="org-children">
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(4)"><div class="org-avatar" style="background:${avatarGradient('blue')}">DK</div><div class="org-name">David Kim</div><div class="org-title">Warehouse Operative</div></div></div>
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(6)"><div class="org-avatar" style="background:${avatarGradient('amber')}">TW</div><div class="org-name">Tom Walker</div><div class="org-title">Delivery Driver</div></div></div>
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(12)"><div class="org-avatar" style="background:${avatarGradient('indigo')}">DP</div><div class="org-name">Daniel Park</div><div class="org-title">Warehouse Operative</div></div></div>
          </div>
        </div>
        <div class="org-branch">
          <div class="org-node manager" onclick="showOrgDetail(3)"><div class="org-avatar" style="background:${avatarGradient('purple')}">ML</div><div class="org-name">Mei Ling Tan</div><div class="org-title">Team Lead — Logistics</div></div>
          <div class="org-children">
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(10)"><div class="org-avatar" style="background:${avatarGradient('teal')}">KW</div><div class="org-name">Kenji Watanabe</div><div class="org-title">Quality Analyst</div></div></div>
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(14)"><div class="org-avatar" style="background:${avatarGradient('green')}">OS</div><div class="org-name">Oliver Schmidt</div><div class="org-title">Maintenance Tech</div></div></div>
          </div>
        </div>
        <div class="org-branch">
          <div class="org-node manager" onclick="showOrgDetail(7)"><div class="org-avatar" style="background:${avatarGradient('green')}">AR</div><div class="org-name">Aisha Rahman</div><div class="org-title">HR Coordinator</div></div>
          <div class="org-children">
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(5)"><div class="org-avatar" style="background:${avatarGradient('pink')}">PS</div><div class="org-name">Priya Sharma</div><div class="org-title">Customer Service</div></div></div>
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(8)"><div class="org-avatar" style="background:${avatarGradient('blue')}">LM</div><div class="org-name">Lucas Müller</div><div class="org-title">IT Support</div></div></div>
            <div class="org-branch"><div class="org-node" onclick="showOrgDetail(13)"><div class="org-avatar" style="background:${avatarGradient('pink')}">NH</div><div class="org-name">Nadia Hassan</div><div class="org-title">Marketing Coord.</div></div></div>
          </div>
        </div>
      </div>
    </div>`;
}

function showOrgDetail(id) {
  const emp = employees.find(e=>e.id===id);
  if(emp) showToast(`${emp.name} — ${emp.title}`);
}

// ---- Leave ----
function renderLeaveList() {
  const c = document.getElementById('leave-list');
  if(!c) return;
  c.innerHTML = leaveRequests.map(r=>`
    <tr>
      <td><strong>${r.emp}</strong></td><td>${r.type}</td><td>${r.from} → ${r.to}</td>
      <td class="text-center">${r.days}</td><td>${r.reason}</td>
      <td>${r.status==='pending'
        ? `<div class="flex gap-2"><button class="btn btn-sm btn-primary" onclick="approveLeave(${r.id})">Approve</button><button class="btn btn-sm btn-secondary" onclick="rejectLeave(${r.id})">Reject</button></div>`
        : `<span class="badge ${r.status==='approved'?'badge-green':'badge-red'}">${r.status}</span>`}</td>
    </tr>`).join('');
}

function approveLeave(id) { const r=leaveRequests.find(x=>x.id===id); if(r){r.status='approved';renderLeaveList();renderLeaveCalendar();showToast(`Leave approved for ${r.emp}`);} }
function rejectLeave(id) { const r=leaveRequests.find(x=>x.id===id); if(r){r.status='rejected';renderLeaveList();renderLeaveCalendar();showToast(`Leave rejected for ${r.emp}`,'error');} }

function renderLeaveCalendar() {
  const c = document.getElementById('leave-calendar');
  if(!c) return;
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const firstDay=6, daysInMonth=31, today=20;
  let html = days.map(d=>`<div class="cal-day-header">${d}</div>`).join('');
  for(let i=0;i<firstDay;i++) html+='<div class="cal-day other-month"></div>';
  for(let d=1;d<=daysInMonth;d++){
    let pills='';
    leaveRequests.forEach(r=>{
      const fd=parseInt(r.from.split(' ')[1]), td=parseInt(r.to.split(' ')[1]);
      if(d>=fd&&d<=td){ const cls=r.status==='approved'?'badge-green':r.status==='pending'?'badge-amber':'badge-red'; pills+=`<span class="leave-pill ${cls}">${r.emp.split(' ')[0]}</span>`; }
    });
    html+=`<div class="cal-day ${d===today?'today':''}"><div class="cal-date">${d}</div>${pills}</div>`;
  }
  c.innerHTML=html;
}

// ---- Employee Table ----
function renderEmployeeTable() {
  const tb = document.getElementById('employee-tbody');
  if(!tb) return;
  const rl={admin:'Administrator',manager:'Manager',employee:'Employee'};
  const sb={active:'badge-green',leave:'badge-amber'};
  const sl={active:'Active',leave:'On Leave'};
  tb.innerHTML = employees.map(emp=>`
    <tr>
      <td><div class="flex items-center gap-2"><span class="avatar-sm" style="width:32px;height:32px;border-radius:50%;background:${avatarGradient(emp.color)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff">${emp.initials}</span><div><div style="font-weight:600">${emp.name}</div><div class="text-xs text-muted">${emp.email}</div></div></div></td>
      <td>${emp.title}</td><td>${emp.dept}</td><td>${emp.phone}</td>
      <td><span class="badge ${sb[emp.status]}">${sl[emp.status]}</span></td>
      <td><span class="badge badge-indigo">${rl[emp.role]}</span></td>
    </tr>`).join('');
}

// ---- Login Tabs ----
function initLoginTabs() {
  const tabs = document.querySelectorAll('.login-tab');
  const panels = document.querySelectorAll('.login-panel');
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    panels.forEach(p=>p.classList.toggle('active', p.dataset.panel===tab.dataset.tab));
  }));
  document.querySelectorAll('.auth-method-btn').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.auth-method-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }));
  const lb = document.getElementById('demo-login');
  if(lb) lb.addEventListener('click',()=>{ showToast('Demo mode: Navigating to dashboard...'); setTimeout(()=>document.querySelector('[data-section="dashboard"]')?.click(),800); });
}

// ---- Backlog Filters ----
function initBacklogFilters() {
  document.querySelectorAll('.backlog-filter').forEach(f=>f.addEventListener('click',()=>{
    document.querySelectorAll('.backlog-filter').forEach(x=>x.classList.remove('active'));
    f.classList.add('active');
    const t=f.dataset.filter;
    document.querySelectorAll('.milestone-card').forEach(card=>card.style.display=(!t||card.dataset.milestone===t)?'':'none');
  }));
}

// ---- Mobile Preview ----
function initMobilePreview() {
  const btn=document.getElementById('show-mobile'), ov=document.getElementById('mobile-overlay');
  if(btn) btn.addEventListener('click',()=>ov?.classList.add('show'));
  if(ov) ov.addEventListener('click',e=>{ if(e.target===ov) ov.classList.remove('show'); });
}

// ---- Inject Icons ----
function injectIcons() {
  document.querySelectorAll('[data-icon]').forEach(el=>{ const name=el.dataset.icon; if(icons[name]) el.innerHTML=icons[name]; });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded',()=>{
  injectIcons();
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
  setTimeout(()=>{ document.querySelectorAll('[data-count]').forEach(el=>animateCounter(el,parseInt(el.dataset.count))); },300);
  if(window.location.hash) {
    const target=window.location.hash.substring(1);
    document.querySelector(`.nav-item[data-section="${target}"]`)?.click();
  }
});
