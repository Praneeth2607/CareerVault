# Architecture.md

# CareerVault System Architecture

**Version:** 1.0

**Status:** Approved

**Last Updated:** July 2026

---

# 1. Introduction

## Purpose

This document defines the complete technical architecture of CareerVault.

It serves as the reference for developers, architects, DevOps engineers, security reviewers, and AI coding agents. Every architectural decision described here prioritizes maintainability, security, scalability, and developer productivity.

---

# 2. High-Level Architecture

CareerVault follows a layered architecture.

```
┌─────────────────────────────┐
│         Web Browser         │
└──────────────┬──────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────┐
│ React + Vite Frontend       │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│ Express.js Backend          │
├─────────────────────────────┤
│ Authentication Layer        │
│ Validation Layer            │
│ Business Logic              │
│ Service Layer               │
└──────────────┬──────────────┘
               │
        PostgreSQL Driver
               │
               ▼
┌─────────────────────────────┐
│ PostgreSQL Database         │
└─────────────────────────────┘
```

---

# 3. Technology Stack

## Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* Axios
* React Hook Form
* Zod
* Lucide React

---

## Backend

* Node.js
* Express.js
* JWT
* Passport.js (OAuth)
* bcrypt
* PostgreSQL Driver (`pg`)
* Express Validator
* Helmet
* CORS

---

## Database

PostgreSQL

or

Supabase PostgreSQL

Both share the same schema.

---

## Deployment

Frontend

* Vercel or Nginx

Backend

* Docker
* VPS
* Railway
* Render

Database

* PostgreSQL
* Supabase

---

# 4. Architectural Principles

CareerVault follows these principles:

* Separation of concerns
* Stateless API design
* Secure by default
* Modular architecture
* Feature-first organization
* Reusable components
* Minimal coupling
* High cohesion

---

# 5. System Components

## Client

Responsibilities

* Rendering UI
* Routing
* Form validation
* State management
* API communication
* Session handling

---

## API Server

Responsibilities

* Authentication
* Authorization
* Business logic
* Validation
* Database access
* Audit logging
* Rate limiting

---

## Database

Responsibilities

* Persistent storage
* Relationships
* Transactions
* Indexing
* Constraints

---

# 6. Request Lifecycle

Example

```
User

↓

Browser

↓

React Component

↓

Axios Request

↓

Express Route

↓

Middleware

↓

Controller

↓

Service

↓

Repository

↓

PostgreSQL

↓

Repository

↓

Service

↓

Controller

↓

JSON Response

↓

React UI Update
```

---

# 7. Backend Layered Architecture

```
Routes

↓

Middleware

↓

Controllers

↓

Services

↓

Repositories

↓

Database
```

---

## Routes

Responsibilities

* URL mapping
* Authentication middleware
* Validation middleware

No business logic.

---

## Controllers

Responsibilities

* Receive request
* Call service
* Return response

No database logic.

---

## Services

Responsibilities

* Business rules
* Permission checks
* Validation
* Transactions

---

## Repository Layer

Responsibilities

* SQL queries
* CRUD operations
* Database abstraction

Only repositories communicate with PostgreSQL.

---

# 8. Frontend Architecture

```
Pages

↓

Layouts

↓

Components

↓

Hooks

↓

Services

↓

Axios Client
```

---

## Pages

Represent routes.

Examples

* Dashboard
* Projects
* Settings

---

## Layouts

Shared layouts.

Examples

* Dashboard Layout
* Auth Layout

---

## Components

Reusable UI.

Examples

* Card
* Button
* Modal
* Input
* Search Bar

---

## Hooks

Reusable business logic.

Examples

* useAuth
* useProjects
* useSearch

---

## Services

API communication.

No UI logic.

---

# 9. Authentication Architecture

CareerVault uses hybrid authentication.

Supported methods

* Email & Password
* Google OAuth
* GitHub OAuth

Authentication uses:

* Access Token
* Refresh Token
* Session Table

Every login creates a new session.

---

# 10. Session Flow

```
Login

↓

Password Verified

↓

Generate Access Token

↓

Generate Refresh Token

↓

Create Database Session

↓

Return Tokens

↓

Authenticated User
```

Sessions are stored in the database.

Logout invalidates only the selected session.

---

# 11. Authorization

Authorization is role-based.

Initial role

```
USER
```

Future roles

* ADMIN
* MODERATOR
* PREMIUM

---

# 12. Database Communication

Every SQL query uses parameterized statements.

Example

```
Client

↓

Repository

↓

Parameterized Query

↓

Database
```

No dynamic SQL string construction.

---

# 13. Content Storage

## Version 1 (MVP)

CareerVault is designed as a **text-first platform**.

The application stores only structured textual information such as:

* Project descriptions
* Internship experience
* Work experience
* Research abstracts
* Skills
* Achievements
* Resume summaries
* Cover letter snippets
* Interview answers
* Notes
* Tags

