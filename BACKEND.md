# CareerVault Backend Architecture & Models

**Version:** 1.0  
**Runtime:** Node.js (ES Modules)  
**Framework:** Express.js  
**Database:** PostgreSQL 16+ / Supabase PostgreSQL (`pg` driver)  
**Authentication:** Dual-Token JWT (Access Token + Hashed Refresh Token)  
**Architecture Pattern:** N-Tier / Layered Architecture (Routes -> Middleware -> Controllers -> Services -> Repositories -> DB)  
**Last Updated:** September 2026  

---

## 1. Architectural Patterns & Core Principles

The **CareerVault Backend** provides a RESTful web API for managing user accounts, sessions, dynamic career assets, tags, search queries, and audit logs.

### Core Architecture Highlights:
- **Strict Layered Separation (N-Tier):** Clear isolation of concerns ensures code readability, easy unit testing, and maintainability:
  1. **HTTP / Routing Layer (`routes/`):** Express routers mapping endpoints and attaching middleware.
  2. **Middleware Layer (`middleware/`):** Request validation, CORS, security header injection, and JWT token authentication.
  3. **Controller Layer (`controllers/`):** HTTP request extraction, status code handling, and response formatting.
  4. **Service Layer (`services/`):** Core business logic, password hashing, token generation, and schema validation.
  5. **Repository Layer (`repositories/`):** Data Access Layer (DAL) executing parameterized SQL queries using `pg`.
- **Dynamic JSONB Schema Model:** Career assets (Projects, Work Experience, Skills, Achievements, Research, Resume Assets) store dynamic properties inside a PostgreSQL `JSONB` column (`values`), validated against schema definitions imported from `/shared/schemas`.
- **Dual-Token Authentication Architecture:** Stateless short-lived JWT access tokens (15-minute expiration) paired with server-persisted, hashed refresh tokens stored in the `sessions` table (7-day expiration).
- **Audit Logging:** Crucial user actions (`REGISTER`, `LOGIN`, `CREATE_ASSET`, `DELETE_ASSET`, `UPDATE_ASSET`) log an immutable record to the `audit_logs` table.

---

## 2. Technology Stack & Key Dependencies

| Dependency | Purpose & Usage |
| :--- | :--- |
| **Node.js (ES Modules)** | JavaScript runtime executing backend modules with native `import`/`export` syntax |
| **Express.js v4** | Lightweight REST web framework for routing, middleware, and request handling |
| **`pg` (node-postgres)** | Native PostgreSQL client library providing connection pooling (`Pool`) |
| **`jsonwebtoken`** | Creation and verification of signed JWT access tokens |
| **`bcrypt`** | Password hashing with 12 salt rounds; refresh token hashing with 10 salt rounds |
| **`helmet`** | HTTP header security middleware (HSTS, X-Content-Type-Options, Frameguard) |
| **`cors`** | Configured cross-origin resource sharing for production frontend domains |
| **`dotenv`** | Environment variable management across local and production setups |

---

## 3. High-Level Backend Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             HTTP Request (Client)                           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Express Application (server.js)                    │
│   ├── Security Middleware: helmet(), cors(), express.json()                 │
│   └── Route Mounting (/api/v1/auth, /api/v1/assets, etc.)                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Middleware Layer (middleware/)                    │
│   └── auth.middleware.js: Validate Authorization Header & Verify JWT Token  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Controller Layer (controllers/)                    │
│   asset.controller | auth.controller | user.controller | session.controller │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Service Layer (services/)                       │
│   asset.service | auth.service | user.service | session.service            │
│   └── Validate JSON payloads against /shared/schemas definitions            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Repository Layer (repositories/)                    │
│   asset.repository | user.repository | session.repository | audit.repository │
│   └── Execute SQL via parameterized pool queries ($1, $2, ...)              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Database Layer (PostgreSQL / Supabase)                 │
│   Tables: users | sessions | assets | tags | asset_tags | audit_logs          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Directory Structure & Layer Mapping

