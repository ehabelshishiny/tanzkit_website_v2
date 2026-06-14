# Sanity MCP Codex Setup

## Purpose

This local MCP server is for Tranzkit Sanity content planning, query inspection, validation, and safe draft seeding.

Phase one is draft-only. Publishing is blocked.

## Required Env Vars

Set these in the repository root `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`

Do not commit `.env` values.

## Local Commands

Build the server:

```bash
npm run mcp:sanity:build
```

Start the local MCP server over stdio:

```bash
npm run mcp:sanity:start
```

Inspect the website CMS query map:

```bash
npm run mcp:sanity:inspect
```

Validate a sample content map:

```bash
npm run sanity:content:validate
```

Validate a different file:

```bash
node mcp/sanity-content-server/dist/cli-validate.js path/to/file.json
```

## MCP Agent Connection

Connect the server as a local stdio MCP process. Example shape for an MCP-capable coding agent:

```json
{
  "mcpServers": {
    "tranzkit-sanity-content": {
      "command": "node",
      "args": [
        "/absolute/path/to/tanzkit_website_v2/mcp/sanity-content-server/dist/index.js"
      ],
      "cwd": "/absolute/path/to/tanzkit_website_v2"
    }
  }
}
```

Build first, then point the agent to the compiled `dist/index.js`.

## Tool List

- `getSanityConfig`
- `inspectWebsiteCmsQueries`
- `readCurrentPageContent`
- `validateContentMap`
- `previewSanityMutation`
- `draftPageContent`
- `publishSanityDraft`

`publishSanityDraft` is intentionally blocked and always returns:

`Publishing is disabled in phase one. Create drafts only.`

## Safety Rules

- Never write published Sanity documents directly.
- Only write to draft IDs such as `drafts.<documentId>`.
- Use `createIfNotExists` plus `patch`.
- Validate content maps before write attempts.
- Keep publishing disabled in this phase.
- Keep tokens in environment variables only.

## Media Ownership and Transfer

- `Codefy OS` is the media source repository for approved Tranzkit visual outputs.
- `tanzkit_website_v2` is the Sanity CMS owner repository.
- `Codefy OS` does not write to Sanity for this website workflow.
- Approved media should be transferred into this repository before any Sanity upload step.
- Use `content/media/staging/tranzkit/` as the local staging area for approved assets before upload.
- After upload from this repository, map the returned Sanity asset reference into the relevant planning file such as `homepage-media.v1.json` or `solutions-media.v1.json`.

## Draft-Only Workflow

1. Run `npm run mcp:sanity:build`.
2. Start the server with `npm run mcp:sanity:start`.
3. Use `inspectWebsiteCmsQueries` to confirm the page/document map.
4. Use `validateContentMap` on the planned JSON content map.
5. Use `previewSanityMutation` to review the draft-only mutation plan.
6. Use `draftPageContent` with `dryRun: true` first.
7. Use `draftPageContent` with `dryRun: false` only after the preview looks correct.

## Future Publishing Workflow

Publishing should be added later as a separate phase after:

- schema coverage is confirmed for all target documents
- approval rules are defined
- draft review workflow is agreed
- publish permissions and rollback rules are documented

When phase two starts, publishing should remain a separate tool with explicit approval and validation gates.
