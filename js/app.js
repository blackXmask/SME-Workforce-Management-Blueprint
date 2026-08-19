/* ============================================
   SME Workforce Management — Prototype Logic
   ============================================ */

// ---- Mock Data ----
const employees = [
  { id: 1, name: 'Sarah Chen',     title: 'Operations Director', dept: 'Management',    initials: 'SC', color: 'indigo', role: 'admin',    email: 'sarah.chen@company.local',    phone: '+65 8123 4567', status: 'active' },
  { id: 2, name: 'James Okafor',   title: 'Shift Supervisor',    dept: 'Operations',    initials: 'JO', color: 'teal',   role: 'manager',  email: 'james.okafor@company.local',   phone: '+65 8234 5678', status: 'active' },
  { id: 3, name: 'Mei Ling Tan',   title: 'Team Lead',            dept: 'Logistics',     initials: 'ML', color: 'purple', role: 'manager',  email: 'meiling.tan@company.local',    phone: '+65 8345 6789', status: 'active' },
  { id: 4, name: 'David Kim',       title: 'Warehouse Operative', dept: 'Logistics',     initials: 'DK', color: 'blue',   role: 'employee', email: 'david.kim@company.local',      phone: '+65 8456 7890', status: 'active' },
  { id: 5, name: 'Priya Sharma',   title: 'Customer Service Rep', dept: 'Customer Care', initials: 'PS', color: 'pink',   role: 'employee', email: 'priya.sharma@company.local',   phone: '+65 8567 8901', status: 'active' },
  { id: 6, name: 'Tom Walker',     title: 'Delivery Driver',     dept: 'Logistics',     initials: 'TW', color: 'amber',  role: 'employee', email: 'tom.walker@company.local',     phone: '+65 8678 9012', status: 'leave'    },
  { id: 7, name: 'Aisha Rahman',   title: 'HR Coordinator',      dept: 'Human Resources', initials: 'AR', color: 'green', role: 'manager', email: 'aisha.rahman@company.local',   phone: '+65 8789 0123', status: 'active' },
  { id: 8, name: 'Lucas Müller',   title: 'IT Support Officer',  dept: 'IT',            initials: 'LM', color: 'blue',   role: 'employee', email: 'lucas.muller@company.local',   phone: '+65 8890 1234', status: 'active' },
];

const tasks = [
  { id: 1, title: 'Review Q3 shift rosters',        priority: 'high',   assignee: 'Sarah Chen',   due: 'Aug 22', tags: ['Planning'],    status: 'todo' },
  { id: 2, title: 'Stock count — Zone B',           priority: 'medium', assignee: 'David Kim',    due: 'Aug 21', tags: ['Warehouse'],   status: 'todo' },
  { id: 3, title: 'Update employee handbook',       priority: 'low',    assignee: 'Aisha Rahman', due: 'Aug 28', tags: ['HR'],         status: 'todo' },
  { id: 4, title: 'Onboard new driver',              priority: 'medium', assignee: 'James Okafor', due: 'Aug 20', tags: ['Onboarding'], status: 'progress' },
  { id: 5, title: 'Fix time-clock terminal #2',      priority: 'high',   assignee: 'Lucas Müller', due: 'Aug 20', tags: ['IT'],         status: 'progress' },
  { id: 6, title: 'Customer feedback report',       priority: 'low',    assignee: 'Priya Sharma', due: 'Aug 25', tags: ['Customer'],    status: 'progress' },
  { id: 7, title: 'Safety inspection — Warehouse',   priority: 'high',   assignee: 'Mei Ling Tan',  due: 'Aug 19', tags: ['Safety'],     status: 'review' },
  { id: 8, title: 'Monthly timesheet approval',      priority: 'medium', assignee: 'James Okafor', due: 'Aug 31', tags: ['Finance'],    status: 'review' },
  { id: 9, title: 'Fire drill coordination',         priority: 'medium', assignee: 'Aisha Rahman', due: 'Aug 18', tags: ['Safety'],     status: 'done' },
  { id: 10, title: 'Update delivery routes',         priority: 'low',    assignee: 'Tom Walker',   due: 'Aug 17', tags: ['Logistics'],  status: 'done' },
];

