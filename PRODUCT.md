# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Prospective students of a beauty academy: mainly beginners (17 to 25) choosing beauty as a first career, often with family involved in the decision, and secondarily career changers or homemakers who want to freelance or open their own salon. They compare academies on a phone, want to see real classes and real student work, and need a clear way to enquire or join a course.

## Product Purpose
The Big Tree Beauty Academy trains makeup, hair, beauty, nail and cosmetology professionals. The landing page exists to turn a browsing visitor into an enquiry or enrolment. Success is a submitted contact form, a WhatsApp chat or a course seat requested.

## Positioning
Hands-on practice (live demonstrations, model work, studio practice), expert mentors who are working beauty professionals, and certification on completing a course.

## Operating Context
Content is managed in the console and served by the backend API: app config (name, phone, email, address, social links), courses, categories, gallery, testimonials and blog articles. The landing page reads all of it; nothing about the business is hardcoded in the frontend.

## Capabilities and Constraints
- Frontend: Next.js 16 (App Router), React 19, Tailwind 4, GSAP for motion. Console: React Router, shadcn/ui.
- App-config values (name, phone, email, address, social links) must come from the API only.
- Contact form posts to the backend; phone validation errors must be shown to the visitor.
- Placement rates, student counts and similar statistics are not backed by data and must not be invented.

## Brand Commitments
Primary colour plum `#1b0717`, secondary white. Logo: a terracotta and gold "B" in a circle with "The Big Tree Academy" wordmark. Voice: professional, encouraging, specific.

## Evidence on Hand
Real studio and class photos in `frontend/public/assets/images/` (instructor demonstrating on a model, students, styled models). Student work gallery, testimonials, courses and articles are fetched from the API. No videos, no accreditation logos, no verified outcome statistics.

## Product Principles
1. Show the studio and the students, not stock beauty imagery.
2. Every claim is something the academy can truthfully stand behind.
3. One clear action at any moment: enquire, call or chat.
4. Calm and professional beats decorative; the work is the decoration.
5. Mobile first: most visitors arrive on a phone.

## Accessibility & Inclusion
WCAG AA contrast, visible focus, reduced-motion support, readable text sizes on small screens.
