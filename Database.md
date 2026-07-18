# Database.md

# CareerVault Database Design

**Database Engine:** PostgreSQL 16+

**Version:** 1.0

**Status:** Approved

---

# 1. Overview

CareerVault uses PostgreSQL as its primary relational database.

The database is designed around a single core concept:

**Asset**

Every piece of professional information belongs to an asset owned by a user.

The schema emphasizes:

* Simplicity
* Data integrity
* Performance
* Security
* Scalability

Version 1 stores **text-based content only**.

---

# 2. Design Principles

The database follows these principles:

* UUID primary keys
* Soft deletes where appropriate
* Audit-friendly timestamps
* Foreign key constraints
* Parameterized queries
* Proper indexing
* Minimal duplication

---

# 3. Entity Relationship Diagram

```text
Users
 │
 ├────────────┐
 │            │
 ▼            ▼
Sessions    Assets

Assets
 │
 ▼
Asset Tags
 │
 ▼
Tags

Users
 │
 ▼
Audit Logs
```

---

# 4. Users Table

Stores user accounts.

| Column        | Type         | Constraints        |
| ------------- | ------------ | ------------------ |
| id            | UUID         | Primary Key        |
| username      | VARCHAR(50)  | Unique             |
| email         | VARCHAR(255) | Unique             |
| password_hash | TEXT         | Nullable for OAuth |
| auth_provider | VARCHAR(30)  | Required           |
| google_id     | TEXT         | Nullable           |
| github_id     | TEXT         | Nullable           |
| is_verified   | BOOLEAN      | Default FALSE      |
| created_at    | TIMESTAMP    | Required           |
| updated_at    | TIMESTAMP    | Required           |

---

# 5. Sessions Table

Stores active login sessions.

| Column             | Type      |
| ------------------ | --------- |
| id                 | UUID      |
| user_id            | UUID      |
| refresh_token_hash | TEXT      |
| device_name        | TEXT      |
| ip_address         | TEXT      |
| user_agent         | TEXT      |
| expires_at         | TIMESTAMP |
| created_at         | TIMESTAMP |
| last_used_at       | TIMESTAMP |

Each login creates a new session.

Deleting a session logs the user out from that device only.

---

# 6. Assets Table

Central table of the application.

Every professional entry is stored here.

| Column     | Type        |
| ---------- | ----------- |
| id         | UUID        |
| user_id    | UUID        |
| asset_type | VARCHAR(50) |
| title      | TEXT        |
| values     | JSONB       |
| favorite   | BOOLEAN     |
| archived   | BOOLEAN     |
| created_at | TIMESTAMP   |
| updated_at | TIMESTAMP   |

Example asset types:

* PROJECT
* INTERNSHIP
* WORK_EXPERIENCE
* RESEARCH
* ACHIEVEMENT
* SKILL
* RESUME_SUMMARY
* ABOUT_ME
* COVER_LETTER
* INTERVIEW_ANSWER
* CUSTOM_NOTE

---


# 10. Tags Table

Stores reusable tags.

| Column  | Type        |
| ------- | ----------- |
| id      | UUID        |
| user_id | UUID        |
| name    | VARCHAR(50) |
| color   | VARCHAR(20) |

---

# 11. Asset Tags Table

Many-to-many relationship.

| Column   | Type |
| -------- | ---- |
| asset_id | UUID |
| tag_id   | UUID |

---

# 12. Audit Logs Table

Stores important user actions.

| Column      | Type      |
| ----------- | --------- |
| id          | UUID      |
| user_id     | UUID      |
| action      | VARCHAR   |
| entity_type | VARCHAR   |
| entity_id   | UUID      |
| created_at  | TIMESTAMP |

Example actions:

* LOGIN
* LOGOUT
* CREATE_ASSET
* UPDATE_ASSET
* DELETE_ASSET
* PASSWORD_CHANGE

---

# 13. Relationships

```
Users

1 → N Assets

Users

1 → N Sessions

Users

1 → N Tags

Users

1 → N Audit Logs

Assets

N ↔ N Tags
```

---

# 14. Indexing Strategy

Indexes should be created on:

Users

* email
* username

Assets

* user_id
* asset_type
* favorite
* archived
* created_at

Sessions

* user_id
* expires_at

Tags

* user_id
* name

Audit Logs

* user_id
* created_at

---

# 15. Constraints

The database enforces:

* Foreign keys
* Unique usernames
* Unique emails
* Valid asset ownership
* Required timestamps

Application-level validation handles:

* Maximum lengths
* URL validation
* Field requirements
* Schema compliance

---

# 16. Search Strategy

Version 1 uses PostgreSQL ILIKE queries on searchable fields.

Future improvements:

* PostgreSQL Full-Text Search
* Trigram indexes
* Meilisearch
* Elasticsearch

---

# 17. Transactions

Transactions are required for:

* User registration
* Asset creation
* Asset deletion
* Schema updates
* Password changes

This ensures data consistency.

---

# 18. Backup Strategy

Daily incremental backups.

Weekly full backups.

Monthly archived snapshots.

Regular restore testing should be performed.

---

# 19. Migration Strategy

Database schema changes should be managed through version-controlled migration files.

Every migration must be:

* Reversible
* Tested
* Documented

---

# 20. Future Enhancements

The database is designed to support future features without major redesign.

Possible additions include:

* File metadata
* Image metadata
* Resume exports
* Asset version history
* AI-generated content
* Shared assets
* Teams
* Organizations
* Public profiles
* Notifications

These features should be implemented through new tables and relationships rather than altering the core asset model.

---

# 21. Summary

The CareerVault database is centered around a flexible asset model combined with schema-driven forms.

This design minimizes duplication, supports future expansion, and keeps the initial implementation focused on structured text management while maintaining strong relational integrity and query performance.
