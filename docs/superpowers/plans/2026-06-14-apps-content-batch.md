# Apps Content Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create six draft-ready bilingual JSON content maps for the main Apps page and the five Sanity-backed app detail pages using the existing schema only.

**Architecture:** Reuse the repo's current planning JSON format and write one content map per target page. Keep the main Apps page aligned to the current `appsPage` schema, and keep each app detail file aligned to the current `appBySlugQuery` projection so future draft seeding can map directly without schema changes.

**Tech Stack:** Next.js App Router, Sanity content model, JSON planning files, repo-local content conventions

---

## File Structure

**Create:**

- `content/planning/apps.v2.en-ar.json`
- `content/planning/app.enterprise-dashboard.v1.en-ar.json`
- `content/planning/app.operator-dashboard.v1.en-ar.json`
- `content/planning/app.supervisor.v1.en-ar.json`
- `content/planning/app.driver.v1.en-ar.json`
- `content/planning/app.rider.v1.en-ar.json`

**Reference while writing:**

- `content/planning/apps.v1.en-ar.json`
- `content/planning/solutions.v1.en-ar.json`
- `content/planning/solutions-operators-drivers.v1.en-ar.json`
- `content/planning/solutions-enterprises-passengers.v1.en-ar.json`
- `src/lib/sanity/queries.ts`
- `src/components/sections/apps/app-detail-original-template.tsx`

**Do not modify:**

- Frontend component files
- Sanity query files
- Existing draft content maps unless a follow-up task explicitly asks for revisions

### Task 1: Refresh the main Apps page map

**Files:**

- Create: `content/planning/apps.v2.en-ar.json`
- Reference: `content/planning/apps.v1.en-ar.json`
- Reference: `src/lib/sanity/queries.ts:686-757`

- [ ] **Step 1: Create the base file using the existing Apps page structure**

```json
{
  "pageKey": "apps",
  "action": "draft",
  "hero": {},
  "showcase": {},
  "cta": {},
  "seo": {}
}
```

- [ ] **Step 2: Write shorter hero copy with ecosystem positioning**

```json
"hero": {
  "titlePart1": { "en": "Connected", "ar": "تطبيقات نقل" },
  "titlePart2": { "en": "transport apps", "ar": "مترابطة" },
  "titlePart3": { "en": "for every team", "ar": "لكل فريق" },
  "subtitle": {
    "en": "Give each transport team the workflow it needs for planning, execution, visibility, and trip service in one bilingual platform.",
    "ar": "امنح كل فريق في النقل سير العمل الذي يحتاجه للتخطيط والتنفيذ والرؤية وجودة الخدمة داخل منصة واحدة بالإنجليزية والعربية."
  }
}
```

- [ ] **Step 3: Keep the supported showcase segments and app references only**

```json
"showcase": {
  "title": {
    "en": "Apps that work together across one operation",
    "ar": "تطبيقات تعمل معًا داخل عملية نقل واحدة"
  },
  "subtitle": {
    "en": "Choose the side you manage to see the dashboards and mobile workflows connected through the same operating layer.",
    "ar": "اختر الجانب الذي تديره لتتعرف على اللوحات والتطبيقات الميدانية المرتبطة عبر نفس طبقة التشغيل."
  },
  "operatorsSegment": {
    "title": {
      "en": "Operator control and field execution",
      "ar": "تحكم المشغل والتنفيذ الميداني"
    },
    "description": {
      "en": "Run routes, schedules, assignments, drivers, vehicles, and trip status from connected workflows.",
      "ar": "أدر الخطوط والجداول والتخصيصات والسائقين والمركبات وحالة الرحلات من خلال سير عمل مترابط."
    },
    "tabLabel": { "en": "Operators", "ar": "المشغلون" }
  },
  "enterpriseSegment": {
    "title": {
      "en": "Enterprise control and rider visibility",
      "ar": "تحكم الشركة ورؤية الراكب"
    },
    "description": {
      "en": "Plan demand, review service delivery, and give riders clearer trip visibility through one service model.",
      "ar": "خطط الطلب وراجع تنفيذ الخدمة وامنح الركاب رؤية أوضح للرحلات عبر نموذج خدمة واحد."
    },
    "tabLabel": { "en": "Enterprise", "ar": "الشركات" }
  },
  "operatorAppSlugs": ["operator-dashboard", "supervisor", "driver"],
  "enterpriseAppSlugs": ["enterprise-dashboard", "rider"]
}
```