```
server/
├── src/
│   ├── controllers/            # HTTP Request Handlers
│   │   ├── asset.controller.js
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── search.controller.js
│   │   ├── session.controller.js
│   │   ├── tag.controller.js
│   │   └── user.controller.js
│   ├── db/                     # Database Connection Pool
│   │   └── index.js            # `pg` Pool initialization
│   ├── middleware/             # Middleware functions
│   │   └── auth.middleware.js  # JWT authentication verification
│   ├── repositories/           # Data Access Layer (SQL Queries)
│   │   ├── asset.repository.js
│   │   ├── audit.repository.js
│   │   ├── dashboard.repository.js
│   │   ├── search.repository.js
│   │   ├── session.repository.js
│   │   ├── tag.repository.js
│   │   └── user.repository.js
│   ├── routes/                 # Express API Endpoint Routes
│   │   ├── asset.routes.js
│   │   ├── auth.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── search.routes.js
│   │   ├── session.routes.js
│   │   ├── tag.routes.js
│   │   └── user.routes.js
│   ├── services/               # Business Logic & Validation
│   │   ├── asset.service.js
│   │   ├── auth.service.js
│   │   ├── session.service.js
│   │   └── user.service.js
│   └── server.js               # Entry point & Express application setup
├── .env                        # Environment variables (Database URL, JWT Secret)
├── vercel.json                 # Vercel serverless deployment config
└── package.json
```

---

## 5. Database Schema & Entity Relational Models

The relational database model is designed for PostgreSQL 16+. It balances strict relational normalization for identity, security, and tags with dynamic JSONB document storage for career assets.

```
                              ┌────────────────┐
                              │     users      │
                              ├────────────────┤
                              │ id (PK)        │◄────────────┐
                              │ username       │             │
                              │ email          │             │
                              │ password_hash  │             │
                              └───────┬────────┘             │
                                      │ 1                    │
            ┌─────────────────────────┼──────────────────────┼─────────────────────────┐
            │ 1..N                    │ 1..N                 │ 1..N                    │ 1..N
            ▼                         ▼                      ▼                         ▼
   ┌────────────────┐        ┌────────────────┐     ┌────────────────┐        ┌────────────────┐
   │    sessions    │        │     assets     │     │      tags      │        │   audit_logs   │
   ├────────────────┤        ├────────────────┤     ├────────────────┤        ├────────────────┤
   │ id (PK)        │        │ id (PK)        │     │ id (PK)        │        │ id (PK)        │
   │ user_id (FK)   │        │ user_id (FK)   │     │ user_id (FK)   │        │ user_id (FK)   │
   │ refresh_token  │        │ asset_type     │     │ name           │        │ action         │
   │ expires_at     │        │ title          │     │ color          │        │ entity_type    │
   └────────────────┘        │ values (JSONB) │     └───────┬────────┘        │ entity_id      │
                             └───────┬────────┘             │ 1               └────────────────┘
                                     │ 1                    │
                                     │                      │
                                     │     ┌──────────┐     │
                                     └────►│asset_tags│◄────┘
                                       1..N├──────────┤1..N
                                           │asset_id  │
                                           │tag_id    │
                                           └──────────┘
```

### 1. `users` Table
Stores user registration data, credentials, and OAuth identity links.
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT, -- Nullable for OAuth-only accounts
    auth_provider VARCHAR(30) NOT NULL, -- 'LOCAL', 'GOOGLE', 'GITHUB'
    google_id TEXT,
    github_id TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. `sessions` Table
Manages active user sessions and hashed refresh tokens for multi-device login support.
```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,
    device_name TEXT,
    ip_address TEXT,
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. `assets` Table
Primary entity storing dynamic career data. Core metadata is indexed in standard columns, while domain-specific key-value pairs live in the `values` JSONB column.
```sql
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_type VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    values JSONB NOT NULL DEFAULT '{}'::jsonb,
    favorite BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 4. `tags` & `asset_tags` Tables
Allows users to create custom tags and attach them to any asset.
```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20),
    UNIQUE (user_id, name)
);

CREATE TABLE asset_tags (
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (asset_id, tag_id)
);
```

### 5. `audit_logs` Table
Immutable log recording account and data modifications for compliance and security auditing.
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Shared Schemas & Dynamic JSONB Asset Models

All dynamic asset payloads passed into the `values` JSONB field are defined in `/shared/schemas` and validated by `asset.service.js`.

### 1. `PROJECT` Schema
- **Target Category:** Software development projects, open-source repositories, case studies.
- **Fields:**
  - `summary` (string, required): Short one-line summary
  - `description` (string): Detailed markdown description
  - `techStack` (string array): List of technologies used
  - `github` (URL): Repository link
  - `liveDemo` (URL): Deployment link
  - `role` (string): User's role on the project