const leaveRequests = [
  { id: 1, emp: 'Tom Walker',     type: 'Annual Leave',    from: 'Aug 20', to: 'Aug 22', days: 3, status: 'approved', reason: 'Family trip' },
  { id: 2, emp: 'Priya Sharma',   type: 'Medical Leave',   from: 'Aug 23', to: 'Aug 24', days: 2, status: 'pending',  reason: 'Dental surgery' },
  { id: 3, emp: 'David Kim',      type: 'Annual Leave',    from: 'Sep 02', to: 'Sep 06', days: 5, status: 'pending',  reason: 'Holiday' },
  { id: 4, emp: 'Lucas Müller',   type: 'Compassionate',   from: 'Aug 25', to: 'Aug 26', days: 2, status: 'pending',  reason: 'Family matter' },
  { id: 5, emp: 'Mei Ling Tan',   type: 'Annual Leave',    from: 'Sep 10', to: 'Sep 12', days: 3, status: 'approved', reason: 'Personal' },
  { id: 6, emp: 'James Okafor',  type: 'Training Leave',  from: 'Sep 15', to: 'Sep 17', days: 3, status: 'rejected', reason: 'Conflict with roster' },
];

const shifts = {
  // employeeId: { mon: 'morning', tue: 'evening', ... }
  1: { mon: 'morning', tue: 'morning', wed: 'morning', thu: 'morning', fri: 'morning', sat: 'off',     sun: 'off' },
  2: { mon: 'morning', tue: 'evening', wed: 'morning', thu: 'evening', fri: 'morning', sat: 'off',     sun: 'off' },
  3: { mon: 'evening', tue: 'evening', wed: 'morning', thu: 'morning', fri: 'evening', sat: 'morning', sun: 'off' },
  4: { mon: 'morning', tue: 'morning', wed: 'evening', thu: 'evening', fri: 'morning', sat: 'off',     sun: 'off' },
  5: { mon: 'evening', tue: 'off',     wed: 'evening', thu: 'morning', fri: 'evening', sat: 'off',     sun: 'off' },
  6: { mon: 'off',     tue: 'off',     wed: 'off',     thu: 'off',     fri: 'off',     sat: 'off',     sun: 'off' },
  7: { mon: 'morning', tue: 'morning', wed: 'morning', thu: 'morning', fri: 'morning', sat: 'off',     sun: 'off' },
  8: { mon: 'off',     tue: 'morning', wed: 'off',     thu: 'morning', fri: 'off',     sat: 'morning', sun: 'off' },
};

const shiftTypes = {
  morning:  { label: '06:00–14:00', class: 'shift-morning', name: 'Morning'  },
  evening:  { label: '14:00–22:00', class: 'shift-evening', name: 'Evening'  },
  night:    { label: '22:00–06:00', class: 'shift-night',   name: 'Night'    },
  off:      { label: 'Off',          class: 'shift-off',     name: 'Off'      },
};

// ---- Navigation ----
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.section;
      if (!target) return;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      sections.forEach(s => {
        s.classList.toggle('active', s.id === target);
      });

      // Update breadcrumb
      const breadcrumb = document.querySelector('.breadcrumb span');
      if (breadcrumb) breadcrumb.textContent = item.querySelector('.nav-label-text, .nav-text')?.textContent || item.textContent.trim();

      // Close mobile sidebar
      closeSidebar();

      // Scroll to top
      document.querySelector('.content')?.scrollTo(0, 0);
      window.scrollTo(0, 0);
    });
  });
}

