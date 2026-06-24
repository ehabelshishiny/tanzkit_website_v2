import { groq } from 'next-sanity';
import { getClient } from './client';

// Helper to get localized field based on locale
export const localizedField = (field: string, locale: string = 'en') => {
  return `"${field}": coalesce(${field}.${locale}, ${field}.en)`;
};

// Get multiple localized fields
export const localizedFields = (fields: string[], locale: string = 'en') => {
  return fields.map((field) => localizedField(field, locale)).join(',\n  ');
};

// Image projection
export const imageProjection = groq`{
  _type,
  asset,
  "alt": coalesce(alt.en, alt.ar),
  hotspot,
  crop
}`;

// Hero Section query
export const heroSectionQuery = (locale: string = 'en') => groq`
  *[_type == "heroSection"][0] {
    _id,
    _type,
    ${localizedField('title', locale)},
    ${localizedField('subtitle', locale)},
    ${localizedField('description', locale)},
    buttons[] {
      _key,
      ${localizedField('label', locale)},
      href,
      variant,
      icon
    },
    backgroundImage ${imageProjection},
    backgroundVideo,
    showStats,
    stats[] {
      _key,
      value,
      ${localizedField('label', locale)}
    }
  }
`;

// All Services query
export const servicesQuery = (locale: string = 'en') => groq`
  *[_type == "service"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('description', locale)},
    icon,
    image ${imageProjection},
    features[] {
      _key,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    category->,
    order
  }
`;

// Single Service query
export const serviceBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "service" && slug.current == "${slug}"][0] {
    _id,
    _type,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('description', locale)},
    icon,
    image ${imageProjection},
    features[] {
      _key,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    category->,
    order
  }
`;

// Testimonials query
export const testimonialsQuery = (locale: string = 'en') => groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    _type,
    clientName,
    company,
    ${localizedField('role', locale)},
    ${localizedField('quote', locale)},
    rating,
    image ${imageProjection},
    companyLogo ${imageProjection},
    featured
  }
`;

// Featured Testimonials query
export const featuredTestimonialsQuery = (locale: string = 'en') => groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    _type,
    clientName,
    company,
    ${localizedField('role', locale)},
    ${localizedField('quote', locale)},
    rating,
    image ${imageProjection},
    companyLogo ${imageProjection}
  }
`;

// Team Members query
export const teamMembersQuery = (locale: string = 'en') => groq`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    _type,
    name,
    ${localizedField('role', locale)},
    ${localizedField('bio', locale)},
    image ${imageProjection},
    email,
    phone,
    socialLinks[] {
      _key,
      platform,
      url
    },
    order
  }
`;

// Site Settings query
export const siteSettingsQuery = (locale: string = 'en') => groq`
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    ${localizedField('siteTitle', locale)},
    ${localizedField('siteDescription', locale)},
    logo ${imageProjection},
    favicon ${imageProjection},
    contactEmail,
    contactPhone,
    socialLinks,
    announcementBar {
      enabled,
      ${localizedField('text', locale)},
      link,
      variant
    }
  }
`;

// Navigation query
export const navigationQuery = (locale: string = 'en') => groq`
  *[_type == "navigation" && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    mainNav[] {
      _key,
      ${localizedField('label', locale)},
      href,
      submenu[] {
        _key,
        ${localizedField('label', locale)},
        href,
        ${localizedField('description', locale)}
      }
    },
    footerNavColumns[] {
      _key,
      ${localizedField('heading', locale)},
      links[] {
        _key,
        ${localizedField('label', locale)},
        href
      }
    },
    ${localizedField('footerText', locale)}
  }
