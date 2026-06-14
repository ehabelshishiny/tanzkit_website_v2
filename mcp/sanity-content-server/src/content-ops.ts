import {
  PHASE_ONE_PUBLISH_BLOCK_MESSAGE,
  QUERY_INSPECTION_MAP,
  getDefaultDocumentId,
  inferPageKeyFromDocumentType,
  isSupportedAppSlug,
  isSupportedPageKey,
  type SupportedPageKey,
} from './definitions.js'

export type LocalizedString = {
  en: string
  ar: string
}

export type ContentMap = {
  pageKey: string
  documentType?: string
  action?: string
  slug?: string
  [key: string]: unknown
}

export type DraftOperation =
  | {
      type: 'createIfNotExists'
      document: Record<string, unknown>
    }
  | {
      type: 'patch'
      id: string
      set: Record<string, unknown>
    }

export type ValidationResult = {
  valid: boolean
  pageKey?: SupportedPageKey
  errors: string[]
  warnings: string[]
}

export type BuildDraftPlanArgs = {
  pageKey: string
  action?: string
  document?: {
    _id?: string
    _type?: string
  }
  contentMap: ContentMap
  resolvedAppsPageReferences?: ResolvedAppsPageReferences
  resolvedCaseStudyCategoryReferences?: ResolvedCaseStudyCategoryReference[]
  existingDocumentContent?: Record<string, unknown> | null
}

export type ResolvedAppsPageReference = {
  slug: string
  _id: string
  _type: string
  name?: {
    en?: string
    ar?: string
  }
}

export type ResolvedAppsPageReferences = {
  operatorApps: ResolvedAppsPageReference[]
  enterpriseApps: ResolvedAppsPageReference[]
}

export type ResolvedCaseStudyCategoryReference = {
  slug: string
  _id: string
  _type: string
  name?: {
    en?: string
    ar?: string
  }
}

export type BuildDraftPlanResult =
  | {
      ok: false
      message: string
      errors?: string[]
      warnings?: string[]
    }
  | {
      ok: true
      message: string
      documentId: string
      documentType: string
      operations: DraftOperation[]
      warnings: string[]
      patch: Record<string, unknown>
    }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getSlugCurrent(value: unknown) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (isRecord(value) && typeof value.current === 'string') {
    return value.current.trim()
  }

  return ''
}

function getLocalizedString(value: unknown): LocalizedString | null {
  if (!isRecord(value)) {
    return null
  }

  return {
    en: asString(value.en),
    ar: asString(value.ar),
  }
}

function requireLocalizedField(
  value: unknown,
  path: string,
  errors: string[],
) {
  const localized = getLocalizedString(value)

  if (!localized) {
    errors.push(`${path} must be a localized object with en/ar values.`)
    return
  }

  if (!localized.en) {
    errors.push(`${path}.en is required.`)
  }

  if (!localized.ar) {
    errors.push(`${path}.ar is required.`)
  }
}

function requireLocalizedRichTextField(
  value: unknown,
  path: string,
  errors: string[],
) {
  if (!isRecord(value)) {
    errors.push(`${path} must be a localized object with en/ar values.`)
    return
  }

  if (!Array.isArray(value.en) || value.en.length === 0) {
    errors.push(`${path}.en is required.`)
  }

  if (!Array.isArray(value.ar) || value.ar.length === 0) {
    errors.push(`${path}.ar is required.`)
  }
}

function requireNonEmptyString(value: unknown, path: string, errors: string[]) {
  if (!asString(value)) {
    errors.push(`${path} is required.`)
  }
}

function requireNonEmptySlug(value: unknown, path: string, errors: string[]) {
  if (!getSlugCurrent(value)) {
    errors.push(`${path} is required.`)
  }
}

function localized(value: unknown): LocalizedString {
  const localizedValue = getLocalizedString(value)

  return {
    en: localizedValue?.en ?? '',
    ar: localizedValue?.ar ?? '',
  }
}

function localizedArray(values: unknown): LocalizedString[] {
  if (!Array.isArray(values)) {
    return []
  }

  return values.map((value) => localized(value))
}

function localizedRichText(value: unknown) {
  const localizedValue = isRecord(value) ? value : {}

  return {
    en: Array.isArray(localizedValue.en) ? localizedValue.en : [],
    ar: Array.isArray(localizedValue.ar) ? localizedValue.ar : [],
  }
}

function localizedKeywordObject(value: unknown) {
  const localizedValue = isRecord(value) ? value : {}

  return {
    en: Array.isArray(localizedValue.en)
      ? localizedValue.en.filter((entry): entry is string => typeof entry === 'string')
      : [],
    ar: Array.isArray(localizedValue.ar)
      ? localizedValue.ar.filter((entry): entry is string => typeof entry === 'string')
      : [],
  }
}

function mapNotesWarnings(sectionPath: string, value: unknown, warnings: string[]) {
  if (Array.isArray(value) && value.length > 0) {
    warnings.push(`${sectionPath} is planning-only and will not be written to Sanity.`)
  }
}

function uniqueWarnings(warnings: string[]) {
  return [...new Set(warnings)]
}

function hasOwnProperty(value: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(value, key)
}

function preserveKnownImageFields(
  incoming: unknown,
  existing: unknown,
): unknown {
  if (Array.isArray(incoming)) {
    if (!Array.isArray(existing)) {
      return incoming
    }

    return incoming.map((item, index) => {
      if (!isRecord(item)) {
        return item
      }

      const itemKey = asString(item._key)
      const existingItem =
        itemKey
          ? existing.find(
              (candidate) =>
                isRecord(candidate) && asString(candidate._key) === itemKey,
            )
          : undefined

      if (existingItem) {
        return preserveKnownImageFields(item, existingItem)
      }

      const existingByIndex = existing[index]
      if (!isRecord(existingByIndex)) {
        return item
      }

      return preserveKnownImageFields(item, existingByIndex)
    })
  }

  if (!isRecord(incoming) || !isRecord(existing)) {
    return incoming
  }

  const merged: Record<string, unknown> = { ...incoming }

  for (const key of [
    'image',
    'backgroundImage',
    'ogImage',
    'screenshots',
    'featuredImage',
    'clientLogo',
    'avatar',
  ]) {
    if (!hasOwnProperty(merged, key) && hasOwnProperty(existing, key)) {
      merged[key] = existing[key]
    }
  }

  for (const [key, value] of Object.entries(merged)) {
    if (!hasOwnProperty(existing, key)) {
      continue
    }

    merged[key] = preserveKnownImageFields(value, existing[key])
  }

  return merged
}

export function normalizeContentMap(contentMap: ContentMap): ContentMap {
  if (isSupportedPageKey(contentMap.pageKey)) {
    return contentMap
  }

  const documentType = asString(contentMap.documentType)
  const inferredPageKey = documentType ? inferPageKeyFromDocumentType(documentType) : undefined

  if (!inferredPageKey) {
    return contentMap
  }

  return {
    ...contentMap,
    pageKey: inferredPageKey,
  }
}

