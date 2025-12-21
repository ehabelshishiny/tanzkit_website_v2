'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { urlFor } from '@/lib/sanity/image';

interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  url?: string;
}

interface App {
  _id: string;
  name: string;
  slug: { current: string };
  tagline: string;
  description: string;
  category: 'operators' | 'enterprise';
  layoutType: 'portrait' | 'landscape';
  benefits: string[];
  screenshots: SanityImage[];
  platforms: {
    ios?: boolean;
    android?: boolean;
    web?: boolean;
  };
}

interface SegmentData {
  title: string;
  description: string;
  tabLabel: string;
}

interface ShowcaseData {
  title: string;
  subtitle: string;
  operatorsSegment: SegmentData;
  enterpriseSegment: SegmentData;
  operatorApps: App[];
  enterpriseApps: App[];
}

interface AppsShowcaseProps {
  data: ShowcaseData;
}

export default function AppsShowcase({ data }: AppsShowcaseProps) {
  const { theme } = useTheme();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'operators' | 'enterprise'>('operators');

  // Localized labels
  const ctaLabel = locale === 'ar' ? 'اعرف المزيد' : 'Learn More';

  // Extract apps from data
  const operatorApps = data.operatorApps || [];
  const enterpriseApps = data.enterpriseApps || [];

  // Separate dashboard from mobile apps
  const operatorDashboard = operatorApps.find(app => app.layoutType === 'landscape');
  const operatorMobileApps = operatorApps.filter(app => app.layoutType === 'portrait');
  const enterpriseDashboard = enterpriseApps.find(app => app.layoutType === 'landscape');
  const enterpriseMobileApps = enterpriseApps.filter(app => app.layoutType === 'portrait');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-8 w-64 bg-slate-800 rounded-full mx-auto mb-6"></div>
            <div className="h-16 w-3/4 bg-slate-800 rounded-lg mx-auto mb-6"></div>
            <div className="h-6 w-1/2 bg-slate-800 rounded-lg mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const isDarkTheme = theme === 'dark';

  // Get platform label
  const getPlatformLabel = (app: App) => {
    const labels = {
      mobile: locale === 'ar' ? 'iOS و Android' : 'iOS & Android',
      web: locale === 'ar' ? 'تطبيق ويب' : 'Web App',
      ios: 'iOS',
      android: 'Android',
    };

    if (app.platforms.ios && app.platforms.android) return labels.mobile;
    if (app.platforms.web) return labels.web;
    if (app.platforms.ios) return labels.ios;
    if (app.platforms.android) return labels.android;
    return labels.mobile;
  };

  const getGradientClasses = (segment: 'operators' | 'enterprise') => {
    if (segment === 'operators') {
      if (isDarkTheme) {
        return {
          primary: 'from-[#1F6FB2] to-[#0F2E63]',
          light: 'from-[#1F6FB2]/10 to-[#0F2E63]/10',
          border: 'border-[#1F6FB2]/30',
          text: 'text-[#1F6FB2]',
          bg: 'bg-[#1F6FB2]/20',
          shadow: 'hover:shadow-[#1F6FB2]/25',
          mockupGradient: 'from-[#1F6FB2]/40 to-transparent',
          mockupGradient2: 'from-[#0F2E63]/40 to-transparent'
        };
      } else {
        return {
          primary: 'from-[#3B8FD4] to-[#2A5A9E]',
          light: 'from-[#3B8FD4]/20 to-[#2A5A9E]/20',
          border: 'border-[#3B8FD4]/40',
          text: 'text-[#1F6FB2]',
          bg: 'bg-[#3B8FD4]/15',
          shadow: 'hover:shadow-[#3B8FD4]/20',
          mockupGradient: 'from-[#3B8FD4]/30 to-transparent',
          mockupGradient2: 'from-[#2A5A9E]/30 to-transparent'
        };
      }
    } else {
      if (isDarkTheme) {
        return {
          primary: 'from-[#27B889] to-[#7ED977]',
          light: 'from-[#27B889]/10 to-[#7ED977]/10',
          border: 'border-[#27B889]/30',
          text: 'text-[#27B889]',
          bg: 'bg-[#27B889]/20',
          shadow: 'hover:shadow-[#27B889]/25',
          mockupGradient: 'from-[#27B889]/40 to-transparent',
          mockupGradient2: 'from-[#7ED977]/40 to-transparent'
        };
      } else {
        return {
          primary: 'from-[#3DD4A8] to-[#9FE894]',
          light: 'from-[#3DD4A8]/20 to-[#9FE894]/20',
          border: 'border-[#3DD4A8]/40',
          text: 'text-[#27B889]',
          bg: 'bg-[#3DD4A8]/15',
          shadow: 'hover:shadow-[#3DD4A8]/20',
          mockupGradient: 'from-[#3DD4A8]/30 to-transparent',
          mockupGradient2: 'from-[#9FE894]/30 to-transparent'
        };
      }
    }
  };

  const colors = getGradientClasses(activeSegment);

  const themeClasses = {
    bg: isDarkTheme ? 'bg-slate-950' : 'bg-slate-50',
    cardBg: isDarkTheme ? 'bg-slate-900/50' : 'bg-white',
    cardBorder: isDarkTheme ? 'border-slate-800' : 'border-slate-200',
    cardHoverBorder: isDarkTheme ? 'hover:border-slate-700' : 'hover:border-slate-300',
    textPrimary: isDarkTheme ? 'text-white' : 'text-slate-900',
    textSecondary: isDarkTheme ? 'text-slate-400' : 'text-slate-600',
    textTertiary: isDarkTheme ? 'text-slate-300' : 'text-slate-700',
    badgeBg: isDarkTheme ? 'bg-slate-800' : 'bg-slate-100',
    badgeBorder: isDarkTheme ? 'border-slate-700' : 'border-slate-200',
    badgeText: isDarkTheme ? 'text-slate-300' : 'text-slate-700',
    badgeIcon: isDarkTheme ? 'text-slate-400' : 'text-slate-500',
    mockupBg: isDarkTheme ? 'bg-slate-800/50' : 'bg-slate-100',
    mockupBorder: isDarkTheme ? 'border-slate-700' : 'border-slate-300',
    mockupInnerBg: isDarkTheme ? 'bg-slate-900/90' : 'bg-white',
    mockupInnerBorder: isDarkTheme ? 'border-slate-700/50' : 'border-slate-200',
    mockupElement: isDarkTheme ? 'bg-slate-800/60' : 'bg-slate-200',
    mockupElementLight: isDarkTheme ? 'bg-slate-800/40' : 'bg-slate-100',
    phoneBg: isDarkTheme ? 'bg-slate-800' : 'bg-slate-200',
    phoneBorder: isDarkTheme ? 'border-slate-700' : 'border-slate-300',
    phoneNotch: isDarkTheme ? 'bg-slate-900' : 'bg-slate-300',
    phoneGradient: isDarkTheme ? 'from-slate-900 to-slate-800' : 'from-slate-50 to-slate-100',
    phoneElement: isDarkTheme ? 'bg-slate-700/40' : 'bg-slate-300/60',
    phoneElementLight: isDarkTheme ? 'bg-slate-700/30' : 'bg-slate-200/60',
    phoneIndicator: isDarkTheme ? 'bg-slate-600' : 'bg-slate-400',
    switcherBg: isDarkTheme ? 'bg-slate-900' : 'bg-white',
    switcherBorder: isDarkTheme ? 'border-slate-800' : 'border-slate-200',
    switcherInactive: isDarkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900',
    switcherIconBg: isDarkTheme ? 'bg-slate-800 group-hover:bg-slate-700' : 'bg-slate-100 group-hover:bg-slate-200',
    integrationBg: isDarkTheme ? 'bg-slate-900/30' : 'bg-white',
    integrationBorder: isDarkTheme ? 'border-slate-800' : 'border-slate-200',
    featureBg: isDarkTheme ? 'bg-slate-800/50' : 'bg-slate-50'
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} py-20 px-4 sm:px-6 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <Typography variant="h1" className={`${themeClasses.textPrimary} mb-6`}>
            {data.title}
          </Typography>
          <Typography variant="subtitle" className={`${themeClasses.textSecondary} max-w-3xl mx-auto`}>
            {data.subtitle}
          </Typography>
        </div>

        {/* Segment Switcher */}
        <div className="flex justify-center mb-16">
          <div className={`inline-flex items-center gap-4 p-2 rounded-2xl ${themeClasses.switcherBg} border ${themeClasses.switcherBorder}`}>
            <button
              onClick={() => setActiveSegment('operators')}
              className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-500 whitespace-nowrap cursor-pointer ${
                activeSegment === 'operators'
                  ? 'bg-gradient-to-r from-[#1F6FB2] to-[#0F2E63] text-white'
                  : themeClasses.switcherInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeSegment === 'operators'
                    ? 'bg-white/20'
                    : themeClasses.switcherIconBg
                }`}>
                  <i className="ri-truck-line text-xl"></i>
                </div>
                <div className="text-left">
                  <Typography variant="caption" as="div" className="font-bold">{data.operatorsSegment.tabLabel}</Typography>
                  <Typography variant="caption" as="div" className={`${activeSegment === 'operators' ? 'text-[#7ED977]' : isDarkTheme ? 'text-slate-500' : 'text-slate-400'} ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {operatorApps.length} {locale === 'ar' ? 'تطبيقات' : 'Apps'}
                  </Typography>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveSegment('enterprise')}
              className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-500 whitespace-nowrap cursor-pointer ${
                activeSegment === 'enterprise'
                  ? 'bg-gradient-to-r from-[#27B889] to-[#7ED977] text-white'
                  : themeClasses.switcherInactive
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeSegment === 'enterprise'
                    ? 'bg-white/20'
                    : themeClasses.switcherIconBg
                }`}>
                  <i className="ri-building-2-line text-xl"></i>
                </div>
                <div className="text-left">
                  <Typography variant="caption" as="div" className="font-bold">{data.enterpriseSegment.tabLabel}</Typography>
                  <Typography variant="caption" as="div" className={`${activeSegment === 'enterprise' ? 'text-[#0F2E63]' : isDarkTheme ? 'text-slate-500' : 'text-slate-400'} ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {enterpriseApps.length} {locale === 'ar' ? 'تطبيقات' : 'Apps'}
                  </Typography>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Segment Content */}
        <div className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Typography variant="h2" className={`${themeClasses.textPrimary} mb-4`}>
              {activeSegment === 'operators' ? data.operatorsSegment.title : data.enterpriseSegment.title}
            </Typography>
            <Typography variant="body" className={themeClasses.textSecondary}>
              {activeSegment === 'operators' ? data.operatorsSegment.description : data.enterpriseSegment.description}
            </Typography>
          </div>

          {/* Dynamic Grid Layout */}
          <div className="space-y-8">
            {activeSegment === 'operators' ? (
              <>
                {/* Dashboard - Full Width Landscape */}
                {operatorDashboard && (
                  <div
                    className="w-full"
                    style={{
                      animation: 'fadeInUp 0.6s ease-out both'
                    }}
                  >
                    <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-10 ${themeClasses.cardHoverBorder} transition-all duration-500 shadow-xl`}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Operators Dashboard Image */}
                        <div>
                          <Image
                            src={'/assets/apps_screenshots/GIF/Operator GIF.gif'}
                            alt={operatorDashboard.name}
                            width={1600}
                            height={1000}
                            className="w-full h-auto"
                            priority
                            unoptimized
                          />
                        </div>

                        {/* Content */}
                        <div className="space-y-5">
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                            <i className={`ri-computer-line ${themeClasses.badgeIcon} text-sm`}></i>
                            <Typography variant="caption" as="span" className={`${themeClasses.badgeText} font-medium`}>
                              {getPlatformLabel(operatorDashboard)}
                            </Typography>
                          </div>

                          <div>
                            <Typography variant="h3" className={`${themeClasses.textPrimary} mb-3`}>
                              {operatorDashboard.name}
                            </Typography>
                            <Typography variant="body" className={themeClasses.textSecondary}>
                              {operatorDashboard.description}
                            </Typography>
                          </div>

                          <ul className="space-y-3">
                            {operatorDashboard.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <i className="ri-check-line text-white text-sm"></i>
                                </div>
                                <Typography variant="body" as="span" className={themeClasses.textTertiary}>
                                  {benefit}
                                </Typography>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={`/${locale}/apps/${operatorDashboard.slug.current}`}
                            className={`px-8 py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center`}
                          >
                            {ctaLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Apps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {operatorMobileApps.map((app, index) => {
                    // Map slug to GIF filename
                    const gifMap: Record<string, string> = {
                      'supervisor': 'Supervisor GIF.gif',
                      'driver': 'Driver GIF.gif',
                    };
                    const gifFile = gifMap[app.slug.current] || 'Supervisor GIF.gif';

                    return (
                      <div
                        key={app._id}
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.15}s both`
                        }}
                      >
                        <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-8 ${themeClasses.cardHoverBorder} transition-all duration-500 shadow-xl`}>
                          {/* Mobile App Image */}
                          <div className="mb-8 w-1/3 mx-auto">
                            <Image
                              src={`/assets/apps_screenshots/GIF/${gifFile}`}
                              alt={app.name}
                              width={900}
                              height={1950}
                              className="w-full h-auto mx-auto"
                              unoptimized
                            />
                          </div>

                          {/* Content */}
                          <div className="space-y-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                              <i className={`ri-smartphone-line ${themeClasses.badgeIcon} text-xs`}></i>
                              <Typography variant="caption" as="span" className={`${themeClasses.badgeText} font-medium`}>
                                {getPlatformLabel(app)}
                              </Typography>
                            </div>

                            <div>
                              <Typography variant="h3" className={`${themeClasses.textPrimary} mb-2`}>
                                {app.name}
                              </Typography>
                              <Typography variant="caption" className={themeClasses.textSecondary}>
                                {app.description}
                              </Typography>
                            </div>

                            <ul className="space-y-3">
                              {app.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <i className="ri-check-line text-white text-xs"></i>
                                  </div>
                                  <Typography variant="caption" as="span" className={themeClasses.textTertiary}>
                                    {benefit}
                                  </Typography>
                                </li>
                              ))}
                            </ul>

                            <Link
                              href={`/${locale}/apps/${app.slug.current}`}
                              className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center`}
                            >
                              {ctaLabel}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Enterprise: Dashboard + Rider App Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Enterprise Dashboard */}
                  {enterpriseDashboard && (
                    <div
                      style={{
                        animation: 'fadeInUp 0.6s ease-out both'
                      }}
                    >
                      <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-8 ${themeClasses.cardHoverBorder} transition-all duration-500 h-full shadow-xl`}>
                        {/* Enterprise Dashboard Image */}
                        <div className="mb-8">
                          <Image
                            src={'/assets/apps_screenshots/GIF/Enterprise GIF.gif'}
                            alt={enterpriseDashboard.name}
                            width={1600}
                            height={1000}
                            className="w-full h-auto"
                            unoptimized
                          />
                        </div>

                        {/* Content Below Image */}
                        <div className="space-y-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                            <i className={`ri-computer-line ${themeClasses.badgeIcon} text-xs`}></i>
                            <Typography variant="caption" as="span" className={`${themeClasses.badgeText} font-medium`}>
                              {getPlatformLabel(enterpriseDashboard)}
                            </Typography>
                          </div>

                          <div>
                            <Typography variant="h3" className={`${themeClasses.textPrimary} mb-2`}>
                              {enterpriseDashboard.name}
                            </Typography>
                            <Typography variant="caption" className={themeClasses.textSecondary}>
                              {enterpriseDashboard.description}
                            </Typography>
                          </div>

                          <ul className="space-y-2">
                            {enterpriseDashboard.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <i className="ri-check-line text-white text-xs"></i>
                                </div>
                                <Typography variant="caption" as="span" className={themeClasses.textTertiary}>
                                  {benefit}
                                </Typography>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={`/${locale}/apps/${enterpriseDashboard.slug.current}`}
                            className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center`}
                          >
                            {ctaLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rider App */}
                  {enterpriseMobileApps.map((app, index) => (
                    <div
                      key={app._id}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.15}s both`
                      }}
                    >
                      <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-8 ${themeClasses.cardHoverBorder} transition-all duration-500 h-full shadow-xl`}>
                        {/* Rider App Image */}
                        <div className="mb-8 w-5/17 mx-auto">
                          <Image
                            src={'/assets/apps_screenshots/GIF/Rider GIF.gif'}
                            alt={app.name}
                            width={900}
                            height={1950}
                            className="w-full h-auto mx-auto"
                            unoptimized
                          />
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                            <i className={`ri-smartphone-line ${themeClasses.badgeIcon} text-xs`}></i>
                            <Typography variant="caption" as="span" className={`${themeClasses.badgeText} font-medium`}>
                              {getPlatformLabel(app)}
                            </Typography>
                          </div>

                          <div>
                            <Typography variant="h3" className={`${themeClasses.textPrimary} mb-2`}>
                              {app.name}
                            </Typography>
                            <Typography variant="caption" className={themeClasses.textSecondary}>
                              {app.description}
                            </Typography>
                          </div>

                          <ul className="space-y-3">
                            {app.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <i className="ri-check-line text-white text-xs"></i>
                                </div>
                                <Typography variant="caption" as="span" className={themeClasses.textTertiary}>
                                  {benefit}
                                </Typography>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={`/${locale}/apps/${app.slug.current}`}
                            className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center`}
                          >
                            {ctaLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>       
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
