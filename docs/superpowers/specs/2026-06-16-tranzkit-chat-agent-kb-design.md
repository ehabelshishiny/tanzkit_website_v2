# Tranzkit Chat Agent KB Design

## Goal

Create a single bilingual Markdown knowledge base for the website chat agent so it can:

- explain Tranzkit clearly using published website language
- help visitors understand enterprise and operator solutions
- guide users to the right website pages
- answer pricing questions by routing users to the pricing page instead of inventing pricing

## Scope

Included:

- Home positioning
- Solutions parent page
- Solutions subpages
- Apps parent page
- Five app detail pages
- About page
- Resources hub
- FAQ
- Case studies page and published case study content
- Published blog content
- Navigation help for the main commercial and resource pages

Excluded:

- Contact page content
- New product claims not already supported by the site content
- Pricing details, implementation promises, or commercial terms not already published
- Internal support workflows, lead routing logic, or behavior policies beyond page guidance

## Output

Primary file:

- `docs/tranzkit-chat-agent-kb.md`

Format:

- one Markdown file
- bilingual English and Arabic in the same file
- intent-led main body
- page-index appendix

## Source of Truth

The KB should stay as close as practical to already approved and published wording from:

- `content/planning/homepage.v1.en-ar.json`
- `content/planning/solutions.v1.en-ar.json`
- `content/planning/solutions-operators-drivers.v1.en-ar.json`
- `content/planning/solutions-enterprises-passengers.v1.en-ar.json`
- `content/planning/apps.v2.en-ar.json`
- `content/planning/app.enterprise-dashboard.v1.en-ar.json`
- `content/planning/app.operator-dashboard.v1.en-ar.json`
- `content/planning/app.supervisor.v1.en-ar.json`
- `content/planning/app.driver.v1.en-ar.json`
- `content/planning/app.rider.v1.en-ar.json`
- `content/planning/about.v1.en-ar.json`
- `content/planning/case-studies/case-studies-page.v1.en-ar.json`
- `content/planning/case-studies/*.json`
- `content/planning/blogs/*.json`
- website FAQ and resources content already wired through Sanity

## KB Structure

### 1. Overview

Short explanation of what Tranzkit is, who it serves, and how to describe it consistently.

### 2. Core Intents

Main answer sections organized around what users ask:

- What is Tranzkit?
- Who is Tranzkit for?
- What problems does Tranzkit solve?
- How does Tranzkit help enterprises?
- How does Tranzkit help operators?
- How does Tranzkit connect planning, execution, attendance, tracking, and finance?
- What apps does Tranzkit offer?
- What is the difference between enterprise, operator, supervisor, driver, and rider workflows?
- What proof, case studies, and educational resources are available?

### 3. Solutions Guidance

Dedicated sections for:

- parent Solutions page summary
- Enterprises and Passengers summary
- Operators and Drivers summary

### 4. Apps Guidance

Dedicated sections for:

- Apps parent page
- Enterprise Dashboard
- Operator Dashboard
- Supervisor App
- Driver App
- Rider App

### 5. Trust and Background

Sections for:

- About Tranzkit
- why the platform exists
- operational and ERP background

### 6. Resource Guidance

Sections for:

- FAQ topics
- case studies themes
- blog themes
- when to send a user to resources instead of answering in one paragraph

### 7. Navigation Guidance

Page routing appendix with:

- page name
- URL path
- what the page helps with
- when the chat agent should send the user there

## Answer Block Template

Each KB topic should follow a consistent structure:

1. `Intent`
2. `English answer`
3. `Arabic answer`
4. `Related pages`
5. `Route when`

This keeps the file readable for humans and directly usable as chat-agent grounding content.

## Content Rules

- Reuse existing published wording wherever possible.
- Prefer shorter, high-clarity language over longer marketing copy.
- Do not introduce unsupported AI claims beyond approved language such as AI integrated platform, AI agents for navigation, visibility, reporting, validation support, and controlled data updates where those are already present in approved content.
- Keep enterprise and operator positioning concrete: planning, routes, schedules, assignments, attendance validation, live service, operators, suppliers, trips, drivers, vehicles, incidents, and financial visibility.
- Arabic should be natural and professional, not literal.
- Pricing answers must redirect to the pricing page and URL rather than summarizing price details from memory.

## Pricing Handling Rule

The KB should include a narrow rule:

- If a user asks about pricing, the agent should direct them to the pricing page URL and avoid quoting or inventing pricing details.

## Non-Goals

- No JSON export in this phase
- No widget prompt engineering in this phase
- No lead qualification script in this phase
- No chatbot behavior policy beyond content boundaries and routing guidance

## Validation Checklist

Before finalizing the KB:

- all included page families are covered
- English and Arabic are present for every major topic
- pricing is redirected, not answered directly
- Contact content is excluded
- wording stays aligned with approved site content
- no unsupported claims are introduced

## Implementation Plan

After approval of this spec:

1. gather the published/approved page wording from the listed source files
2. draft `docs/tranzkit-chat-agent-kb.md`
3. review for duplicated claims, missing page coverage, and EN/AR consistency
4. deliver the Markdown KB for chat-agent use