function validateHomepage(contentMap: ContentMap, errors: string[], warnings: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const overview = isRecord(contentMap.overview) ? contentMap.overview : {}
  const featureTabs = isRecord(contentMap.featureTabs) ? contentMap.featureTabs : {}
  const screenshotCarousel = isRecord(contentMap.screenshotCarousel)
    ? contentMap.screenshotCarousel
    : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.title, 'hero.title', errors)
  requireLocalizedField(hero.titleHighlight, 'hero.titleHighlight', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(
    isRecord(hero.primaryCta) ? hero.primaryCta.text : undefined,
    'hero.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(hero.secondaryCta) ? hero.secondaryCta.text : undefined,
    'hero.secondaryCta.text',
    errors,
  )

  requireLocalizedField(overview.heading, 'overview.heading', errors)
  requireLocalizedField(overview.subtitle, 'overview.subtitle', errors)
  requireLocalizedField(featureTabs.heading, 'featureTabs.heading', errors)
  requireLocalizedField(featureTabs.subtitle, 'featureTabs.subtitle', errors)
  requireLocalizedField(
    screenshotCarousel.heading,
    'screenshotCarousel.heading',
    errors,
  )
  requireLocalizedField(
    screenshotCarousel.subtitle,
    'screenshotCarousel.subtitle',
    errors,
  )
  requireLocalizedField(cta.heading, 'cta.heading', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(
    isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined,
    'cta.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined,
    'cta.secondaryCta.text',
    errors,
  )
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)

  mapNotesWarnings('screenshotCarousel.notes', screenshotCarousel.notes, warnings)
}