`;

// Home Page query
export const homePageQuery = (locale: string = 'en') => groq`
  *[_type == "homePage" && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('titleHighlight', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      }
    },
    overview {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      features[] {
        _key,
        icon,
        ${localizedField('title', locale)},
        ${localizedField('description', locale)}
      }
    },
    featureTabs {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      tabs[] {
        _key,
        ${localizedField('label', locale)},
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        image ${imageProjection},
        features[] {
          _key,
          ${localizedField('text', locale)}
        }
      }
    },
    screenshotCarousel {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      items[] {
        _key,
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        ${localizedField('category', locale)},
        image ${imageProjection}
      }
    },
    logoBar {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      logos[] ${imageProjection}
    },
    testimonials {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      items[] {
        _key,
        ${localizedField('quote', locale)},
        ${localizedField('author', locale)},
        ${localizedField('role', locale)},
        ${localizedField('company', locale)},
        rating
      }
    },
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      backgroundStyle
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Apps query
export const appsQuery = (locale: string = 'en') => groq`
  *[_type == "app"] | order(order asc) {
    _id,
    _type,
    ${localizedField('name', locale)},
    slug,
    ${localizedField('tagline', locale)},
    ${localizedField('description', locale)},
    category,
    layoutType,
    "benefits": benefits[].${locale},
    screenshots[] ${imageProjection},
    features[] {
      _key,
      icon,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)},
      image ${imageProjection}
    },
    platforms,
    storeUrls,
    order
  }
`;

// Single App query
export const appBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "app" && slug.current == "${slug}"][0] {
    _id,
    _type,
    ${localizedField('name', locale)},
    slug,
    ${localizedField('tagline', locale)},
    ${localizedField('description', locale)},
    category,
    layoutType,
    "benefits": benefits[].${locale},
    screenshots[] ${imageProjection},
    features[] {
      _key,
      icon,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)},
      image ${imageProjection}
    },
    steps[] {
      _key,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    platforms,
    storeUrls,
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href
      },
      backgroundStyle,
      backgroundImage ${imageProjection}
    },
    order,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Solutions Page query
