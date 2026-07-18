# PRD.md

# CareerVault

## Product Requirements Document (PRD)

**Version:** 1.0

**Status:** Draft

**Prepared By:** Product Team

---

# 1. Product Overview

## Product Name

**CareerVault**

## Tagline

**Store your career once. Use it everywhere.**

## Vision

CareerVault is a secure cloud platform that enables students and professionals to store, organize, manage, and reuse their professional information from a single location.

Instead of rewriting project descriptions, internship experiences, research summaries, achievements, and resume content every time they apply for a job, internship, scholarship, or higher studies, users can retrieve polished, reusable content in seconds.

The platform focuses on security, organization, and productivity while maintaining complete ownership of user data.

---

# 2. Problem Statement

Students and professionals repeatedly face situations where they need information such as:

* Project descriptions
* Internship experience
* Work experience
* Research publications
* Resume summaries
* Technical skills
* Leadership experience
* Hackathon participation
* Achievements
* Frequently used interview responses

These details are often scattered across:

* Multiple resumes
* Google Docs
* Notes applications
* LinkedIn
* GitHub
* Emails
* PDFs

Every application requires users to rewrite or search for the same information.

This leads to:

* Time loss
* Inconsistent descriptions
* Missing information
* Poor organization
* Lower application quality

---

# 3. Solution

CareerVault provides one secure location where users can maintain structured professional information.

Users create content once.

The platform allows them to:

* Search
* Copy
* Edit
* Export
* Reuse

their information whenever required.

---

# 4. Target Audience

## Primary Users

* College students
* Final-year students
* Job seekers
* Software engineers
* Researchers
* Freelancers
* Graduate school applicants

## Secondary Users

* Designers
* Product managers
* Data scientists
* Consultants
* Academic professionals

---

# 5. Goals

## Business Goals

* Build a trusted SaaS platform.
* Support thousands of concurrent users.
* Deliver a secure authentication system.
* Enable future premium features.
* Provide APIs for future integrations.

## User Goals

Users should be able to:

* Store career information.
* Search instantly.
* Copy individual sections.
* Organize content using tags.
* Access their data from any device.
* Keep all professional information in one place.

---

# 6. Non-Goals (Version 1)

The following features are intentionally excluded from the MVP:

* AI content generation
* Resume builder
* Team collaboration
* Real-time collaboration
* Public portfolios
* Mobile applications
* Browser extensions
* Offline synchronization
* File uploads
* Image storage
* PDF storage
* Certificate management
* Rich media support

These features may be introduced in future releases after the core platform has matured.

---

# 7. Core Modules

## Authentication

* Register
* Login
* Google OAuth
* GitHub OAuth
* Password reset
* Session management
* Device management

---

## Dashboard

Displays:

* Total Projects
* Total Experience
* Total Skills
* Total Research Papers
* Total Achievements
* Recently Updated Items
* Recently Copied Items

---

## Projects

Each project stores:

* Title
* Short Description
* Detailed Description
* Technology Stack
* Role
* Duration
* GitHub Link
* Live Link
* Features
* Challenges
* Learnings
* Interview Explanation
* Keywords
* Tags
* Notes
* Favorite

---

## Experience

Stores:

* Organization
* Role
* Duration
* Employment Type
* Responsibilities
* Achievements
* Technologies
* Notes
* Experience Summary
* Attachments
* Tags

---

## Skills

Stores:

* Skill Name
* Category
* Proficiency
* Years of Experience
* Notes
* Related Projects

---

## Achievements

Stores:

* Title
* Description
* Date
* Organization
* Tags
* Related Skills

---

## Research

Stores:

* Paper Title
* Abstract
* DOI
* Conference
* Publication
* Authors
* Citation
* Keywords

---

## Resume Assets

Stores reusable content such as:

* About Me
* Professional Summary
* Internship Summary
* Project Summary
* Research Summary
* Career Objective
* Cover Letter Paragraphs
* STAR Responses
* Frequently used Application Answers

---

# 8. Functional Requirements

### Content Management

Users shall be able to:

Create structured career assets.
Edit existing assets.
Archive assets.
Delete assets.
Duplicate assets.
Search across all assets.
Copy any individual field with one click.
Organize assets using tags.
Mark assets as favorites.

The MVP supports text-based content only.

### User Authentication