- [ ] **Step 4: Tighten CTA and SEO fields**

```json
"cta": {
  "heading": {
    "en": "See which Tranzkit apps fit your operation",
    "ar": "اكتشف تطبيقات ترانزكيت المناسبة لعمليتك"
  },
  "subtitle": {
    "en": "Connect enterprise control, operator execution, field follow-up, driver workflows, and rider service in one rollout.",
    "ar": "اربط تحكم الشركة وتشغيل المشغلين والمتابعة الميدانية وسير عمل السائقين وخدمة الركاب ضمن إطلاق واحد."
  }
},
"seo": {
  "metaTitle": {
    "en": "Employee transport apps for every operating team | Tranzkit",
    "ar": "تطبيقات نقل الموظفين لكل فريق تشغيل | ترانزكيت"
  },
  "metaDescription": {
    "en": "Explore Tranzkit apps for enterprise control, operator execution, supervisor follow-up, driver workflows, and rider trip visibility.",
    "ar": "استكشف تطبيقات ترانزكيت لتحكم الشركات وتشغيل المشغلين ومتابعة المشرفين وسير عمل السائقين ورؤية الركاب للرحلات."
  }
}
```

- [ ] **Step 5: Save and sanity-check JSON structure**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/planning/apps.v2.en-ar.json','utf8')); console.log('apps.v2 ok')"`
Expected: `apps.v2 ok`

- [ ] **Step 6: Commit**

```bash
git add content/planning/apps.v2.en-ar.json
git commit -m "content: add revised apps page map"
```

### Task 2: Create the Enterprise Dashboard app map

**Files:**

- Create: `content/planning/app.enterprise-dashboard.v1.en-ar.json`
- Reference: `src/lib/sanity/queries.ts:318-368`

- [ ] **Step 1: Create the base app document shape**

```json
{
  "pageKey": "app",
  "slug": "enterprise-dashboard",
  "action": "draft",
  "name": {},
  "tagline": {},
  "description": {},
  "category": "enterprise",
  "layoutType": "landscape",
  "benefits": { "en": [], "ar": [] },
  "screenshots": [],
  "features": [],
  "steps": [],
  "platforms": {},
  "storeUrls": {},
  "cta": {},
  "seo": {}
}
```

- [ ] **Step 2: Write concise enterprise-control positioning**

```json
"name": { "en": "Enterprise Dashboard", "ar": "لوحة الشركة" },
"tagline": {
  "en": "Plan demand, review service, and track financial visibility",
  "ar": "خطط الطلب وراجع الخدمة وتابع الرؤية المالية"
},
"description": {
  "en": "Use one enterprise workspace for employee transport demand, attendance review, operator follow-up, service quality, and financial review.",
  "ar": "استخدم مساحة عمل واحدة للشركة لإدارة طلب نقل الموظفين ومراجعة الحضور ومتابعة المشغلين وجودة الخدمة والمراجعة المالية."
}
```

- [ ] **Step 3: Add short benefits, features, and steps**

```json
"benefits": {
  "en": [
    "Plan employee transport demand by site and shift",
    "Review attendance, service, and operator delivery",
    "Track pricing, invoices, and payment context",
    "Keep finance and service review in one view"
  ],
  "ar": [
    "خطط طلب نقل الموظفين حسب الموقع والوردية",
    "راجع الحضور والخدمة وتنفيذ المشغلين",
    "تابع التسعير والفواتير وسياق المدفوعات",
    "اجمع المالية ومراجعة الخدمة في شاشة واحدة"
  ]
}
```

- [ ] **Step 4: Add direct CTA and SEO**

```json
"cta": {
  "heading": {
    "en": "See enterprise transport control in action",
    "ar": "اكتشف تحكم الشركة في النقل عمليًا"
  },
  "subtitle": {
    "en": "Review planning, service quality, attendance, and finance in one enterprise workflow.",
    "ar": "راجع التخطيط وجودة الخدمة والحضور والمالية ضمن سير عمل مؤسسي واحد."
  }
}
```

- [ ] **Step 5: Save and verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/planning/app.enterprise-dashboard.v1.en-ar.json','utf8')); console.log('enterprise app ok')"`
Expected: `enterprise app ok`

- [ ] **Step 6: Commit**

```bash
git add content/planning/app.enterprise-dashboard.v1.en-ar.json
git commit -m "content: add enterprise dashboard app map"
```

### Task 3: Create the Operator Dashboard app map