function validateSolutions(contentMap: ContentMap, errors: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const intro = isRecord(contentMap.intro) ? contentMap.intro : {}
  const howWeHelp = isRecord(intro.howWeHelp) ? intro.howWeHelp : {}
  const audienceCards = isRecord(contentMap.audienceCards) ? contentMap.audienceCards : {}
  const operators = isRecord(audienceCards.operators) ? audienceCards.operators : {}
  const enterprises = isRecord(audienceCards.enterprises) ? audienceCards.enterprises : {}
  const technology = isRecord(contentMap.technology) ? contentMap.technology : {}
  const whyTranzkit = isRecord(contentMap.whyTranzkit) ? contentMap.whyTranzkit : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  const heroTitle = isRecord(hero.title) ? hero.title : {}
  const heroNodes = isRecord(hero.nodes) ? hero.nodes : {}

  requireLocalizedField(heroTitle.smart, 'hero.title.smart', errors)
  requireLocalizedField(heroTitle.mobility, 'hero.title.mobility', errors)
  requireLocalizedField(heroTitle.practicalResults, 'hero.title.practicalResults', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(hero.cta, 'hero.cta', errors)
  requireLocalizedField(heroNodes.operator, 'hero.nodes.operator', errors)
  requireLocalizedField(heroNodes.enterprise, 'hero.nodes.enterprise', errors)
  requireLocalizedField(heroNodes.supervisor, 'hero.nodes.supervisor', errors)
  requireLocalizedField(heroNodes.driver, 'hero.nodes.driver', errors)
  requireLocalizedField(heroNodes.rider, 'hero.nodes.rider', errors)
  requireLocalizedField(intro.text, 'intro.text', errors)
  requireLocalizedField(howWeHelp.title, 'intro.howWeHelp.title', errors)
  requireLocalizedField(operators.headline, 'audienceCards.operators.headline', errors)
  requireLocalizedField(operators.description, 'audienceCards.operators.description', errors)
  requireLocalizedField(operators.cta, 'audienceCards.operators.cta', errors)
  requireLocalizedField(
    enterprises.headline,
    'audienceCards.enterprises.headline',
    errors,
  )
  requireLocalizedField(
    enterprises.description,
    'audienceCards.enterprises.description',
    errors,
  )
  requireLocalizedField(enterprises.cta, 'audienceCards.enterprises.cta', errors)
  requireLocalizedField(technology.title, 'technology.title', errors)
  requireLocalizedField(whyTranzkit.title, 'whyTranzkit.title', errors)
  requireLocalizedField(cta.title, 'cta.title', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateAppsPage(contentMap: ContentMap, errors: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const showcase = isRecord(contentMap.showcase) ? contentMap.showcase : {}
  const operatorsSegment = isRecord(showcase.operatorsSegment) ? showcase.operatorsSegment : {}
  const enterpriseSegment = isRecord(showcase.enterpriseSegment)
    ? showcase.enterpriseSegment
    : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.titlePart1, 'hero.titlePart1', errors)
  requireLocalizedField(hero.titlePart2, 'hero.titlePart2', errors)
  requireLocalizedField(hero.titlePart3, 'hero.titlePart3', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(showcase.title, 'showcase.title', errors)
  requireLocalizedField(showcase.subtitle, 'showcase.subtitle', errors)
  requireLocalizedField(operatorsSegment.title, 'showcase.operatorsSegment.title', errors)
  requireLocalizedField(
    operatorsSegment.description,
    'showcase.operatorsSegment.description',
    errors,
  )
  requireLocalizedField(
    operatorsSegment.tabLabel,
    'showcase.operatorsSegment.tabLabel',
    errors,
  )
  requireLocalizedField(
    enterpriseSegment.title,
    'showcase.enterpriseSegment.title',
    errors,
  )
  requireLocalizedField(
    enterpriseSegment.description,
    'showcase.enterpriseSegment.description',
    errors,
  )
  requireLocalizedField(
    enterpriseSegment.tabLabel,
    'showcase.enterpriseSegment.tabLabel',
    errors,
  )
  requireLocalizedField(cta.heading, 'cta.heading', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(
    isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined,
    'cta.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined,
    'cta.secondaryCta.text',
    errors,
  )
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateAboutPage(contentMap: ContentMap, errors: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const stats = isRecord(hero.stats) ? hero.stats : {}
  const enterprises = isRecord(stats.enterprises) ? stats.enterprises : {}
  const drivers = isRecord(stats.drivers) ? stats.drivers : {}
  const trips = isRecord(stats.trips) ? stats.trips : {}
  const story = isRecord(contentMap.story) ? contentMap.story : {}
  const mission = isRecord(story.mission) ? story.mission : {}
  const vision = isRecord(story.vision) ? story.vision : {}
  const values = isRecord(story.values) ? story.values : {}
  const innovation = isRecord(values.innovation) ? values.innovation : {}
  const reliability = isRecord(values.reliability) ? values.reliability : {}
  const sustainability = isRecord(values.sustainability) ? values.sustainability : {}
  const timeline = isRecord(contentMap.timeline) ? contentMap.timeline : {}
  const team = isRecord(contentMap.team) ? contentMap.team : {}
  const careers = isRecord(contentMap.careers) ? contentMap.careers : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.title, 'hero.title', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(enterprises.value, 'hero.stats.enterprises.value', errors)
  requireLocalizedField(enterprises.label, 'hero.stats.enterprises.label', errors)
  requireLocalizedField(drivers.value, 'hero.stats.drivers.value', errors)
  requireLocalizedField(drivers.label, 'hero.stats.drivers.label', errors)
  requireLocalizedField(trips.value, 'hero.stats.trips.value', errors)
  requireLocalizedField(trips.label, 'hero.stats.trips.label', errors)
  requireLocalizedField(story.heading, 'story.heading', errors)
  requireLocalizedField(story.subtitle, 'story.subtitle', errors)
  requireLocalizedField(mission.title, 'story.mission.title', errors)
  requireLocalizedField(mission.text, 'story.mission.text', errors)
  requireLocalizedField(vision.title, 'story.vision.title', errors)
  requireLocalizedField(vision.text, 'story.vision.text', errors)
  requireLocalizedField(values.title, 'story.values.title', errors)
  requireLocalizedField(innovation.title, 'story.values.innovation.title', errors)
  requireLocalizedField(
    innovation.description,
    'story.values.innovation.description',
    errors,
  )
  requireLocalizedField(reliability.title, 'story.values.reliability.title', errors)
  requireLocalizedField(
    reliability.description,
    'story.values.reliability.description',
    errors,
  )
  requireLocalizedField(sustainability.title, 'story.values.sustainability.title', errors)
  requireLocalizedField(
    sustainability.description,
    'story.values.sustainability.description',
    errors,
  )
  requireLocalizedField(timeline.heading, 'timeline.heading', errors)
  requireLocalizedField(timeline.subtitle, 'timeline.subtitle', errors)
  requireLocalizedField(team.heading, 'team.heading', errors)
  requireLocalizedField(team.subtitle, 'team.subtitle', errors)
  requireLocalizedField(careers.heading, 'careers.heading', errors)
  requireLocalizedField(careers.subtitle, 'careers.subtitle', errors)
  requireLocalizedField(cta.heading, 'cta.heading', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(
    isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined,
    'cta.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined,
    'cta.secondaryCta.text',
    errors,
  )
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateContactPage(contentMap: ContentMap, errors: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const form = isRecord(contentMap.form) ? contentMap.form : {}
  const socialLinks = isRecord(contentMap.socialLinks) ? contentMap.socialLinks : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.title, 'hero.title', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(hero.emailLabel, 'hero.emailLabel', errors)
  requireLocalizedField(hero.phoneLabel, 'hero.phoneLabel', errors)
  requireLocalizedField(hero.locationLabel, 'hero.locationLabel', errors)
  requireNonEmptyString(hero.email, 'hero.email', errors)
  requireNonEmptyString(hero.phone, 'hero.phone', errors)
  requireLocalizedField(hero.location, 'hero.location', errors)
  requireLocalizedField(form.title, 'form.title', errors)
  requireLocalizedField(form.subtitle, 'form.subtitle', errors)
  requireLocalizedField(form.name, 'form.name', errors)
  requireLocalizedField(form.namePlaceholder, 'form.namePlaceholder', errors)
  requireLocalizedField(form.email, 'form.email', errors)
  requireLocalizedField(form.emailPlaceholder, 'form.emailPlaceholder', errors)
  requireLocalizedField(form.company, 'form.company', errors)
  requireLocalizedField(form.companyPlaceholder, 'form.companyPlaceholder', errors)
  requireLocalizedField(form.phone, 'form.phone', errors)
  requireLocalizedField(form.phonePlaceholder, 'form.phonePlaceholder', errors)
  requireLocalizedField(form.userType, 'form.userType', errors)
  requireLocalizedField(form.userTypePlaceholder, 'form.userTypePlaceholder', errors)
  requireLocalizedField(form.userTypeEnterprise, 'form.userTypeEnterprise', errors)
  requireLocalizedField(form.userTypeOperator, 'form.userTypeOperator', errors)
  requireLocalizedField(form.message, 'form.message', errors)
  requireLocalizedField(form.messagePlaceholder, 'form.messagePlaceholder', errors)
  requireLocalizedField(form.notRobot, 'form.notRobot', errors)
  requireLocalizedField(form.submit, 'form.submit', errors)
  requireLocalizedField(form.submitting, 'form.submitting', errors)
  requireLocalizedField(form.successTitle, 'form.successTitle', errors)
  requireLocalizedField(form.successMessage, 'form.successMessage', errors)
  requireLocalizedField(form.successButton, 'form.successButton', errors)
  requireLocalizedField(socialLinks.heading, 'socialLinks.heading', errors)
  requireLocalizedField(socialLinks.subtitle, 'socialLinks.subtitle', errors)
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateCaseStudiesPage(contentMap: ContentMap, errors: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.title, 'hero.title', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(hero.description, 'hero.description', errors)
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateCaseStudy(contentMap: ContentMap, errors: string[]) {
  const testimonial = isRecord(contentMap.testimonial) ? contentMap.testimonial : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireNonEmptyString(contentMap._id, '_id', errors)
  requireNonEmptySlug(contentMap.slug, 'slug', errors)
  requireLocalizedField(contentMap.title, 'title', errors)
  requireLocalizedField(contentMap.excerpt, 'excerpt', errors)
  requireLocalizedField(contentMap.clientName, 'clientName', errors)
  requireLocalizedField(contentMap.industry, 'industry', errors)
  requireLocalizedRichTextField(contentMap.challenge, 'challenge', errors)
  requireLocalizedRichTextField(contentMap.solution, 'solution', errors)
  requireLocalizedRichTextField(contentMap.results, 'results', errors)
  requireLocalizedField(testimonial.quote, 'testimonial.quote', errors)
  requireLocalizedField(testimonial.author, 'testimonial.author', errors)
  requireLocalizedField(testimonial.role, 'testimonial.role', errors)
  requireNonEmptyString(contentMap.publishedAt, 'publishedAt', errors)
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)

  if (!Array.isArray(contentMap.categorySlugs) || contentMap.categorySlugs.length === 0) {
    errors.push('categorySlugs must contain at least one category slug.')
  }
}

function validateSolutionsOperatorsDriversPage(contentMap: ContentMap, errors: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const overview = isRecord(contentMap.overview) ? contentMap.overview : {}
  const roleSwitcher = isRecord(contentMap.roleSwitcher) ? contentMap.roleSwitcher : {}
  const tabs = isRecord(roleSwitcher.tabs) ? roleSwitcher.tabs : {}
  const operator = isRecord(roleSwitcher.operator) ? roleSwitcher.operator : {}
  const driver = isRecord(roleSwitcher.driver) ? roleSwitcher.driver : {}
  const timeline = isRecord(contentMap.timeline) ? contentMap.timeline : {}
  const dashboards = isRecord(contentMap.dashboards) ? contentMap.dashboards : {}
  const mobileApps = isRecord(contentMap.mobileApps) ? contentMap.mobileApps : {}
  const features = isRecord(contentMap.features) ? contentMap.features : {}
  const aiImpact = isRecord(contentMap.aiImpact) ? contentMap.aiImpact : {}
  const faq = isRecord(contentMap.faq) ? contentMap.faq : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.title, 'hero.title', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(hero.cta, 'hero.cta', errors)
  requireLocalizedField(overview.text, 'overview.text', errors)
  requireLocalizedField(tabs.operator, 'roleSwitcher.tabs.operator', errors)
  requireLocalizedField(tabs.driver, 'roleSwitcher.tabs.driver', errors)
  requireLocalizedField(operator.title, 'roleSwitcher.operator.title', errors)
  requireLocalizedField(operator.description, 'roleSwitcher.operator.description', errors)
  requireLocalizedField(driver.title, 'roleSwitcher.driver.title', errors)
  requireLocalizedField(driver.description, 'roleSwitcher.driver.description', errors)
  requireLocalizedField(timeline.title, 'timeline.title', errors)
  requireLocalizedField(timeline.subtitle, 'timeline.subtitle', errors)
  requireLocalizedField(dashboards.title, 'dashboards.title', errors)
  requireLocalizedField(dashboards.subtitle, 'dashboards.subtitle', errors)
  requireLocalizedField(mobileApps.title, 'mobileApps.title', errors)
  requireLocalizedField(mobileApps.subtitle, 'mobileApps.subtitle', errors)
  requireLocalizedField(features.overview, 'features.overview', errors)
  requireLocalizedField(features.title, 'features.title', errors)
  requireLocalizedField(aiImpact.title, 'aiImpact.title', errors)
  requireLocalizedField(aiImpact.subtitle, 'aiImpact.subtitle', errors)
  requireLocalizedField(aiImpact.impactTitle, 'aiImpact.impactTitle', errors)
  requireLocalizedField(faq.title, 'faq.title', errors)
  requireLocalizedField(faq.subtitle, 'faq.subtitle', errors)
  requireLocalizedField(cta.heading, 'cta.heading', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(
    isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined,
    'cta.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined,
    'cta.secondaryCta.text',
    errors,
  )
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateSolutionsEnterprisesPassengersPage(
  contentMap: ContentMap,
  errors: string[],
) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const audienceSwitcher = isRecord(contentMap.audienceSwitcher)
    ? contentMap.audienceSwitcher
    : {}
  const tabs = isRecord(audienceSwitcher.tabs) ? audienceSwitcher.tabs : {}
  const enterprise = isRecord(audienceSwitcher.enterprise) ? audienceSwitcher.enterprise : {}
  const passenger = isRecord(audienceSwitcher.passenger) ? audienceSwitcher.passenger : {}
  const overview = isRecord(contentMap.overview) ? contentMap.overview : {}
  const featureShowcase = isRecord(contentMap.featureShowcase)
    ? contentMap.featureShowcase
    : {}
  const workflow = isRecord(contentMap.workflow) ? contentMap.workflow : {}
  const enterpriseWorkflow = isRecord(workflow.enterprise) ? workflow.enterprise : {}
  const passengerWorkflow = isRecord(workflow.passenger) ? workflow.passenger : {}
  const appScreens = isRecord(contentMap.appScreens) ? contentMap.appScreens : {}
  const features = isRecord(contentMap.features) ? contentMap.features : {}
  const testimonials = isRecord(contentMap.testimonials) ? contentMap.testimonials : {}
  const aiImpact = isRecord(contentMap.aiImpact) ? contentMap.aiImpact : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  requireLocalizedField(hero.title, 'hero.title', errors)
  requireLocalizedField(hero.subtitle, 'hero.subtitle', errors)
  requireLocalizedField(hero.cta, 'hero.cta', errors)
  requireLocalizedField(tabs.enterprise, 'audienceSwitcher.tabs.enterprise', errors)
  requireLocalizedField(tabs.passenger, 'audienceSwitcher.tabs.passenger', errors)
  requireLocalizedField(enterprise.title, 'audienceSwitcher.enterprise.title', errors)
  requireLocalizedField(
    enterprise.description,
    'audienceSwitcher.enterprise.description',
    errors,
  )
  requireLocalizedField(passenger.title, 'audienceSwitcher.passenger.title', errors)
  requireLocalizedField(
    passenger.description,
    'audienceSwitcher.passenger.description',
    errors,
  )
  requireLocalizedField(overview.text, 'overview.text', errors)
  requireLocalizedField(featureShowcase.title, 'featureShowcase.title', errors)
  requireLocalizedField(featureShowcase.subtitle, 'featureShowcase.subtitle', errors)
  requireLocalizedField(enterpriseWorkflow.title, 'workflow.enterprise.title', errors)
  requireLocalizedField(
    enterpriseWorkflow.subtitle,
    'workflow.enterprise.subtitle',
    errors,
  )
  requireLocalizedField(passengerWorkflow.title, 'workflow.passenger.title', errors)
  requireLocalizedField(
    passengerWorkflow.subtitle,
    'workflow.passenger.subtitle',
    errors,
  )
  requireLocalizedField(appScreens.title, 'appScreens.title', errors)
  requireLocalizedField(appScreens.subtitle, 'appScreens.subtitle', errors)
  requireLocalizedField(features.overview, 'features.overview', errors)
  requireLocalizedField(features.title, 'features.title', errors)
  requireLocalizedField(testimonials.title, 'testimonials.title', errors)
  requireLocalizedField(testimonials.subtitle, 'testimonials.subtitle', errors)
  requireLocalizedField(aiImpact.title, 'aiImpact.title', errors)
  requireLocalizedField(aiImpact.subtitle, 'aiImpact.subtitle', errors)
  requireLocalizedField(aiImpact.impactTitle, 'aiImpact.impactTitle', errors)
  requireLocalizedField(cta.heading, 'cta.heading', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(
    isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined,
    'cta.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined,
    'cta.secondaryCta.text',
    errors,
  )
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateAppDetail(contentMap: ContentMap, errors: string[]) {
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  if (!contentMap.slug || !isSupportedAppSlug(contentMap.slug)) {
    errors.push(`slug must be one of: driver, rider, supervisor, operator-dashboard, enterprise-dashboard.`)
  }

  requireLocalizedField(contentMap.name, 'name', errors)
  requireLocalizedField(contentMap.tagline, 'tagline', errors)
  requireLocalizedField(contentMap.description, 'description', errors)
  requireNonEmptyString(contentMap.category, 'category', errors)
  requireNonEmptyString(contentMap.layoutType, 'layoutType', errors)
  requireLocalizedField(cta.heading, 'cta.heading', errors)
  requireLocalizedField(cta.subtitle, 'cta.subtitle', errors)
  requireLocalizedField(
    isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined,
    'cta.primaryCta.text',
    errors,
  )
  requireLocalizedField(
    isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined,
    'cta.secondaryCta.text',
    errors,
  )
  requireLocalizedField(seo.metaTitle, 'seo.metaTitle', errors)
  requireLocalizedField(seo.metaDescription, 'seo.metaDescription', errors)
}

function validateNavigation(contentMap: ContentMap, errors: string[]) {
  requireLocalizedField(contentMap.footerText, 'footerText', errors)
}

export function validateContentMap(contentMap: ContentMap): ValidationResult {
  const normalized = normalizeContentMap(contentMap)
  const errors: string[] = []
  const warnings: string[] = []

  if (!isSupportedPageKey(normalized.pageKey)) {
    errors.push(
      `Unsupported page key "${normalized.pageKey}". Supported keys: homepage, solutions, solutionsEnterprisesPassengers, solutionsOperatorsDrivers, apps, appDetail, about, contact, caseStudies, caseStudy, navigation.`,
    )

    return {
      valid: false,
      errors,
      warnings,
    }
  }

  if (normalized.action === 'publish') {
    errors.push(PHASE_ONE_PUBLISH_BLOCK_MESSAGE)
  }

  switch (normalized.pageKey) {
    case 'homepage':
      validateHomepage(normalized, errors, warnings)
      break
    case 'solutions':
      validateSolutions(normalized, errors)
      break
    case 'solutionsEnterprisesPassengers':
      validateSolutionsEnterprisesPassengersPage(normalized, errors)
      break
    case 'solutionsOperatorsDrivers':
      validateSolutionsOperatorsDriversPage(normalized, errors)
      break
    case 'apps':
      validateAppsPage(normalized, errors)
      break
    case 'appDetail':
      validateAppDetail(normalized, errors)
      break
    case 'about':
      validateAboutPage(normalized, errors)
      break
    case 'contact':
      validateContactPage(normalized, errors)
      break
    case 'caseStudies':
      validateCaseStudiesPage(normalized, errors)
      break
    case 'caseStudy':
      validateCaseStudy(normalized, errors)
      break
    case 'navigation':
      validateNavigation(normalized, errors)
      break
  }

  return {
    valid: errors.length === 0,
    pageKey: normalized.pageKey,
    errors,
    warnings,
  }
}

function mapHomepagePatch(contentMap: ContentMap, warnings: string[]) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const overview = isRecord(contentMap.overview) ? contentMap.overview : {}
  const featureTabs = isRecord(contentMap.featureTabs) ? contentMap.featureTabs : {}
  const screenshotCarousel = isRecord(contentMap.screenshotCarousel)
    ? contentMap.screenshotCarousel
    : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  mapNotesWarnings('screenshotCarousel.notes', screenshotCarousel.notes, warnings)

  return {
    hero: {
      title: localized(hero.title),
      titleHighlight: localized(hero.titleHighlight),
      subtitle: localized(hero.subtitle),
      primaryCta: {
        text: localized(isRecord(hero.primaryCta) ? hero.primaryCta.text : undefined),
        href: asString(isRecord(hero.primaryCta) ? hero.primaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(hero.primaryCta) ? hero.primaryCta.openInNewTab : false,
        ),
      },
      secondaryCta: {
        text: localized(isRecord(hero.secondaryCta) ? hero.secondaryCta.text : undefined),
        href: asString(isRecord(hero.secondaryCta) ? hero.secondaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(hero.secondaryCta) ? hero.secondaryCta.openInNewTab : false,
        ),
      },
    },
    overview: {
      heading: localized(overview.heading),
      subtitle: localized(overview.subtitle),
      features: Array.isArray(overview.features) ? overview.features : [],
    },
    featureTabs: {
      heading: localized(featureTabs.heading),
      subtitle: localized(featureTabs.subtitle),
      tabs: Array.isArray(featureTabs.tabs) ? featureTabs.tabs : [],
    },
    screenshotCarousel: {
      heading: localized(screenshotCarousel.heading),
      subtitle: localized(screenshotCarousel.subtitle),
      items: Array.isArray(screenshotCarousel.items) ? screenshotCarousel.items : [],
    },
    cta: {
      heading: localized(cta.heading),
      subtitle: localized(cta.subtitle),
      primaryCta: {
        text: localized(isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined),
        href: asString(isRecord(cta.primaryCta) ? cta.primaryCta.href : undefined),
        openInNewTab: Boolean(isRecord(cta.primaryCta) ? cta.primaryCta.openInNewTab : false),
      },
      secondaryCta: {
        text: localized(isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined),
        href: asString(isRecord(cta.secondaryCta) ? cta.secondaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(cta.secondaryCta) ? cta.secondaryCta.openInNewTab : false,
        ),
      },
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    },
  }
}

function mapSolutionsPatch(contentMap: ContentMap) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const heroTitle = isRecord(hero.title) ? hero.title : {}
  const heroNodes = isRecord(hero.nodes) ? hero.nodes : {}
  const intro = isRecord(contentMap.intro) ? contentMap.intro : {}
  const howWeHelp = isRecord(intro.howWeHelp) ? intro.howWeHelp : {}
  const audienceCards = isRecord(contentMap.audienceCards) ? contentMap.audienceCards : {}
  const operators = isRecord(audienceCards.operators) ? audienceCards.operators : {}
  const enterprises = isRecord(audienceCards.enterprises) ? audienceCards.enterprises : {}
  const technology = isRecord(contentMap.technology) ? contentMap.technology : {}
  const whyTranzkit = isRecord(contentMap.whyTranzkit) ? contentMap.whyTranzkit : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      title: {
        smart: localized(heroTitle.smart),
        mobility: localized(heroTitle.mobility),
        practicalResults: localized(heroTitle.practicalResults),
      },
      subtitle: localized(hero.subtitle),
      cta: localized(hero.cta),
      nodes: {
        operator: localized(heroNodes.operator),
        enterprise: localized(heroNodes.enterprise),
        supervisor: localized(heroNodes.supervisor),
        driver: localized(heroNodes.driver),
        rider: localized(heroNodes.rider),
      },
    },
    intro: {
      text: localized(intro.text),
      howWeHelp: {
        title: localized(howWeHelp.title),
        benefits: localizedArray(howWeHelp.benefits),
      },
    },
    audienceCards: {
      operators: {
        headline: localized(operators.headline),
        description: localized(operators.description),
        benefits: localizedArray(operators.benefits),
        cta: localized(operators.cta),
      },
      enterprises: {
        headline: localized(enterprises.headline),
        description: localized(enterprises.description),
        benefits: localizedArray(enterprises.benefits),
        cta: localized(enterprises.cta),
      },
    },
    technology: {
      title: localized(technology.title),
      highlights: Array.isArray(technology.highlights) ? technology.highlights : [],
    },
    whyTranzkit: {
      title: localized(whyTranzkit.title),
      reasons: localizedArray(whyTranzkit.reasons),
    },
    cta: {
      title: localized(cta.title),
      subtitle: localized(cta.subtitle),
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    },
  }
}

function mapAppsPagePatch(
  contentMap: ContentMap,
  warnings: string[],
  resolvedAppsPageReferences?: ResolvedAppsPageReferences,
) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const showcase = isRecord(contentMap.showcase) ? contentMap.showcase : {}
  const operatorsSegment = isRecord(showcase.operatorsSegment) ? showcase.operatorsSegment : {}
  const enterpriseSegment = isRecord(showcase.enterpriseSegment)
    ? showcase.enterpriseSegment
    : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      titlePart1: localized(hero.titlePart1),
      titlePart2: localized(hero.titlePart2),
      titlePart3: localized(hero.titlePart3),
      subtitle: localized(hero.subtitle),
    },
    showcase: {
      title: localized(showcase.title),
      subtitle: localized(showcase.subtitle),
      operatorsSegment: {
        title: localized(operatorsSegment.title),
        description: localized(operatorsSegment.description),
        tabLabel: localized(operatorsSegment.tabLabel),
      },
      enterpriseSegment: {
        title: localized(enterpriseSegment.title),
        description: localized(enterpriseSegment.description),
        tabLabel: localized(enterpriseSegment.tabLabel),
      },
      operatorApps: resolvedAppsPageReferences
        ? resolvedAppsPageReferences.operatorApps.map((app) => ({
            _key: `operator-app-${app.slug}`,
            _type: 'reference',
            _ref: app._id,
          }))
        : undefined,
      enterpriseApps: resolvedAppsPageReferences
        ? resolvedAppsPageReferences.enterpriseApps.map((app) => ({
            _key: `enterprise-app-${app.slug}`,
            _type: 'reference',
            _ref: app._id,
          }))
        : undefined,
    },
    cta: {
      heading: localized(cta.heading),
      subtitle: localized(cta.subtitle),
      primaryCta: {
        text: localized(isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined),
        href: asString(isRecord(cta.primaryCta) ? cta.primaryCta.href : undefined),
        openInNewTab: Boolean(isRecord(cta.primaryCta) ? cta.primaryCta.openInNewTab : false),
      },
      secondaryCta: {
        text: localized(isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined),
        href: asString(isRecord(cta.secondaryCta) ? cta.secondaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(cta.secondaryCta) ? cta.secondaryCta.openInNewTab : false,
        ),
      },
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    },
  }
}

function mapSolutionsOperatorsDriversPatch(contentMap: ContentMap) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const overview = isRecord(contentMap.overview) ? contentMap.overview : {}
  const roleSwitcher = isRecord(contentMap.roleSwitcher) ? contentMap.roleSwitcher : {}
  const tabs = isRecord(roleSwitcher.tabs) ? roleSwitcher.tabs : {}
  const operator = isRecord(roleSwitcher.operator) ? roleSwitcher.operator : {}
  const driver = isRecord(roleSwitcher.driver) ? roleSwitcher.driver : {}
  const timeline = isRecord(contentMap.timeline) ? contentMap.timeline : {}
  const dashboards = isRecord(contentMap.dashboards) ? contentMap.dashboards : {}
  const mobileApps = isRecord(contentMap.mobileApps) ? contentMap.mobileApps : {}
  const features = isRecord(contentMap.features) ? contentMap.features : {}
  const aiImpact = isRecord(contentMap.aiImpact) ? contentMap.aiImpact : {}
  const faq = isRecord(contentMap.faq) ? contentMap.faq : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      title: localized(hero.title),
      subtitle: localized(hero.subtitle),
      cta: localized(hero.cta),
    },
    overview: {
      text: localized(overview.text),
    },
    roleSwitcher: {
      tabs: {
        operator: localized(tabs.operator),
        driver: localized(tabs.driver),
      },
      operator: {
        title: localized(operator.title),
        description: localized(operator.description),
        features: Array.isArray(operator.features) ? operator.features : [],
      },
      driver: {
        title: localized(driver.title),
        description: localized(driver.description),
        features: Array.isArray(driver.features) ? driver.features : [],
      },
    },
    timeline: {
      title: localized(timeline.title),
      subtitle: localized(timeline.subtitle),
      items: Array.isArray(timeline.items) ? timeline.items : [],
    },
    dashboards: {
      title: localized(dashboards.title),
      subtitle: localized(dashboards.subtitle),
      screenshots: Array.isArray(dashboards.screenshots) ? dashboards.screenshots : [],
    },
    mobileApps: {
      title: localized(mobileApps.title),
      subtitle: localized(mobileApps.subtitle),
      features: Array.isArray(mobileApps.features) ? mobileApps.features : [],
    },
    features: {
      overview: localized(features.overview),
      title: localized(features.title),
      items: Array.isArray(features.items) ? features.items : [],
    },
    aiImpact: {
      title: localized(aiImpact.title),
      subtitle: localized(aiImpact.subtitle),
      impactTitle: localized(aiImpact.impactTitle),
      metrics: Array.isArray(aiImpact.metrics) ? aiImpact.metrics : [],
    },
    faq: {
      title: localized(faq.title),
      subtitle: localized(faq.subtitle),
      items: Array.isArray(faq.items) ? faq.items : [],
    },
    cta: {
      heading: localized(cta.heading),
      subtitle: localized(cta.subtitle),
      primaryCta: {
        text: localized(isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined),
        href: asString(isRecord(cta.primaryCta) ? cta.primaryCta.href : undefined),
        openInNewTab: Boolean(isRecord(cta.primaryCta) ? cta.primaryCta.openInNewTab : false),
      },
      secondaryCta: {
        text: localized(isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined),
        href: asString(isRecord(cta.secondaryCta) ? cta.secondaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(cta.secondaryCta) ? cta.secondaryCta.openInNewTab : false,
        ),
      },
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    },
  }
}

function mapSolutionsEnterprisesPassengersPatch(contentMap: ContentMap) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const audienceSwitcher = isRecord(contentMap.audienceSwitcher)
    ? contentMap.audienceSwitcher
    : {}
  const tabs = isRecord(audienceSwitcher.tabs) ? audienceSwitcher.tabs : {}
  const enterprise = isRecord(audienceSwitcher.enterprise) ? audienceSwitcher.enterprise : {}
  const passenger = isRecord(audienceSwitcher.passenger) ? audienceSwitcher.passenger : {}
  const overview = isRecord(contentMap.overview) ? contentMap.overview : {}
  const featureShowcase = isRecord(contentMap.featureShowcase)
    ? contentMap.featureShowcase
    : {}
  const workflow = isRecord(contentMap.workflow) ? contentMap.workflow : {}
  const enterpriseWorkflow = isRecord(workflow.enterprise) ? workflow.enterprise : {}
  const passengerWorkflow = isRecord(workflow.passenger) ? workflow.passenger : {}
  const appScreens = isRecord(contentMap.appScreens) ? contentMap.appScreens : {}
  const features = isRecord(contentMap.features) ? contentMap.features : {}
  const testimonials = isRecord(contentMap.testimonials) ? contentMap.testimonials : {}
  const aiImpact = isRecord(contentMap.aiImpact) ? contentMap.aiImpact : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      title: localized(hero.title),
      subtitle: localized(hero.subtitle),
      cta: localized(hero.cta),
    },
    audienceSwitcher: {
      tabs: {
        enterprise: localized(tabs.enterprise),
        passenger: localized(tabs.passenger),
      },
      enterprise: {
        title: localized(enterprise.title),
        description: localized(enterprise.description),
        features: Array.isArray(enterprise.features) ? enterprise.features : [],
      },
      passenger: {
        title: localized(passenger.title),
        description: localized(passenger.description),
        features: Array.isArray(passenger.features) ? passenger.features : [],
      },
    },
    overview: {
      text: localized(overview.text),
    },
    featureShowcase: {
      title: localized(featureShowcase.title),
      subtitle: localized(featureShowcase.subtitle),
      features: Array.isArray(featureShowcase.features) ? featureShowcase.features : [],
    },
    workflow: {
      enterprise: {
        title: localized(enterpriseWorkflow.title),
        subtitle: localized(enterpriseWorkflow.subtitle),
        steps: Array.isArray(enterpriseWorkflow.steps) ? enterpriseWorkflow.steps : [],
      },
      passenger: {
        title: localized(passengerWorkflow.title),
        subtitle: localized(passengerWorkflow.subtitle),
        steps: Array.isArray(passengerWorkflow.steps) ? passengerWorkflow.steps : [],
      },
    },
    appScreens: {
      title: localized(appScreens.title),
      subtitle: localized(appScreens.subtitle),
      screenshots: Array.isArray(appScreens.screenshots) ? appScreens.screenshots : [],
    },
    features: {
      overview: localized(features.overview),
      title: localized(features.title),
      items: Array.isArray(features.items) ? features.items : [],
    },
    testimonials: {
      title: localized(testimonials.title),
      subtitle: localized(testimonials.subtitle),
      items: Array.isArray(testimonials.items) ? testimonials.items : [],
    },
    aiImpact: {
      title: localized(aiImpact.title),
      subtitle: localized(aiImpact.subtitle),
      impactTitle: localized(aiImpact.impactTitle),
      metrics: Array.isArray(aiImpact.metrics) ? aiImpact.metrics : [],
    },
    cta: {
      heading: localized(cta.heading),
      subtitle: localized(cta.subtitle),
      primaryCta: {
        text: localized(isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined),
        href: asString(isRecord(cta.primaryCta) ? cta.primaryCta.href : undefined),
        openInNewTab: Boolean(isRecord(cta.primaryCta) ? cta.primaryCta.openInNewTab : false),
      },
      secondaryCta: {
        text: localized(isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined),
        href: asString(isRecord(cta.secondaryCta) ? cta.secondaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(cta.secondaryCta) ? cta.secondaryCta.openInNewTab : false,
        ),
      },
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    },
  }
}

