**Blog Audit**

The published Sanity blog library currently contains `10` posts. All ten have valid slugs, excerpts, authors, and SEO fields, but the body content is thin across the board and every published post is missing a `featuredImage`.

Key gaps found:

- Most posts currently contain only a short opening thought plus one short bullet list.
- English and Arabic are structurally present, but several pieces read more like content seeds than full editorial articles.
- Multiple blog category labels in Sanity still look generated rather than intentionally named.
- Featured images are missing on all published posts, which weakens both blog cards and article page presentation.

**What Was Prepared**

- `content/planning/blogs/*.v1.en-ar.json`
  Draft-ready bilingual content maps for every published blog post.
- `content/planning/blog-images/*.image-brief.json`
  One image brief per blog with title, purpose, visual direction, alt text, and required dimensions.

**Content Direction**

The rewrite approach stays conservative on URL structure and topic intent:

- Existing slugs are preserved.
- Existing topics are preserved.
- Copy is expanded into stronger, more readable EN/AR editorial content.
- SEO is tightened without introducing unsupported claims.
- Arabic is adapted for natural business readability rather than literal translation.

**Recommended Next Steps**

1. Review and approve the draft-ready JSONs post by post.
2. Produce images from the matching image brief files at `1200x675`.
3. Normalize category naming in Sanity before publishing the upgraded blog library.
4. Seed blog drafts only after image assets are ready or after approving a text-only draft workflow that preserves missing image state safely.

**Category Cleanup Recommendation**

Several live category labels appear auto-generated and should be editorially normalized later, especially:

- `employee-transport-erp`
- `operations-control`
- `billing-settlement`
- `analytics-kpis`
- `fleet-vendor-management`
- `route-optimization`

Those slugs can stay if needed, but the visible English and Arabic names should be polished in Sanity before the blog library is considered final.
