---
name: The Big Tree Beauty Academy landing page
description: A white, photography-led academy prospectus with a plum frame and cream accents.
colors:
  plum: "#1b0717"
  plum-hover: "#2a0b1f"
  cream: "#f7e9df"
  rose: "#d98a72"
  gold: "#c9a86a"
  white: "#ffffff"
  mist: "#fcf7f3"
  ink: "#22101e"
  muted: "#6b5a62"
  line: "#efe3db"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.7vw, 2.35rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "12px"
  card: "16px"
  pill: "999px"
spacing:
  section: "clamp(3.5rem, 8vw, 6.5rem)"
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.plum-hover}"
  button-light:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.plum}"
    rounded: "{rounded.control}"
    padding: "13px 24px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
  input:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: The Big Tree Beauty Academy

## Overview

**Creative North Star: "The Academy Prospectus"**

The landing page reads like an institution's prospectus that happens to be full of real student work. Photography of the academy, the mentors and the students carries the page; the structure (courses, how you learn, admission steps, certification) makes it feel like an academy rather than a salon brochure. A white ground keeps it calm and professional, and plum frames it: the navbar, every primary action, the testimonial band and the footer.

**Key Characteristics:**
- White ground with faint plum-tinted bands for rhythm.
- Plum owns the frame and actions; cream appears only as a small accent.
- One modern sans, moderate headings, short copy.
- Rounded photo crops from the academy's own academy photographs.

## Colors

### Primary
- **Plum** (#1b0717): navbar, footer, testimonial band, every primary button and the contact card.

### Secondary
- **Cream** (#f7e9df): badges, active filters, icon discs and the light button on plum. Never a section background.

### Accents
- **Rose** (#d98a72): hover borders on cards. **Champagne gold** (#c9a86a): figures, headings and icons on plum.

### Neutral
- **White** (#ffffff) is the page. **Mist** (#fcf7f3) alternates bands and fills inputs. **Ink** (#22101e) is body text, **Muted** (#6b5a62) secondary text, **Line** (#efe3db) the single hairline border.

### Named Rules
**The Cream Is A Garnish Rule.** Cream marks small things (a badge, a chip, an icon disc). If it covers a region, it is wrong.

**The Plum Frames, White Breathes Rule.** Plum is for the frame and for actions; the content ground stays white.

## Typography

**Display and body font:** Manrope (fallback system-ui).

### Hierarchy
- **Display** (800, clamp 2.1 to 3.5rem, 1.08): the hero title and article titles.
- **Headline** (800, clamp 1.6 to 2.35rem, 1.15): section titles.
- **Title** (700, 1.125rem): card and step titles.
- **Body** (400, 1rem, 1.6): copy in muted or ink; leads cap at about 34rem.

### Named Rules
**The Quiet Headline Rule.** Headings stay at moderate sizes; the photographs lead.

## Layout

One 1280px frame with equal fluid gutters. Sections breathe with clamp(3.5rem, 8vw, 6.5rem). Photography sits in two-column splits (hero collage, why-us) or evenly in grids (learn, gallery, articles). Admission is a stepper that runs horizontal on desktop and vertical on phones.

## Elevation & Depth

Flat. Elevation is a hairline plum-tinted border (`#efe3db`) on cards and a step in background tone (white to mist). No shadows.

## Shapes

Photo crops and cards use 16px; buttons and inputs 12px; chips and avatars are pills or circles.

## Components

### Buttons
Plum fill with white text on white and mist grounds; cream fill with plum text on plum. 12px radius, bold 15px label, a trailing arrow nudges right on hover. A quiet text variant is used for secondary links.

### Chips
Cream pill with plum text for category labels on photos; the active filter is cream, inactive is mist.

### Cards / Containers
White, 16px radius, 1px line border, photo on top. Feature rows use mist fills with a cream icon disc.

### Inputs / Fields
Mist fill, 12px radius, line border; focus swaps to a plum border on white. Labels sit above in bold 14px.

### Navigation
Fixed plum bar with the logo on a white tile, five text links, the phone number and a cream "Enquire now" button. On phones a plum bottom bar offers Courses, Enquire and WhatsApp.

## Do's and Don'ts

### Do:
- Use the academy's real academy photographs for imagery.
- Keep copy short and let a photograph or icon carry the point.
- Take name, phone, email, address and social links from the app config only.

### Don't:
- Don't cover a region in cream or let it replace the white ground.
- Don't use shadows, gradients or glass.
- Don't add a kicker or eyebrow above a heading.
- Don't present unverified statistics or invented outcomes as fact (the stats band holds the client's original figures and must be confirmed).
