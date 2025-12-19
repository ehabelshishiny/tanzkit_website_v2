# Schema Rebuild Plan - Based on Translation JSON Structure

## Approach
1. Map schemas 1:1 to translation JSON structure
2. Mark dynamic arrays (features[], items[], tabs{}, etc.)
3. Add SINGLETON configuration for page documents
4. Only add UI-specific fields (images, order, slugs)
5. No optional/empty fields

## Pages to Rebuild

### 1. HOME PAGE (`homePage`)
**Singleton**: YES
**JSON Path**: `homepage`
**Sections**:
- `hero` - title, titleHighlight{for, workforce, mobility}, subtitle, cta
- `overview` - heading, subtitle, description
- `featuresSimple` - heading, subtitle, items[] {title, description}
- `logoBar` - heading, subtitle
- `features` (tabs) - heading, subtitle, tabs{realtime, security, analytics, collaboration} each with {label, title, description, benefits[]}
- `seeInAction` (screenshots) - heading, subtitle, items[] {id, title, description, category}
- `testimonials` - heading, subtitle, items[] {quote, author, role}
- `cta` - heading, subtitle

### 2. SOLUTIONS MAIN PAGE (`solutionsPage`)
**Singleton**: YES
**JSON Path**: `solutions.main`
**Sections**:
- `hero` - title{smart, mobility, practicalResults}, subtitle, cta, nodes{operator, enterprise, supervisor, driver, rider}
- `intro` - text
- `howWeHelp` - title, benefits[]
- `audienceCards` - operators{headline, description, benefits[], cta}, enterprises{headline, description, benefits[], cta}
- `technology` - title, highlights[]
- `whyTranzkit` - title, reasons[]
- `cta` - title, subtitle

### 3. SOLUTIONS ENTERPRISES-PASSENGERS PAGE (`solutionsEnterprisesPassengersPage`)
**Singleton**: YES
**JSON Path**: `solutions.enterprisesPassengers`
**Sections**:
- `hero` - title, subtitle, cta
- `audienceSwitcher` - tabs{enterprise, passenger}, enterprise{title, description, features[]}, passenger{title, description, features[]}
- `overview` - text
- `featureShowcase` - title, subtitle, features[] {title, description, badges?{active, ready}}
- `workflow` - passenger{title, subtitle, steps[]}, enterprise{title, subtitle, steps[]}
- `cta` - title, subtitle

### 4. SOLUTIONS OPERATORS-DRIVERS PAGE (`solutionsOperatorsDriversPage`)
**Singleton**: YES
**JSON Path**: `solutions.operatorsDrivers`
**Sections**: (Similar structure to enterprises-passengers)

### 5. APPS PAGE (`appsPage`)
**Singleton**: YES
**JSON Path**: `apps.main`
**Sections**:
- `hero` - badge, mainTitle, mainSubtitle, title, subtitle, cta
- `parallaxHero` - title{intelligent, application, ecosystem}, subtitle, imageAlts{}
- `showcase` - title, subtitle, segments{operators, enterprise}, badges{aiPowered, realtime}

### 6. ABOUT PAGE (`aboutPage`)
**Singleton**: YES
**JSON Path**: `about`
**Sections**:
- `hero` - title, subtitle, stats{enterprises, drivers, trips} each with {value, label}
- `story` - heading, subtitle, mission{title, text}, vision{title, text}, values{title, innovation, reliability, sustainability}
- `timeline` - heading, subtitle, milestones[] {year, title, description}
- `team` - heading, subtitle, members[] {name, role, initials, bio}
- `careers` - heading, subtitle, openings[] {title, department, location, type, description}
- `cta` - heading, subtitle

### 7. CONTACT PAGE (`contactPage`)
**Singleton**: YES
**JSON Path**: `contact`
**Sections**:
- `hero` - title, subtitle, emailUs, callUs, visitUs, contactInfo{email, phone, location}
- `form` - labels{}, placeholders{}, userTypes{enterprise, operator}, captcha, submit, submitting, success{}, errors{}

### 8. PRICING PAGE (`pricingPage`)
**Singleton**: YES
**JSON Path**: `pricing`
**Sections**:
- `hero` - title, subtitle, highlights{noSetupFees, cancelAnytime, freeTrial}
- `cards` - heading, subtitle, period, badges{mostPopular, bestValue}, contactSales, plans{starter, professional, enterprise}
- `comparison` - title, subtitle, tableHeaders{}, features{}

### 9. APP COLLECTION (`app`)
**Singleton**: NO (Collection)
**Source**: `src/config/apps-data.ts`
**Fields**: name, slug, description, layoutType, screenshots[], platforms{ios, android, web}, order

## Dynamic Arrays to Mark
- `items[]` - Features, testimonials, screenshots, timeline, team members, careers
- `tabs{}` - Feature tabs, audience switcher tabs
- `benefits[]` - Lists of benefits
- `features[]` - Feature lists
- `steps[]` - Workflow steps
- `milestones[]` - Timeline milestones
- `members[]` - Team members
- `openings[]` - Job openings

## Singleton Configuration
Add to each page schema:
```typescript
options: {
  singleton: true,
}
```

## Next Steps
1. Delete all existing page schemas
2. Rebuild each schema following JSON structure
3. Add singleton configuration
4. Update migration script to match new structure
5. Re-run migration

