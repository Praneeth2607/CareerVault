# Design.md

# CareerVault Design System

**Version:** 1.0

**Status:** Approved

---

# 1. Design Philosophy

CareerVault is designed as a premium productivity platform focused on trust, organization, and clarity. Users store professional information that may represent years of work, including projects, internships, research, certifications, and achievements. The interface should reinforce confidence through a calm, refined visual language.

The design should never feel cluttered or overly decorative. Every element must serve a purpose and help users retrieve or manage information quickly.

### Design Principles

* Simplicity over complexity.
* Consistency across every screen.
* Security should be visible.
* Information should be easy to scan.
* Actions should require minimal effort.
* Every component should feel responsive and polished.

---

# 2. Visual Identity

## Brand Personality

CareerVault should feel:

* Professional
* Trustworthy
* Warm
* Modern
* Organized
* Calm

Avoid styles that appear playful, overly futuristic, or heavily animated.

---

# 3. Design Language

The application uses **Soft Neomorphism**.

Characteristics:

* Rounded corners
* Gentle shadows
* Soft lighting
* Low contrast surfaces
* Comfortable spacing
* Minimal borders

Avoid:

* Glassmorphism
* Neon effects
* Heavy gradients
* Sharp edges
* Excessive shadows

---

# 4. Color Palette

## Primary

Dark Wine

```
#6F1D1B
```

Primary action buttons

Active states

Important highlights

---

## Secondary

Camel

```
#BB9457
```

Secondary buttons

Badges

Navigation highlights

---

## Heading Color

Dark Coffee

```
#432818
```

Primary headings

Icons

Navigation text

---

## Accent

Chocolate Brown

```
#99582A
```

Hover states

Charts

Interactive accents

---

## Background

Primary Background

```
#FFFAEE
```

Secondary Background

```
#FFF5DC
```

Card Background

```
#FFF8E6
```

---

## Semantic Colors

Success

```
#3A7D44
```

Warning

```
#E09F3E
```

Error

```
#C44536
```

Info

```
#457B9D
```

---

# 5. Typography

## Font Family

### Headings

Outfit

Fallback

```
sans-serif
```

### Body

Inter

Fallback

```
sans-serif
```

---

## Font Scale

Display

48px

Hero Heading

40px

H1

32px

H2

28px

H3

24px

H4

20px

Body Large

18px

Body

16px

Small

14px

Caption

12px

---

## Font Weight

Regular

400

Medium

500

Semi Bold

600

Bold

700

---

# 6. Spacing System

Base Unit

```
8px
```

Spacing Scale

```
4

8

12

16

24

32

40

48

64

80
```

---

# 7. Border Radius

Small

```
12px
```

Medium

```
18px
```

Large

```
24px
```

Extra Large

```
32px
```

Buttons

```
18px
```

Cards

```
24px
```

Modal

```
28px
```

---

# 8. Shadows

Raised Component

```
-8px -8px 16px rgba(255,255,255,0.7)

8px 8px 16px rgba(67,40,24,0.15)
```

Pressed Component

```
inset 4px 4px 8px rgba(67,40,24,0.15)

inset -4px -4px 8px rgba(255,255,255,0.8)
```

Hover

Increase shadow by approximately 20%.

---

# 9. Icons

Library

Lucide React

Style

Outline

Stroke Width

2px

Icon Size

16

20

24

32

Do not mix icon libraries.

---

# 10. Buttons

## Primary Button

Background

Dark Wine

Text

Light Apricot

Radius

18px

Padding

```
14px 24px
```

Hover

Slight lift

Darker background

Transition

200ms

---

## Secondary Button

Camel

Dark Coffee text

Raised appearance

---

## Ghost Button

Transparent

Dark Coffee text

Hover

Light background

---

## Danger Button

Dark Wine

White text

Confirmation required before destructive actions.

---

# 11. Inputs

Style

Inset Neomorphism

Height

48px

Radius

16px

Padding

16px

Focus

