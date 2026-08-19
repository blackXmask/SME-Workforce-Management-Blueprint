# Data Model — Entity Relationship Diagram

## Overview

The database consists of **8 core tables** with foreign key relationships enforcing referential integrity. The schema is managed via Prisma migrations and designed for PostgreSQL 16 (with SQLite compatibility for small/offline deployments).

## ERD Diagram

```
┌─────────────────────┐       ┌─────────────────────┐
│    departments       │       │     employees        │
│─────────────────────│       │─────────────────────│
│ id          UUID PK  │◄──┐  │ id           UUID PK │
│ name        VARCHAR  │   │  │ manager_id   UUID FK │─┐
│ head_id     UUID FK ──┼───┼──│ department_id UUID FK│ │
│ parent_id   UUID FK  │   │  │ full_name    VARCHAR │ │
│ description TEXT     │   └──│ email        VARCHAR │ │
└─────────────────────┘      │ │ phone        VARCHAR │ │
                              │ │ password_hash VARCHAR│ │
                              │ │ title        VARCHAR │ │
┌─────────────────────┐      │ │ role         ENUM   │ │
│      shifts          │      │ │ device_token VARCHAR │ │
│─────────────────────│      │ │ avatar_url   VARCHAR│ │
│ id          UUID PK  │      │ │ status       ENUM   │ │
│ employee_id UUID FK ──┼──────│ created_at   TIMESTAMPTZ│ │
│ date        DATE     │      └─────────────────────┘ │ │
│ shift_type  ENUM     │              │  │             │ │
│ start_time  TIME     │              │  │             │ │
│ end_time    TIME     │              │  │             │ │
│ break_minutes INT    │              │  │             │ │
│ created_by  UUID FK ──┼──────────────┘  │             │ │
│ published   BOOLEAN  │                 │             │ │
└─────────────────────┘                 │             │ │
                                        │             │ │
┌─────────────────────┐                 │             │ │
│   time_entries       │                 │             │ │
│─────────────────────│                 │             │ │
│ id          UUID PK  │                 │             │ │
│ employee_id UUID FK ──┼─────────────────┘             │ │
│ shift_id    UUID FK ──┼── (to shifts)                │ │
│ clock_in    TIMESTAMPTZ│                              │ │
│ clock_out   TIMESTAMPTZ│                              │ │
│ duration_min INT      │                              │ │
│ device_id   VARCHAR   │                              │ │
│ geo_lat     DECIMAL   │                              │ │
│ geo_lng     DECIMAL   │                              │ │
└─────────────────────┘                                │ │
                                                       │ │
┌─────────────────────┐                                │ │
│      tasks           │                                │ │
│─────────────────────│                                │ │
│ id          UUID PK  │                                │ │
│ assignee_id UUID FK ──┼────────────────────────────────┘ │
│ created_by  UUID FK ──┼──────────────────────────────────┘
│ title       VARCHAR  │
│ description TEXT     │
│ status      ENUM     │
│ priority    ENUM     │
│ due_date    DATE     │
│ tags        TEXT[]    │
│ sort_order  INT       │
└─────────────────────┘

┌─────────────────────┐       ┌─────────────────────┐
│  leave_requests      │       │  leave_balances     │
│─────────────────────│       │─────────────────────│
│ id          UUID PK  │       │ id          UUID PK  │
│ employee_id UUID FK ──┼───┐  │ employee_id UUID FK ──┼───┐
│ approved_by UUID FK ──┼───┤  │ leave_type  ENUM     │   │
│ leave_type  ENUM     │   │  │ entitled_days DECIMAL │   │
│ start_date  DATE      │   │  │ used_days   DECIMAL   │   │
│ end_date    DATE      │   │  │ year        INT       │   │
│ days        DECIMAL   │   │  └─────────────────────┘   │
│ reason      TEXT      │   │                            │
│ status      ENUM      │   │                            │
│ conflict_flag BOOLEAN│   │                            │
└─────────────────────┘   │                            │
                          │                            │
┌─────────────────────┐   │                            │
│  trusted_devices     │   │                            │
│─────────────────────│   │                            │
│ id           UUID PK  │   │                            │
│ employee_id  UUID FK ──┼───┘                            │
│ device_token VARCHAR  │                                │
│ platform     ENUM     │                                │
│ device_name  VARCHAR  │                                │
│ last_seen    TIMESTAMPTZ│                               │
│ revoked      BOOLEAN  │                                │
└─────────────────────┘                                │
                                                        │
                    ┌──────────────────────────────────┘
                    │ All FKs point to employees.id
                    └────────────────────────────────────
```

