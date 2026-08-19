# System Architecture

## Overview

WorkForce Pro uses a **three-tier architecture** with a shared API backend, single-codebase frontend, and self-hosted database. No external identity providers are required.

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │  Web App │  │ iOS App  │  │Android   │                   │
│  │(Chrome/  │  │(Expo)    │  │App(Expo) │                   │
│  │ Edge)    │  │          │  │          │                   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                   │
│       └──────────────┼──────────────┘                        │
│              HTTPS / WSS (TLS 1.3)                           │
└──────────────────────┼──────────────────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────────────────┐
│                 API LAYER                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Nginx   │→ │   Auth   │  │  Core    │  │Notify    │   │
│  │  Proxy   │  │ Service  │  │  API     │  │Service   │   │
│  │(TLS term)│  │(JWT/bcrypt)│(Express) │  │(Push/Email)│  │
│  └──────────┘  └──────────┘  └────┬─────┘  └──────────┘   │
│                                   │ Prisma ORM              │
└───────────────────────────────────┼────────────────────────┘
                                    │
┌───────────────────────────────────┼────────────────────────┐
│                 DATA LAYER                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │PostgreSQL│  │  SQLite  │  │  Redis   │  │  File    │   │
│  │  (primary)│  │(offline)│  │ (sessions)│  │ Storage  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Components

### 1. Client Layer

| Component | Technology | Target |
|-----------|-----------|--------|
| Web App | React Native Web | Chrome/Edge on Windows 10+ |
| iOS App | React Native (Expo) | iOS 15+ |
| Android App | React Native (Expo) | Android 8+ |

All three targets compile from a **single TypeScript codebase** using Expo SDK 51. Platform-specific code is isolated using `Platform.select()` and conditional imports.

### 2. API Layer

