# CareerVault Frontend Architecture & Models

**Version:** 1.0  
**Framework:** React 18 + Vite  
**Styling:** Tailwind CSS v3  
**State Management:** React Context API + Custom Hooks  
**HTTP Client:** Axios with Automatic Token Refresh Interceptors  
**Last Updated:** September 2026  

---

## 1. Overview & Architectural Principles

The **CareerVault Frontend** is built as a single-page application (SPA) using **React 18** and **Vite**. The client provides a responsive, dark-themed, glassmorphic user interface designed for storing, organizing, searching, and exporting career achievements, projects, work experiences, skills, research papers, and resume assets.

### Core Architectural Patterns:
- **Layered Architecture:** Clear separation between Presentation (`pages/`, `components/`), Layout (`layouts/`), Business Logic (`hooks/`), API Services (`services/`), and Domain Schemas (`shared/schemas/`).
- **Dynamic Form Engine:** Schema-driven dynamic UI rendering (`DynamicForm.jsx`) that parses asset field definitions and dynamically renders matching input controls without hardcoded form boilerplate.
- **Context-driven Authentication:** Centralized session and identity state via `AuthContext` and `useAuth` hook, managing JWT token storage, automatic silent refreshes, and route protection.
- **Glassmorphic UI Design System:** Styled with Tailwind CSS utilizing custom dark gradients, semi-transparent frosted cards (`backdrop-blur-md`), vibrant accent colors (emerald, indigo, violet), and micro-interactions.

---

## 2. Technology Stack

| Library / Tool | Purpose & Usage |
| :--- | :--- |
| **React 18** | UI framework with Concurrent Rendering features and hooks (`useState`, `useEffect`, `useContext`, `useCallback`) |
| **Vite** | Fast ES modules dev server and optimized production bundler |
| **React Router v6** | Client-side SPA routing (`BrowserRouter`, `Routes`, `Route`, `Navigate`, `Outlet`) |
| **Axios** | HTTP client configured with request/response interceptors for auth token injection and silent refresh |
| **Tailwind CSS v3** | Utility-first CSS framework with PostCSS and custom color palettes |
| **Lucide React** | Modern icon set used across dashboard navigation, action toolbars, and asset indicators |
| **Shared Schemas** | Modular JSON schema definitions imported from `/shared/schemas` for cross-stack consistency |

---