## Table Definitions

### 1. employees

The central table — every user in the system has a record here.

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK, auto-generated | Unique identifier |
| manager_id | UUID | FK → employees.id, nullable | Self-referential — enables org chart |
| full_name | VARCHAR(100) | NOT NULL | Employee's display name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login identifier (if email auth) |
| phone | VARCHAR(20) | nullable | Login identifier (if phone auth) |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hash (cost 12) |
| title | VARCHAR(100) | nullable | Job title (e.g., "Shift Supervisor") |
| department_id | UUID | FK → departments.id | Department assignment |
| role | ENUM | NOT NULL, DEFAULT 'employee' | 'admin' \| 'manager' \| 'employee' |
| device_token | VARCHAR(255) | nullable | Trusted device token |
| avatar_url | VARCHAR(500) | nullable | Profile photo URL |
| status | ENUM | NOT NULL, DEFAULT 'active' | 'active' \| 'on_leave' \| 'inactive' |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Account creation timestamp |

**Indexes**: `email (UNIQUE)`, `manager_id`, `department_id`, `status`

### 2. departments

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| name | VARCHAR(100) | NOT NULL | Department name |
| head_id | UUID | FK → employees.id | Department head |
| parent_id | UUID | FK → departments.id, nullable | Self-referential for sub-departments |
| description | TEXT | nullable | Optional description |

### 3. shifts

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| employee_id | UUID | FK → employees.id | Assigned employee |
| date | DATE | NOT NULL | Shift date |
| shift_type | ENUM | NOT NULL | 'morning' \| 'evening' \| 'night' \| 'custom' |
| start_time | TIME | NOT NULL | Shift start |
| end_time | TIME | NOT NULL | Shift end |
| break_minutes | INT | DEFAULT 30 | Break duration |
| created_by | UUID | FK → employees.id | Admin/manager who created |
| published | BOOLEAN | DEFAULT false | Whether roster is published |

**Indexes**: `(employee_id, date)`, `(date, shift_type)`, `published`

### 4. time_entries

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| employee_id | UUID | FK → employees.id | Employee |
| shift_id | UUID | FK → shifts.id, nullable | Linked shift (optional) |
| clock_in | TIMESTAMPTZ | NOT NULL | Clock-in timestamp |
| clock_out | TIMESTAMPTZ | nullable | Clock-out timestamp (null = still working) |
| duration_min | INT | nullable | Auto-calculated duration |
| device_id | VARCHAR(100) | nullable | Device used for clock-in |
| geo_lat | DECIMAL(10,6) | nullable | GPS latitude |
| geo_lng | DECIMAL(10,6) | nullable | GPS longitude |

**Indexes**: `(employee_id, clock_in)`, `(shift_id)`

### 5. tasks

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| assignee_id | UUID | FK → employees.id | Assigned employee |
| created_by | UUID | FK → employees.id | Task creator |
| title | VARCHAR(200) | NOT NULL | Task title |
| description | TEXT | nullable | Detailed description |
| status | ENUM | DEFAULT 'todo' | 'todo' \| 'progress' \| 'review' \| 'done' |
| priority | ENUM | DEFAULT 'medium' | 'low' \| 'medium' \| 'high' |
| due_date | DATE | nullable | Due date |
| tags | TEXT[] | DEFAULT '{}' | Array of tags |
| sort_order | INT | DEFAULT 0 | Order within Kanban column |

