# Tranzkit Website Documentation

This directory contains technical and user documentation for the Tranzkit website project.

## Documentation Index

### For Content Editors

- **[Lucide Icons Guide](./LUCIDE_ICONS_GUIDE.md)** - Complete guide to using the icon picker in Sanity Studio
  - How to select icons
  - Popular icon categories
  - Search tips and best practices
  - Full icon library reference

### For Developers

- **[Icon System Implementation](./ICON_SYSTEM_IMPLEMENTATION.md)** - Technical details of the icon system
  - Architecture overview
  - API reference
  - Migration guide
  - Files changed and created

## Quick Links

### Icon System
- **Total Icons Available**: 1000+ (Lucide React)
- **Icon Picker**: Custom Sanity Studio component with autocomplete and preview
- **Documentation**: See [LUCIDE_ICONS_GUIDE.md](./LUCIDE_ICONS_GUIDE.md)
- **Implementation**: See [ICON_SYSTEM_IMPLEMENTATION.md](./ICON_SYSTEM_IMPLEMENTATION.md)

### External Resources
- [Lucide Icons Library](https://lucide.dev/icons/) - Browse all available icons
- [Next.js Documentation](https://nextjs.org/docs) - Framework documentation
- [Sanity Documentation](https://www.sanity.io/docs) - CMS documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework

## Project Structure

```
tranzkit_website_v2/
├── src/                          # Next.js application source
│   ├── app/                      # App router pages
│   ├── components/               # React components
│   ├── lib/                      # Utilities and helpers
│   │   ├── lucide-icons.ts      # Dynamic icon loader (NEW)
│   │   └── icon-mapper.tsx      # Legacy icon mapper
│   └── sanity/                   # Sanity client and queries
├── sanity-studio/                # Sanity Studio configuration
│   ├── components/               # Custom Studio components
│   │   └── IconPicker.tsx       # Icon picker component (NEW)
│   └── schemaTypes/              # Content schemas
│       ├── fields/               # Reusable field definitions
│       │   └── iconField.ts     # Icon field helper (NEW)
│       ├── objects/              # Object schemas
│       └── documents/            # Document schemas
├── docs/                         # Documentation (this folder)
│   ├── README.md                 # This file
│   ├── LUCIDE_ICONS_GUIDE.md    # Editor guide
│   └── ICON_SYSTEM_IMPLEMENTATION.md  # Technical docs
└── messages/                     # i18n translations
    ├── en.json                   # English translations
    └── ar.json                   # Arabic translations
```

## Recent Updates

### Icon System Overhaul (Latest)
- ✅ Upgraded from 17 hardcoded icons to 1000+ dynamic icons
- ✅ Added custom icon picker with autocomplete and preview
- ✅ Created comprehensive documentation for editors and developers
- ✅ Updated all schemas to use new icon system
- ✅ Maintained backward compatibility with existing code

### Resources Hub Implementation
- ✅ Blog section with listing and detail pages
- ✅ Case studies with categories and metrics
- ✅ FAQ with search and category filtering
- ✅ Documentation landing page
- ✅ Careers section integrated with About page

### Localization & RTL
- ✅ Full bilingual support (English/Arabic)
- ✅ RTL layout for Arabic
- ✅ Localized page titles, filters, buttons, and messages
- ✅ Pricing comparison table RTL support

## Contributing

When adding new features or making changes:

1. **Update Documentation**: Keep docs in sync with code changes
2. **Follow Patterns**: Use established patterns (e.g., iconField for new schemas)
3. **Test Thoroughly**: Run `npm run build` before committing
4. **Consider i18n**: Add translations for new user-facing text
5. **Document for Editors**: Update guides if adding new Sanity fields

## Support

For questions or issues:
- Check relevant documentation in this folder
- Review implementation files for code examples
- Consult external resources linked above

