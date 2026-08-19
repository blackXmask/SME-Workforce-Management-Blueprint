# WorkForce Pro — SME Workforce Management Blueprint

> A complete, self-contained Workforce Management system for small-to-medium enterprises. No Active Directory, no Azure AD, no domain infrastructure required.

## 🎯 What Is This?

This repository contains a **complete blueprint** for a cross-platform workforce management system designed for SMEs that operate entirely without directory services. It includes:

- ✅ High-level architecture diagram (backend, database, auth flow)
- ✅ Interactive clickable prototype (web + mobile preview)
- ✅ Data model (ERD) covering employees, shifts, tasks, leave, and hierarchy
- ✅ Feature backlog with prioritised milestones
- ✅ Step-by-step deployment guide

## 🚀 Quick Start

### View the Interactive Prototype

1. Open `index.html` in Chrome or Edge (Windows 10+)
2. Use the sidebar to navigate between sections
3. Try the interactive elements:
   - **Roster Grid** — Click shift badges to cycle through Morning/Evening/Night/Off
   - **Kanban Board** — Drag task cards between columns
   - **Time Clock** — Click to clock in/out with a live timer
   - **Leave Management** — Approve or reject pending leave requests
   - **Mobile Preview** — Click the 📱 icon in the top bar

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React Native 0.74 + Expo SDK 51 | Single codebase → iOS, Android, Web |
| **Language** | TypeScript 5.4 | Type safety across frontend & backend |
| **Backend** | Node.js 20 LTS + Express 4.19 | RESTful API |
| **Database** | PostgreSQL 16 (or SQLite for <50 staff) | Relational data integrity |
| **ORM** | Prisma 5.x | Type-safe database access |
| **Auth** | JWT + bcrypt + Device Tokens | No AD/AAD dependency |
| **Cache** | Redis 7 | Session management, job queues |
| **Proxy** | Nginx | TLS termination, reverse proxy |
| **Deployment** | Docker Compose | Single-command deployment |

## 📁 Project Structure

```
sem-workflow-solution-mana/
├── index.html              # Interactive prototype & blueprint (open in browser)
├── css/
│   └── style.css           # Professional design system
├── js/
│   └── app.js              # Prototype logic & interactions
├── docs/
│   ├── architecture.md     # Detailed architecture & auth flow
│   ├── data-model.md       # Entity relationship diagram
│   ├── backlog.md          # Feature backlog with milestones
│   └── deployment.md       # Step-by-step deployment guide
└── README.md               # This file
```

## 🔑 Key Design Decisions

1. **Single Codebase** — React Native + Expo compiles to iOS, Android, and Web. One team, one codebase, full feature parity.
2. **Application-Native Auth** — Email, phone, or trusted-device authentication. No external identity provider.
3. **Three-Tier Roles** — Admin, Manager, Employee. Plain English permissions, no technical jargon.
4. **Offline-First Mobile** — SQLite local cache. Clock-in/out works offline; syncs when connectivity returns.
5. **Self-Hosted** — Entire stack runs on a single server. No cloud subscription required.

## 📋 Core Features

| Feature | Description |
|---------|------------|
| **Employee Scheduling** | Weekly roster grid with Morning/Evening/Night shifts. Drag-and-drop assignment. Publish & notify. |
| **Time Tracking** | Digital clock-in/out with geo-location. Timesheet views. CSV/PDF export. Offline support. |
| **Task Management** | Kanban board (To Do → In Progress → In Review → Done). Priorities, tags, due dates, assignees. |
| **Organisation Chart** | Auto-generated from manager_id relationships. Click nodes for employee details. |
| **Leave & Roster** | Self-service leave requests. Approval workflow with conflict detection. Leave balance tracking. Calendar view. |

## 🔒 Security Summary

- bcrypt password hashing (cost factor 12)
- JWT access tokens (15-min TTL) + refresh tokens (7-day TTL, Redis-backed)
- Rate limiting & account lockout (5 failed attempts)
- Optional 2FA via TOTP
- TLS 1.3 for all transport
- SQL injection protection (Prisma parameterised queries)
- Audit log for all admin actions

## 📊 Milestone Summary

| Milestone | Timeline | Items | Effort |
|-----------|----------|-------|--------|
| M1: Foundation | Weeks 1–2 | 6 | 13 days |
| M2: Core Features | Weeks 3–4 | 7 | 17 days |
| M3: Roster & Leave | Weeks 5–6 | 9 | 20 days |
| M4: Polish & Mobile | Weeks 7–8 | 9 | 18 days |
| **Total** | **8 weeks** | **31** | **68 days** |

## 📜 License

This blueprint is provided as a contest deliverable. All source files are included for review and deployment.

---

**WorkForce Pro** — *Workforce management without the complexity of directory services.*