All content is stored directly in PostgreSQL.

The MVP intentionally excludes binary file storage, including:

* Images
* Certificates
* PDFs
* Documents
* Videos
* Other file attachments

This decision reduces infrastructure complexity, improves security, lowers hosting costs, and allows the team to focus on delivering a fast and reliable experience.

---

## Future Enhancements

Support for file storage may be introduced in a future release.

Possible additions include:

* Project images
* Experience letters
* Offer letters
* Certificates
* Research papers (PDF)
* Resume uploads
* Portfolio media

When implemented, binary files will be stored in an object storage service such as Amazon S3 or Supabase Storage.

Only metadata, ownership information, and storage URLs will be stored in PostgreSQL. Binary files will never be stored directly in the database.

All uploaded files should undergo validation, malware scanning, and access control before becoming available to users.


# 14. Search Architecture

Global Search

Supports

* Projects
* Experience
* Skills
* Research
* Achievements

Future

PostgreSQL Full Text Search

or

Meilisearch

---

# 15. Validation Flow

```
Browser

↓

Client Validation

↓

Server Validation

↓

Database Constraints
```

Validation exists at every layer.

Never trust client-side validation alone.

---

# 16. Error Handling

Standard API response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

Errors are categorized into

* Validation
* Authentication
* Authorization
* Business
* Database
* Unknown

---

# 17. Logging

Application logs

* Requests
* Authentication
* Errors

Security logs

* Failed logins
* Password changes
* OAuth events
* Session creation
* Session termination

Future

Structured logging using Winston or Pino.

---

# 18. Audit Logs

Every important action is recorded.

Examples

* Project created
* Experience edited
* Password updated
* Account deleted
* OAuth provider connected

Audit logs are immutable.

---

# 19. Caching Strategy

Version 1

No distributed cache.

Browser caching

Static asset caching

Future

Redis

Use cases

* Rate limiting
* Session cache
* Frequently accessed data

---

# 20. Scalability

Current architecture supports

* Thousands of users
* Horizontal API scaling
* Stateless backend
* Load balancing
* CDN support

Future

Microservices

Queue workers

Background jobs

---

# 21. Security Boundaries

The frontend never communicates directly with PostgreSQL.

All requests pass through

React

↓

Express

↓

Authorization

↓

Validation

↓

Repository

↓

Database

---

# 22. API Design

REST architecture.

Resource-based endpoints.

Examples

```
/api/projects

/api/experience

/api/research

/api/profile
```

HTTP methods

GET

POST

PUT

PATCH

DELETE

---

# 23. Configuration Management

Environment variables

```
PORT

DATABASE_URL

JWT_SECRET

JWT_REFRESH_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID

GITHUB_CLIENT_SECRET
```

No secrets committed to Git.

---

# 24. Deployment Architecture

```
Internet

↓

Nginx

↓

React Static Files

↓

Reverse Proxy

↓

Express API

↓

PostgreSQL
```

HTTPS is mandatory.

---

# 25. Backup Strategy

Daily database backups.

Weekly full backups.

Monthly archive.

Automated restore testing.

---

# 26. Availability

Target uptime

99.9%

Health endpoint

```
/health
```

Checks

* API
* Database
* Storage

---

# 27. Monitoring

Future integrations

* Grafana
* Prometheus
* Sentry
* UptimeRobot

Monitor

* CPU
* Memory
* API latency
* Database latency
* Error rate

---

# 28. Future Evolution

The architecture should evolve without major rewrites.

Planned additions include:

* AI assistant
* Resume generator
* Browser extension
* Public portfolio pages
* Team workspaces
* Mobile application
* GraphQL gateway (optional)

Each new module should integrate through the existing service layer rather than bypassing established architectural boundaries.

---

# 29. Architectural Decisions

| Decision             | Reason                                                  |
| -------------------- | ------------------------------------------------------- |
| React + Vite         | Fast development and build performance                  |
| Express.js           | Simple, mature, and well supported                      |
| PostgreSQL           | Relational integrity and powerful querying              |
| JWT + Refresh Tokens | Secure authentication with scalable APIs                |
| Session Table        | Enables session revocation and device management        |
| Repository Pattern   | Clear separation between business logic and persistence |
| Tailwind CSS         | Consistent, maintainable design system                  |
| OAuth Support        | Improved user convenience and reduced password fatigue  |

---

# 30. Future Architecture

As CareerVault grows, additional services may be introduced without affecting the existing API contract.

Potential services include:

* Notification Service
* AI Processing Service
* Search Service
* Analytics Service
* File Processing Service
* Email Service
* Background Job Workers

These services should communicate through asynchronous messaging or internal APIs while preserving the current modular architecture.

---

# 31. Summary

CareerVault is designed as a secure, modular, and scalable web application. Its layered architecture separates presentation, business logic, and data access, making the codebase easier to maintain and extend.