export const solutionsPageQuery = (locale: string = 'en') => groq`
  *[_type == "solutionsPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      title {
        ${localizedField('smart', locale)},
        ${localizedField('mobility', locale)},
        ${localizedField('practicalResults', locale)}
      },
      ${localizedField('subtitle', locale)},
      ${localizedField('cta', locale)},
      nodes {
        ${localizedField('operator', locale)},
        ${localizedField('enterprise', locale)},
        ${localizedField('supervisor', locale)},
        ${localizedField('driver', locale)},
        ${localizedField('rider', locale)}
      }
    },
    intro {
      ${localizedField('text', locale)},
      howWeHelp {
        ${localizedField('title', locale)},
        "benefits": benefits[].${locale}
      }
    },
    audienceCards {
      operators {
        ${localizedField('headline', locale)},
        ${localizedField('description', locale)},
        "benefits": benefits[].${locale},
        ${localizedField('cta', locale)}
      },
      enterprises {
        ${localizedField('headline', locale)},
        ${localizedField('description', locale)},
        "benefits": benefits[].${locale},
        ${localizedField('cta', locale)}
      }
    },
    technology {
      ${localizedField('title', locale)},
      highlights[] {
        _key,
        icon,
        ${localizedField('text', locale)}
      }
    },
    whyTranzkit {
      ${localizedField('title', locale)},
      "reasons": reasons[].${locale}
    },
    cta {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)}
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Solutions: Enterprises & Passengers Page query
export const solutionsEnterprisesPassengersPageQuery = (
  locale: string = 'en',
) => groq`
  *[_type == "solutionsEnterprisesPassengersPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('cta', locale)}
    },
    audienceSwitcher {
      tabs {
        ${localizedField('enterprise', locale)},
        ${localizedField('passenger', locale)}
      },
      enterprise {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        features[] {
          icon,
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        }
      },
      passenger {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        features[] {
          icon,
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        }
      }
    },
    overview {
      ${localizedField('text', locale)}
    },
    featureShowcase {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      features[] {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)}
      }
    },
    workflow {
      passenger {
        ${localizedField('title', locale)},
        ${localizedField('subtitle', locale)},
        steps[] {
          ${localizedField('title', locale)},
          ${localizedField('description', locale)},
          icon
        }
      },
      enterprise {
        ${localizedField('title', locale)},
        ${localizedField('subtitle', locale)},
        steps[] {
          ${localizedField('title', locale)},
          ${localizedField('description', locale)},
          icon
        }
      }
    },
    appScreens {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      screenshots[] {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        image {
          asset->{
            _id,
            url
          }
        }
      }
    },
    features {
      ${localizedField('overview', locale)},
      ${localizedField('title', locale)},
      items[] {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        "points": points[].${locale}
      }
    },
    testimonials {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      items[] {
        name,
        ${localizedField('role', locale)},
        company,
        ${localizedField('content', locale)},
        initials,
        rating
      }
    },
    aiImpact {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('impactTitle', locale)},
      metrics[] {
        ${localizedField('value', locale)},
        ${localizedField('label', locale)},
        ${localizedField('description', locale)}
      }
    },
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      }
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Solutions: Operators & Drivers Page query
export const solutionsOperatorsDriversPageQuery = (
  locale: string = 'en',
) => groq`
  *[_type == "solutionsOperatorsDriversPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('cta', locale)}
    },
    overview {
      ${localizedField('text', locale)}
    },
    roleSwitcher {
      tabs {
        ${localizedField('operator', locale)},
        ${localizedField('driver', locale)}
      },
      operator {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        features[] {
          icon,
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        }
      },
      driver {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        features[] {
          icon,
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        }
      }
    },
    timeline {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      items[] {
        time,
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        icon
      }
    },
    dashboards {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      screenshots[] {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        image {
          asset->{
            _id,
            url
          }
        }
      }
    },
    mobileApps {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      features[] {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        ${localizedField('badge', locale)}
      }
    },
    features {
      ${localizedField('overview', locale)},
      ${localizedField('title', locale)},
      items[] {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        "points": points[].${locale}
      }
    },
    aiImpact {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('impactTitle', locale)},
      metrics[] {
        ${localizedField('value', locale)},
        ${localizedField('label', locale)},
        ${localizedField('description', locale)}
      }
    },
    faq {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      items[] {
        ${localizedField('question', locale)},
        ${localizedField('answer', locale)}
      }
    },
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      }
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Apps Page query
export const appsPageQuery = (locale: string = 'en') => groq`
  *[_type == "appsPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('titlePart1', locale)},
      ${localizedField('titlePart2', locale)},
      ${localizedField('titlePart3', locale)},
      ${localizedField('subtitle', locale)}
    },
    showcase {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      operatorsSegment {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        ${localizedField('tabLabel', locale)}
      },
      enterpriseSegment {
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        ${localizedField('tabLabel', locale)}
      },
      "operatorApps": operatorApps[]-> {
        _id,
        _type,
        ${localizedField('name', locale)},
        slug,
        ${localizedField('tagline', locale)},
        ${localizedField('description', locale)},
        category,
        layoutType,
        "benefits": benefits[].${locale},
        screenshots[] ${imageProjection},
        platforms,
        storeUrls,
        order
      },
      "enterpriseApps": enterpriseApps[]-> {
        _id,
        _type,
        ${localizedField('name', locale)},
        slug,
        ${localizedField('tagline', locale)},
        ${localizedField('description', locale)},
        category,
        layoutType,
        "benefits": benefits[].${locale},
        screenshots[] ${imageProjection},
        platforms,
        storeUrls,
        order
      }
    },
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      }
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// About Page query
export const aboutPageQuery = (locale: string = 'en') => groq`
  *[_type == "aboutPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      stats {
        enterprises {
          ${localizedField('value', locale)},
          ${localizedField('label', locale)}
        },
        drivers {
          ${localizedField('value', locale)},
          ${localizedField('label', locale)}
        },
        trips {
          ${localizedField('value', locale)},
          ${localizedField('label', locale)}
        }
      }
    },
    story {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      mission {
        ${localizedField('title', locale)},
        ${localizedField('text', locale)}
      },
      vision {
        ${localizedField('title', locale)},
        ${localizedField('text', locale)}
      },
      values {
        ${localizedField('title', locale)},
        innovation {
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        },
        reliability {
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        },
        sustainability {
          ${localizedField('title', locale)},
          ${localizedField('description', locale)}
        }
      }
    },
    timeline {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      milestones[] {
        _key,
        year,
        ${localizedField('title', locale)},
        ${localizedField('description', locale)},
        icon
      }
    },
    team {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      members[] {
        _key,
        name,
        ${localizedField('role', locale)},
        ${localizedField('bio', locale)},
        image ${imageProjection},
        linkedin,
        twitter
      }
    },
    careers {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      openings[isActive == true] {
        _key,
        ${localizedField('title', locale)},
        ${localizedField('department', locale)},
        ${localizedField('location', locale)},
        ${localizedField('type', locale)},
        ${localizedField('description', locale)},
        slug,
        applyUrl
      }
    },
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      }
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Contact Page query
export const contactPageQuery = (locale: string = 'en') => groq`
  *[_type == "contactPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('emailLabel', locale)},
      ${localizedField('phoneLabel', locale)},
      ${localizedField('locationLabel', locale)},
      email,
      phone,
      ${localizedField('location', locale)}
    },
    form {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('name', locale)},
      ${localizedField('namePlaceholder', locale)},
      ${localizedField('email', locale)},
      ${localizedField('emailPlaceholder', locale)},
      ${localizedField('company', locale)},
      ${localizedField('companyPlaceholder', locale)},
      ${localizedField('phone', locale)},
      ${localizedField('phonePlaceholder', locale)},
      ${localizedField('userType', locale)},
      ${localizedField('userTypePlaceholder', locale)},
      ${localizedField('userTypeEnterprise', locale)},
      ${localizedField('userTypeOperator', locale)},
      ${localizedField('message', locale)},
      ${localizedField('messagePlaceholder', locale)},
      ${localizedField('notRobot', locale)},
      ${localizedField('submit', locale)},
      ${localizedField('submitting', locale)},
      ${localizedField('successTitle', locale)},
      ${localizedField('successMessage', locale)},
      ${localizedField('successButton', locale)}
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// Pricing Page query
export const pricingPageQuery = (locale: string = 'en') => groq`
  *[_type == "pricingPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('highlightNoSetupFees', locale)},
      ${localizedField('highlightCancelAnytime', locale)},
      ${localizedField('highlightFreeTrial', locale)}
    },
    pricingCards {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('period', locale)},
      ${localizedField('contactSales', locale)},
      plans[] {
        _key,
        id,
        ${localizedField('name', locale)},
        ${localizedField('badge', locale)},
        ${localizedField('price', locale)},
        ${localizedField('description', locale)},
        features[] {
          _key,
          ${localizedField('text', locale)},
          included
        },
        ${localizedField('ctaText', locale)},
        ctaHref,
        highlighted
      }
    },
    comparisonTable {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('tableHeaderFeature', locale)},
      ${localizedField('tableHeaderStarter', locale)},
      ${localizedField('tableHeaderProfessional', locale)},
      ${localizedField('tableHeaderEnterprise', locale)},
      features[] {
        _key,
        ${localizedField('feature', locale)},
        starter,
        professional,
        enterprise
      }
    },
    cta {
      ${localizedField('heading', locale)},
      ${localizedField('subtitle', locale)},
      primaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      },
      secondaryCta {
        ${localizedField('text', locale)},
        href,
        openInNewTab
      }
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      ogImage ${imageProjection},
      keywords
    }
  }
`;