The system shall:

* Allow user registration.
* Allow login using email and password.
* Support Google OAuth.
* Support GitHub OAuth.
* Maintain secure sessions.
* Allow logout from individual devices.
* Allow logout from all devices.

---

### Project Management

Users shall:

* Create projects.
* Edit projects.
* Archive projects.
* Delete projects.
* Duplicate projects.
* Copy any field independently.

---

### Search

The platform shall provide:

* Global search
* Module filtering
* Tag filtering
* Recent search history

---

### Copy Utility

Every field should have:

* Copy button
* Success notification
* Keyboard shortcut support

---

### Settings

Users shall manage:

* Profile
* Password
* Connected OAuth providers
* Active sessions
* Account deletion
* Theme preferences

---

# 9. Non-Functional Requirements

## Performance

The application is optimized for structured textual data, enabling:

Fast page loads
Low storage requirements
Efficient searching
Lightweight backups
Quick synchronization

---

## Reliability

* 99.9% uptime target
* Daily backups
* Transaction-safe database operations

---

## Scalability

Architecture should support:

* Horizontal API scaling
* CDN integration
* Object storage
* Future microservices

---

## Security

* HTTPS only
* JWT authentication
* Refresh tokens
* Session management
* Password hashing
* Rate limiting
* Audit logging
* Secure cookies
* Parameterized SQL queries

---

## Accessibility

* WCAG AA compliance
* Keyboard navigation
* Screen-reader support
* High-contrast focus indicators

---

# 10. User Stories

### Student

As a student, I want to save my project descriptions so I can reuse them for internships.

### Software Engineer

As a developer, I want to store detailed work experience so I can quickly complete job applications.

### Researcher

As a researcher, I want to organize publication details and citations in one place.

### Recruiter Candidate

As a job applicant, I want reusable summaries so I do not rewrite information repeatedly.

---

# 11. Success Metrics

* User registration rate
* Daily active users
* Weekly returning users
* Average projects per user
* Search usage
* Copy action frequency
* Session duration
* Retention after 30 days

---

# 12. Version 1 Scope

CareerVault Version 1 is a text-first professional information management platform.

The MVP focuses on helping users organize and reuse professional content without the complexity of document management.

Included:

Authentication
Dashboard
Projects
Experience
Skills
Achievements
Research
Resume Assets
Search
Tags
Favorites
Session Management
Profile Settings

Excluded:

Image uploads
File uploads
Certificates
PDFs
Rich media
AI-assisted writing
Resume generation
Team collaboration

# 13. Future Enhancements

Planned enhancements include:

Content Storage
Image uploads
Project screenshots
Architecture diagrams
Certificates
Offer letters
Experience letters
Research PDFs
Resume uploads
AI Features
Resume generation
Cover letter generation
Project summaries
Interview answer suggestions
LinkedIn profile optimization
Collaboration
Shared workspaces
Team collaboration
Public portfolio pages
Reviewer comments
Productivity
Browser extension
Mobile application
Offline mode
Import from LinkedIn
Export to PDF
Export to DOCX

---

# 14. Acceptance Criteria

The MVP is complete when a user can:

* Register using email, Google, or GitHub.
* Log in securely.
* Manage active sessions.
* Create, edit, archive, and delete professional assets.
* Search across all stored information.
* Copy individual content sections with one click.
* Manage profile and security settings.
* Access the application securely from multiple devices.

---

# 15. Technology Stack

Frontend

* React
* Vite
* Tailwind CSS
* JavaScript

Backend

* Node.js
* Express.js

Database

* PostgreSQL or Supabase (PostgreSQL)

Authentication

* JWT
* Google OAuth
* GitHub OAuth
* Session management

Deployment

* Docker
* Nginx
* VPS or Cloud Provider

---

# 16. Document References

* Design.md
* Architecture.md
* Database.md
* API.md
* Authentication.md
* Security.md
* Frontend.md
* Backend.md
* Deployment.md


# Schema-Driven Asset Architecture

## Overview

CareerVault follows a **schema-driven architecture**.

Instead of hardcoding separate forms, validation logic, and rendering components for every asset type, the application generates them dynamically from predefined schemas.

This approach allows the platform to support new asset types with minimal code changes while maintaining a consistent user experience.

---

# Core Principle

Every asset consists of two parts:

