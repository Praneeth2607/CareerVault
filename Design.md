# CareerVault Design System

**Version:** 2.0  
**Status:** Approved  
**Language:** Modern Editorial Minimal  

---

# 1. Design Philosophy

CareerVault is designed as a premium, typography-first professional asset repository. It aims to deliver a calm, clear, and highly professional space for users to document their lifetime achievements, projects, skills, research, and work experiences. The visual design is influenced by clean editorial styles (like Linear, Notion, and Stripe documentation), with a warmer personality suited for career portfolios.

The design principles are:
* **Typography-first**: Visual hierarchy is created using whitespace and typography size, not shadows or colored panels.
* **Subtle Borders over Shadows**: Containers use thin `1px` borders instead of soft neomorphic shadows.
* **Spacious Gaps**: Generous layout margins and spacing systems.
* **Handcrafted Quality**: Visual layouts are structured, deliberate, and clean.

---

# 2. Visual Identity

## Brand Personality
* Premium
* Calm
* Professional
* Warm
* Minimal
* Typography-first

Avoid styles that appear playful, heavily animated, neomorphic, or generic "AI dashboard" templates.

---

# 3. Color Palette

Never use a dark theme. Never use bright gradients as backgrounds.

## Primary Action Color
**Dark Wine**
```text
#6F1D1B
```
Used for:
* Primary action buttons
* Active navigation text
* Key headers

## Secondary Accent Color
**Camel**
```text
#BB9457
```
Used for:
* Secondary highlights
* Focus borders
* Badges

## Heading Color
**Dark Coffee**
```text
#432818
```
Used for:
* All titles and primary headings
* Standard text colors
* Primary icons

## Border Color
**Subtle Sand**
```text
#E6DED3
```
Used for:
* 1px container dividers
* Input fields borders (inactive)
* Card outlines

## Background Colors
* **Primary Background**: `#FAF7F2` (Warm linen canvas)
* **Surface/Card Background**: `#F3EEE7` (Slightly warmer, soft clay surface)

## Semantic Colors
* **Success**: `#3A7D44`
* **Warning**: `#E09F3E`
* **Error**: `#C44536`
* **Info**: `#457B9D`

---

# 4. Typography

## Font Family
* **Headings**: `Outfit`, sans-serif (Bold, high tracking-tight, primary visual weight)
* **Body Text**: `Inter`, sans-serif (Clean, readable, generous line height)

## Font Weight Scale
* Regular: `400`
* Medium: `500`
* Semi Bold: `600`
* Bold: `700`

---

# 5. Spacing System

A consistent **8px** spacing system is utilized. All padding, margins, and gaps must follow this scale:
* `8px`
* `16px`
* `24px`
* `32px`
* `40px`
* `48px`
* `64px`
* `80px`

Whitespace is used as the primary tool to group items and create visual hierarchies.

---

# 6. Border Radius

Rounded corners should be kept between **18px and 20px** for core containers.
* **Cards**: `20px`
* **Buttons**: `18px`
* **Modals**: `20px`
* **Inputs**: `16px`

---

# 7. Shadows

Do **not** use default shadows or elevation on cards and containers. Use `1px` subtle borders (`#E6DED3`) on all panels.

---

# 8. Component Specifications

## Buttons
* **Primary**: Filled with Dark Wine (`#6F1D1B`), text colored in Linen (`#FAF7F2`). Rounded `18px`.
* **Secondary**: Transparent background, border outline in Dark Wine or Camel, text in Heading color.
* **Ghost**: Text-only, light padding, transparent background. Focus ring on tabs.

## Cards
* Warm surface background (`#F3EEE7`).
* Thin border outline (`#E6DED3`).
* No shadows.
* Hover state transitions opacity or shifts border color.

## Inputs
* Soft filled background (`#F3EEE7`).
* Thin borders (`#E6DED3`).
* Rounded `16px`.
* Active focus state shows a visible focus ring (`ring-2 ring-primary/40`).

## Modals
* Centered floating panel (`max-w-2xl`).
* Blurred backdrop overlay.
* Clean spacing with Outfit headers and a sticky footer containing form actions.

---

# 9. Layouts

## Landing Page
* **Minimal navigation**: Topbar with clean logo and login triggers.
* **Hero**: Strong typography-first headings, bold descriptive summary, and dual CTA buttons.
* **Feature Grid**: Simple structured grids presenting modules.
* **Product Preview**: Beautiful inline HTML preview components mimicking the application dashboard.
* **Security Section**: Reassurance of active session monitoring.
* **Footer**: Clean copyright and links.

## Dashboard
* **Greeting Header**: Personalized greeting in large Outfit font.
* **Universal Search**: Centered input box with visible focus ring.
* **Asset Overview**: Horizontal grid of asset stats.
* **Recent Assets**: List of the 5 most recently updated records.
* **Quick Actions**: Prompt triggers for creating new entries.

## Asset Editor
* **Document-like Experience**: Centered form, comfortable reading width, ample spacing.
* **Sticky Save Button**: In the form footer, always visible.
* **Individual Copy Buttons**: Copy icon next to every single field so values can be extracted immediately.

---

# 10. Motion

Use subtle transitions only. No bounce animations.
* **Duration**: 180ms - 250ms
* **Properties**: Opacity, small translateY (e.g. `translate-y-[-2px]`), border color.
* Respect user preferences for reduced motion.

---

# 11. Accessibility

* **Contrast**: All elements must satisfy WCAG AA contrast.
* **Touch Targets**: Minimum target size of `44px × 44px`.
* **Focus States**: Clear focus outline (`ring-2 ring-primary/40`) on keyboard navigation.
* **Aria Attributes**: Meaningful empty states and description text.
