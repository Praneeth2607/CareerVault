# Authentication.md

# CareerVault Authentication & Authorization

**Version:** 1.0

**Status:** Approved

---

# 1. Overview

CareerVault uses a hybrid authentication system combining:

* Email and Password
* Google OAuth 2.0
* GitHub OAuth

Authentication is based on JWT access tokens with server-side session tracking.

Goals:

* Secure authentication
* Multiple active devices
* Individual session revocation
* Stateless APIs
* Easy future integration of Two-Factor Authentication (2FA)

---

# 2. Authentication Methods

### Email & Password

Users register with:

* Username
* Email
* Password

Passwords are never stored in plain text.

Hashing algorithm:

* bcrypt
* Minimum cost factor: 12

---

### Google OAuth

Users can sign in using their Google account.

Stored information:

* Google ID
* Email
* Display Name

No Google access tokens are stored permanently.

---

### GitHub OAuth

Users can sign in using GitHub.

Stored information:

* GitHub ID
* Username
* Email (if available)

No GitHub access tokens are stored permanently.

---

# 3. Authentication Flow

## Email Login

```text
User
    │
    ▼
Enter Credentials
    │
    ▼
Validate Input
    │
    ▼
Verify Password
    │
    ▼
Generate Access Token
    │
    ▼
Generate Refresh Token
    │
    ▼
Create Session
    │
    ▼
Return Tokens
```

---

## OAuth Login

```text
User

↓

Google / GitHub

↓

OAuth Callback

↓

Verify Identity

↓

Find Existing User

↓

Create User (if required)

↓

Create Session

↓

Generate Tokens

↓

Login Complete
```

---

# 4. JWT Strategy

### Access Token

Purpose:

Authenticate API requests.

Expiry:

15 minutes

Contains:

* User ID
* Session ID

---

### Refresh Token

Purpose:

Generate a new access token.

Expiry:

7 days

Stored as a hashed value in the database.

---

# 5. Session Management

Each successful login creates one session.

Stored information:

* Session ID
* User ID
* Device Name
* IP Address
* User Agent
* Created At
* Last Used At
* Expiry

Users can:

* View active sessions
* Log out from one device
* Log out from all devices

---

# 6. Authorization

Current Roles

* USER

Future Roles

* ADMIN
* MODERATOR
* PREMIUM

Authorization middleware checks permissions before protected routes execute.

---

# 7. Route Protection

Public Routes

* Register
* Login
* OAuth
* Forgot Password
* Refresh Token

Protected Routes

* Assets
* Tags
* Dashboard
* Profile
* Sessions
* Account Settings

---

# 8. Password Policy

Minimum:

* 8 characters

Recommended:

* Uppercase
* Lowercase
* Number
* Special Character

Passwords are validated on both client and server.

---

# 9. Account Recovery

Version 1

Forgot Password

↓

Email Verification Link

↓

Reset Password

Future:

* MFA Recovery
* Recovery Codes

---

# 10. Logout

Logout performs:

* Refresh token invalidation
* Session deletion
* Access token expiration

---

# 11. Security Measures

* HTTPS only
* bcrypt password hashing
* JWT expiration
* Refresh token rotation (future)
* Rate limiting
* Helmet
* CORS
* Secure cookies (if cookies are adopted)
* Parameterized SQL queries

---

# 12. Future Enhancements

* Two-Factor Authentication
* Passkeys (WebAuthn)
* Magic Link Login
* Email Verification Enforcement
* Trusted Devices
* Login Notifications
* Suspicious Activity Detection
* Session Expiration Policies

---

# 13. Summary

CareerVault authentication is designed to provide secure, scalable, and user-friendly access through email/password and OAuth providers while maintaining fine-grained control over active sessions.