1. Asset Metadata
2. Asset Schema

The schema determines:

* Which fields exist
* Field order
* Field type
* Validation rules
* Copy behavior
* Search behavior
* Display settings

The frontend and backend both use the same schema definition.

---

# Asset Structure

```text
Asset

├── Metadata
│
├── Schema
│
└── Values
```

Example

```text
Project

↓

Schema

↓

Generate Form

↓

User Input

↓

Store Values
```

---

# Asset Metadata

Every asset contains common metadata.

```text
Asset ID

Owner

Asset Type

Title

Description

Favorite

Archived

Created At

Updated At

Tags
```

These fields exist for every asset regardless of type.

---

# Schema Definition

Each asset type has its own schema.

Example

Project

```javascript
{
  type: "PROJECT",

  fields: [

    {
      id: "summary",
      label: "One-Line Summary",
      type: "textarea",
      required: true
    },

    {
      id: "techStack",
      label: "Technology Stack",
      type: "tags"
    },

    {
      id: "github",
      label: "GitHub Repository",
      type: "url"
    }

  ]
}
```

The schema becomes the single source of truth.

---

# Dynamic Form Generation

The frontend never contains a dedicated ProjectForm component.

Instead

```text
Load Schema

↓

Loop Through Fields

↓

Render Components

↓

Save Values
```

Example

```text
Text

↓

Render TextArea

URL

↓

Render URL Input

Tags

↓

Render Tag Selector

Date

↓

Render Date Picker
```

---

# Supported Field Types

Version 1

* Single Line Text
* Multi-line Text
* Rich Text (Future)
* URL
* Email
* Number
* Date
* Tags
* Select
* Multi Select
* Boolean

Future

* Markdown
* Code Block
* Image
* File Upload
* Rating
* Checklist

---

# Validation

Validation rules are defined inside the schema.

Example

```javascript
{
  label: "GitHub",

  type: "url",

  required: false,

  maxLength: 200
}
```

Both frontend and backend validate using the same rules.

---

# Rendering

Every field maps to a reusable component.

Example

```text
Text

↓

TextArea Component

URL

↓

URL Component

Tags

↓

Tag Component

Date

↓

Date Component
```

No asset-specific UI components are required.

---

# Copy System

Every field automatically supports:

* Copy
* Edit
* Collapse
* Expand

Future

* AI Rewrite
* AI Improve
* Translate

No additional implementation is required.

---

# Search

Each field declares whether it should be searchable.

Example

```javascript
{
  id: "github",

  searchable: false
}
```

```javascript
{
  id: "description",

  searchable: true
}
```

Global Search automatically indexes searchable fields.

---

# Display Rules

The schema controls how fields appear.

Example

```javascript
{

label: "Challenges",

collapsed: false,

copyable: true,

visible: true

}
```

Future

```javascript
{

premiumOnly: true

}
```

---

# Versioning

Future releases may introduce schema versions.

Example

```text
Project Schema

↓

Version 1

↓

Version 2

↓

Version 3
```

Older assets remain compatible.

---

# Custom Asset Types (Future)

Users may define their own schemas.

Example

Photography Portfolio

Language Learning

Personal Journal

Conference Notes

Startup Ideas

Book Notes

The rendering engine remains unchanged.

---

# Schema Registry

The frontend loads available schemas during application startup.

```text
Application Starts

↓

Fetch Schemas

↓

Cache Schemas

↓

Generate Forms
```

The backend validates every request against the same schema registry.

---

# Benefits

The schema-driven architecture provides:

* Minimal duplicated code
* Consistent user interface
* Easier maintenance
* Simpler testing
* Faster feature development
* Automatic validation
* Automatic form generation
* Automatic rendering
* Automatic search integration
* Easier AI integration

---

# Developer Workflow

Adding a new asset type requires only:

1. Define the schema.
2. Register the schema.
3. Deploy.

No new forms.

No new CRUD pages.

No duplicated validation.

No duplicated copy functionality.

---

# Future Possibilities

The schema-driven engine enables future capabilities without redesigning the platform:

* Drag-and-drop field ordering
* Custom user-defined asset types
* Template marketplace
* Organization-wide templates
* AI-generated schemas
* Dynamic API documentation
* Low-code asset creation

The schema system is intended to become the foundation upon which all future CareerVault features are built.
