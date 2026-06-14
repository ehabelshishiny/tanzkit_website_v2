import { StructureBuilder } from 'sanity/structure'
import {
  CogIcon,
  MenuIcon,
  HomeIcon,
  UsersIcon,
  EnvelopeIcon,
  CreditCardIcon,
  RocketIcon,
  MobileDeviceIcon,
  DocumentsIcon,
  BookIcon,
  DocumentTextIcon,
  HelpCircleIcon,
  UserIcon,
  TagIcon,
  FolderIcon,
} from '@sanity/icons'

/**
 * Custom Desk Structure for Tranzkit CMS
 * Organizes documents into logical groups and configures singleton documents
 */
export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // 🔧 Site Configuration
      S.listItem()
        .title('⚙️ Site Configuration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.documentListItem()
                .schemaType('siteSettings')
                .title('Site Settings')
                .icon(CogIcon)
                .id('siteSettings'),
              S.documentListItem()
                .schemaType('navigation')
                .title('Navigation')
                .icon(MenuIcon)
                .id('navigation'),
            ])
        ),

      S.divider(),

      // 📄 Main Pages
      S.listItem()
        .title('📄 Main Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Main Pages')
            .items([
              S.documentListItem()
                .schemaType('homePage')
                .title('Home Page')
                .icon(HomeIcon)
                .id('homePage'),
              S.documentListItem()
                .schemaType('aboutPage')
                .title('About Page')
                .icon(UsersIcon)
                .id('aboutPage'),
              S.documentListItem()
                .schemaType('contactPage')
                .title('Contact Page')
                .icon(EnvelopeIcon)
                .id('contactPage'),
              S.documentListItem()
                .schemaType('pricingPage')
                .title('Pricing Page')
                .icon(CreditCardIcon)
                .id('pricingPage'),
            ])
        ),

      S.divider(),

      // 🚀 Solutions
      S.listItem()
        .title('🚀 Solutions')
        .icon(RocketIcon)
        .child(
          S.list()
            .title('Solutions')
            .items([
              S.documentListItem()
                .schemaType('solutionsPage')
                .title('Solutions Page')
                .icon(RocketIcon)
                .id('solutionsPage'),
              S.documentListItem()
                .schemaType('solutionsEnterprisesPassengersPage')
                .title('Enterprises & Passengers')
                .icon(UsersIcon)
                .id('solutionsEnterprisesPassengersPage'),
              S.documentListItem()
                .schemaType('solutionsOperatorsDriversPage')
                .title('Operators & Drivers')
                .icon(UsersIcon)
                .id('solutionsOperatorsDriversPage'),
            ])
        ),

      S.divider(),

      // 📱 Apps
      S.listItem()
        .title('📱 Apps')
        .icon(MobileDeviceIcon)
        .child(
          S.list()
            .title('Apps')
            .items([
              S.documentListItem()
                .schemaType('appsPage')
                .title('Apps Page')
                .icon(MobileDeviceIcon)
                .id('appsPage'),
              S.divider(),
              S.documentTypeListItem('app')
                .title('All Apps')
                .icon(MobileDeviceIcon),
            ])
        ),

      S.divider(),

      // 📚 Resources Hub
      S.listItem()
        .title('📚 Resources Hub')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Resources Hub')
            .items([
              // Hub Pages
              S.listItem()
                .title('📄 Hub Pages')
                .icon(DocumentsIcon)
                .child(
                  S.list()
                    .title('Hub Pages')
                    .items([
                      S.documentListItem()
                        .schemaType('resourcesHubPage')
                        .title('Resources Hub Page')
                        .icon(BookIcon)
                        .id('resourcesHubPage'),
                      S.documentListItem()
                        .schemaType('blogPage')
                        .title('Blog Page')
                        .icon(DocumentTextIcon)
                        .id('blogPage'),
                      S.documentListItem()
                        .schemaType('caseStudiesPage')
                        .title('Case Studies Page')
                        .icon(DocumentTextIcon)
                        .id('caseStudiesPage'),
                      S.documentListItem()
                        .schemaType('faqPage')
                        .title('FAQ Page')
                        .icon(HelpCircleIcon)
                        .id('faqPage'),
                    ])
                ),

              S.divider(),

              // Content
              S.listItem()
                .title('📝 Content')
                .icon(FolderIcon)
                .child(
                  S.list()
                    .title('Content')
                    .items([
                      S.documentTypeListItem('blogPost')
                        .title('Blog Posts')
                        .icon(DocumentTextIcon),
                      S.documentTypeListItem('caseStudy')
                        .title('Case Studies')
                        .icon(DocumentTextIcon),
                      S.documentTypeListItem('faqItem')
                        .title('FAQ Items')
                        .icon(HelpCircleIcon),
                    ])
                ),

              S.divider(),

              // Taxonomies
              S.listItem()
                .title('🏷️ Taxonomies')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Taxonomies')
                    .items([
                      S.documentTypeListItem('author')
                        .title('Authors')
                        .icon(UserIcon),
                      S.documentTypeListItem('blogCategory')
                        .title('Blog Categories')
                        .icon(TagIcon),
                      S.documentTypeListItem('caseStudyCategory')
                        .title('Case Study Categories')
                        .icon(TagIcon),
                      S.documentTypeListItem('faqCategory')
                        .title('FAQ Categories')
                        .icon(TagIcon),
                    ])
                ),
            ])
        ),
    ])

export default deskStructure
