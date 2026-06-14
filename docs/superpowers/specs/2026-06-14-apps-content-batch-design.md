# Apps Content Batch Design

## Goal

Create draft-ready bilingual JSON content maps for:

- `/apps`
- `/apps/enterprise-dashboard`
- `/apps/operator-dashboard`
- `/apps/supervisor`
- `/apps/driver`
- `/apps/rider`

The output must match the existing Sanity schema, stay UI-safe with short headings and subtitles, and use marketing-ready, SEO-aware copy without unsupported claims.

## Source Of Truth

- Main apps page schema from [src/lib/sanity/queries.ts](/Users/ehabelshishiny/Documents/Apps/tanzkit_website_v2/src/lib/sanity/queries.ts)
- Main apps page route from [src/app/[locale]/(main)/apps/page.tsx](/Users/ehabelshishiny/Documents/Apps/tanzkit_website_v2/src/app/[locale]/(main)/apps/page.tsx)
- App detail page route pattern from [src/app/[locale]/(main)/apps/driver/page.tsx](/Users/ehabelshishiny/Documents/Apps/tanzkit_website_v2/src/app/[locale]/(main)/apps/driver/page.tsx) and sibling routes
- App detail rendering shape from [src/components/sections/apps/app-detail-original-template.tsx](/Users/ehabelshishiny/Documents/Apps/tanzkit_website_v2/src/components/sections/apps/app-detail-original-template.tsx)
- Existing apps planning format from [content/planning/apps.v1.en-ar.json](/Users/ehabelshishiny/Documents/Apps/tanzkit_website_v2/content/planning/apps.v1.en-ar.json)

## Schema Targets

### Main Apps Page

Target fields:

- `hero`
- `showcase`
- `cta`
- `seo`

Planning fields already used by the repo:

- `showcase.operatorAppSlugs`
- `showcase.enterpriseAppSlugs`

### App Detail Pages

Each app document must map only to the current `appBySlugQuery` shape:

- `name`
- `slug`
- `tagline`
- `description`
- `category`
- `layoutType`
- `benefits`
- `screenshots`
- `features`
- `steps`
- `platforms`
- `storeUrls`
- `cta`
- `seo`

## Positioning System

### Parent Page

`/apps` should position Tranzkit as the connected app system for every transport team, with each app covering one operational role inside the same bilingual operating platform.

### Detail Page Roles

- `enterprise-dashboard`: enterprise planning, attendance review, service control, financial visibility
- `operator-dashboard`: routes, schedules, assignments, supplier-linked execution control
- `supervisor`: field oversight, live follow-up, incident capture, execution discipline
- `driver`: trip execution, stop flow, attendance actions, route clarity
- `rider`: trip visibility, timing clarity, service updates, rider confidence

## Copy Rules

- Keep titles short enough for card and hero layouts.
- Keep subtitles compact and scannable.
- Use moderate AI framing only.
- AI should appear as guided workflow support, insights, validation, reporting, or navigation help.
- Do not claim autonomous decisions, self-running transport, or unsupported optimization.
- Arabic must be natural and business-friendly, not literal.
- English and Arabic should align strategically, not word-for-word.

## Content Structure Rules

### Main Apps Page

- Hero should stay short and ecosystem-led.
- Showcase should split clearly into operator and enterprise sides.
- App references must remain limited to:
  - `enterprise-dashboard`
  - `operator-dashboard`
  - `supervisor`
  - `driver`
  - `rider`
- CTA should stay compact and conversion-focused.
- SEO should target app ecosystem, transport workflows, and role-based execution.

### App Detail Pages

- `name`: short product label
- `tagline`: short role-specific promise
- `description`: concise value paragraph
- `benefits`: short list, scannable, operational
- `features`: compact titles and descriptions with clear workflow value
- `steps`: practical usage flow, not abstract process theory
- `cta`: short, direct, same page intent
- `seo`: page-specific, non-duplicative, keyword-aware

## File Plan

Planned output files:

- `content/planning/apps.v2.en-ar.json`
- `content/planning/app.enterprise-dashboard.v1.en-ar.json`
- `content/planning/app.operator-dashboard.v1.en-ar.json`
- `content/planning/app.supervisor.v1.en-ar.json`
- `content/planning/app.driver.v1.en-ar.json`
- `content/planning/app.rider.v1.en-ar.json`

## Assumptions

- No schema expansion is needed for this batch.
- Image fields can stay empty or omitted where no approved media exists.
- Existing published or draft app content is not overwritten in this phase until the user later asks for validation or draft seeding.
- This batch is content-only and should not change frontend code.

## Risks To Avoid

- Overlong hero or feature copy that breaks layout
- Repeating the same promise across all six pages
- Making rider, driver, and supervisor pages sound too similar
- Using AI language more aggressively than the product proof supports
- Writing fields not used by the current Sanity schema

## Acceptance Criteria

- Six JSON maps
- Bilingual English and Arabic content
- Short UI-safe headings and subtitles
- Moderate AI framing
- SEO-ready page metadata
- Exact schema alignment with current queries
- No unsupported product claims