**Files:**

- Create: `content/planning/app.operator-dashboard.v1.en-ar.json`
- Reference: `src/lib/sanity/queries.ts:318-368`

- [ ] **Step 1: Create the operator app file**

```json
{
  "pageKey": "app",
  "slug": "operator-dashboard",
  "action": "draft",
  "category": "operators",
  "layoutType": "landscape",
  "screenshots": [],
  "features": [],
  "steps": [],
  "platforms": {},
  "storeUrls": {},
  "cta": {},
  "seo": {}
}
```

- [ ] **Step 2: Write short operator-control copy**

```json
"name": { "en": "Operator Dashboard", "ar": "لوحة المشغل" },
"tagline": {
  "en": "Control routes, schedules, assignments, and trip execution",
  "ar": "تحكم في الخطوط والجداول والتخصيصات وتنفيذ الرحلات"
},
"description": {
  "en": "Run daily transport execution with clearer control over routes, schedules, drivers, vehicles, suppliers, and service status.",
  "ar": "أدر التشغيل اليومي للنقل بتحكم أوضح في الخطوط والجداول والسائقين والمركبات والموردين وحالة الخدمة."
}
```

- [ ] **Step 3: Add benefits, features, and steps focused on execution**

```json
"benefits": {
  "en": [
    "Run routes and schedules from one dashboard",
    "Assign drivers, vehicles, and suppliers faster",
    "Track live service and issue follow-up",
    "Review trip results with financial context"
  ],
  "ar": [
    "أدر الخطوط والجداول من لوحة واحدة",
    "خصص السائقين والمركبات والموردين بسرعة أكبر",
    "تابع الخدمة المباشرة ومعالجة المشكلات",
    "راجع نتائج الرحلات مع السياق المالي"
  ]
}
```

- [ ] **Step 4: Add CTA and SEO**

```json
"cta": {
  "heading": {
    "en": "See how operators run daily transport with Tranzkit",
    "ar": "اكتشف كيف يدير المشغلون النقل اليومي عبر ترانزكيت"
  },
  "subtitle": {
    "en": "Connect assignments, live service, trip follow-up, and supplier finance in one operator workflow.",
    "ar": "اربط التخصيصات والخدمة المباشرة ومتابعة الرحلات ومالية الموردين داخل سير عمل واحد للمشغل."
  }
}
```

- [ ] **Step 5: Save and verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/planning/app.operator-dashboard.v1.en-ar.json','utf8')); console.log('operator app ok')"`
Expected: `operator app ok`

- [ ] **Step 6: Commit**

```bash
git add content/planning/app.operator-dashboard.v1.en-ar.json
git commit -m "content: add operator dashboard app map"
```

### Task 4: Create the Supervisor app map

**Files:**

- Create: `content/planning/app.supervisor.v1.en-ar.json`
- Reference: `src/lib/sanity/queries.ts:318-368`

- [ ] **Step 1: Create the supervisor app file**

```json
{
  "pageKey": "app",
  "slug": "supervisor",
  "action": "draft",
  "category": "operators",
  "layoutType": "portrait",
  "screenshots": [],
  "features": [],
  "steps": [],
  "platforms": {},
  "storeUrls": {},
  "cta": {},
  "seo": {}
}
```

- [ ] **Step 2: Write short field-oversight copy**

```json
"name": { "en": "Supervisor App", "ar": "تطبيق المشرف" },
"tagline": {
  "en": "Follow field execution and resolve issues faster",
  "ar": "تابع التنفيذ الميداني وعالج المشكلات بسرعة"
},
"description": {
  "en": "Give supervisors a clearer view of live service, route progress, field checks, incidents, and team follow-up during the day.",
  "ar": "امنح المشرفين رؤية أوضح للخدمة المباشرة وتقدم الخطوط وعمليات التحقق الميداني والحوادث ومتابعة الفرق خلال اليوم."
}
```

- [ ] **Step 3: Add benefits, features, and steps for field discipline**

```json
"benefits": {
  "en": [
    "Track trips and field status in real time",
    "Capture issues and service checks quickly",
    "Follow teams across routes and shifts",
    "Keep incident follow-up better documented"
  ],
  "ar": [
    "تابع الرحلات والحالة الميدانية لحظة بلحظة",
    "سجل المشكلات وفحوصات الخدمة بسرعة",
    "تابع الفرق عبر الخطوط والورديات",
    "حافظ على توثيق أفضل لمتابعة الحوادث"
  ]
}
```