### 2. `WORK_EXPERIENCE` Schema
- **Target Category:** Professional work experience, internships, contracts.
- **Fields:**
  - `company` (string, required): Organization name
  - `role` (string, required): Job title
  - `location` (string): Geographic or remote location
  - `startDate` (string): Start date
  - `endDate` (string): End date (null if current)
  - `current` (boolean): Flag indicating current position
  - `bullets` (string array): Bullet points detailing achievements
  - `techStack` (string array): Technologies used in role

### 3. `SKILL` Schema
- **Target Category:** Technical skills, soft skills, tools, languages.
- **Fields:**
  - `category` (string, required): Category label (e.g. "Languages", "Frameworks", "Cloud")
  - `name` (string, required): Name of the skill
  - `proficiency` (string): Proficiency level ("Beginner", "Intermediate", "Advanced", "Expert")
  - `yearsExperience` (number): Total years of experience

### 4. `ACHIEVEMENT` Schema
- **Target Category:** Certifications, awards, hackathon wins, honors.
- **Fields:**
  - `title` (string, required): Title of achievement or certification
  - `issuer` (string): Issuing organization
  - `date` (string): Issue/event date
  - `description` (string): Summary of achievement
  - `url` (URL): Verification link or credential URL

### 5. `RESEARCH` Schema
- **Target Category:** Academic research, journal publications, conference papers.
- **Fields:**
  - `title` (string, required): Paper or research title
  - `publication` (string): Journal or conference venue
  - `date` (string): Publication date
  - `doi` (string): DOI identifier or URL link
  - `abstract` (string): Abstract summary

### 6. `RESUME_ASSET` Schema
- **Target Category:** Dynamic text snippets for resumes, bio blurbs, cover letter blocks.
- **Fields:**
  - `section` (string, required): Target section (e.g., "Summary", "Leadership", "Cover Letter")
  - `heading` (string, required): Asset heading/identifier
  - `text` (string, required): Reusable paragraph text
  - `keyPoints` (string array): Key highlight points

---

## 7. REST API Endpoints Specification

### Authentication Routes (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register new user account | No |
| `POST` | `/login` | Authenticate user & issue access + refresh tokens | No |
| `POST` | `/refresh` | Request new access token using refresh token & sessionId | No |
| `POST` | `/logout` | Invalidate current user session | Yes |

### Asset Routes (`/api/v1/assets`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | List user assets (optional query filters: `type`, `favorite`, `archived`) | Yes |
| `POST` | `/` | Create new career asset (validated against schema) | Yes |
| `GET` | `/:id` | Fetch specific asset by ID | Yes |
| `PUT` | `/:id` | Update asset fields & dynamic JSONB values | Yes |
| `DELETE` | `/:id` | Delete asset | Yes |
| `PATCH` | `/:id/favorite` | Toggle favorite status | Yes |
| `PATCH` | `/:id/archive` | Toggle archive status | Yes |

### Dashboard & Analytics Routes (`/api/v1/dashboard`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/stats` | Fetch aggregate stats (counts per asset type, recent items, favorite counts) | Yes |

### Search Routes (`/api/v1/search`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Global full-text search across titles, values, and tags (`?q=query`) | Yes |

### User Profile & Session Routes (`/api/v1/profile`, `/api/v1/sessions`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/profile/me` | Fetch authenticated user profile details | Yes |
| `PUT` | `/profile/password` | Update user account password | Yes |
| `GET` | `/sessions` | List all active login sessions for current user | Yes |
| `DELETE` | `/sessions/:id` | Revoke a specific session | Yes |

---

## 8. Security & Data Protection Architecture

1. **SQL Injection Prevention:** All SQL statements in repository files use parameterized inputs (`$1`, `$2`, `$3`) executed via PostgreSQL client pools.
2. **Password & Token Security:**
   - Password hashes generated with `bcrypt` using **12 salt rounds**.
   - Refresh tokens hashed before insertion into the `sessions` table (`bcrypt` 10 rounds).
3. **CORS & Helmet Security:**
   - `helmet()` automatically enables security headers including XSS Protection, Frameguard, and HSTS.
   - Restrictive `cors()` policy ensuring origin control.
4. **Error Handling Envelope:**
   All API endpoints return standard JSON responses:
   ```json
   {
     "success": true,
     "message": "Asset created successfully",
     "data": { ... }
   }
   ```
   Or on failure:
   ```json
   {
     "success": false,
     "message": "Validation failed",
     "errors": [ { "field": "email", "message": "Email already in use" } ]
   }
   ```