// ---- Mobile Sidebar ----
function initMobileSidebar() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');

  if (toggle) toggle.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    backdrop?.classList.toggle('show');
  });

  if (backdrop) backdrop.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-backdrop')?.classList.remove('show');
}

// ---- Toast ----
function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<span class="toast-icon">${icon}</span> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- Dashboard Charts ----
function renderDashboardCharts() {
  // Weekly attendance bar chart
  const chartContainer = document.getElementById('attendance-chart');
  if (!chartContainer) return;

  const data = [
    { day: 'Mon', val: 92, color: 'var(--indigo-500)' },
    { day: 'Tue', val: 88, color: 'var(--indigo-500)' },
    { day: 'Wed', val: 95, color: 'var(--indigo-500)' },
    { day: 'Thu', val: 90, color: 'var(--indigo-500)' },
    { day: 'Fri', val: 85, color: 'var(--indigo-500)' },
    { day: 'Sat', val: 60, color: 'var(--teal-500)' },
    { day: 'Sun', val: 30, color: 'var(--teal-500)' },
  ];

  chartContainer.innerHTML = data.map(d => `
    <div class="chart-bar" style="height:${d.val}%; background:${d.color};" title="${d.day}: ${d.val}%">
      <span class="bar-value">${d.val}%</span>
      <span class="bar-label">${d.day}</span>
    </div>
  `).join('');
}

// ---- Time Clock ----
let clockedIn = false;
let clockInterval = null;

function initTimeClock() {
  const clockBtn = document.getElementById('clock-btn');
  if (!clockBtn) return;

  // Live clock display
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);

  clockBtn.addEventListener('click', () => {
    clockedIn = !clockedIn;
    if (clockedIn) {
      clockBtn.className = 'clock-btn clocked-in';
      clockBtn.innerHTML = '<span class="clock-btn-icon">⏹</span> Clock Out';
      showToast('Clocked in at ' + new Date().toLocaleTimeString());
    } else {
      clockBtn.className = 'clock-btn clocked-out';
      clockBtn.innerHTML = '<span class="clock-btn-icon">▶</span> Clock In';
      showToast('Clocked out at ' + new Date().toLocaleTimeString());
    }
  });
}

function updateClockDisplay() {
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');
  if (!timeEl) return;
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  if (dateEl) dateEl.textContent = now.toLocaleDateString('en-SG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ---- Kanban Board ----
function renderKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;

  const columns = [
    { id: 'todo',     title: 'To Do',         color: 'var(--slate-400)', items: tasks.filter(t => t.status === 'todo') },
    { id: 'progress', title: 'In Progress',   color: 'var(--blue-500)',  items: tasks.filter(t => t.status === 'progress') },
    { id: 'review',   title: 'In Review',     color: 'var(--amber-500)', items: tasks.filter(t => t.status === 'review') },
    { id: 'done',     title: 'Done',           color: 'var(--green-500)', items: tasks.filter(t => t.status === 'done') },
  ];

  board.innerHTML = columns.map(col => `
    <div class="kanban-col" data-col="${col.id}">
      <div class="kanban-col-header">
        <span class="col-dot" style="background:${col.color}"></span>
        ${col.title}
        <span class="col-count">${col.items.length}</span>
      </div>
      ${col.items.map(item => `
        <div class="kanban-card" draggable="true" data-id="${item.id}" data-status="${col.id}">
          <div class="kc-title">${item.title}</div>
          <div class="kc-meta">
            ${renderPriority(item.priority)}
            <span>📅 ${item.due}</span>
          </div>
          <div class="kc-meta" style="margin-top:6px;">
            ${item.tags.map(tag => `<span class="kc-tag" style="background:var(--slate-100);color:var(--navy-600)">${tag}</span>`).join('')}
            <span style="margin-left:auto;font-size:11px;color:var(--navy-500)">${item.assignee.split(' ').map(w=>w[0]).join('')}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  initKanbanDrag();
}

function renderPriority(p) {
  const colors = { high: 'var(--red-500)', medium: 'var(--amber-500)', low: 'var(--green-500)' };
  const labels = { high: '● High', medium: '● Medium', low: '● Low' };
  return `<span class="kc-priority" style="color:${colors[p]}">${labels[p]}</span>`;
}

function initKanbanDrag() {
  let draggedCard = null;

  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedCard = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      draggedCard = null;
    });
  });

  document.querySelectorAll('.kanban-col').forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    col.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!draggedCard) return;
      const targetCol = col.querySelector('.kanban-col-header');
      const dropZone = col.querySelector('.kanban-col-header').nextElementSibling;
      
      // Append to column
      col.appendChild(draggedCard);
      
      // Update count
      const count = col.querySelectorAll('.kanban-card').length;
      col.querySelector('.col-count').textContent = count;
      
      // Update old column count
      document.querySelectorAll('.kanban-col').forEach(c => {
        const n = c.querySelectorAll('.kanban-card').length;
        c.querySelector('.col-count').textContent = n;
      });

      showToast('Task moved to ' + targetCol.textContent.trim().replace(/\d+$/, ''));
    });
  });
}