function mapAppDetailPatch(contentMap: ContentMap) {
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}
  const patch: Record<string, unknown> = {
    name: localized(contentMap.name),
    slug: {
      _type: 'slug',
      current: asString(contentMap.slug),
    },
    tagline: localized(contentMap.tagline),
    description: localized(contentMap.description),
    category: asString(contentMap.category),
    layoutType: asString(contentMap.layoutType),
    benefits: localizedArray(contentMap.benefits),
    cta: {
      heading: localized(cta.heading),
      subtitle: localized(cta.subtitle),
      primaryCta: {
        text: localized(isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined),
        href: asString(isRecord(cta.primaryCta) ? cta.primaryCta.href : undefined),
      },
      secondaryCta: {
        text: localized(isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined),
        href: asString(isRecord(cta.secondaryCta) ? cta.secondaryCta.href : undefined),
      },
      backgroundStyle: asString(cta.backgroundStyle),
      backgroundImage: isRecord(cta.backgroundImage) ? cta.backgroundImage : undefined,
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
    },
  }

  if (Array.isArray(contentMap.screenshots)) {
    patch.screenshots = contentMap.screenshots
  }

  if (Array.isArray(contentMap.features)) {
    patch.features = contentMap.features
  }

  if (Array.isArray(contentMap.steps)) {
    patch.steps = contentMap.steps
  }

  if (isRecord(contentMap.platforms)) {
    patch.platforms = contentMap.platforms
  }

  if (isRecord(contentMap.storeUrls)) {
    patch.storeUrls = contentMap.storeUrls
  }

  return patch
}