// ============================================
// Fetch Functions (with caching)
// ============================================

export async function getSiteSettings(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    siteSettingsQuery(locale),
    {},
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );
}

export async function getNavigation(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    navigationQuery(locale),
    {},
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );
}

export async function getHomePage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    homePageQuery(locale),
    {},
    {
      next: { revalidate: 60 }, // Cache for 1 minute
    },
  );
}

export async function getApps(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    appsQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getAppBySlug(slug: string, locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    appBySlugQuery(slug, locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getTestimonials(
  locale: string = 'en',
  featured: boolean = false,
) {
  const client = await getClient();
  const query = featured
    ? featuredTestimonialsQuery(locale)
    : testimonialsQuery(locale);
  return client.fetch(
    query,
    {},
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );
}

export async function getTeamMembers(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    teamMembersQuery(locale),
    {},
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );
}

export async function getSolutionsPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    solutionsPageQuery(locale),
    {},
    {
      next: { revalidate: 60 }, // Cache for 1 minute
    },
  );
}

export async function getSolutionsEnterprisesPassengersPage(
  locale: string = 'en',
) {
  const client = await getClient();
  return client.fetch(
    solutionsEnterprisesPassengersPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getSolutionsOperatorsDriversPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    solutionsOperatorsDriversPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getAppsPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    appsPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getAboutPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    aboutPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getContactPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    contactPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

export async function getPricingPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    pricingPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

// ============================================
// Job Application Queries
// ============================================

/**
 * Job Application Form Labels Query
 */
export const jobApplicationFormLabelsQuery = (locale: string = 'en') => groq`
  *[_type == "siteSettings"][0] {
    jobApplicationForm {
      ${localizedField('name', locale)},
      ${localizedField('email', locale)},
      ${localizedField('phone', locale)},
      ${localizedField('resume', locale)},
      ${localizedField('coverLetter', locale)},
      ${localizedField('linkedinUrl', locale)},
      ${localizedField('portfolioUrl', locale)},
      ${localizedField('submit', locale)},
      ${localizedField('submitting', locale)},
      ${localizedField('captcha', locale)},
      ${localizedField('successMessage', locale)},
      ${localizedField('errorMessage', locale)},
      ${localizedField('fileTooBig', locale)},
      ${localizedField('invalidFileType', locale)},
      "placeholders": {
        "name": coalesce(placeholderName.${locale}, placeholderName.en),
        "email": coalesce(placeholderEmail.${locale}, placeholderEmail.en),
        "phone": coalesce(placeholderPhone.${locale}, placeholderPhone.en),
        "coverLetter": coalesce(placeholderCoverLetter.${locale}, placeholderCoverLetter.en),
        "linkedinUrl": coalesce(placeholderLinkedinUrl.${locale}, placeholderLinkedinUrl.en),
        "portfolioUrl": coalesce(placeholderPortfolioUrl.${locale}, placeholderPortfolioUrl.en)
      }
    }
  }.jobApplicationForm
`;

export async function getJobApplicationFormLabels(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    jobApplicationFormLabelsQuery(locale),
    {},
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );
}

/**
 * Career/Job Query by Slug
 */
export const careerBySlugQuery = (locale: string = 'en') => groq`
  *[_type == "aboutPage"][0] {
    careers {
      openings[slug.current == $slug][0] {
        _key,
        ${localizedField('title', locale)},
        ${localizedField('department', locale)},
        ${localizedField('location', locale)},
        ${localizedField('type', locale)},
        ${localizedField('description', locale)},
        "fullDescription": coalesce(fullDescription.${locale}, fullDescription.en),
        slug,
        applicationEmail,
        isActive,
        postedDate,
        closingDate,
        applyUrl
      }
    }
  }.careers.openings
`;

export async function getCareerBySlug(slug: string, locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    careerBySlugQuery(locale),
    { slug },
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

/**
 * All Active Careers Query
 */
export const activeCareersQuery = (locale: string = 'en') => groq`
  *[_type == "aboutPage"][0] {
    careers {
      openings[isActive == true] {
        _key,
        ${localizedField('title', locale)},
        ${localizedField('department', locale)},
        ${localizedField('location', locale)},
        ${localizedField('type', locale)},
        ${localizedField('description', locale)},
        slug,
        postedDate,
        closingDate
      }
    }
  }.careers.openings
`;

export async function getActiveCareers(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    activeCareersQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

// ============================================================================
// RESOURCES HUB QUERIES
// ============================================================================

/**
 * Resources Hub Page Queries
 */

// Resources Hub Page
export const resourcesHubPageQuery = (locale: string = 'en') => groq`
  *[_type == "resourcesHubPage"][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('description', locale)}
    },
    blogSection {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    caseStudiesSection {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    faqSection {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    careersSection {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {
        ${localizedField('asset', locale)}->{
          _id,
          url
        }
      }
    }
  }
`;

export async function getResourcesHubPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    resourcesHubPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

// Blog Page
export const blogPageQuery = (locale: string = 'en') => groq`
  *[_type == "blogPage"][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('description', locale)}
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {
        ${localizedField('asset', locale)}->{
          _id,
          url
        }
      }
    }
  }
`;

export async function getBlogPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    blogPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

// Case Studies Page
export const caseStudiesPageQuery = (locale: string = 'en') => groq`
  *[_type == "caseStudiesPage"][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('description', locale)}
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {
        ${localizedField('asset', locale)}->{
          _id,
          url
        }
      }
    }
  }
`;

export async function getCaseStudiesPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    caseStudiesPageQuery(locale),
    {},
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );
}

// FAQ Page
export const faqPageQuery = (locale: string = 'en') => groq`
  *[_type == "faqPage"][0] {
    _id,
    hero {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      ${localizedField('description', locale)}
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {
        ${localizedField('asset', locale)}->{
          _id,
          url
        }
      }
    }
  }
`;

export async function getFAQPage(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    faqPageQuery(locale),
    {},
    {
      next: { revalidate: 60 }, // Cache for 1 minute
    },
  );
}