The architecture emphasizes security, consistency, and future growth while keeping the initial implementation straightforward enough for rapid development.

## Schema-Driven Asset System

### Overview

CareerVault follows a **developer-defined schema architecture**.

Asset schemas are **stored in the application codebase**, not in the database. The frontend and backend share the same schema definitions to ensure consistent rendering, validation, and data handling.

This approach provides the flexibility of a schema-driven system without introducing the complexity of a runtime form builder or CMS.

---

## Architecture Principles

* Asset types are defined by developers.
* Schemas are version-controlled using Git.
* The frontend and backend use the same schema definitions.
* Users cannot create custom asset types in Version 1.
* No schema information is stored in the database.
* Every asset type is rendered dynamically from its schema.

---

## Shared Schema Package

The project contains a shared package that both the frontend and backend consume.

```text
career-vault/

client/
server/

shared/
└── schemas/
    ├── assetTypes.js
    ├── fieldTypes.js
    ├── project.schema.js
    ├── internship.schema.js
    ├── workExperience.schema.js
    ├── achievement.schema.js
    ├── research.schema.js
    ├── resumeSummary.schema.js
    ├── aboutMe.schema.js
    ├── coverLetter.schema.js
    ├── interviewAnswer.schema.js
    └── customNote.schema.js
```

Every schema exports a JavaScript object describing the asset.

---

## Example Schema

```javascript
export default {
  type: "PROJECT",
  displayName: "Project",

  fields: [
    {
      key: "summary",
      label: "One-Line Summary",
      type: "textarea",
      required: true,
      searchable: true,
      copyable: true,
      maxLength: 250
    },
    {
      key: "techStack",
      label: "Technology Stack",
      type: "tags",
      searchable: true,
      copyable: true
    },
    {
      key: "github",
      label: "GitHub Repository",
      type: "url",
      searchable: false,
      copyable: true
    }
  ]
};
```

The schema is the single source of truth for that asset type.

---

## Dynamic Rendering Flow

```text
User selects Asset Type
        │
        ▼
Load Schema
        │
        ▼
Generate Form
        │
        ▼
Validate User Input
        │
        ▼
Submit Structured Data
        │
        ▼
Backend Validates Using Same Schema
        │
        ▼
Persist to PostgreSQL
```

No asset-specific forms are hardcoded.

---

## Validation

Validation rules are defined within each schema.

Both the frontend and backend enforce the same rules to ensure consistent behavior and prevent invalid data from reaching the database.

Supported validation includes:

* Required fields
* Maximum length
* Minimum length
* URL validation
* Email validation
* Numeric ranges
* Date validation
* Custom validators

---

## Rendering Rules

Each field definition controls how it appears.

Examples include:

* Label
* Placeholder
* Input type
* Required indicator
* Character limit
* Copy availability
* Search indexing
* Visibility

The UI automatically adapts based on the schema.

---

## Search

Only fields marked as searchable are included in global search.

Example:

```javascript
{
  key: "description",
  searchable: true
}
```

```javascript
{
  key: "github",
  searchable: false
}
```

This keeps search results relevant while avoiding unnecessary indexing.

---

## Database Model

The database stores only asset metadata and field values.

Schemas remain part of the application source code.

```text
Users
│
├── Sessions
│
├── Assets
│
├── Tags
│
├── AssetTags
│
└── AuditLogs
```

There are **no** `asset_schemas` or `asset_fields` tables.

---

## Assets Table

The `assets` table stores both metadata and user content.

| Column     | Type        | Description                 |
| ---------- | ----------- | --------------------------- |
| id         | UUID        | Primary key                 |
| user_id    | UUID        | Owner                       |
| asset_type | VARCHAR(50) | Asset type                  |
| title      | TEXT        | Asset title                 |
| values     | JSONB       | Structured field values     |
| favorite   | BOOLEAN     | Favorite flag               |
| archived   | BOOLEAN     | Archive flag                |
| created_at | TIMESTAMP   | Creation timestamp          |
| updated_at | TIMESTAMP   | Last modification timestamp |

---

## Example JSONB Structure

```json
{
  "summary": "AI-powered nutrition tracking platform",
  "problemStatement": "Students struggle to monitor nutrition consistently.",
  "solution": "A centralized nutrition management application.",
  "techStack": [
    "React",
    "Express",
    "PostgreSQL"
  ],
  "github": "https://github.com/example/project",
  "liveDemo": "https://example.com"
}
```

Using a `JSONB` column allows PostgreSQL to store structured content efficiently while preserving flexibility for different asset types.

---

## Benefits

This architecture provides:

* One rendering engine
* One validation engine
* One CRUD implementation
* Shared frontend/backend schemas
* Smaller database
* Fewer joins
* Simpler migrations
* Easier maintenance
* Excellent scalability for new asset types

Future asset types can be added by creating a new schema file without redesigning the database or building new form components.