**Indexes**: `(assignee_id, status)`, `(status, sort_order)`, `(due_date)`

### 6. leave_requests

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| employee_id | UUID | FK → employees.id | Requesting employee |
| approved_by | UUID | FK → employees.id, nullable | Approving manager |
| leave_type | ENUM | NOT NULL | 'annual' \| 'medical' \| 'compassionate' \| 'training' \| 'unpaid' |
| start_date | DATE | NOT NULL | Leave start |
| end_date | DATE | NOT NULL | Leave end |
| days | DECIMAL(4,1) | NOT NULL | Number of days (supports half-days) |
| reason | TEXT | nullable | Reason for leave |
| status | ENUM | DEFAULT 'pending' | 'pending' \| 'approved' \| 'rejected' |
| conflict_flag | BOOLEAN | DEFAULT false | Roster conflict detected |

**Indexes**: `(employee_id, status)`, `(status, start_date)`, `(start_date, end_date)`

### 7. leave_balances

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| employee_id | UUID | FK → employees.id | Employee |
| leave_type | ENUM | NOT NULL | Same as leave_requests.leave_type |
| entitled_days | DECIMAL(5,1) | NOT NULL | Annual entitlement |
| used_days | DECIMAL(5,1) | DEFAULT 0 | Days used |
| year | INT | NOT NULL | Balance year |

**Unique constraint**: `(employee_id, leave_type, year)`

### 8. trusted_devices

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | Unique identifier |
| employee_id | UUID | FK → employees.id | Owning employee |
| device_token | VARCHAR(255) | UNIQUE, NOT NULL | Authentication token |
| platform | ENUM | NOT NULL | 'ios' \| 'android' \| 'web' \| 'kiosk' |
| device_name | VARCHAR(100) | nullable | Human-readable name |
| last_seen | TIMESTAMPTZ | nullable | Last authentication |
| revoked | BOOLEAN | DEFAULT false | Revoked by admin |

**Indexes**: `(employee_id, revoked)`, `device_token (UNIQUE)`

## Key Relationships

```
employees ──┬── manager_id → employees (self-referential, org chart)
            ├── department_id → departments
            ├── shifts (1:N)
            ├── time_entries (1:N)
            ├── tasks (1:N as assignee, 1:N as creator)
            ├── leave_requests (1:N as requester, 1:N as approver)
            ├── leave_balances (1:N)
            └── trusted_devices (1:N)

departments ──┬── head_id → employees
              └── parent_id → departments (self-referential)

shifts ──── time_entries (1:N, optional link)
```

## Prisma Schema (Excerpt)

```prisma
model Employee {
  id            String    @id @default(uuid())
  managerId     String?   @map("manager_id")
  manager       Employee? @relation("ManagerSubordinates", fields: [managerId], references: [id])
  subordinates  Employee[] @relation("ManagerSubordinates")
  fullName      String    @map("full_name")
  email         String    @unique
  phone         String?
  passwordHash  String    @map("password_hash")
  title         String?
  departmentId  String?   @map("department_id")
  department    Department? @relation(fields: [departmentId], references: [id])
  role          Role      @default(EMPLOYEE)
  deviceToken   String?   @map("device_token")
  avatarUrl     String?   @map("avatar_url")
  status        EmployeeStatus @default(ACTIVE)
  createdAt     DateTime  @default(now()) @map("created_at")

  shifts        Shift[]
  timeEntries   TimeEntry[]
  tasksAssigned Task[]    @relation("TaskAssignee")
  tasksCreated  Task[]    @relation("TaskCreator")
  leaveRequests LeaveRequest[] @relation("LeaveRequester")
  leaveApproved LeaveRequest[] @relation("LeaveApprover")
  leaveBalances LeaveBalance[]
  trustedDevices TrustedDevice[]

  @@map("employees")
}
```