/**
 * Blog Queries
 */

// All published blog posts
export const blogPostsQuery = (locale: string = 'en') => groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    featuredImage {
      image {
        asset->{_id, url}
      },
      ${localizedField('alt', locale)}
    },
    author->{
      ${localizedField('name', locale)},
      ${localizedField('role', locale)},
      avatar {asset->{_id, url}}
    },
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    publishedAt,
    readingTime,
    featured
  }
`;

export async function getBlogPosts(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    blogPostsQuery(locale),
    {},
    {
      next: { revalidate: 60 }, // Cache for 1 minute
    },
  );
}

// Single blog post by slug
export const blogPostBySlugQuery = (locale: string = 'en') => groq`
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    "content": coalesce(content.${locale}, content.en),
    featuredImage {
      image {
        asset->{_id, url}
      },
      ${localizedField('alt', locale)}
    },
    author->{
      ${localizedField('name', locale)},
      ${localizedField('bio', locale)},
      ${localizedField('role', locale)},
      avatar {asset->{_id, url}},
      socialLinks
    },
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    tags,
    publishedAt,
    updatedAt,
    readingTime,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {
        ${locale} {asset->{_id, url}}
      }
    },
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && status == "published" && count((categories[]._ref)[@ in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      ${localizedField('title', locale)},
      slug,
      ${localizedField('excerpt', locale)},
      featuredImage {
        image {asset->{_id, url}}
      },
      publishedAt
    }
  }