// ---- Roster Grid ----
function renderRoster() {
  const grid = document.getElementById('roster-grid');
  if (!grid) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  let html = '<div class="roster-header">Employee</div>';
  days.forEach(d => { html += `<div class="roster-header">${d}</div>`; });

  employees.forEach(emp => {
    html += `
      <div class="roster-cell roster-emp">
        <div class="avatar-sm" style="background:${avatarGradient(emp.color)}">${emp.initials}</div>
        <span>${emp.name.split(' ').slice(-2).join(' ')}</span>
      </div>
    `;
    dayKeys.forEach(day => {
      const shift = shifts[emp.id]?.[day] || 'off';
      const st = shiftTypes[shift];
      html += `<div class="roster-cell"><span class="shift-badge ${st.class}" onclick="cycleShift(${emp.id}, '${day}', this)">${st.label}</span></div>`;
    });
  });

  grid.innerHTML = html;
}

function avatarGradient(color) {
  const gradients = {
    indigo: 'linear-gradient(135deg, var(--indigo-500), var(--indigo-400))',
    teal:   'linear-gradient(135deg, var(--teal-500), var(--teal-400))',
    purple: 'linear-gradient(135deg, var(--purple-500), var(--indigo-400))',
    blue:   'linear-gradient(135deg, var(--blue-500), var(--indigo-400))',
    pink:   'linear-gradient(135deg, var(--pink-500), var(--purple-500))',
    amber:  'linear-gradient(135deg, var(--amber-500), var(--pink-500))',
    green:  'linear-gradient(135deg, var(--green-500), var(--teal-500))',
  };
  return gradients[color] || gradients.indigo;
}

// Cycle through shift types on click
function cycleShift(empId, day, el) {
  const order = ['morning', 'evening', 'night', 'off'];
  const current = shifts[empId]?.[day] || 'off';
  const nextIdx = (order.indexOf(current) + 1) % order.length;
  const next = order[nextIdx];
  shifts[empId][day] = next;
  
  const st = shiftTypes[next];
  el.className = `shift-badge ${st.class}`;
  el.textContent = st.label;
  showToast(`Shift updated: ${st.name}`);
}

