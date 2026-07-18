# API.md

# CareerVault REST API Specification

**Base URL**

```text
/api/v1
```

All requests and responses use JSON.

---

# Response Format

## Success

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

---

# Authentication Endpoints

## Register

**POST**

```text
/api/v1/auth/register
```

Request

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "********"
}
```

Response

```json
{
  "success": true
}
```

---

## Login

**POST**

```text
/api/v1/auth/login
```

---

## Google OAuth

**GET**

```text
/api/v1/auth/google
```

---

## GitHub OAuth

**GET**

```text
/api/v1/auth/github
```

---

## Refresh Token

**POST**

```text
/api/v1/auth/refresh
```

---

## Logout

**POST**

```text
/api/v1/auth/logout
```

---

# Dashboard

## Dashboard Summary

**GET**

```text
/api/v1/dashboard
```

Returns:

* Total Assets
* Favorite Assets
* Recent Assets
* Asset Counts by Type

---

# Assets

## List Assets

**GET**

```text
/api/v1/assets
```

Query Parameters

| Parameter | Description |
| --------- | ----------- |
| type      | Asset Type  |
| favorite  | true/false  |
| archived  | true/false  |
| search    | Search Text |
| page      | Page Number |
| limit     | Page Size   |
| sort      | Sort Field  |
| order     | asc/desc    |

---

## Get Asset

**GET**

```text
/api/v1/assets/:id
```

---

## Create Asset

**POST**

```text
/api/v1/assets
```

Example Request

```json
{
  "assetType": "PROJECT",
  "title": "CareerVault",
  "values": {
    "summary": "A centralized platform for professional assets.",
    "techStack": [
      "React",
      "Express",
      "PostgreSQL"
    ]
  }
}
```

---

## Update Asset

**PUT**

```text
/api/v1/assets/:id
```

---

## Archive Asset

**PATCH**

```text
/api/v1/assets/:id/archive
```

---

## Restore Asset

**PATCH**

```text
/api/v1/assets/:id/restore
```

---

## Toggle Favorite

**PATCH**

```text
/api/v1/assets/:id/favorite
```

---

## Delete Asset

**DELETE**

```text
/api/v1/assets/:id
```

---

# Search

## Global Search

**GET**

```text
/api/v1/search
```

Query Parameters

| Parameter | Description         |
| --------- | ------------------- |
| q         | Search Term         |
| type      | Optional Asset Type |

Returns matching assets based on searchable fields.

---

# Tags

## List Tags

**GET**

```text
/api/v1/tags
```

---

## Create Tag

**POST**

```text
/api/v1/tags
```

---

## Update Tag

**PUT**

```text
/api/v1/tags/:id
```

---

## Delete Tag

**DELETE**

```text
/api/v1/tags/:id
```

---

# Profile

## Get Profile

**GET**

```text
/api/v1/profile
```

---

## Update Profile

**PUT**

```text
/api/v1/profile
```

---

## Change Password

**PATCH**

```text
/api/v1/profile/password
```

---

# Sessions

## Active Sessions

**GET**

```text
/api/v1/sessions
```

---

## Logout Current Session

**DELETE**

```text
/api/v1/sessions/current
```

---

## Logout Specific Session

**DELETE**

```text
/api/v1/sessions/:id
```

---

## Logout All Sessions

**DELETE**

```text
/api/v1/sessions
```

---

# Health Check

**GET**

```text
/api/v1/health
```

Response

```json
{
  "status": "healthy"
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# Versioning Strategy

All endpoints are versioned.

Example:

```text
/api/v1/assets
```

Future versions:

```text
/api/v2/assets
```

Older versions remain supported during migration periods.

---

# API Design Principles

* RESTful resource naming
* Consistent JSON responses
* JWT-protected private endpoints
* Pagination on list endpoints
* Input validation on every request
* Centralized error handling
* No business logic in routes
* Idempotent PUT and DELETE operations where applicable

---

# Future Endpoints

Reserved for future releases:

* AI Content Generation
* Resume Export
* PDF Export
* DOCX Export
* Public Asset Sharing
* Notifications
* Analytics
* File Management