## 3. High-Level Frontend Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Browser UI (React 18)                            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            App Routing (App.jsx)                            │
│  ├── Public Routes: Landing (/), Login (/login), Register (/register)       │
│  └── Protected Dashboard Routes (/dashboard/*)                              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Dashboard Layout Shell (DashboardLayout.jsx)          │
│  ├── Navigation Sidebar (Links to Projects, Experience, Skills, etc.)       │
│  ├── Top Bar (Search, User Menu, Quick Create)                              │
│  └── Mobile Responsive Drawer                                               │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────┴──────────────────────────────────────┐
│                            Page Views (pages/)                              │
│   Dashboard.jsx | AssetPage.jsx | Search.jsx | Settings.jsx | Landing.jsx   │
└───────────────────┬─────────────────────────────────────┬───────────────────┘
                    │                                     │
                    ▼                                     ▼
┌──────────────────────────────────────┐ ┌────────────────────────────────────┐
│      UI Components (components/)     │ │        Custom Hooks (hooks/)       │
│  ├── AssetList.jsx                   │ │  └── useAuth.jsx (Auth Context)    │
│  └── DynamicForm.jsx                 │ └─────────────────┬──────────────────┘
└───────────────────┬──────────────────┘                   │
                    │                                      │
                    └───────────────────┬──────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API Layer (services/api.js)                       │
│  ├── Axios Base Instance (VITE_API_URL)                                     │
│  ├── Request Interceptor: Inject `Authorization: Bearer <accessToken>`     │
│  └── Response Interceptor: Handle 401 & Silent Refresh Queue                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTPS REST Calls
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Express.js Backend API                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Directory Structure & Key Modules

```
client/
├── public/                     # Static assets & favicons
├── src/
│   ├── assets/                 # SVGs and images
│   ├── components/             # Reusable UI components
│   │   ├── AssetList.jsx       # Grid/List viewer for dynamic career assets
│   │   └── DynamicForm.jsx     # Schema-driven dynamic form renderer
│   ├── hooks/
│   │   └── useAuth.jsx         # AuthContext provider & authentication hook
│   ├── layouts/
│   │   └── DashboardLayout.jsx # Primary nested layout shell for protected views
│   ├── pages/
│   │   ├── Landing.jsx         # Public product landing page
│   │   ├── Login.jsx           # User authentication login view
│   │   ├── Register.jsx        # Account registration view
│   │   ├── Dashboard.jsx       # Overview dashboard with analytics & quick views
│   │   ├── AssetPage.jsx       # Generic dynamic asset view for all asset types
│   │   ├── Search.jsx          # Dedicated search and filtering page
│   │   └── Settings.jsx        # Account management & active sessions view
│   ├── services/
│   │   └── api.js              # Axios instance configuration & interceptors
│   ├── App.css                 # Custom glassmorphic utilities & animations
│   ├── App.jsx                 # Main application routes & Context provider
│   ├── index.css               # Tailwind directives & base styles
│   └── main.jsx                # DOM root mount entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 5. State Management & Authentication Flow

Authentication and global session state are encapsulated in `useAuth.jsx` via React's Context API (`AuthContext`).

### 1. Auth Context State
```javascript
{
  user: { id, username, email } | null,
  token: string | null,         // Short-lived JWT Access Token (15 min)
  refreshToken: string | null,   // Long-lived Refresh Token (7 days)
  sessionId: string | null,      // Session UUID
  loading: boolean,              // Initial authentication loading flag
  login(email, password),        // Auth login trigger
  register(data),                // Account registration trigger
  logout()                       // Clears auth state & localStorage, redirects to /
}
```

### 2. Token Lifecycle & Axios Interceptor Architecture
The frontend utilizes a **dual-token authentication lifecycle**:
1. **Access Token Storage:** Saved in `localStorage` as `token`. Attached to every outgoing HTTP request header via an Axios request interceptor (`Authorization: Bearer <token>`).
2. **Refresh Token Storage:** Saved in `localStorage` as `refreshToken` and `sessionId`.
3. **Silent Token Refresh Queue:**
   - If an API request returns a `401 Unauthorized` status, the response interceptor catches the failure.
   - If a refresh request is already pending (`isRefreshing === true`), subsequent failing requests are queued into `failedQueue`.
   - The client calls `POST /api/v1/auth/refresh` using `refreshToken` and `sessionId`.
   - On success, the new access token is stored, `Authorization` headers are updated, and all queued requests in `failedQueue` are resolved seamlessly.
   - On failure or missing tokens, `localStorage` is cleared, and the user is redirected to the `/login` route.
4. **Logout Behavior:** When a user logs out, `logout()` revokes the session on the backend (`POST /api/v1/auth/logout`), purges `localStorage`, and navigates the user to the public landing page (`/`).

---

## 6. Core UI Components & Dynamic Render Engine

### 1. `DynamicForm.jsx` (Schema-Driven Form Engine)
Rather than writing manual forms for every category (Projects, Experience, Skills, Achievements, Research, Resume Assets), `DynamicForm` parses JSON schema definitions imported from `shared/schemas`.

**Supported Schema Field Types:**
- `text`: Single-line text input
- `textarea`: Multi-line text input for summaries and descriptions
- `url`: Validated URL input field with link opening helpers
- `date` / `month`: Date selection controls
- `tags`: Tag creation and chip management component
- `boolean`: Toggle switch for boolean flags (e.g. `current` role)

```javascript
// Example schema structure consumed by DynamicForm
{
  type: "PROJECT",
  displayName: "Project",
  fields: [
    { key: "summary", label: "One-Line Summary", type: "textarea", required: true },
    { key: "techStack", label: "Technology Stack", type: "tags" },
    { key: "github", label: "GitHub Repository", type: "url" }
  ]
}
```

### 2. `AssetList.jsx` (Dynamic Asset Viewer & Toolbar)
Renders a grid or list of career assets across categories.
- **Dynamic Field Rendering:** Inspects the asset schema and displays key-value pairs appropriate for the asset type.
- **Copy-to-Clipboard Micro-interactions:** Built-in copy buttons for quick copying of project summaries, descriptions, and tech stacks for resume writing.
- **Asset Operations:** Toggle favorite (`favorite`), toggle archive state (`archived`), edit modal trigger, and delete confirmation.
- **Tag Integration:** Visual color-coded tag chips matching user-defined tags.

### 3. `DashboardLayout.jsx` (Application Shell)
Provides the primary interface layout for all protected routes:
- **Sidebar:** Collapsible side navigation linking to asset views (`/dashboard/projects`, `/dashboard/experience`, `/dashboard/skills`, etc.).
- **Top Navigation Bar:** Integrated search bar, user dropdown menu, theme toggle, and "Quick Add" trigger.
- **Mobile Drawer:** Responsive slide-over menu for mobile screen viewports.

---

## 7. Frontend Data Models & Interfaces

### 1. `User` State Model
```typescript
interface User {
  id: string;             // UUID v4
  username: string;       // Unique display username
  email: string;          // User email address
  isVerified?: boolean;   // Email verification flag
}
```

### 2. `Asset` Data Model
```typescript
interface Asset {
  id: string;             // UUID v4
  user_id: string;        // Owner User UUID
  asset_type: AssetType;  // Category Enum
  title: string;          // Asset title
  values: Record<string, any>; // Dynamic key-value payload adhering to schema
  favorite: boolean;      // Starred status flag
  archived: boolean;      // Archived status flag
  created_at: string;     // ISO Timestamp
  updated_at: string;     // ISO Timestamp
  tags?: Tag[];           // Associated tag list
}
```

### 3. `AssetType` Enum & Models

| AssetType Enum | Display Name | Core Dynamic Fields (`values` JSONB) |
| :--- | :--- | :--- |
| `PROJECT` | Project | `summary`, `description`, `techStack` (array), `github`, `liveDemo`, `role` |
| `WORK_EXPERIENCE` | Work Experience | `company`, `role`, `location`, `startDate`, `endDate`, `current` (boolean), `bullets` (array), `techStack` (array) |
| `SKILL` | Skill | `category` (Technical/Soft/Domain), `name`, `proficiency` (Beginner/Intermediate/Advanced/Expert), `yearsExperience` |
| `ACHIEVEMENT` | Achievement | `title`, `issuer`, `date`, `description`, `url` |
| `RESEARCH` | Research | `title`, `publication`, `date`, `doi`, `abstract` |
| `RESUME_ASSET` | Resume Asset | `section`, `heading`, `text`, `keyPoints` (array) |

### 4. `Tag` Data Model
```typescript
interface Tag {
  id: string;        // UUID v4
  user_id: string;   // Owner User UUID
  name: string;      // Tag name (e.g., "React", "Frontend", "2026")
  color?: string;    // Hex/Tailwind color token
}
```

### 5. `Session` Data Model
```typescript
interface Session {
  id: string;           // Session UUID v4
  user_id: string;      // User UUID
  device_name: string;  // Parsed User-Agent device description
  ip_address: string;   // Client IP address
  user_agent: string;   // Full User-Agent string
  last_used_at: string; // ISO Timestamp
  expires_at: string;   // Expiration ISO Timestamp
}
```

### 6. Standard API Response Structure
```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Array<{ field: string; message: string }>;
}
```

---

## 8. Routing & View Lifecycle

```
Routes Hierarchy (App.jsx)
│
├── Public Views (No Auth Required)
│   ├── GET /          ──> <Landing />      (Product Landing Page)
│   ├── GET /login     ──> <Login />        (Local & OAuth Login)
│   └── GET /register  ──> <Register />     (Account Creation)
│
└── Protected Dashboard Views (Wrapped in <DashboardLayout />)
    ├── GET /dashboard                 ──> <Dashboard />
    ├── GET /dashboard/projects        ──> <AssetPage assetType="PROJECT" />
    ├── GET /dashboard/experience      ──> <AssetPage assetType="WORK_EXPERIENCE" />
    ├── GET /dashboard/skills          ──> <AssetPage assetType="SKILL" />
    ├── GET /dashboard/achievements     ──> <AssetPage assetType="ACHIEVEMENT" />
    ├── GET /dashboard/research        ──> <AssetPage assetType="RESEARCH" />
    ├── GET /dashboard/resume-assets   ──> <AssetPage assetType="RESUME_ASSET" />
    ├── GET /dashboard/search          ──> <Search />
    └── GET /dashboard/settings        ──> <Settings />
```

---

## 9. UI Aesthetics & Performance Optimizations

1. **Vite Fast Refresh & Bundling:** Uses Vite with Hot Module Replacement (HMR) for instant development updates and chunk splitting during production build.
2. **Dynamic Component Re-use:** A single `<AssetPage />` component dynamically handles all 6 career asset domains based on props (`assetType`, `title`, `description`), keeping the codebase DRY and lightweight.
3. **Tailwind Glassmorphic Theme:**
   - Dark background: `#0f172a` (Slate-900) to `#020617` (Slate-950).
   - Frosted backdrop blur: `backdrop-blur-md bg-slate-900/60 border border-slate-800/80`.
   - Subtle glowing gradients: `bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20`.
4. **Debounced Search Inputs:** Search bars in `<Search.jsx>` and `<DashboardLayout.jsx>` debounce query changes to minimize network requests while typing.
