# Security.md

# CareerVault Security Architecture

**Version:** 1.0

**Status:** Approved

---

# 1. Overview

CareerVault stores professional information that users rely on for job applications, internships, research, and career development. While the platform does not store financial information or government identification, it does contain personal and professional data that must be protected.

Security is considered a core architectural requirement rather than an optional feature.

---

# 2. Security Objectives

The platform is designed to ensure:

* Confidentiality of user data
* Data integrity
* High availability
* Secure authentication
* Secure authorization
* Protection against common web attacks
* Secure handling of user sessions
* Safe deployment practices

---

# 3. Security Principles

CareerVault follows these principles:

* Secure by Default
* Least Privilege
* Defense in Depth
* Fail Securely
* Validate All Input
* Never Trust Client Data
* Keep Sensitive Logic on the Server

---

# 4. Authentication Security

Supported authentication methods:

* Email and Password
* Google OAuth
* GitHub OAuth

Passwords are hashed using bcrypt with a minimum cost factor of 12.

Passwords are never:

* Logged
* Stored in plain text
* Returned through APIs

---

# 5. Session Security

Each login creates a unique session.

Sessions store:

* Session ID
* User ID
* Device information
* IP address
* User Agent
* Last activity
* Expiration

Users can:

* View active sessions
* Revoke individual sessions
* Log out from all devices

---

# 6. JWT Security

Access Token

* Lifetime: 15 minutes
* Contains only required claims
* Signed using a strong secret

Refresh Token

* Lifetime: 7 days
* Stored as a hash in the database
* Invalidated on logout

The backend verifies every token before processing protected requests.

---

# 7. Authorization

Every protected endpoint verifies:

1. Authentication
2. Session validity
3. Resource ownership

Users may access only their own assets.

Ownership checks are enforced on the server regardless of client-side behavior.

---

# 8. Password Policy

Minimum requirements:

* At least 8 characters

Recommended:

* Uppercase letter
* Lowercase letter
* Number
* Special character

Password strength feedback should be provided during registration.

---

# 9. Rate Limiting

Rate limiting protects against abuse.

Recommended limits:

| Endpoint        | Limit                 |
| --------------- | --------------------- |
| Login           | 5 requests / minute   |
| Register        | 3 requests / minute   |
| Forgot Password | 3 requests / hour     |
| OAuth Callback  | 20 requests / minute  |
| Asset Creation  | 60 requests / minute  |
| Search          | 120 requests / minute |
| General API     | 300 requests / minute |

---

# 10. HTTPS

Production deployments must use HTTPS exclusively.

Requirements:

* TLS 1.2 or higher
* HSTS enabled
* Redirect HTTP to HTTPS

Cookies (if introduced) must use:

* Secure
* HttpOnly
* SameSite=Lax

---

# 11. Input Validation

Every request is validated.

Validation occurs at:

1. Frontend
2. Backend
3. Database constraints

The server remains the source of truth.

Validation includes:

* Required fields
* Maximum length
* Allowed values
* URL validation
* Email validation
* Schema validation

---

# 12. SQL Injection Prevention

Only parameterized queries are permitted.

Never construct SQL statements through string concatenation.

All database access must go through the repository layer.

---

# 13. Cross-Site Scripting (XSS)

User-generated content must be treated as untrusted.

Guidelines:

* Escape output before rendering
* Do not use `dangerouslySetInnerHTML`
* Sanitize any future rich-text input before display

Version 1 stores plain text only, which significantly reduces XSS risk.

---

# 14. Cross-Site Request Forgery (CSRF)

Version 1 primarily uses JWT-based authentication.

If secure cookies are introduced for refresh tokens, CSRF protection must also be enabled.

---

# 15. CORS Policy

Only trusted frontend origins may access the API.

Allowed origins are configured through environment variables.

Credentials are never accepted from unknown origins.

---

# 16. Security Headers

Helmet should be enabled.

Recommended headers include:

* Content-Security-Policy
* X-Frame-Options
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy

---

# 17. Logging

Application logs:

* Startup
* Shutdown
* Requests
* Errors

Security logs:

* Login success
* Login failure
* Password changes
* OAuth logins
* Session revocation
* Account deletion

Sensitive values such as passwords and tokens must never appear in logs.

---

# 18. Audit Logging

Important user actions are recorded.

Examples:

* Asset created
* Asset updated
* Asset deleted
* Password changed
* Profile updated
* Session revoked

Audit records are append-only.

---

# 19. Environment Variables

Secrets must never be committed to source control.

Required environment variables include:

* DATABASE_URL
* JWT_SECRET
* JWT_REFRESH_SECRET
* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET

Separate `.env` files should be maintained for development, staging, and production.

---

# 20. Dependency Security

Dependencies should be:

* Kept up to date
* Regularly audited
* Removed if unused

Automated dependency scanning should be part of the CI pipeline.

---

# 21. Backup and Recovery

Database backups:

* Daily incremental
* Weekly full
* Monthly archive

Restore procedures should be tested regularly.

---

# 22. Future Security Enhancements

Planned improvements:

* Two-Factor Authentication (TOTP)
* Passkeys (WebAuthn)
* Login notifications
* Trusted devices
* Refresh token rotation
* Suspicious login detection
* Device fingerprinting
* Security dashboard

---

# 23. Security Checklist

Before production deployment, verify:

* HTTPS enabled
* Helmet configured
* CORS restricted
* Rate limiting enabled
* Password hashing verified
* Parameterized queries used
* JWT secrets configured
* Environment variables secured
* Logging reviewed
* Backup strategy tested
* Dependency audit completed

---

# 24. Summary

CareerVault follows a layered security model that combines secure authentication, strict authorization, robust input validation, safe database access, and secure deployment practices. The MVP intentionally limits complexity by storing structured text only, reducing the attack surface while providing a solid foundation for future enhancements.