- [ ] **Step 4: Add CTA and SEO**

```json
"cta": {
  "heading": {
    "en": "See how supervisors keep service disciplined",
    "ar": "اكتشف كيف يحافظ المشرفون على انضباط الخدمة"
  },
  "subtitle": {
    "en": "Monitor routes, field issues, and execution quality from one mobile workflow.",
    "ar": "تابع الخطوط والمشكلات الميدانية وجودة التنفيذ من خلال سير عمل واحد على الجوال."
  }
}
```

- [ ] **Step 5: Save and verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/planning/app.supervisor.v1.en-ar.json','utf8')); console.log('supervisor app ok')"`
Expected: `supervisor app ok`

- [ ] **Step 6: Commit**

```bash
git add content/planning/app.supervisor.v1.en-ar.json
git commit -m "content: add supervisor app map"
```

### Task 5: Create the Driver app map

**Files:**

- Create: `content/planning/app.driver.v1.en-ar.json`
- Reference: `src/lib/sanity/queries.ts:318-368`

- [ ] **Step 1: Create the driver app file**

```json
{
  "pageKey": "app",
  "slug": "driver",
  "action": "draft",
  "category": "operators",
  "layoutType": "portrait",
  "screenshots": [],
  "features": [],
  "steps": [],
  "platforms": {},
  "storeUrls": {},
  "cta": {},
  "seo": {}
}
```

- [ ] **Step 2: Write short driver-workflow copy**

```json
"name": { "en": "Driver App", "ar": "تطبيق السائق" },
"tagline": {
  "en": "Run assigned trips with clearer route and stop guidance",
  "ar": "نفذ الرحلات المخصصة بوضوح أكبر في الخط والتوقفات"
},
"description": {
  "en": "Help drivers manage assigned trips, stop sequence, trip actions, attendance steps, and service updates from one practical mobile workflow.",
  "ar": "ساعد السائقين على إدارة الرحلات المخصصة وتسلسل التوقفات وإجراءات الرحلة وخطوات الحضور وتحديثات الخدمة عبر سير عمل عملي واحد على الجوال."
}
```

- [ ] **Step 3: Add benefits, features, and steps for daily trip execution**

```json
"benefits": {
  "en": [
    "See assigned trips and route sequence clearly",
    "Handle trip actions from one mobile screen",
    "Follow attendance and service steps consistently",
    "Keep dispatch updated during live operation"
  ],
  "ar": [
    "اعرض الرحلات المخصصة وتسلسل الخط بوضوح",
    "نفذ إجراءات الرحلة من شاشة جوال واحدة",
    "اتبع خطوات الحضور والخدمة بشكل منظم",
    "أبقِ غرفة التشغيل محدثة أثناء الخدمة المباشرة"
  ]
}
```

- [ ] **Step 4: Add CTA and SEO**

```json
"cta": {
  "heading": {
    "en": "See how drivers execute trips with more clarity",
    "ar": "اكتشف كيف ينفذ السائقون الرحلات بوضوح أكبر"
  },
  "subtitle": {
    "en": "Give drivers one workflow for routes, stop actions, service updates, and trip completion.",
    "ar": "امنح السائقين سير عمل واحدًا للخطوط وإجراءات التوقفات وتحديثات الخدمة وإنهاء الرحلات."
  }
}
```

- [ ] **Step 5: Save and verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/planning/app.driver.v1.en-ar.json','utf8')); console.log('driver app ok')"`
Expected: `driver app ok`

- [ ] **Step 6: Commit**

```bash
git add content/planning/app.driver.v1.en-ar.json
git commit -m "content: add driver app map"
```

### Task 6: Create the Rider app map

**Files:**

- Create: `content/planning/app.rider.v1.en-ar.json`
- Reference: `src/lib/sanity/queries.ts:318-368`

- [ ] **Step 1: Create the rider app file**

```json
{
  "pageKey": "app",
  "slug": "rider",
  "action": "draft",
  "category": "enterprise",
  "layoutType": "portrait",
  "screenshots": [],
  "features": [],
  "steps": [],
  "platforms": {},
  "storeUrls": {},
  "cta": {},
  "seo": {}
}
```

- [ ] **Step 2: Write short rider-visibility copy**