`;

export async function getBlogPostBySlug(slug: string, locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    blogPostBySlugQuery(locale),
    { slug },
    {
      next: { revalidate: 60 }, // Cache for 1 minute
    },
  );
}

// Featured blog posts
export const featuredBlogPostsQuery = (locale: string = 'en') => groq`
  *[_type == "blogPost" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    featuredImage {
      image {asset->{_id, url}},
      ${localizedField('alt', locale)}
    },
    publishedAt,
    readingTime
  }
`;

export async function getFeaturedBlogPosts(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    featuredBlogPostsQuery(locale),
    {},
    {
      next: { revalidate: 60 },
    },
  );
}

/**
 * Case Study Queries
 */

// All case studies
export const caseStudiesQuery = (locale: string = 'en') => groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('clientName', locale)},
    ${localizedField('industry', locale)},
    featuredImage {
      image {
        asset->{_id, url}
      },
      ${localizedField('alt', locale)}
    },
    clientLogo {asset->{_id, url}},
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    metrics[] {
      ${localizedField('value', locale)},
      ${localizedField('label', locale)},
      icon
    },
    publishedAt,
    featured
  }
`;

export async function getCaseStudies(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    caseStudiesQuery(locale),
    {},
    {
      next: { revalidate: 300 },
    },
  );
}

