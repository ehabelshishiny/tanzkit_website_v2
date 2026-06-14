// Shared field types
import { localizedString } from './shared/localizedString';
import { localizedText } from './shared/localizedText';
import { localizedRichText } from './shared/localizedRichText';
import { seo } from './shared/seo';

// Object types
import { ctaButton } from './objects/ctaButton';
import { heroSection } from './objects/heroSection';
import { featureItem } from './objects/featureItem';
import { featureSection } from './objects/featureSection';
import { ctaSection } from './objects/ctaSection';
import { testimonial } from './objects/testimonial';
import { pricingPlan } from './objects/pricingPlan';
import { timelineItem } from './objects/timelineItem';
import { audienceCard } from './objects/audienceCard';
import { technologyItem } from './objects/technologyItem';
import { workflowStep } from './objects/workflowStep';
import { teamMember } from './objects/teamMember';
import { careerItem } from './objects/careerItem';

// Document types
import { siteSettings } from './documents/siteSettings';
import { navigation } from './documents/navigation';
import { homePage } from './documents/homePage';
import { app } from './documents/app';
import { solutionsPage } from './documents/solutionsPage';
import { solutionsEnterprisesPassengersPage } from './documents/solutionsEnterprisesPassengersPage';
import { solutionsOperatorsDriversPage } from './documents/solutionsOperatorsDriversPage';
import { appsPage } from './documents/appsPage';
import { aboutPage } from './documents/aboutPage';
import { contactPage } from './documents/contactPage';
import { pricingPage } from './documents/pricingPage';

// Resources Hub - Document types
import { resourcesHubPage } from './documents/resourcesHubPage';
import { blogPage } from './documents/blogPage';
import { caseStudiesPage } from './documents/caseStudiesPage';
import { faqPage } from './documents/faqPage';
import { author } from './documents/author';
import { blogCategory } from './documents/blogCategory';
import { blogPost } from './documents/blogPost';
import { caseStudyCategory } from './documents/caseStudyCategory';
import { caseStudy } from './documents/caseStudy';
import { faqCategory } from './documents/faqCategory';
import { faqItem } from './documents/faqItem';

export const schemaTypes = [
  // Shared field types
  localizedString,
  localizedText,
  localizedRichText,
  seo,

  // Object types
  ctaButton,
  heroSection,
  featureItem,
  featureSection,
  ctaSection,
  testimonial,
  pricingPlan,
  timelineItem,
  audienceCard,
  technologyItem,
  workflowStep,
  teamMember,
  careerItem,

  // Document types - Site Configuration
  siteSettings,
  navigation,

  // Document types - Pages
  homePage,
  aboutPage,
  contactPage,
  pricingPage,

  // Document types - Solutions
  solutionsPage,
  solutionsEnterprisesPassengersPage,
  solutionsOperatorsDriversPage,

  // Document types - Apps (grouped together)
  appsPage,
  app,

  // Document types - Resources Hub
  resourcesHubPage,
  blogPage,
  caseStudiesPage,
  faqPage,
  author,
  blogCategory,
  blogPost,
  caseStudyCategory,
  caseStudy,
  faqCategory,
  faqItem,
];