Dark Wine outline

Helper text below field

Password visibility toggle

Character count for long text

---

# 12. Cards

Every major feature uses cards.

Cards contain

Title

Description

Actions

Metadata

Soft elevation

Hover lift

Rounded corners

---

# 13. Navigation

Desktop

Top Navigation

Logo

Features

About

Pricing

Contact

Login

After login

Dashboard

Projects

Experience

Skills

Research

Achievements

Settings

Profile

Logout

---

# 14. Landing Page

Sections

Hero

Features

Benefits

Testimonials (future)

FAQ

Call To Action

Footer

---

## Hero

Large headline

Supporting text

Primary button

Secondary button

Illustration

---

# 15. Authentication Modal

Centered

Blurred background

Large card

Contains

Login

Register

Forgot Password

Google

GitHub

Divider

Remember Me

Privacy statement

---

# 16. Dashboard

Header

Greeting

Search

Notification

Profile

---

Cards

Projects

Experience

Skills

Research

Achievements

Recent Activity

Quick Actions

---

# 17. Module Pages

Every module follows the same structure.

Header

Search

Filters

Sort

Grid/List toggle

Content

Pagination

Floating Add button

---

# 18. Tables

Rounded

Soft borders

Alternating row colors

Sticky header

Search

Pagination

Bulk selection

---

# 19. Forms

Maximum width

720px

Grouped into sections

Validation below input

Autosave indicator (future)

Progress indicator for long forms

---

# 20. Modals

Used for

Delete confirmation

Edit

Quick Add

Session management

Width

640px

Rounded

28px

Soft shadow

Escape closes modal

---

# 21. Toast Notifications

Position

Top Right

Duration

3 seconds

Types

Success

Warning

Error

Information

---

# 22. Animations

Duration

200–250ms

Use

Fade

Scale

Slide

Hover Lift

Never animate layout unnecessarily.

Respect the user's reduced motion preference.

---

# 23. Responsive Breakpoints

Mobile

0–639px

Tablet

640–1023px

Desktop

1024–1439px

Large Desktop

1440px+

---

# 24. Accessibility

Minimum contrast ratio

WCAG AA

Keyboard navigation

Visible focus states

ARIA labels

Screen reader compatibility

Large click targets

Minimum touch target

44×44px

---

# 25. Empty States

Every page should provide meaningful empty states.

Example:

Projects

"No projects yet."

Button

Create Your First Project

Avoid empty screens.

---

# 26. Loading States

Skeleton loaders

Never use large spinning indicators.

Use shimmer placeholders where possible.

---

# 27. Error States

Friendly messages

Recovery action

Retry button

Support link

Never expose server errors directly to users.

---

# 28. Security Indicators

Display:

* Last login
* Active sessions
* Connected providers
* Password last updated
* Two-factor authentication status (future)

These indicators should be visible within account settings to reassure users.

---

# 29. Future Design Extensions

The design system should accommodate future additions without major redesign.

Planned extensions include:

* AI assistant
* Resume builder
* Browser extension
* Public portfolio pages
* Team workspaces
* Dark mode
* Mobile application

---

# 30. Tailwind CSS Design Tokens

## Colors

Primary

```
dark_wine
```

Secondary

```
camel
```

Accent

```
chocolate_brown
```

Heading

```
dark_coffee
```

Background

```
light_apricot
```

## Radius

```
rounded-xl

rounded-2xl

rounded-3xl
```

## Shadows

```
shadow-soft

shadow-neomorphic

shadow-pressed
```

Custom utilities should be defined in the Tailwind configuration to ensure consistent styling across the application.

---

# 31. Design Goals

Every screen should answer these questions:

* Can the user understand the purpose within five seconds?
* Is the primary action obvious?
* Is the layout consistent with the rest of the application?
* Does the interface communicate trust?
* Is the content easy to scan?
* Can the user complete their task with minimal clicks?

If the answer to any of these questions is "No," the design should be revised before implementation.
