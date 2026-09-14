# A2P Verification Website Template

A static 6-page site (Home, About, Services, Service Area, Terms & Conditions,
Privacy Policy) plus a floating A2P-compliant chat widget, built for A2P 10DLC
campaign verification screenshots and for reuse across new Houzflow clients.

## Files

```
index.html         Home
about.html          About
services.html       Services
service-area.html   Service Area
terms.html          Terms & Conditions (your supplied copy, verbatim)
privacy.html        Privacy Policy (your supplied copy, verbatim)
assets/style.css    Design tokens + all layout/component styles
assets/site.js      Chat widget markup + open/close logic + mobile nav
```

No build step — deploy the folder as-is (e.g. to Cloudflare Pages, same as
the other niche templates).

## Onboarding a new client: fill in the custom fields

Every page uses `{{FIELD_NAME}}` placeholders. Find-and-replace these across
all `.html` files (and `assets/site.js` for the three widget fields). Nothing
else needs to change.

### Business identity
- `{{BUSINESS_NAME}}`
- `{{BUSINESS_INITIALS}}` — 1–2 letters for the logo mark/avatar
- `{{BUSINESS_ADDRESS}}`
- `{{BUSINESS_PHONE}}` — display format, e.g. (555) 555-5555
- `{{BUSINESS_PHONE_TEL}}` — tel: link format, e.g. +15555555555
- `{{BUSINESS_EMAIL}}`
- `{{LICENSE_NUMBER}}`
- `{{FOUNDING_YEAR}}`
- `{{YEARS_IN_BUSINESS}}`
- `{{JOBS_COMPLETED}}`
- `{{TAGLINE}}`
- `{{LAST_UPDATED_DATE}}` — legal pages

### Location / service area
- `{{SERVICE_CITY}}`, `{{SERVICE_STATE}}`
- `{{SERVICE_AREA_COUNT}}`, `{{RESPONSE_TIME}}`, `{{TRAVEL_RADIUS}}`
- `{{SERVICE_AREA_EXAMPLE_1..4}}` — used on the home page teaser
- `{{SERVICE_AREA_TOWN_1..9}}` — full list on service-area.html
- `{{SERVICE_AREA_SUBHEAD}}`

### Home page
- `{{PRIMARY_SERVICE}}`, `{{HERO_HEADLINE}}`, `{{HERO_SUBHEAD}}`
- `{{HERO_IMAGE_URL}}`, `{{HERO_IMAGE_CAPTION}}`
- `{{SERVICES_SECTION_HEADLINE}}`
- `{{CTA_HEADLINE}}`, `{{CTA_SUBHEAD}}`

### Services (short copy used on Home, long copy on Services page)
- `{{SERVICE_1_NAME}}` / `{{SERVICE_1_DESC}}` / `{{SERVICE_1_DESC_LONG}}`
- `{{SERVICE_2_NAME}}` / `{{SERVICE_2_DESC}}` / `{{SERVICE_2_DESC_LONG}}`
- `{{SERVICE_3_NAME}}` / `{{SERVICE_3_DESC}}` / `{{SERVICE_3_DESC_LONG}}`
- `{{SERVICE_4_NAME}}` / `{{SERVICE_4_DESC_LONG}}`
- `{{SERVICES_HEADLINE}}`, `{{SERVICES_SUBHEAD}}`
- `{{PROCESS_STEP_1_DESC}}`, `{{PROCESS_STEP_2_DESC}}`, `{{PROCESS_STEP_3_DESC}}`

### About page
- `{{ABOUT_HEADLINE}}`, `{{ABOUT_SUBHEAD}}`
- `{{ABOUT_STORY_PARAGRAPH_1}}`, `{{ABOUT_STORY_PARAGRAPH_2}}`
- `{{ABOUT_IMAGE_URL}}`, `{{ABOUT_IMAGE_CAPTION}}`
- `{{VALUE_1_TITLE}}` / `{{VALUE_1_DESC}}` (×3)
- `{{WARRANTY_LENGTH}}`, `{{WARRANTY_DESC}}`

### Legal (content is your supplied copy verbatim — only the bracketed
business fields above are templated; message body text was left untouched)

## The A2P chat widget

`assets/site.js` injects one shared widget (phone field, message box, the two
consent checkboxes with the exact opt-in language you provided, and a Send
button) into every page on load. It is not duplicated per page — one
component, one source of truth.

- **Any element with the `data-chat-open` attribute opens it.** Every
  "Contact us" / "Get a Free Quote" / "Call us" — style button already has
  this attribute wired up (header, footer, and in-page CTAs), so adding a new
  contact button anywhere is just `<a href="#" data-chat-open>...</a>`.
- The two checkboxes link to `terms.html` and `privacy.html` and reproduce
  your supplied informational/transactional and promotional opt-in language
  exactly, including "Text HELP for help and STOP to unsubscribe."
- The informational/transactional checkbox is `required`; the promotional
  one is optional, matching separate-consent best practice.
- Form submission currently just shows a "message sent" success state
  in-widget. Wire the real endpoint by uncommenting/editing the `fetch(...)`
  call inside the `submit` handler in `assets/site.js` (e.g. a GHL inbound
  webhook).

## Design

Industrial/trade-contractor palette (ink navy, warm safety-orange accent,
off-white paper) with Archivo for headings and Source Sans 3 for body text,
loaded from Google Fonts. Colors and type live as CSS custom properties at
the top of `assets/style.css` if you want to re-skin per client instead of
reusing one look for all.