function mapAboutPagePatch(contentMap: ContentMap) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const stats = isRecord(hero.stats) ? hero.stats : {}
  const enterprises = isRecord(stats.enterprises) ? stats.enterprises : {}
  const drivers = isRecord(stats.drivers) ? stats.drivers : {}
  const trips = isRecord(stats.trips) ? stats.trips : {}
  const story = isRecord(contentMap.story) ? contentMap.story : {}
  const mission = isRecord(story.mission) ? story.mission : {}
  const vision = isRecord(story.vision) ? story.vision : {}
  const values = isRecord(story.values) ? story.values : {}
  const innovation = isRecord(values.innovation) ? values.innovation : {}
  const reliability = isRecord(values.reliability) ? values.reliability : {}
  const sustainability = isRecord(values.sustainability) ? values.sustainability : {}
  const timeline = isRecord(contentMap.timeline) ? contentMap.timeline : {}
  const team = isRecord(contentMap.team) ? contentMap.team : {}
  const careers = isRecord(contentMap.careers) ? contentMap.careers : {}
  const cta = isRecord(contentMap.cta) ? contentMap.cta : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      title: localized(hero.title),
      subtitle: localized(hero.subtitle),
      stats: {
        enterprises: {
          value: localized(enterprises.value),
          label: localized(enterprises.label),
        },
        drivers: {
          value: localized(drivers.value),
          label: localized(drivers.label),
        },
        trips: {
          value: localized(trips.value),
          label: localized(trips.label),
        },
      },
    },
    story: {
      heading: localized(story.heading),
      subtitle: localized(story.subtitle),
      mission: {
        title: localized(mission.title),
        text: localized(mission.text),
      },
      vision: {
        title: localized(vision.title),
        text: localized(vision.text),
      },
      values: {
        title: localized(values.title),
        innovation: {
          title: localized(innovation.title),
          description: localized(innovation.description),
        },
        reliability: {
          title: localized(reliability.title),
          description: localized(reliability.description),
        },
        sustainability: {
          title: localized(sustainability.title),
          description: localized(sustainability.description),
        },
      },
    },
    timeline: {
      heading: localized(timeline.heading),
      subtitle: localized(timeline.subtitle),
      milestones: Array.isArray(timeline.milestones) ? timeline.milestones : [],
    },
    team: {
      heading: localized(team.heading),
      subtitle: localized(team.subtitle),
      members: Array.isArray(team.members) ? team.members : [],
    },
    careers: {
      heading: localized(careers.heading),
      subtitle: localized(careers.subtitle),
      openings: Array.isArray(careers.openings) ? careers.openings : [],
    },
    cta: {
      heading: localized(cta.heading),
      subtitle: localized(cta.subtitle),
      primaryCta: {
        text: localized(isRecord(cta.primaryCta) ? cta.primaryCta.text : undefined),
        href: asString(isRecord(cta.primaryCta) ? cta.primaryCta.href : undefined),
        openInNewTab: Boolean(isRecord(cta.primaryCta) ? cta.primaryCta.openInNewTab : false),
      },
      secondaryCta: {
        text: localized(isRecord(cta.secondaryCta) ? cta.secondaryCta.text : undefined),
        href: asString(isRecord(cta.secondaryCta) ? cta.secondaryCta.href : undefined),
        openInNewTab: Boolean(
          isRecord(cta.secondaryCta) ? cta.secondaryCta.openInNewTab : false,
        ),
      },
      backgroundStyle: asString(cta.backgroundStyle) || 'gradient',
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: localizedKeywordObject(seo.keywords),
      canonicalUrl: asString(seo.canonicalUrl) || undefined,
      noIndex: Boolean(seo.noIndex),
      noFollow: Boolean(seo.noFollow),
    },
  }
}