```json
"name": { "en": "Rider App", "ar": "تطبيق الراكب" },
"tagline": {
  "en": "Give employees clearer trip timing and service visibility",
  "ar": "امنح الموظفين وضوحًا أفضل في التوقيت ورؤية الخدمة"
},
"description": {
  "en": "Give riders a clearer daily trip experience with assigned ride details, live status, service updates, and a better view of what happens next.",
  "ar": "امنح الركاب تجربة يومية أوضح عبر تفاصيل الرحلة المخصصة والحالة المباشرة وتحديثات الخدمة ورؤية أفضل لما سيحدث بعد ذلك."
}
```

- [ ] **Step 3: Add benefits, features, and steps for trip confidence**

```json
"benefits": {
  "en": [
    "See trip timing and assignment more clearly",
    "Follow live status during the commute",
    "Get service updates without confusion",
    "Keep trip history and feedback in one place"
  ],
  "ar": [
    "اعرض توقيت الرحلة والتخصيص بوضوح أكبر",
    "تابع الحالة المباشرة أثناء التنقل",
    "استقبل تحديثات الخدمة دون ارتباك",
    "احتفظ بسجل الرحلات والملاحظات في مكان واحد"
  ]
}
```

- [ ] **Step 4: Add CTA and SEO**

```json
"cta": {
  "heading": {
    "en": "See how riders get a clearer trip experience",
    "ar": "اكتشف كيف يحصل الركاب على تجربة رحلة أوضح"
  },
  "subtitle": {
    "en": "Connect trip timing, live status, and rider updates through one mobile experience.",
    "ar": "اربط توقيت الرحلة والحالة المباشرة وتحديثات الراكب عبر تجربة جوال واحدة."
  }
}
```

- [ ] **Step 5: Save and verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('content/planning/app.rider.v1.en-ar.json','utf8')); console.log('rider app ok')"`
Expected: `rider app ok`

- [ ] **Step 6: Commit**

```bash
git add content/planning/app.rider.v1.en-ar.json
git commit -m "content: add rider app map"
```

### Task 7: Final consistency pass across all six maps

**Files:**

- Modify: `content/planning/apps.v2.en-ar.json`
- Modify: `content/planning/app.enterprise-dashboard.v1.en-ar.json`
- Modify: `content/planning/app.operator-dashboard.v1.en-ar.json`
- Modify: `content/planning/app.supervisor.v1.en-ar.json`
- Modify: `content/planning/app.driver.v1.en-ar.json`
- Modify: `content/planning/app.rider.v1.en-ar.json`

- [ ] **Step 1: Review copy length and repetition**

Check:

- hero titles fit one to three short lines
- subtitles stay compact
- no two app pages repeat the same promise
- Arabic reads naturally and not literally

- [ ] **Step 2: Verify all files parse as JSON**

Run:

```bash
for f in \
  content/planning/apps.v2.en-ar.json \
  content/planning/app.enterprise-dashboard.v1.en-ar.json \
  content/planning/app.operator-dashboard.v1.en-ar.json \
  content/planning/app.supervisor.v1.en-ar.json \
  content/planning/app.driver.v1.en-ar.json \
  content/planning/app.rider.v1.en-ar.json; do
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')); console.log(process.argv[1] + ' ok')" "$f";
done
```

Expected:

```text
content/planning/apps.v2.en-ar.json ok
content/planning/app.enterprise-dashboard.v1.en-ar.json ok
content/planning/app.operator-dashboard.v1.en-ar.json ok
content/planning/app.supervisor.v1.en-ar.json ok
content/planning/app.driver.v1.en-ar.json ok
content/planning/app.rider.v1.en-ar.json ok
```

- [ ] **Step 3: Commit**

```bash
git add content/planning/apps.v2.en-ar.json \
  content/planning/app.enterprise-dashboard.v1.en-ar.json \
  content/planning/app.operator-dashboard.v1.en-ar.json \
  content/planning/app.supervisor.v1.en-ar.json \
  content/planning/app.driver.v1.en-ar.json \
  content/planning/app.rider.v1.en-ar.json
git commit -m "content: finalize apps content batch maps"
```

## Self-Review

- Spec coverage: main Apps page plus five app pages are each covered by a dedicated task, with a final consistency pass across the full batch.
- Placeholder scan: no TODO/TBD markers remain.
- Type consistency: all planned files follow the current Sanity query naming used by `appsPageQuery` and `appBySlugQuery`.
- Schema completeness: app-map base shapes now explicitly account for `screenshots`, `platforms`, and `storeUrls` so the generated files stay draft-ready even when media is deferred.