// Single case study by slug
export const caseStudyBySlugQuery = (locale: string = 'en') => groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('clientName', locale)},
    ${localizedField('industry', locale)},
    ${localizedField('location', locale)},
    featuredImage {
      image {
        asset->{_id, url}
      },
      ${localizedField('alt', locale)}
    },
    clientLogo {asset->{_id, url}},
    "challenge": coalesce(challenge.${locale}, challenge.en),
    "solution": coalesce(solution.${locale}, solution.en),
    "results": coalesce(results.${locale}, results.en),
    metrics[] {
      ${localizedField('value', locale)},
      ${localizedField('label', locale)},
      icon
    },
    testimonial {
      ${localizedField('quote', locale)},
      ${localizedField('author', locale)},
      ${localizedField('role', locale)},
      avatar {asset->{_id, url}}
    },
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    publishedAt,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {${locale} {asset->{_id, url}}}
    }
  }
`;

export async function getCaseStudyBySlug(slug: string, locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    caseStudyBySlugQuery(locale),
    { slug },
    {
      next: { revalidate: 300 },
    },
  );
}

// Featured case studies
export const featuredCaseStudiesQuery = (locale: string = 'en') => groq`
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('clientName', locale)},
    featuredImage {
      image {asset->{_id, url}}
    },
    publishedAt
  }
`;

export async function getFeaturedCaseStudies(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    featuredCaseStudiesQuery(locale),
    {},
    {
      next: { revalidate: 300 },
    },
  );
}

/**
 * FAQ Queries
 */

// All active FAQs grouped by category
export const faqsQuery = (locale: string = 'en') => groq`
  *[_type == "faqCategory"] | order(name.en asc) {
    _id,
    ${localizedField('name', locale)},
    slug,
    ${localizedField('description', locale)},
    "items": *[_type == "faqItem" && category._ref == ^._id && isActive == true] | order(order asc) {
      _id,
      ${localizedField('question', locale)},
      "answer": coalesce(answer.${locale}, answer.en),
      tags,
      order
    }
  }
`;

export async function getFAQs(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    faqsQuery(locale),
    {},
    {
      next: { revalidate: 300 },
    },
  );
}

// All FAQs (flat list for search)
export const allFaqsQuery = (locale: string = 'en') => groq`
  *[_type == "faqItem" && isActive == true] | order(order asc) {
    _id,
    ${localizedField('question', locale)},
    "answer": coalesce(answer.${locale}, answer.en),
    category->{
      ${localizedField('name', locale)},
      slug
    },
    tags
  }
`;

export async function getAllFAQs(locale: string = 'en') {
  const client = await getClient();
  return client.fetch(
    allFaqsQuery(locale),
    {},
    {
      next: { revalidate: 300 },
    },
  );
}

/**
 * Career Queries (Resources Hub - standalone documents)
 */