function mapContactPagePatch(contentMap: ContentMap) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const form = isRecord(contentMap.form) ? contentMap.form : {}
  const socialLinks = isRecord(contentMap.socialLinks) ? contentMap.socialLinks : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      title: localized(hero.title),
      subtitle: localized(hero.subtitle),
      emailLabel: localized(hero.emailLabel),
      phoneLabel: localized(hero.phoneLabel),
      locationLabel: localized(hero.locationLabel),
      email: asString(hero.email),
      phone: asString(hero.phone),
      location: localized(hero.location),
    },
    form: {
      title: localized(form.title),
      subtitle: localized(form.subtitle),
      name: localized(form.name),
      namePlaceholder: localized(form.namePlaceholder),
      email: localized(form.email),
      emailPlaceholder: localized(form.emailPlaceholder),
      company: localized(form.company),
      companyPlaceholder: localized(form.companyPlaceholder),
      phone: localized(form.phone),
      phonePlaceholder: localized(form.phonePlaceholder),
      userType: localized(form.userType),
      userTypePlaceholder: localized(form.userTypePlaceholder),
      userTypeEnterprise: localized(form.userTypeEnterprise),
      userTypeOperator: localized(form.userTypeOperator),
      message: localized(form.message),
      messagePlaceholder: localized(form.messagePlaceholder),
      notRobot: localized(form.notRobot),
      submit: localized(form.submit),
      submitting: localized(form.submitting),
      successTitle: localized(form.successTitle),
      successMessage: localized(form.successMessage),
      successButton: localized(form.successButton),
    },
    socialLinks: {
      heading: localized(socialLinks.heading),
      subtitle: localized(socialLinks.subtitle),
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: localizedKeywordObject(seo.keywords),
      canonicalUrl: asString(seo.canonicalUrl) || undefined,
      noIndex: Boolean(seo.noIndex),
      noFollow: Boolean(seo.noFollow),
    },
  }
}

