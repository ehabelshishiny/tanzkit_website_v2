/**
 * Content Migration Script
 * Extracts existing content from translation files and populates Sanity CMS
 *
 * Usage: npx tsx scripts/migrate-content.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@sanity/client';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

// Create write client directly here
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-10',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

import enMessages from '../messages/en.json';
import arMessages from '../messages/ar.json';
import { appsData } from '../src/config/apps-data';

// Helper to create localized string
const loc = (en: string, ar: string) => ({ en, ar });

// Helper to create localized text
const locText = (en: string, ar: string) => ({ en, ar });

async function migrateSiteSettings() {
  console.log('📝 Migrating Site Settings...');
  
  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: loc('Tranzkit', 'ترانزكِت'),
    siteDescription: locText(
      'The Enterprise OS for Workforce Mobility - The all-in-one platform for operators, enterprises, supervisors, drivers, and passengers',
      'نظام التشغيل المؤسسي لتنقل القوى العاملة - المنصة الشاملة للمشغلين والمؤسسات والمشرفين والسائقين والركاب'
    ),
    contactEmail: 'info@tranzkit.com',
    contactPhone: '+1234567890',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/tranzkit',
      twitter: 'https://twitter.com/tranzkit',
    },
    announcementBar: {
      enabled: false,
      text: loc('', ''),
      link: '',
      variant: 'info',
    },
    jobApplicationForm: {
      name: loc('Full Name', 'الاسم الكامل'),
      email: loc('Email Address', 'البريد الإلكتروني'),
      phone: loc('Phone Number', 'رقم الهاتف'),
      resume: loc('Resume/CV', 'السيرة الذاتية'),
      coverLetter: loc('Cover Letter', 'خطاب التقديم'),
      linkedinUrl: loc('LinkedIn Profile (Optional)', 'حساب LinkedIn (اختياري)'),
      portfolioUrl: loc('Portfolio URL (Optional)', 'رابط معرض الأعمال (اختياري)'),
      submit: loc('Submit Application', 'إرسال الطلب'),
      submitting: loc('Submitting...', 'جاري الإرسال...'),
      captcha: loc('I am not a robot', 'أنا لست روبوت'),
      successMessage: loc('Application submitted successfully! We will review your application and get back to you soon.', 'تم إرسال طلبك بنجاح! سنقوم بمراجعة طلبك والرد عليك قريباً.'),
      errorMessage: loc('Failed to submit application. Please try again.', 'فشل إرسال الطلب. يرجى المحاولة مرة أخرى.'),
      fileTooBig: loc('File size exceeds 5MB limit', 'حجم الملف يتجاوز حد 5 ميجابايت'),
      invalidFileType: loc('Only PDF, DOC, and DOCX files are allowed', 'يُسمح فقط بملفات PDF و DOC و DOCX'),
      placeholderName: loc('John Doe', 'أحمد محمد'),
      placeholderEmail: loc('john@example.com', 'ahmed@example.com'),
      placeholderPhone: loc('+1 234 567 8900', '+966 50 123 4567'),
      placeholderCoverLetter: loc('Tell us why you\'re a great fit for this position...', 'أخبرنا لماذا أنت مناسب لهذا المنصب...'),
      placeholderLinkedinUrl: loc('https://linkedin.com/in/yourprofile', 'https://linkedin.com/in/yourprofile'),
      placeholderPortfolioUrl: loc('https://yourportfolio.com', 'https://yourportfolio.com'),
    },
  };

  try {
    await writeClient.createOrReplace(siteSettings);
    console.log('✅ Site Settings migrated');
  } catch (error) {
    console.error('❌ Error migrating Site Settings:', error);
  }
}

async function migrateNavigation() {
  console.log('📝 Migrating Navigation...');
  
  const navigation = {
    _id: 'navigation',
    _type: 'navigation',
    mainNav: [
      {
        _key: 'home',
        label: loc(enMessages.nav.home, arMessages.nav.home),
        href: '/',
      },
      {
        _key: 'solutions',
        label: loc(enMessages.nav.solutions, arMessages.nav.solutions),
        href: '/solutions',
        submenu: [
          {
            _key: 'enterprises-passengers',
            label: loc(
              enMessages.nav.submenus.solutions.enterprisesPassengers.name,
              arMessages.nav.submenus.solutions.enterprisesPassengers.name
            ),
            description: loc(
              enMessages.nav.submenus.solutions.enterprisesPassengers.description,
              arMessages.nav.submenus.solutions.enterprisesPassengers.description
            ),
            href: '/solutions/enterprises-passengers',
          },
          {
            _key: 'operators-drivers',
            label: loc(
              enMessages.nav.submenus.solutions.operatorsDrivers.name,
              arMessages.nav.submenus.solutions.operatorsDrivers.name
            ),
            description: loc(
              enMessages.nav.submenus.solutions.operatorsDrivers.description,
              arMessages.nav.submenus.solutions.operatorsDrivers.description
            ),
            href: '/solutions/operators-drivers',
          },
        ],
      },
      {
        _key: 'resources',
        label: loc(enMessages.nav.resources, arMessages.nav.resources),
        href: '/resources',
        submenu: [
          {
            _key: 'blog',
            label: loc(enMessages.nav.submenus.resources.blog, arMessages.nav.submenus.resources.blog),
            href: '/resources/blog',
          },
          {
            _key: 'case-studies',
            label: loc(enMessages.nav.submenus.resources.caseStudies, arMessages.nav.submenus.resources.caseStudies),
            href: '/resources/case-studies',
          },
          {
            _key: 'faq',
            label: loc(enMessages.nav.submenus.resources.faq, arMessages.nav.submenus.resources.faq),
            href: '/resources/faq',
          },
          {
            _key: 'careers',
            label: loc(enMessages.nav.submenus.resources.careers, arMessages.nav.submenus.resources.careers),
            href: '/resources/careers',
          },
        ],
      },
      {
        _key: 'apps',
        label: loc(enMessages.nav.apps, arMessages.nav.apps),
        href: '/apps',
        submenu: [
          {
            _key: 'supervisor',
            label: loc(enMessages.nav.submenus.apps.supervisor, arMessages.nav.submenus.apps.supervisor),
            href: '/apps/supervisor',
          },
          {
            _key: 'driver',
            label: loc(enMessages.nav.submenus.apps.driver, arMessages.nav.submenus.apps.driver),
            href: '/apps/driver',
          },
          {
            _key: 'rider',
            label: loc(enMessages.nav.submenus.apps.rider, arMessages.nav.submenus.apps.rider),
            href: '/apps/rider',
          },
        ],
      },
    ],
  };

  try {
    await writeClient.createOrReplace(navigation);
    console.log('✅ Navigation migrated');
  } catch (error) {
    console.error('❌ Error migrating Navigation:', error);
  }
}

async function migrateHomePage() {
  console.log('📝 Migrating Home Page...');

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      title: loc(
        `${enMessages.homepage.hero.title} ${enMessages.homepage.hero.titleHighlight.for} ${enMessages.homepage.hero.titleHighlight.workforce} ${enMessages.homepage.hero.titleHighlight.mobility}`,
        `${arMessages.homepage.hero.title} ${arMessages.homepage.hero.titleHighlight.for} ${arMessages.homepage.hero.titleHighlight.workforce} ${arMessages.homepage.hero.titleHighlight.mobility}`
      ),
      subtitle: locText(enMessages.homepage.hero.subtitle, arMessages.homepage.hero.subtitle),
      primaryCta: {
        text: loc(enMessages.homepage.hero.cta, arMessages.homepage.hero.cta),
        href: '/trial',
        openInNewTab: false,
      },
      secondaryCta: {
        text: loc(enMessages.common.learnMore, arMessages.common.learnMore),
        href: '/about',
        openInNewTab: false,
      },
    },
    overview: {
      heading: loc(enMessages.homepage.whyChoose.heading, arMessages.homepage.whyChoose.heading),
      subtitle: locText(enMessages.homepage.whyChoose.subtitle, arMessages.homepage.whyChoose.subtitle),
      features: enMessages.homepage.whyChoose.items.map((item: any, index: number) => ({
        _key: `overview-${index}`,
        title: loc(item.title, arMessages.homepage.whyChoose.items[index].title),
        description: locText(item.description, arMessages.homepage.whyChoose.items[index].description),
      })),
    },
    featuresSimple: {
      heading: loc(enMessages.homepage.featuresSimple.heading, arMessages.homepage.featuresSimple.heading),
      subtitle: locText(enMessages.homepage.featuresSimple.subtitle, arMessages.homepage.featuresSimple.subtitle),
      features: enMessages.homepage.featuresSimple.items.map((item: any, index: number) => ({
        _key: `feature-${index}`,
        icon: ['Zap', 'Shield', 'Users', 'BarChart'][index],
        title: loc(item.title, arMessages.homepage.featuresSimple.items[index].title),
        description: locText(item.description, arMessages.homepage.featuresSimple.items[index].description),
      })),
    },
    featureTabs: {
      heading: loc(enMessages.homepage.features.heading, arMessages.homepage.features.heading),
      subtitle: locText(enMessages.homepage.features.subtitle, arMessages.homepage.features.subtitle),
      tabs: ['realtime', 'security', 'analytics', 'collaboration'].map((tabId) => {
        const enTab = (enMessages.homepage.features.tabs as any)[tabId];
        const arTab = (arMessages.homepage.features.tabs as any)[tabId];
        return {
          _key: tabId,
          label: loc(enTab.label, arTab.label),
          title: loc(enTab.title, arTab.title),
          description: locText(enTab.description, arTab.description),
          features: enTab.benefits.map((benefit: string, index: number) => ({
            _key: `benefit-${index}`,
            text: loc(benefit, arTab.benefits[index]),
          })),
        };
      }),
    },
    screenshotCarousel: {
      heading: loc(enMessages.homepage.seeInAction.heading, arMessages.homepage.seeInAction.heading),
      subtitle: locText(enMessages.homepage.seeInAction.subtitle, arMessages.homepage.seeInAction.subtitle),
      items: enMessages.homepage.seeInAction.items.map((item: any, index: number) => ({
        _key: `screenshot-${index}`,
        title: loc(item.title, arMessages.homepage.seeInAction.items[index].title),
        description: locText(item.description, arMessages.homepage.seeInAction.items[index].description),
        category: loc(item.category, arMessages.homepage.seeInAction.items[index].category),
      })),
    },
    logoBar: {
      heading: loc(enMessages.homepage.logoBar.heading, arMessages.homepage.logoBar.heading),
      subtitle: locText(enMessages.homepage.logoBar.subtitle, arMessages.homepage.logoBar.subtitle),
      logos: [],
    },
    testimonials: {
      heading: loc(enMessages.homepage.testimonials.heading, arMessages.homepage.testimonials.heading),
      subtitle: locText(enMessages.homepage.testimonials.subtitle, arMessages.homepage.testimonials.subtitle),
      items: enMessages.homepage.testimonials.items.map((item: any, index: number) => ({
        _key: `testimonial-${index}`,
        quote: locText(item.quote, arMessages.homepage.testimonials.items[index].quote),
        author: loc(item.author, arMessages.homepage.testimonials.items[index].author),
        role: loc(item.role, arMessages.homepage.testimonials.items[index].role),
        rating: 5,
      })),
    },
    cta: {
      heading: loc(enMessages.homepage.cta.heading, arMessages.homepage.cta.heading),
      subtitle: locText(enMessages.homepage.cta.subtitle, arMessages.homepage.cta.subtitle),
      primaryCta: {
        text: loc(enMessages.common.startFreeTrial, arMessages.common.startFreeTrial),
        href: '/trial',
        openInNewTab: false,
      },
      secondaryCta: {
        text: loc(enMessages.common.bookDemo, arMessages.common.bookDemo),
        href: '/contact',
        openInNewTab: false,
      },
      backgroundStyle: 'gradient',
    },
  };

  try {
    await writeClient.createOrReplace(homePage);
    console.log('✅ Home Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Home Page:', error);
  }
}

async function migrateApps() {
  console.log('📝 Migrating Apps...');

  let count = 0;
  for (const [key, appData] of Object.entries(appsData)) {
    const app = {
      _id: `app-${appData.slug}`,
      _type: 'app',
      name: loc(appData.name, appData.nameAr),
      slug: {
        _type: 'slug',
        current: appData.slug,
      },
      description: locText(appData.description, appData.descriptionAr),
      layoutType: appData.layoutType,
      // Screenshots will be uploaded manually in Sanity Studio
      screenshots: [],
      platforms: {
        ios: true,
        android: true,
        web: appData.layoutType === 'landscape',
      },
      order: count++,
    };

    try {
      await writeClient.createOrReplace(app);
      console.log(`  ✅ ${appData.name} migrated`);
    } catch (error) {
      console.error(`  ❌ Error migrating ${appData.name}:`, error);
    }
  }
}

async function migrateSolutionsPage() {
  console.log('📝 Migrating Solutions Page...');

  const solutionsPage = {
    _id: 'solutionsPage',
    _type: 'solutionsPage',
    title: 'Solutions Page',
    hero: {
      title: {
        smart: loc(
          enMessages.solutions.main.hero.title.smart,
          arMessages.solutions.main.hero.title.smart
        ),
        mobility: loc(
          enMessages.solutions.main.hero.title.mobility,
          arMessages.solutions.main.hero.title.mobility
        ),
        practicalResults: loc(
          enMessages.solutions.main.hero.title.practicalResults,
          arMessages.solutions.main.hero.title.practicalResults
        ),
      },
      subtitle: locText(
        enMessages.solutions.main.hero.subtitle,
        arMessages.solutions.main.hero.subtitle
      ),
      cta: loc(
        enMessages.solutions.main.hero.cta,
        arMessages.solutions.main.hero.cta
      ),
      nodes: {
        operator: loc(
          enMessages.solutions.main.hero.nodes.operator,
          arMessages.solutions.main.hero.nodes.operator
        ),
        enterprise: loc(
          enMessages.solutions.main.hero.nodes.enterprise,
          arMessages.solutions.main.hero.nodes.enterprise
        ),
        supervisor: loc(
          enMessages.solutions.main.hero.nodes.supervisor,
          arMessages.solutions.main.hero.nodes.supervisor
        ),
        driver: loc(
          enMessages.solutions.main.hero.nodes.driver,
          arMessages.solutions.main.hero.nodes.driver
        ),
        rider: loc(
          enMessages.solutions.main.hero.nodes.rider,
          arMessages.solutions.main.hero.nodes.rider
        ),
      },
    },
    intro: {
      text: locText(
        enMessages.solutions.main.intro.text,
        arMessages.solutions.main.intro.text
      ),
      howWeHelp: {
        title: loc(
          enMessages.solutions.main.howWeHelp.title,
          arMessages.solutions.main.howWeHelp.title
        ),
        benefits: (enMessages.solutions.main.howWeHelp.benefits as string[]).map((benefit, index) =>
          loc(benefit, (arMessages.solutions.main.howWeHelp.benefits as string[])[index])
        ),
      },
    },
    audienceCards: {
      operators: {
        headline: loc(
          enMessages.solutions.main.audienceCards.operators.headline,
          arMessages.solutions.main.audienceCards.operators.headline
        ),
        description: locText(
          enMessages.solutions.main.audienceCards.operators.description,
          arMessages.solutions.main.audienceCards.operators.description
        ),
        benefits: (enMessages.solutions.main.audienceCards.operators.benefits as string[]).map((benefit, index) =>
          loc(benefit, (arMessages.solutions.main.audienceCards.operators.benefits as string[])[index])
        ),
        cta: loc(
          enMessages.solutions.main.audienceCards.operators.cta,
          arMessages.solutions.main.audienceCards.operators.cta
        ),
      },
      enterprises: {
        headline: loc(
          enMessages.solutions.main.audienceCards.enterprises.headline,
          arMessages.solutions.main.audienceCards.enterprises.headline
        ),
        description: locText(
          enMessages.solutions.main.audienceCards.enterprises.description,
          arMessages.solutions.main.audienceCards.enterprises.description
        ),
        benefits: (enMessages.solutions.main.audienceCards.enterprises.benefits as string[]).map((benefit, index) =>
          loc(benefit, (arMessages.solutions.main.audienceCards.enterprises.benefits as string[])[index])
        ),
        cta: loc(
          enMessages.solutions.main.audienceCards.enterprises.cta,
          arMessages.solutions.main.audienceCards.enterprises.cta
        ),
      },
    },
    technology: {
      title: loc(
        enMessages.solutions.main.technology.title,
        arMessages.solutions.main.technology.title
      ),
      highlights: (enMessages.solutions.main.technology.highlights as string[]).map((highlight, index) =>
        loc(highlight, (arMessages.solutions.main.technology.highlights as string[])[index])
      ),
    },
    whyTranzkit: {
      title: loc(
        enMessages.solutions.main.whyTranzkit.title,
        arMessages.solutions.main.whyTranzkit.title
      ),
      reasons: (enMessages.solutions.main.whyTranzkit.reasons as string[]).map((reason, index) =>
        loc(reason, (arMessages.solutions.main.whyTranzkit.reasons as string[])[index])
      ),
    },
    cta: {
      title: loc(
        enMessages.solutions.main.cta.title,
        arMessages.solutions.main.cta.title
      ),
      subtitle: locText(
        enMessages.solutions.main.cta.subtitle,
        arMessages.solutions.main.cta.subtitle
      ),
    },
  };

  try {
    await writeClient.createOrReplace(solutionsPage);
    console.log('✅ Solutions Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Solutions Page:', error);
  }
}

async function migrateAppsPage() {
  console.log('📝 Migrating Apps Page...');

  const appsPage = {
    _id: 'appsPage',
    _type: 'appsPage',
    title: 'Apps Page',
    hero: {
      title: loc(
        enMessages.apps.main.hero.title,
        arMessages.apps.main.hero.title
      ),
      subtitle: locText(
        enMessages.apps.main.hero.subtitle,
        arMessages.apps.main.hero.subtitle
      ),
      description: locText(
        enMessages.apps.main.parallaxHero.subtitle,
        arMessages.apps.main.parallaxHero.subtitle
      ),
    },
    showcase: {
      heading: loc('Our Application Suite', 'مجموعة تطبيقاتنا'),
      subtitle: locText(
        'Explore our comprehensive suite of applications',
        'استكشف مجموعتنا الشاملة من التطبيقات'
      ),
    },
    cta: {
      heading: loc(
        enMessages.homepage.cta.heading,
        arMessages.homepage.cta.heading
      ),
      subtitle: locText(
        enMessages.homepage.cta.subtitle,
        arMessages.homepage.cta.subtitle
      ),
      primaryCta: {
        text: loc(enMessages.common.startFreeTrial, arMessages.common.startFreeTrial),
        href: '/trial',
        variant: 'default',
      },
      secondaryCta: {
        text: loc(enMessages.common.contactUs, arMessages.common.contactUs),
        href: '/contact',
        variant: 'outline',
      },
    },
  };

  try {
    await writeClient.createOrReplace(appsPage);
    console.log('✅ Apps Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Apps Page:', error);
  }
}

async function migrateAboutPage() {
  console.log('📝 Migrating About Page...');

  const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About Page',
    hero: {
      title: loc(
        enMessages.about.hero.title,
        arMessages.about.hero.title
      ),
      subtitle: locText(
        enMessages.about.hero.subtitle,
        arMessages.about.hero.subtitle
      ),
      stats: {
        enterprises: {
          value: loc(
            enMessages.about.hero.stats.enterprises.value,
            arMessages.about.hero.stats.enterprises.value
          ),
          label: loc(
            enMessages.about.hero.stats.enterprises.label,
            arMessages.about.hero.stats.enterprises.label
          ),
        },
        drivers: {
          value: loc(
            enMessages.about.hero.stats.drivers.value,
            arMessages.about.hero.stats.drivers.value
          ),
          label: loc(
            enMessages.about.hero.stats.drivers.label,
            arMessages.about.hero.stats.drivers.label
          ),
        },
        trips: {
          value: loc(
            enMessages.about.hero.stats.trips.value,
            arMessages.about.hero.stats.trips.value
          ),
          label: loc(
            enMessages.about.hero.stats.trips.label,
            arMessages.about.hero.stats.trips.label
          ),
        },
      },
    },
    story: {
      heading: loc(enMessages.about.story.heading, arMessages.about.story.heading),
      subtitle: locText(enMessages.about.story.subtitle, arMessages.about.story.subtitle),
      mission: {
        title: loc(enMessages.about.story.mission.title, arMessages.about.story.mission.title),
        text: locText(enMessages.about.story.mission.text, arMessages.about.story.mission.text),
      },
      vision: {
        title: loc(enMessages.about.story.vision.title, arMessages.about.story.vision.title),
        text: locText(enMessages.about.story.vision.text, arMessages.about.story.vision.text),
      },
      values: {
        title: loc(enMessages.about.story.values.title, arMessages.about.story.values.title),
        innovation: {
          title: loc(enMessages.about.story.values.innovation.title, arMessages.about.story.values.innovation.title),
          description: locText(enMessages.about.story.values.innovation.description, arMessages.about.story.values.innovation.description),
        },
        reliability: {
          title: loc(enMessages.about.story.values.reliability.title, arMessages.about.story.values.reliability.title),
          description: locText(enMessages.about.story.values.reliability.description, arMessages.about.story.values.reliability.description),
        },
        sustainability: {
          title: loc(enMessages.about.story.values.sustainability.title, arMessages.about.story.values.sustainability.title),
          description: locText(enMessages.about.story.values.sustainability.description, arMessages.about.story.values.sustainability.description),
        },
      },
    },
    timeline: {
      heading: loc(enMessages.about.timeline.heading, arMessages.about.timeline.heading),
      subtitle: locText(enMessages.about.timeline.subtitle, arMessages.about.timeline.subtitle),
      milestones: (enMessages.about.timeline.milestones as any[]).map((item: any, index: number) => ({
        _key: `timeline-${index}`,
        year: item.year,
        title: loc(item.title, (arMessages.about.timeline.milestones as any[])[index].title),
        description: locText(item.description, (arMessages.about.timeline.milestones as any[])[index].description),
        icon: 'calendar',
      })),
    },
    team: {
      heading: loc(enMessages.about.team.heading, arMessages.about.team.heading),
      subtitle: locText(enMessages.about.team.subtitle, arMessages.about.team.subtitle),
      members: (enMessages.about.team.members as any[]).map((member: any, index: number) => ({
        _key: `member-${index}`,
        name: member.name,
        role: loc(member.role, (arMessages.about.team.members as any[])[index].role),
        initials: member.initials,
        bio: locText(member.bio || '', (arMessages.about.team.members as any[])[index].bio || ''),
      })),
    },
    careers: {
      heading: loc(enMessages.about.careers.heading, arMessages.about.careers.heading),
      subtitle: locText(enMessages.about.careers.subtitle, arMessages.about.careers.subtitle),
      openings: (enMessages.about.careers.openings as any[]).map((job: any, index: number) => {
        // Create slug from job title
        const slug = job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        return {
          _key: `job-${index}`,
          title: loc(job.title, (arMessages.about.careers.openings as any[])[index].title),
          department: loc(job.department, (arMessages.about.careers.openings as any[])[index].department),
          location: loc(job.location, (arMessages.about.careers.openings as any[])[index].location),
          type: loc(job.type, (arMessages.about.careers.openings as any[])[index].type),
          description: locText(job.description, (arMessages.about.careers.openings as any[])[index].description),
          slug: {
            _type: 'slug',
            current: slug,
          },
          fullDescription: {
            en: [
              {
                _type: 'block',
                _key: `desc-en-${index}`,
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: job.description,
                  },
                ],
              },
            ],
            ar: [
              {
                _type: 'block',
                _key: `desc-ar-${index}`,
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    text: (arMessages.about.careers.openings as any[])[index].description,
                  },
                ],
              },
            ],
          },
          isActive: true,
          postedDate: new Date().toISOString().split('T')[0],
        };
      }),
    },
    cta: {
      heading: loc(
        enMessages.homepage.cta.heading,
        arMessages.homepage.cta.heading
      ),
      subtitle: locText(
        enMessages.homepage.cta.subtitle,
        arMessages.homepage.cta.subtitle
      ),
      primaryCta: {
        text: loc(enMessages.common.startFreeTrial, arMessages.common.startFreeTrial),
        href: '/trial',
        variant: 'default',
      },
    },
  };

  try {
    await writeClient.createOrReplace(aboutPage);
    console.log('✅ About Page migrated');
  } catch (error) {
    console.error('❌ Error migrating About Page:', error);
  }
}

async function migrateContactPage() {
  console.log('📝 Migrating Contact Page...');

  const contactPage = {
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact Page',
    hero: {
      title: loc(
        enMessages.contact.hero.title,
        arMessages.contact.hero.title
      ),
      subtitle: locText(
        enMessages.contact.hero.subtitle,
        arMessages.contact.hero.subtitle
      ),
      emailLabel: loc(
        enMessages.contact.hero.emailUs,
        arMessages.contact.hero.emailUs
      ),
      phoneLabel: loc(
        enMessages.contact.hero.callUs,
        arMessages.contact.hero.callUs
      ),
      locationLabel: loc(
        enMessages.contact.hero.visitUs,
        arMessages.contact.hero.visitUs
      ),
      email: enMessages.contact.hero.contactInfo.email,
      phone: enMessages.contact.hero.contactInfo.phone,
      location: loc(
        enMessages.contact.hero.contactInfo.location,
        arMessages.contact.hero.contactInfo.location
      ),
    },
    form: {
      title: loc('Contact Us', 'اتصل بنا'),
      subtitle: loc('Get in touch', 'تواصل معنا'),
      name: loc(
        enMessages.contact.form.labels.name,
        arMessages.contact.form.labels.name
      ),
      namePlaceholder: loc(
        enMessages.contact.form.placeholders.name,
        arMessages.contact.form.placeholders.name
      ),
      email: loc(
        enMessages.contact.form.labels.email,
        arMessages.contact.form.labels.email
      ),
      emailPlaceholder: loc(
        enMessages.contact.form.placeholders.email,
        arMessages.contact.form.placeholders.email
      ),
      company: loc(
        enMessages.contact.form.labels.company,
        arMessages.contact.form.labels.company
      ),
      companyPlaceholder: loc(
        enMessages.contact.form.placeholders.company,
        arMessages.contact.form.placeholders.company
      ),
      phone: loc(
        enMessages.contact.form.labels.phone,
        arMessages.contact.form.labels.phone
      ),
      phonePlaceholder: loc(
        enMessages.contact.form.placeholders.phone,
        arMessages.contact.form.placeholders.phone
      ),
      userType: loc(
        enMessages.contact.form.labels.userType,
        arMessages.contact.form.labels.userType
      ),
      userTypePlaceholder: loc(
        enMessages.contact.form.placeholders.userType,
        arMessages.contact.form.placeholders.userType
      ),
      userTypeEnterprise: loc(
        enMessages.contact.form.userTypes.enterprise.label,
        arMessages.contact.form.userTypes.enterprise.label
      ),
      userTypeOperator: loc(
        enMessages.contact.form.userTypes.operator.label,
        arMessages.contact.form.userTypes.operator.label
      ),
      message: loc(
        enMessages.contact.form.labels.message,
        arMessages.contact.form.labels.message
      ),
      messagePlaceholder: loc(
        enMessages.contact.form.placeholders.message,
        arMessages.contact.form.placeholders.message
      ),
      notRobot: loc(
        enMessages.contact.form.captcha,
        arMessages.contact.form.captcha
      ),
      submit: loc(
        enMessages.contact.form.submit,
        arMessages.contact.form.submit
      ),
      submitting: loc(
        enMessages.contact.form.submitting,
        arMessages.contact.form.submitting
      ),
      successTitle: loc(
        enMessages.contact.form.success.title,
        arMessages.contact.form.success.title
      ),
      successMessage: loc(
        enMessages.contact.form.success.message,
        arMessages.contact.form.success.message
      ),
      successButton: loc(
        enMessages.contact.form.success.refresh,
        arMessages.contact.form.success.refresh
      ),
    },
  };

  try {
    await writeClient.createOrReplace(contactPage);
    console.log('✅ Contact Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Contact Page:', error);
  }
}

async function migratePricingPage() {
  console.log('📝 Migrating Pricing Page...');

  const pricingPage = {
    _id: 'pricingPage',
    _type: 'pricingPage',
    title: 'Pricing Page',
    hero: {
      title: loc(
        enMessages.pricing.hero.title,
        arMessages.pricing.hero.title
      ),
      subtitle: locText(
        enMessages.pricing.hero.subtitle,
        arMessages.pricing.hero.subtitle
      ),
      highlightNoSetupFees: loc(
        enMessages.pricing.hero.highlights.noSetupFees,
        arMessages.pricing.hero.highlights.noSetupFees
      ),
      highlightCancelAnytime: loc(
        enMessages.pricing.hero.highlights.cancelAnytime,
        arMessages.pricing.hero.highlights.cancelAnytime
      ),
      highlightFreeTrial: loc(
        enMessages.pricing.hero.highlights.freeTrial,
        arMessages.pricing.hero.highlights.freeTrial
      ),
    },
    pricingCards: {
      heading: loc(
        enMessages.pricing.cards.heading,
        arMessages.pricing.cards.heading
      ),
      subtitle: locText(
        enMessages.pricing.cards.subtitle,
        arMessages.pricing.cards.subtitle
      ),
      period: loc(
        enMessages.pricing.cards.period,
        arMessages.pricing.cards.period
      ),
      contactSales: loc(
        enMessages.pricing.cards.contactSales,
        arMessages.pricing.cards.contactSales
      ),
      plans: [
        {
          _key: 'starter',
          id: 'starter',
          name: loc(
            enMessages.pricing.cards.plans.starter.name,
            arMessages.pricing.cards.plans.starter.name
          ),
          price: loc(
            enMessages.pricing.cards.plans.starter.price + enMessages.pricing.cards.period,
            arMessages.pricing.cards.plans.starter.price + arMessages.pricing.cards.period
          ),
          description: locText(
            enMessages.pricing.cards.plans.starter.description,
            arMessages.pricing.cards.plans.starter.description
          ),
          features: Object.values(enMessages.pricing.cards.plans.starter.features).map((feature: any, index: number) => ({
            _key: `starter-feature-${index}`,
            text: loc(feature, Object.values(arMessages.pricing.cards.plans.starter.features)[index] as string),
            included: true,
          })),
          ctaText: loc(enMessages.common.getStarted, arMessages.common.getStarted),
          ctaHref: '/trial',
          highlighted: false,
        },
        {
          _key: 'professional',
          id: 'professional',
          name: loc(
            enMessages.pricing.cards.plans.professional.name,
            arMessages.pricing.cards.plans.professional.name
          ),
          badge: loc(
            enMessages.pricing.cards.badges.mostPopular,
            arMessages.pricing.cards.badges.mostPopular
          ),
          price: loc(
            enMessages.pricing.cards.plans.professional.price + enMessages.pricing.cards.period,
            arMessages.pricing.cards.plans.professional.price + arMessages.pricing.cards.period
          ),
          description: locText(
            enMessages.pricing.cards.plans.professional.description,
            arMessages.pricing.cards.plans.professional.description
          ),
          features: Object.values(enMessages.pricing.cards.plans.professional.features).map((feature: any, index: number) => ({
            _key: `professional-feature-${index}`,
            text: loc(feature, Object.values(arMessages.pricing.cards.plans.professional.features)[index] as string),
            included: true,
          })),
          ctaText: loc(enMessages.common.getStarted, arMessages.common.getStarted),
          ctaHref: '/trial',
          highlighted: true,
        },
        {
          _key: 'enterprise',
          id: 'enterprise',
          name: loc(
            enMessages.pricing.cards.plans.enterprise.name,
            arMessages.pricing.cards.plans.enterprise.name
          ),
          badge: loc(
            enMessages.pricing.cards.badges.bestValue,
            arMessages.pricing.cards.badges.bestValue
          ),
          price: loc(
            enMessages.pricing.cards.plans.enterprise.price,
            arMessages.pricing.cards.plans.enterprise.price
          ),
          description: locText(
            enMessages.pricing.cards.plans.enterprise.description,
            arMessages.pricing.cards.plans.enterprise.description
          ),
          features: Object.values(enMessages.pricing.cards.plans.enterprise.features).map((feature: any, index: number) => ({
            _key: `enterprise-feature-${index}`,
            text: loc(feature, Object.values(arMessages.pricing.cards.plans.enterprise.features)[index] as string),
            included: true,
          })),
          ctaText: loc(enMessages.pricing.cards.contactSales, arMessages.pricing.cards.contactSales),
          ctaHref: '/contact',
          highlighted: false,
        },
      ],
    },
    comparisonTable: {
      heading: loc(
        enMessages.pricing.comparison.title,
        arMessages.pricing.comparison.title
      ),
      subtitle: locText(
        enMessages.pricing.comparison.subtitle,
        arMessages.pricing.comparison.subtitle
      ),
      tableHeaderFeature: loc(
        enMessages.pricing.comparison.tableHeaders.feature,
        arMessages.pricing.comparison.tableHeaders.feature
      ),
      tableHeaderStarter: loc(
        enMessages.pricing.comparison.tableHeaders.starter,
        arMessages.pricing.comparison.tableHeaders.starter
      ),
      tableHeaderProfessional: loc(
        enMessages.pricing.comparison.tableHeaders.professional,
        arMessages.pricing.comparison.tableHeaders.professional
      ),
      tableHeaderEnterprise: loc(
        enMessages.pricing.comparison.tableHeaders.enterprise,
        arMessages.pricing.comparison.tableHeaders.enterprise
      ),
      features: Object.keys(enMessages.pricing.comparison.features).map((key, index) => ({
        _key: `comparison-feature-${index}`,
        feature: loc(
          (enMessages.pricing.comparison.features as any)[key],
          (arMessages.pricing.comparison.features as any)[key]
        ),
        starter: ['vehicleTracking', 'mobileApps', 'basicAnalytics', 'emailSupport'].includes(key),
        professional: !['whiteLabelSolution', 'dedicatedAccountManager', 'customIntegrations', 'slaGuarantees', 'multiRegionSupport'].includes(key),
        enterprise: true,
      })),
    },
    cta: {
      heading: loc(
        enMessages.homepage.cta.heading,
        arMessages.homepage.cta.heading
      ),
      subtitle: locText(
        enMessages.homepage.cta.subtitle,
        arMessages.homepage.cta.subtitle
      ),
      primaryCta: {
        text: loc(enMessages.common.startFreeTrial, arMessages.common.startFreeTrial),
        href: '/trial',
        variant: 'default',
      },
      secondaryCta: {
        text: loc(enMessages.common.contactUs, arMessages.common.contactUs),
        href: '/contact',
        variant: 'outline',
      },
    },
  };

  try {
    await writeClient.createOrReplace(pricingPage);
    console.log('✅ Pricing Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Pricing Page:', error);
  }
}

async function migrateSolutionsEnterprisesPassengersPage() {
  console.log('📝 Migrating Solutions: Enterprises & Passengers Page...');

  const en = enMessages.solutions.enterprisesPassengers;
  const ar = arMessages.solutions.enterprisesPassengers;

  const page = {
    _id: 'solutionsEnterprisesPassengersPage',
    _type: 'solutionsEnterprisesPassengersPage',
    hero: {
      title: loc(en.hero.title, ar.hero.title),
      subtitle: locText(en.hero.subtitle, ar.hero.subtitle),
      cta: loc(en.hero.cta, ar.hero.cta),
    },
    audienceSwitcher: {
      tabs: {
        enterprise: loc(en.audienceSwitcher.tabs.enterprise, ar.audienceSwitcher.tabs.enterprise),
        passenger: loc(en.audienceSwitcher.tabs.passenger, ar.audienceSwitcher.tabs.passenger),
      },
      enterprise: {
        title: loc(en.audienceSwitcher.enterprise.title, ar.audienceSwitcher.enterprise.title),
        description: locText(en.audienceSwitcher.enterprise.description, ar.audienceSwitcher.enterprise.description),
        features: en.audienceSwitcher.enterprise.features.map((feat: any, index: number) => ({
          _key: `enterprise-feature-${index}`,
          _type: 'featureItem',
          title: loc(feat.title, ar.audienceSwitcher.enterprise.features[index].title),
          description: locText(feat.description, ar.audienceSwitcher.enterprise.features[index].description),
        })),
      },
      passenger: {
        title: loc(en.audienceSwitcher.passenger.title, ar.audienceSwitcher.passenger.title),
        description: locText(en.audienceSwitcher.passenger.description, ar.audienceSwitcher.passenger.description),
        features: en.audienceSwitcher.passenger.features.map((feat: any, index: number) => ({
          _key: `passenger-feature-${index}`,
          _type: 'featureItem',
          title: loc(feat.title, ar.audienceSwitcher.passenger.features[index].title),
          description: locText(feat.description, ar.audienceSwitcher.passenger.features[index].description),
        })),
      },
    },
    overview: {
      text: locText(en.overview.text, ar.overview.text),
    },
    featureShowcase: {
      title: loc(en.featureShowcase.title, ar.featureShowcase.title),
      subtitle: locText(en.featureShowcase.subtitle, ar.featureShowcase.subtitle),
      features: en.featureShowcase.features.map((feat: any, index: number) => ({
        _key: `showcase-feature-${index}`,
        title: loc(feat.title, ar.featureShowcase.features[index].title),
        description: locText(feat.description, ar.featureShowcase.features[index].description),
      })),
    },
    workflow: {
      passenger: {
        title: loc(en.workflow.passenger.title, ar.workflow.passenger.title),
        subtitle: locText(en.workflow.passenger.subtitle, ar.workflow.passenger.subtitle),
        steps: en.workflow.passenger.steps.map((step: any, index: number) => ({
          _key: `passenger-step-${index}`,
          _type: 'workflowStep',
          title: loc(step.title, ar.workflow.passenger.steps[index].title),
          description: locText(step.description, ar.workflow.passenger.steps[index].description),
        })),
      },
      enterprise: {
        title: loc(en.workflow.enterprise.title, ar.workflow.enterprise.title),
        subtitle: locText(en.workflow.enterprise.subtitle, ar.workflow.enterprise.subtitle),
        steps: en.workflow.enterprise.steps.map((step: any, index: number) => ({
          _key: `enterprise-step-${index}`,
          _type: 'workflowStep',
          title: loc(step.title, ar.workflow.enterprise.steps[index].title),
          description: locText(step.description, ar.workflow.enterprise.steps[index].description),
        })),
      },
    },
    cta: {
      heading: loc(en.cta.title, ar.cta.title),
      subtitle: locText(en.cta.subtitle, ar.cta.subtitle),
    },
  };

  try {
    await writeClient.createOrReplace(page);
    console.log('✅ Solutions: Enterprises & Passengers Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Solutions: Enterprises & Passengers Page:', error);
  }
}

async function migrateSolutionsOperatorsDriversPage() {
  console.log('📝 Migrating Solutions: Operators & Drivers Page...');

  const en = enMessages.solutions.operatorsDrivers;
  const ar = arMessages.solutions.operatorsDrivers;

  const page = {
    _id: 'solutionsOperatorsDriversPage',
    _type: 'solutionsOperatorsDriversPage',
    hero: {
      title: loc(en.hero.title, ar.hero.title),
      subtitle: locText(en.hero.subtitle, ar.hero.subtitle),
      cta: loc(en.hero.cta, ar.hero.cta),
    },
    overview: {
      text: locText(en.overview.text, ar.overview.text),
    },
    roleSwitcher: {
      tabs: {
        operator: loc(en.roleSwitcher.tabs.operator, ar.roleSwitcher.tabs.operator),
        driver: loc(en.roleSwitcher.tabs.driver, ar.roleSwitcher.tabs.driver),
      },
      operator: {
        title: loc(en.roleSwitcher.operator.title, ar.roleSwitcher.operator.title),
        description: locText(en.roleSwitcher.operator.description, ar.roleSwitcher.operator.description),
        features: en.roleSwitcher.operator.features.map((feat: any, index: number) => ({
          _key: `operator-feature-${index}`,
          _type: 'featureItem',
          title: loc(feat.title, ar.roleSwitcher.operator.features[index].title),
          description: locText(feat.description, ar.roleSwitcher.operator.features[index].description),
        })),
      },
      driver: {
        title: loc(en.roleSwitcher.driver.title, ar.roleSwitcher.driver.title),
        description: locText(en.roleSwitcher.driver.description, ar.roleSwitcher.driver.description),
        features: en.roleSwitcher.driver.features.map((feat: any, index: number) => ({
          _key: `driver-feature-${index}`,
          _type: 'featureItem',
          title: loc(feat.title, ar.roleSwitcher.driver.features[index].title),
          description: locText(feat.description, ar.roleSwitcher.driver.features[index].description),
        })),
      },
    },
    timeline: {
      title: loc(en.timeline.title, ar.timeline.title),
      subtitle: locText(en.timeline.subtitle, ar.timeline.subtitle),
      steps: en.timeline.steps.map((step: any, index: number) => ({
        _key: `timeline-step-${index}`,
        time: step.time,
        title: loc(step.title, ar.timeline.steps[index].title),
        description: locText(step.description, ar.timeline.steps[index].description),
      })),
    },
    dashboards: {
      title: loc(en.dashboards.title, ar.dashboards.title),
      subtitle: locText(en.dashboards.subtitle, ar.dashboards.subtitle),
      items: en.dashboards.items.map((item: any, index: number) => ({
        _key: `dashboard-${index}`,
        title: loc(item.title, ar.dashboards.items[index].title),
        description: locText(item.description, ar.dashboards.items[index].description),
      })),
    },
    mobileApps: {
      title: loc(en.mobileApps.title, ar.mobileApps.title),
      subtitle: locText(en.mobileApps.subtitle, ar.mobileApps.subtitle),
      features: en.mobileApps.features.map((feat: any, index: number) => ({
        _key: `mobile-feature-${index}`,
        _type: 'featureItem',
        title: loc(feat.title, ar.mobileApps.features[index].title),
        description: locText(feat.description, ar.mobileApps.features[index].description),
      })),
    },
    cta: {
      heading: loc(en.cta.title, ar.cta.title),
      subtitle: locText(en.cta.subtitle, ar.cta.subtitle),
    },
  };

  try {
    await writeClient.createOrReplace(page);
    console.log('✅ Solutions: Operators & Drivers Page migrated');
  } catch (error) {
    console.error('❌ Error migrating Solutions: Operators & Drivers Page:', error);
  }
}

async function main() {
  console.log('🚀 Starting content migration...\n');

  await migrateSiteSettings();
  await migrateNavigation();
  await migrateHomePage();
  await migrateApps();
  await migrateSolutionsPage();
  await migrateSolutionsEnterprisesPassengersPage();
  await migrateSolutionsOperatorsDriversPage();
  await migrateAppsPage();
  await migrateAboutPage();
  await migrateContactPage();
  await migratePricingPage();

  console.log('\n✅ Migration complete!');
  console.log('🎉 Visit http://localhost:3000/studio to view your content');
  console.log('\n⚠️  Note: Images need to be uploaded manually to Sanity Studio');
}

main().catch(console.error);