#### Nginx Reverse Proxy
- Terminates TLS (Let's Encrypt certificates)
- Routes `/api/*` to the Node.js API server
- Serves static web assets from `/var/www/workforce-pro`
- WebSocket proxy for real-time updates (`/ws`)

#### Auth Service
- **JWT Issue/Verify**: Access tokens (15-min TTL), refresh tokens (7-day TTL)
- **bcrypt**: Password hashing with cost factor 12
- **Device Tokens**: Trusted-device registration for kiosk/shared-device login
- **Rate Limiting**: 5 failed login attempts → 15-minute lockout
- **OTP Verification**: 6-digit codes via SMS gateway or email

#### Core API (Express + TypeScript)
- RESTful endpoints with `/api/v1/` versioning
- Role-based middleware: `requireRole('admin')`, `requireRole('manager')`
- Prisma ORM for database access (parameterised queries — SQL injection safe)
- WebSocket server for real-time updates (clock-in events, task changes, notifications)
- Background job queue (BullMQ) for scheduled tasks (roster publishing, reminders)

#### Notification Service
- Push notifications via Expo Notifications API
- Email notifications via SMTP (nodemailer)
- SMS notifications via gateway API (Twilio/Vonage)
- Background worker processes (BullMQ + Redis)

### 3. Data Layer

| Component | Purpose |
|-----------|---------|
| PostgreSQL 16 | Primary database — employees, shifts, tasks, leave, time entries |
| SQLite | Local cache on mobile devices for offline clock-in/out |
| Redis 7 | Session cache (refresh tokens), job queue, rate limiting counters |
| File Storage | Employee avatars, documents (local filesystem or S3-compatible) |

## API Design

### Authentication Endpoints

```
POST   /api/v1/auth/register        # Sign up (email or phone)
POST   /api/v1/auth/verify-otp       # Verify OTP code
POST   /api/v1/auth/login            # Sign in (email/phone + password)
POST   /api/v1/auth/refresh          # Refresh JWT access token
POST   /api/v1/auth/logout           # Revoke session
POST   /api/v1/auth/device/register  # Register trusted device
POST   /api/v1/auth/device/revoke    # Revoke device token
POST   /api/v1/auth/2fa/setup        # Enable TOTP 2FA
POST   /api/v1/auth/2fa/verify       # Verify TOTP code
```

### Employee Endpoints

```
GET    /api/v1/employees             # List (paginated, filterable)
GET    /api/v1/employees/:id        # Detail
POST   /api/v1/employees             # Create (admin only)
PUT    /api/v1/employees/:id         # Update
PATCH  /api/v1/employees/:id/status  # Activate/deactivate
GET    /api/v1/employees/:id/balances # Leave balances
```

### Shift Endpoints

```
GET    /api/v1/shifts                # By week/month/employee
POST   /api/v1/shifts                # Assign shift
PUT    /api/v1/shifts/:id            # Modify shift
DELETE /api/v1/shifts/:id            # Remove shift
POST   /api/v1/shifts/publish         # Publish roster (sends notifications)
POST   /api/v1/shifts/swap            # Request shift swap
PUT    /api/v1/shifts/swap/:id        # Approve/reject swap
```

### Time Tracking Endpoints

```
POST   /api/v1/timesheet/clock-in    # Clock in (with geo + device)
POST   /api/v1/timesheet/clock-out   # Clock out
GET    /api/v1/timesheet/:empId       # Get timesheet
GET    /api/v1/timesheet/:empId/week  # Weekly timesheet
GET    /api/v1/timesheet/export       # Export CSV/PDF
```

### Task Endpoints

```
GET    /api/v1/tasks                  # By assignee/status/tag
POST   /api/v1/tasks                  # Create task
PUT    /api/v1/tasks/:id              # Update (status, assignee, etc.)
PUT    /api/v1/tasks/:id/status       # Move status (Kanban drag)
DELETE /api/v1/tasks/:id              # Delete task
PUT    /api/v1/tasks/reorder          # Reorder within column
```

### Leave Endpoints

```
GET    /api/v1/leave                  # List (filter by employee/status)
POST   /api/v1/leave                  # Submit request
PUT    /api/v1/leave/:id/approve      # Approve (manager/admin)
PUT    /api/v1/leave/:id/reject       # Reject (manager/admin)
GET    /api/v1/leave/calendar         # Calendar view data
GET    /api/v1/leave/balances         # All balances (admin)
```

### Org Chart Endpoints

```
GET    /api/v1/org/tree               # Full hierarchy tree
GET    /api/v1/org/department/:id     # Department subtree
PUT    /api/v1/org/manager            # Change employee's manager
```

## Request Flow Example — Clock In

```
1. Employee taps "Clock In" on mobile app
   POST /api/v1/timesheet/clock-in
   Headers: { Authorization: "Bearer eyJhbG..." }
   Body: { employeeId: 4, timestamp: "2026-08-20T06:00:12Z",
           device: "iPhone-AB12", geo: { lat: 1.352, lng: 103.819 } }

2. Auth middleware verifies JWT → extracts userId, role
   → JWT verified, userId=4, role="employee"

3. Permission check: can this user clock in for employeeId=4?
   → Yes (self-service) or Admin/Manager override

4. Core API writes to PostgreSQL via Prisma
   INSERT INTO time_entries (employee_id, clock_in, device_id, geo_lat, geo_lng)
   VALUES (4, '2026-08-20T06:00:12Z', 'iPhone-AB12', 1.352, 103.819)

5. WebSocket push to admin dashboard
   WS → { event: "clock_in", employeeId: 4, name: "David Kim" }

6. Response to client
   200 OK { success: true, entryId: 1042, message: "Clocked in at 06:00" }
```

## Architectural Principles

1. **Single Codebase, Three Targets** — React Native with Expo compiles to native iOS, native Android, and web. One team, one codebase, one set of features.

2. **Stateful Auth, Stateless API** — JWT access tokens (15-min TTL) + refresh tokens (7-day TTL, stored in Redis). Device tokens allow trusted-device login without repeated password entry.

3. **Offline-First Mobile** — SQLite local cache on mobile devices. Clock-in/out works offline; data syncs when connectivity returns. Critical for warehouse/delivery staff.

4. **Horizontal Scalability** — Stateless API containers behind Nginx. Redis for shared session state. PostgreSQL with read replicas if needed. Docker Compose for single-server, Kubernetes for multi-node.

5. **Self-Hosted, No Vendor Lock-in** — Entire stack runs on a single Windows or Linux server. No cloud subscription required. All data stays on-premises.