function mapCaseStudiesPagePatch(contentMap: ContentMap) {
  const hero = isRecord(contentMap.hero) ? contentMap.hero : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    hero: {
      title: localized(hero.title),
      subtitle: localized(hero.subtitle),
      description: localized(hero.description),
    },
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: localizedKeywordObject(seo.keywords),
      canonicalUrl: asString(seo.canonicalUrl) || undefined,
      noIndex: Boolean(seo.noIndex),
      noFollow: Boolean(seo.noFollow),
    },
  }
}

function mapCaseStudyPatch(
  contentMap: ContentMap,
  resolvedCaseStudyCategoryReferences?: ResolvedCaseStudyCategoryReference[],
) {
  const testimonial = isRecord(contentMap.testimonial) ? contentMap.testimonial : {}
  const seo = isRecord(contentMap.seo) ? contentMap.seo : {}

  return {
    title: localized(contentMap.title),
    slug: {
      _type: 'slug',
      current: getSlugCurrent(contentMap.slug),
    },
    excerpt: localized(contentMap.excerpt),
    clientName: localized(contentMap.clientName),
    industry: localized(contentMap.industry),
    location: localized(contentMap.location),
    challenge: localizedRichText(contentMap.challenge),
    solution: localizedRichText(contentMap.solution),
    results: localizedRichText(contentMap.results),
    metrics: Array.isArray(contentMap.metrics) ? contentMap.metrics : [],
    testimonial: {
      quote: localized(testimonial.quote),
      author: localized(testimonial.author),
      role: localized(testimonial.role),
    },
    categories: resolvedCaseStudyCategoryReferences
      ? resolvedCaseStudyCategoryReferences.map((category) => ({
          _key: `case-category-${category.slug}`,
          _type: 'reference',
          _ref: category._id,
        }))
      : undefined,
    publishedAt: asString(contentMap.publishedAt),
    featured: Boolean(contentMap.featured),
    seo: {
      metaTitle: localized(seo.metaTitle),
      metaDescription: localized(seo.metaDescription),
      keywords: localizedKeywordObject(seo.keywords),
      canonicalUrl: asString(seo.canonicalUrl) || undefined,
      noIndex: Boolean(seo.noIndex),
      noFollow: Boolean(seo.noFollow),
    },
  }
}