// ---- Org Chart ----
function renderOrgChart() {
  const container = document.getElementById('org-chart');
  if (!container) return;

  container.innerHTML = `
    <div class="org-tree">
      <!-- CEO/Director Level -->
      <div class="org-node ceo" onclick="showOrgDetail(1)">
        <div class="org-avatar" style="background:${avatarGradient('indigo')}">SC</div>
        <div class="org-name">Sarah Chen</div>
        <div class="org-title">Operations Director</div>
      </div>

      <!-- Managers Level -->
      <div class="org-children">
        <div class="org-branch">
          <div class="org-node manager" onclick="showOrgDetail(2)">
            <div class="org-avatar" style="background:${avatarGradient('teal')}">JO</div>
            <div class="org-name">James Okafor</div>
            <div class="org-title">Shift Supervisor</div>
          </div>
          <!-- Subordinates of James -->
          <div class="org-children">
            <div class="org-branch">
              <div class="org-node" onclick="showOrgDetail(4)">
                <div class="org-avatar" style="background:${avatarGradient('blue')}">DK</div>
                <div class="org-name">David Kim</div>
                <div class="org-title">Warehouse Operative</div>
              </div>
            </div>
            <div class="org-branch">
              <div class="org-node" onclick="showOrgDetail(6)">
                <div class="org-avatar" style="background:${avatarGradient('amber')}">TW</div>
                <div class="org-name">Tom Walker</div>
                <div class="org-title">Delivery Driver</div>
              </div>
            </div>
          </div>
        </div>

        <div class="org-branch">
          <div class="org-node manager" onclick="showOrgDetail(3)">
            <div class="org-avatar" style="background:${avatarGradient('purple')}">ML</div>
            <div class="org-name">Mei Ling Tan</div>
            <div class="org-title">Team Lead — Logistics</div>
          </div>
        </div>

        <div class="org-branch">
          <div class="org-node manager" onclick="showOrgDetail(7)">
            <div class="org-avatar" style="background:${avatarGradient('green')}">AR</div>
            <div class="org-name">Aisha Rahman</div>
            <div class="org-title">HR Coordinator</div>
          </div>
          <div class="org-children">
            <div class="org-branch">
              <div class="org-node" onclick="showOrgDetail(5)">
                <div class="org-avatar" style="background:${avatarGradient('pink')}">PS</div>
                <div class="org-name">Priya Sharma</div>
                <div class="org-title">Customer Service</div>
              </div>
            </div>
            <div class="org-branch">
              <div class="org-node" onclick="showOrgDetail(8)">
                <div class="org-avatar" style="background:${avatarGradient('blue')}">LM</div>
                <div class="org-name">Lucas Müller</div>
                <div class="org-title">IT Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showOrgDetail(empId) {
  const emp = employees.find(e => e.id === empId);
  if (!emp) return;
  showToast(`${emp.name} — ${emp.title}`);
}

// ---- Leave Management ----
function renderLeaveList() {
  const container = document.getElementById('leave-list');
  if (!container) return;

  container.innerHTML = leaveRequests.map(req => `
    <tr>
      <td><strong>${req.emp}</strong></td>
      <td>${req.type}</td>
      <td>${req.from} → ${req.to}</td>
      <td class="text-center">${req.days}</td>
      <td>${req.reason}</td>
      <td>
        ${req.status === 'pending'
          ? `<div class="flex gap-2">
              <button class="btn btn-sm btn-primary" onclick="approveLeave(${req.id})">✓ Approve</button>
              <button class="btn btn-sm btn-secondary" onclick="rejectLeave(${req.id})">✕ Reject</button>
            </div>`
          : `<span class="badge ${req.status === 'approved' ? 'badge-green' : 'badge-red'}">${req.status}</span>`
        }
      </td>
    </tr>
  `).join('');
}

function approveLeave(id) {
  const req = leaveRequests.find(r => r.id === id);
  if (req) { req.status = 'approved'; renderLeaveList(); renderLeaveCalendar(); showToast(`Leave approved for ${req.emp}`); }
}

function rejectLeave(id) {
  const req = leaveRequests.find(r => r.id === id);
  if (req) { req.status = 'rejected'; renderLeaveList(); renderLeaveCalendar(); showToast(`Leave rejected for ${req.emp}`, '✕'); }
}

function renderLeaveCalendar() {
  const container = document.getElementById('leave-calendar');
  if (!container) return;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // August 2026 starts on Saturday
  const firstDay = 6; // Saturday
  const daysInMonth = 31;
  const today = 20;

  let html = days.map(d => `<div class="cal-day-header">${d}</div>`).join('');

  // Empty cells before day 1
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="cal-day other-month"></div>';
  }

  // Days of August
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today;
    let pills = '';
    leaveRequests.forEach(req => {
      const fromDay = parseInt(req.from.split(' ')[1]);
      const toDay = parseInt(req.to.split(' ')[1]);
      if (d >= fromDay && d <= toDay) {
        const colorClass = req.status === 'approved' ? 'badge-green' : (req.status === 'pending' ? 'badge-amber' : 'badge-red');
        pills += `<span class="leave-pill ${colorClass}">${req.emp.split(' ')[0]}</span>`;
      }
    });
    html += `<div class="cal-day ${isToday ? 'today' : ''}"><div class="cal-date">${d}</div>${pills}</div>`;
  }

  container.innerHTML = html;
}

// ---- Employee Table ----
function renderEmployeeTable() {
  const tbody = document.getElementById('employee-tbody');
  if (!tbody) return;

  const roleLabels = { admin: 'Administrator', manager: 'Manager', employee: 'Employee' };
  const statusBadges = { active: 'badge-green', leave: 'badge-amber' };
  const statusLabels = { active: 'Active', leave: 'On Leave' };

  tbody.innerHTML = employees.map(emp => `
    <tr>
      <td>
        <div class="flex items-center gap-2">
          <div class="avatar-sm" style="width:32px;height:32px;border-radius:50%;background:${avatarGradient(emp.color)};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff">${emp.initials}</div>
          <div>
            <div style="font-weight:600">${emp.name}</div>
            <div class="text-xs text-muted">${emp.email}</div>
          </div>
        </div>
      </td>
      <td>${emp.title}</td>
      <td>${emp.dept}</td>
      <td>${emp.phone}</td>
      <td><span class="badge ${statusBadges[emp.status]}">${statusLabels[emp.status]}</span></td>
      <td><span class="badge badge-indigo">${roleLabels[emp.role]}</span></td>
    </tr>
  `).join('');
}

// ---- Login Tabs ----
function initLoginTabs() {
  const tabs = document.querySelectorAll('.login-tab');
  const panels = document.querySelectorAll('.login-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === tab.dataset.tab));
    });
  });

  // Auth method toggle
  const methodBtns = document.querySelectorAll('.auth-method-btn');
  methodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      methodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Demo login button
  const loginBtn = document.getElementById('demo-login');
  if (loginBtn) loginBtn.addEventListener('click', () => {
    showToast('Demo mode: Navigating to dashboard…');
    setTimeout(() => {
      document.querySelector('[data-section="dashboard"]')?.click();
    }, 800);
  });
}

// ---- Backlog Milestones ----
function initBacklogFilters() {
  const filters = document.querySelectorAll('.backlog-filter');
  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const target = f.dataset.filter;
      document.querySelectorAll('.milestone-card').forEach(card => {
        card.style.display = (!target || card.dataset.milestone === target) ? '' : 'none';
      });
    });
  });
}

// ---- Tab System (for sub-tabs) ----
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        const panels = tabGroup.parentElement.querySelectorAll('.tab-panel');
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
      });
    });
  });
}

// ---- Mobile Preview ----
function initMobilePreview() {
  const btn = document.getElementById('show-mobile');
  const overlay = document.getElementById('mobile-overlay');
  if (btn) btn.addEventListener('click', () => overlay?.classList.add('show'));
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('show');
  });
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
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
  initTabs();
  initMobilePreview();

  // Set current date in topbar
  const dateEl = document.getElementById('current-date');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-SG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  // Hash-based deep linking (for screenshots & sharing)
  if (window.location.hash) {
    const target = window.location.hash.substring(1);
    const navItem = document.querySelector(`.nav-item[data-section="${target}"]`);
    if (navItem) navItem.click();
  }
});
