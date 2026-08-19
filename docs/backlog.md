# Feature Backlog — Prioritised Milestones

## Overview

The backlog is organised into **4 milestones**, each independently deployable. The system is usable after M1 (Foundation). Total estimated effort: **68 person-days** (≈ 8 weeks with 2 developers).

## Milestone 1: Foundation (Weeks 1–2)

**Priority**: Critical  
**Effort**: 13 days  
**Goal**: Stand up infrastructure, authentication, and basic app shell.

| # | Feature | Est. | Dependency | Status |
|---|---------|------|------------|--------|
| 1.1 | Project scaffolding — Expo + Express + Prisma | 2 days | None | ✅ Prototype |
| 1.2 | Database schema & migrations (PostgreSQL) | 2 days | 1.1 | ✅ Prototype |
| 1.3 | Auth: email/phone sign-up, OTP verification, JWT | 3 days | 1.2 | ✅ Prototype |
| 1.4 | Role-based access control (Admin/Manager/Employee) | 2 days | 1.3 | ✅ Prototype |
| 1.5 | Login screen (web + mobile) | 2 days | 1.3 | ✅ Prototype |
| 1.6 | Device registration & trusted-device auth | 2 days | 1.3 | ✅ Prototype |

**Deliverable**: Users can register, verify, log in, and have a role assigned. App shell renders on web, iOS, and Android.

---

## Milestone 2: Core Features (Weeks 3–4)

**Priority**: High  
**Effort**: 17 days  
**Goal**: Dashboard, employee management, task management, org chart.

| # | Feature | Est. | Dependency | Status |
|---|---------|------|------------|--------|
| 2.1 | Admin dashboard with live stats & charts | 3 days | M1 | ⬜ Ready |
| 2.2 | Employee CRUD — add, edit, deactivate | 2 days | M1 | ⬜ Ready |
| 2.3 | Employee directory with search & filter | 2 days | 2.2 | ⬜ Ready |
| 2.4 | Task management — Kanban board with drag-drop | 4 days | M1 | ⬜ Ready |
| 2.5 | Task assignment, priorities, tags, due dates | 2 days | 2.4 | ⬜ Ready |
| 2.6 | Organisation chart — auto-generated from manager_id | 3 days | 2.2 | ⬜ Ready |
| 2.7 | Department management | 1 day | 2.6 | ⬜ Ready |

**Deliverable**: Admin can manage employees, assign tasks, and view the org chart. Dashboard shows real-time stats.

---

## Milestone 3: Roster & Leave (Weeks 5–6)

**Priority**: High  
**Effort**: 20 days  
**Goal**: Shift scheduling, time tracking, and full leave management.

| # | Feature | Est. | Dependency | Status |
|---|---------|------|------------|--------|
| 3.1 | Shift scheduling — weekly roster grid | 4 days | M2 | ⬜ Blocked |
| 3.2 | Drag-and-drop shift assignment | 2 days | 3.1 | ⬜ Blocked |
| 3.3 | Roster publish & push notifications | 2 days | 3.1 | ⬜ Blocked |
| 3.4 | Time tracking — clock in/out with geo-location | 3 days | M1 | ⬜ Blocked |
| 3.5 | Timesheet view & CSV/PDF export | 2 days | 3.4 | ⬜ Blocked |
| 3.6 | Leave request submission (employee self-service) | 2 days | M1 | ⬜ Blocked |
| 3.7 | Leave approval workflow with conflict detection | 3 days | 3.6 + 3.1 | ⬜ Blocked |
| 3.8 | Leave balance tracking & auto-calculation | 2 days | 3.7 | ⬜ Blocked |
| 3.9 | Leave calendar view (month/week) | 2 days | 3.7 | ⬜ Blocked |

**Deliverable**: Full workforce management — shift scheduling, time tracking, and leave management with approval workflows.

---

## Milestone 4: Polish & Mobile (Weeks 7–8)

**Priority**: Medium  
**Effort**: 18 days  
**Goal**: Native mobile apps, offline support, reports, and production hardening.

| # | Feature | Est. | Dependency | Status |
|---|---------|------|------------|--------|
| 4.1 | Native iOS build via Expo EAS | 2 days | M1–M3 | ⬜ Blocked |
| 4.2 | Native Android build via Expo EAS | 1 day | 4.1 | ⬜ Blocked |
| 4.3 | Offline mode — SQLite cache for clock-in/out | 3 days | 3.4 | ⬜ Blocked |
| 4.4 | Push notifications (Expo Notifications) | 2 days | 4.1 | ⬜ Blocked |
| 4.5 | Reports & analytics dashboard | 3 days | M2–M3 | ⬜ Blocked |
| 4.6 | Audit log for admin actions | 2 days | M1 | ⬜ Blocked |
| 4.7 | 2FA — TOTP via authenticator app | 2 days | M1 | ⬜ Blocked |
| 4.8 | Docker Compose deployment package | 1 day | All | ⬜ Blocked |
| 4.9 | User acceptance testing & handover docs | 2 days | All | ⬜ Blocked |

**Deliverable**: Production-ready system with native mobile apps, offline support, and full deployment package.

---

## Summary

| Milestone | Timeline | Items | Effort | Deployable? |
|-----------|----------|-------|--------|-------------|
| M1: Foundation | Weeks 1–2 | 6 | 13 days | ✅ Auth + app shell |
| M2: Core Features | Weeks 3–4 | 7 | 17 days | ✅ Dashboard + tasks |
| M3: Roster & Leave | Weeks 5–6 | 9 | 20 days | ✅ Full workforce mgmt |
| M4: Polish & Mobile | Weeks 7–8 | 9 | 18 days | ✅ Production-ready |
| **Total** | **8 weeks** | **31** | **68 days** | |

### Acceptance Criteria Traceability

| Requirement | Milestone | Feature # |
|-------------|-----------|-----------|
| Employee scheduling | M3 | 3.1–3.3 |
| Time tracking | M3 | 3.4–3.5 |
| Task management | M2 | 2.4–2.5 |
| Organisation chart | M2 | 2.6–2.7 |
| Leave & roster handling | M3 | 3.6–3.9 |
| Cross-platform (web + mobile) | M1, M4 | 1.5, 4.1–4.2 |
| No AD/AAD dependency | M1 | 1.3–1.6 |
| Admin dashboard | M2 | 2.1 |
| Role-based permissions | M1 | 1.4 |
| Deployment guide | M4 | 4.8–4.9 |