function mapNavigationPatch(contentMap: ContentMap) {
  return {
    mainNav: Array.isArray(contentMap.mainNav) ? contentMap.mainNav : [],
    footerNavColumns: Array.isArray(contentMap.footerNavColumns)
      ? contentMap.footerNavColumns
      : [],
    footerText: localized(contentMap.footerText),
  }
}

export function buildDraftPlan({
  pageKey,
  action = 'draft',
  document,
  contentMap,
  resolvedAppsPageReferences,
  resolvedCaseStudyCategoryReferences,
  existingDocumentContent,
}: BuildDraftPlanArgs): BuildDraftPlanResult {
  const normalizedContentMap = normalizeContentMap({
    ...contentMap,
    pageKey,
    action,
  })
  const warnings: string[] = []

  if (action === 'publish' || normalizedContentMap.action === 'publish') {
    return {
      ok: false,
      message: PHASE_ONE_PUBLISH_BLOCK_MESSAGE,
      warnings,
    }
  }

  const validation = validateContentMap({
    ...normalizedContentMap,
  })

  if (!validation.valid || !validation.pageKey) {
    return {
      ok: false,
      message: 'Content map validation failed.',
      errors: validation.errors,
      warnings: uniqueWarnings(validation.warnings),
    }
  }

  const normalizedSlug = getSlugCurrent(normalizedContentMap.slug)
  const slug = normalizedSlug || undefined
  const publishedId = document?._id?.replace(/^drafts\./, '') || getDefaultDocumentId(validation.pageKey, slug)
  const draftId = `drafts.${publishedId}`
  const documentType = document?._type || QUERY_INSPECTION_MAP[validation.pageKey].documentType

  const showcase = isRecord(contentMap.showcase) ? contentMap.showcase : {}
  const hasAppsPageReferenceSlugs =
    validation.pageKey === 'apps' &&
    (Array.isArray(showcase.operatorAppSlugs) || Array.isArray(showcase.enterpriseAppSlugs))

  if (hasAppsPageReferenceSlugs && !resolvedAppsPageReferences) {
    return {
      ok: false,
      message: 'Apps page app references must be resolved before building a draft plan.',
      errors: [
        'showcase.operatorAppSlugs and showcase.enterpriseAppSlugs require resolved Sanity app documents before draft planning.',
      ],
      warnings: uniqueWarnings(validation.warnings),
    }
  }

  const hasCaseStudyCategorySlugs =
    validation.pageKey === 'caseStudy' && Array.isArray(normalizedContentMap.categorySlugs)

  if (hasCaseStudyCategorySlugs && !resolvedCaseStudyCategoryReferences) {
    return {
      ok: false,
      message: 'Case study category references must be resolved before building a draft plan.',
      errors: ['categorySlugs require resolved Sanity case study category documents before draft planning.'],
      warnings: uniqueWarnings(validation.warnings),
    }
  }

  let patch: Record<string, unknown>
  switch (validation.pageKey) {
    case 'homepage':
      patch = mapHomepagePatch(normalizedContentMap, warnings)
      break
    case 'solutions':
      patch = mapSolutionsPatch(normalizedContentMap)
      break
    case 'solutionsEnterprisesPassengers':
      patch = mapSolutionsEnterprisesPassengersPatch(normalizedContentMap)
      break
    case 'solutionsOperatorsDrivers':
      patch = mapSolutionsOperatorsDriversPatch(normalizedContentMap)
      break
    case 'apps':
      patch = mapAppsPagePatch(normalizedContentMap, warnings, resolvedAppsPageReferences)
      break
    case 'appDetail':
      patch = mapAppDetailPatch(normalizedContentMap)
      break
    case 'about':
      patch = mapAboutPagePatch(normalizedContentMap)
      break
    case 'contact':
      patch = mapContactPagePatch(normalizedContentMap)
      break
    case 'caseStudies':
      patch = mapCaseStudiesPagePatch(normalizedContentMap)
      break
    case 'caseStudy':
      patch = mapCaseStudyPatch(normalizedContentMap, resolvedCaseStudyCategoryReferences)
      break
    case 'navigation':
      patch = mapNavigationPatch(normalizedContentMap)
      break
  }

  patch = preserveKnownImageFields(patch, existingDocumentContent) as Record<string, unknown>

  return {
    ok: true,
    message: 'Draft plan generated.',
    documentId: draftId,
    documentType,
    warnings: uniqueWarnings([...validation.warnings, ...warnings]),
    patch,
    operations: [
      {
        type: 'createIfNotExists',
        document: {
          _id: draftId,
          _type: documentType,
        },
      },
      {
        type: 'patch',
        id: draftId,
        set: patch,
      },
    ],
  }
}
