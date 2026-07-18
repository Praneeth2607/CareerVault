# CodingStandards.md

# CareerVault Development Standards

**Version:** 1.0

**Status:** Approved

---

# 1. Purpose

This document defines the development standards for CareerVault to ensure a consistent, maintainable, and high-quality codebase.

These standards apply to all frontend, backend, and shared code.

---

# 2. General Principles

* Write readable code before clever code.
* Keep functions focused on a single responsibility.
* Avoid duplicated logic.
* Prefer composition over inheritance.
* Keep files reasonably small and focused.
* Every feature should be easy to test.

---

# 3. Naming Conventions

## Variables

Use descriptive camelCase names.

Examples:

* userProfile
* assetType
* searchQuery

Avoid abbreviations unless they are widely understood.

---

## Functions

Function names should describe actions.

Examples:

* createAsset()
* updateProfile()
* validatePassword()

---

## Components

React components should use PascalCase.

Examples:

* AssetCard
* LoginModal
* SearchBar

---

## Constants

Use UPPER_SNAKE_CASE.

Examples:

* MAX_TITLE_LENGTH
* ACCESS_TOKEN_EXPIRY

---

## Files

Use kebab-case for folders and descriptive file names.

Examples:

* auth.routes.js
* asset.service.js
* project.schema.js

---

# 4. Project Structure

Group code by feature rather than by file type whenever practical.

Keep shared utilities isolated from business logic.

---

# 5. Comments

Write comments only when the intent is not obvious.

Do not explain what the code is doing if the code is already clear.

Prefer documenting *why* a decision was made.

---

# 6. Error Handling

Never ignore errors.

Every API endpoint must return a consistent error response.

Unexpected errors should be logged without exposing sensitive information.

---

# 7. Git Workflow

Branch naming:

* feature/<name>
* fix/<name>
* docs/<name>
* refactor/<name>

Commit messages should follow:

* feat:
* fix:
* docs:
* refactor:
* test:
* chore:

Example:

```
feat: add asset search endpoint
```

---

# 8. Testing Expectations

Every new feature should be verified before merging.

Minimum checks:

* Happy path
* Validation errors
* Authorization checks
* Error handling

---

# 9. Documentation

New features should update:

* PRD (if product behavior changes)
* API documentation
* Database documentation (if schema changes)
* Architecture documentation (if architecture changes)

---

# 10. Performance

Avoid unnecessary database queries.

Use pagination for list endpoints.

Load only required data.

---

# 11. Security

Never:

* Commit secrets
* Log passwords
* Trust client input
* Disable authentication checks

Always validate ownership before returning user data.

---

# 12. Pull Request Checklist

Before merging:

* Code builds successfully
* Linting passes
* Documentation updated
* Security considered
* No unused code
* No debug statements
* No sensitive information committed
