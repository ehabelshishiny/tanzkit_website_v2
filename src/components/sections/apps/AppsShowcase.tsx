'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function AppsShowcase() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'operators' | 'enterprise'>('operators');

  // Wait until client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering theme-dependent content until mounted
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

  const segments = {
    operators: {
      title: 'Operators Dashboard',
      description: 'Complete fleet management ecosystem for transportation operators',
      icon: 'ri-truck-line',
      color: 'ocean',
      dashboard: {
        id: 'operators-dashboard',
        name: 'Operators Dashboard',
        description: 'Central command hub for fleet operations',
        platform: 'Web Application',
        icon: 'ri-dashboard-3-line',
        benefits: [
          'Real-time fleet visibility',
          'AI-powered dispatch automation',
          'Predictive maintenance analytics'
        ],
        deviceType: 'landscape'
      },
      apps: [
        {
          id: 'supervisor-app',
          name: 'Supervisor App',
          description: 'Mobile fleet oversight and driver management',
          platform: 'iOS & Android',
          icon: 'ri-user-star-line',
          benefits: [
            'Live driver performance tracking',
            'Instant incident response',
            'Mobile task assignment'
          ],
          deviceType: 'portrait'
        },
        {
          id: 'driver-app',
          name: 'Driver App',
          description: 'AI-guided navigation and trip management',
          platform: 'iOS & Android',
          icon: 'ri-steering-2-line',
          benefits: [
            'Smart route optimization',
            'Automated trip logging',
            'Real-time dispatch sync'
          ],
          deviceType: 'portrait'
        }
      ]
    },
    enterprise: {
      title: 'Enterprise Dashboard',
      description: 'Strategic mobility platform for corporate transportation programs',
      icon: 'ri-building-2-line',
      color: 'emerald',
      dashboard: {
        id: 'enterprise-dashboard',
        name: 'Enterprise Dashboard',
        description: 'Strategic mobility intelligence platform',
        platform: 'Web Application',
        icon: 'ri-building-line',
        benefits: [
          'Organization-wide analytics',
          'Cost optimization insights',
          'Compliance management'
        ],
        deviceType: 'landscape'
      },
      apps: [
        {
          id: 'rider-app',
          name: 'Rider App',
          description: 'Seamless employee transportation experience',
          platform: 'iOS & Android',
          icon: 'ri-user-location-line',
          benefits: [
            'One-tap ride booking',
            'Real-time driver tracking',
            'Integrated payment system'
          ],
          deviceType: 'portrait'
        }
      ]
    }
  };

  const currentSegment = segments[activeSegment];

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
    <div className={`min-h-screen ${themeClasses.bg} py-20 px-6`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colors.light} border ${colors.border} mb-6`}>
            <i className={`ri-cpu-line ${colors.text} text-sm`}></i>
            <span className={`${colors.text} text-sm font-medium`}>AI Workforce Mobility Platform</span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold ${themeClasses.textPrimary} mb-6`}>
            Intelligent Application Ecosystem
          </h1>
          <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
            Two powerful segments, five integrated applications, one unified AI platform
          </p>
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
                  <div className="text-sm font-bold">Operators</div>
                  <div className={`text-xs ${activeSegment === 'operators' ? 'text-[#7ED977]' : isDarkTheme ? 'text-slate-500' : 'text-slate-400'}`}>
                    3 Applications
                  </div>
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
                  <div className="text-sm font-bold">Enterprise</div>
                  <div className={`text-xs ${activeSegment === 'enterprise' ? 'text-[#0F2E63]' : isDarkTheme ? 'text-slate-500' : 'text-slate-400'}`}>
                    2 Applications
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Segment Content */}
        <div className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-4`}>{currentSegment.title}</h2>
            <p className={`text-lg ${themeClasses.textSecondary}`}>{currentSegment.description}</p>
          </div>

          {/* Dynamic Grid Layout */}
          <div className="space-y-8">
            {activeSegment === 'operators' ? (
              <>
                {/* Dashboard - Full Width Landscape */}
                <div
                  className="w-full"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out both'
                  }}
                >
                  <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-10 ${themeClasses.cardHoverBorder} transition-all duration-500`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      {/* Landscape Device Mockup - OPERATORS DASHBOARD */}
                      <div>
                        <div className={`relative rounded-2xl ${themeClasses.mockupBg} border ${themeClasses.mockupBorder} p-5 aspect-[16/10] overflow-hidden group-hover:${colors.border} transition-all duration-500 shadow-2xl`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.light}`}></div>
                          <div className={`relative h-full rounded-xl ${themeClasses.mockupInnerBg} border ${themeClasses.mockupInnerBorder} overflow-hidden`}>
                            {/* Browser Chrome */}
                            <div className={`flex items-center gap-2 px-4 py-3 border-b ${themeClasses.mockupInnerBorder}`}>
                              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                            </div>
                            {/* Image Content */}
                            <div className="relative w-full h-[calc(100%-44px)]">
                              <Image
                                src={isDarkTheme ? '/AppShowcase_section/dark_theme/dark_desktop_1.png' : '/AppShowcase_section/light_theme/light_desktop_1.png'}
                                alt="Operators Dashboard Screenshot"
                                fill
                                className="object-cover"
                                priority
                              />
                            </div>
                          </div>
                          <div className={`absolute top-8 right-8 px-4 py-2 rounded-full ${colors.bg} ${colors.border} border backdrop-blur-sm z-10`}>
                            <span className={`${colors.text} text-xs font-medium`}>AI-Powered</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-5">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                          <i className={`ri-computer-line ${themeClasses.badgeIcon} text-sm`}></i>
                          <span className={`${themeClasses.badgeText} text-sm font-medium`}>{currentSegment.dashboard.platform}</span>
                        </div>

                        <div>
                          <h3 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-3`}>{currentSegment.dashboard.name}</h3>
                          <p className={`${themeClasses.textSecondary} text-base`}>{currentSegment.dashboard.description}</p>
                        </div>

                        <ul className="space-y-3">
                          {currentSegment.dashboard.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <i className="ri-check-line text-white text-sm"></i>
                              </div>
                              <span className={`${themeClasses.textTertiary} text-base`}>{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        <button className={`px-8 py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
                          Explore Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Apps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentSegment.apps.map((app, index) => (
                    <div
                      key={app.id}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.15}s both`
                      }}
                    >
                      <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-8 ${themeClasses.cardHoverBorder} transition-all duration-500 shadow-2xl`}>
                        {/* Portrait Device Mockup - SUPERVISOR (index 0) / DRIVER (index 1) */}
                        <div className={`relative mb-8 mx-auto w-52 aspect-[9/18] rounded-[2.5rem] ${themeClasses.phoneBg} border-[5px] ${themeClasses.phoneBorder} overflow-hidden group-hover:${colors.border} transition-all duration-500 shadow-2xl`}>
                          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-28 h-8 ${themeClasses.phoneNotch} rounded-b-3xl z-10`}></div>
                          <div className={`h-full bg-gradient-to-br ${themeClasses.phoneGradient} overflow-hidden`}>
                            {/* Image Content */}
                            <div className="relative w-full h-full">
                              <Image
                                src={
                                  index === 0
                                    ? (isDarkTheme ? '/AppShowcase_section/dark_theme/dark_mobile_1.png' : '/AppShowcase_section/light_theme/light_mobile_1.png')
                                    : (isDarkTheme ? '/AppShowcase_section/dark_theme/dark_mobile_2.png' : '/AppShowcase_section/light_theme/light_mobile_2.png')
                                }
                                alt={`${app.name} Screenshot`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 ${themeClasses.phoneIndicator} rounded-full z-10`}></div>
                          <div className={`absolute top-14 right-5 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border backdrop-blur-sm z-10`}>
                            <span className={`${colors.text} text-[11px] font-medium`}>Real-time</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                            <i className={`ri-smartphone-line ${themeClasses.badgeIcon} text-xs`}></i>
                            <span className={`${themeClasses.badgeText} text-xs font-medium`}>{app.platform}</span>
                          </div>

                          <div>
                            <h3 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>{app.name}</h3>
                            <p className={`${themeClasses.textSecondary} text-sm`}>{app.description}</p>
                          </div>

                          <ul className="space-y-3">
                            {app.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <i className="ri-check-line text-white text-xs"></i>
                                </div>
                                <span className={`${themeClasses.textTertiary} text-sm`}>{benefit}</span>
                              </li>
                            ))}
                          </ul>

                          <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Enterprise: Dashboard + Rider App Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Enterprise Dashboard */}
                  <div
                    style={{
                      animation: 'fadeInUp 0.6s ease-out both'
                    }}
                  >
                    <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-8 ${themeClasses.cardHoverBorder} transition-all duration-500 h-full`}>
                      {/* Landscape Device Mockup - ENTERPRISE DASHBOARD */}
                      <div className={`relative mb-8 rounded-2xl ${themeClasses.mockupBg} border ${themeClasses.mockupBorder} p-4 aspect-[16/10] overflow-hidden group-hover:${colors.border} transition-all duration-500 shadow-2xl`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.light}`}></div>
                        <div className={`relative h-full rounded-xl ${themeClasses.mockupInnerBg} border ${themeClasses.mockupInnerBorder} overflow-hidden`}>
                          {/* Browser Chrome */}
                          <div className={`flex items-center gap-2 px-4 py-2 border-b ${themeClasses.mockupInnerBorder}`}>
                            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                          </div>
                          {/* Image Content */}
                          <div className="relative w-full h-[calc(100%-38px)]">
                            <Image
                              src={isDarkTheme ? '/AppShowcase_section/dark_theme/dark_desktop_2.png' : '/AppShowcase_section/light_theme/light_desktop_2.png'}
                              alt="Enterprise Dashboard Screenshot"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className={`absolute top-6 right-6 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border backdrop-blur-sm z-10`}>
                          <span className={`${colors.text} text-xs font-medium`}>Real-time</span>
                        </div>
                      </div>

                      {/* Content Below Image */}
                      <div className="space-y-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                          <i className={`ri-computer-line ${themeClasses.badgeIcon} text-xs`}></i>
                          <span className={`${themeClasses.badgeText} text-xs font-medium`}>{currentSegment.dashboard.platform}</span>
                        </div>

                        <div>
                          <h3 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>{currentSegment.dashboard.name}</h3>
                          <p className={`${themeClasses.textSecondary} text-sm`}>{currentSegment.dashboard.description}</p>
                        </div>

                        <ul className="space-y-2">
                          {currentSegment.dashboard.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <i className="ri-check-line text-white text-xs"></i>
                              </div>
                              <span className={`${themeClasses.textTertiary} text-sm`}>{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rider App */}
                  <div
                    style={{
                      animation: 'fadeInUp 0.6s ease-out 0.15s both'
                    }}
                  >
                    <div className={`group relative ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} rounded-3xl p-8 ${themeClasses.cardHoverBorder} transition-all duration-500 h-full`}>
                      {/* Portrait Device Mockup - RIDER APP */}
                      <div className={`relative mb-8 mx-auto w-52 aspect-[9/18] rounded-[2.5rem] ${themeClasses.phoneBg} border-[5px] ${themeClasses.phoneBorder} overflow-hidden group-hover:${colors.border} transition-all duration-500 shadow-2xl`}>
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-28 h-8 ${themeClasses.phoneNotch} rounded-b-3xl z-10`}></div>
                        <div className={`h-full bg-gradient-to-br ${themeClasses.phoneGradient} overflow-hidden`}>
                          {/* Image Content */}
                          <div className="relative w-full h-full">
                            <Image
                              src={isDarkTheme ? '/AppShowcase_section/dark_theme/dark_mobile_3.png' : '/AppShowcase_section/light_theme/light_mobile_3.png'}
                              alt="Rider App Screenshot"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 ${themeClasses.phoneIndicator} rounded-full z-10`}></div>
                        <div className={`absolute top-14 right-5 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border backdrop-blur-sm z-10`}>
                          <span className={`${colors.text} text-[11px] font-medium`}>AI-Powered</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${themeClasses.badgeBg} border ${themeClasses.badgeBorder}`}>
                          <i className={`ri-smartphone-line ${themeClasses.badgeIcon} text-xs`}></i>
                          <span className={`${themeClasses.badgeText} text-xs font-medium`}>{currentSegment.apps[0].platform}</span>
                        </div>

                        <div>
                          <h3 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>{currentSegment.apps[0].name}</h3>
                          <p className={`${themeClasses.textSecondary} text-sm`}>{currentSegment.apps[0].description}</p>
                        </div>

                        <ul className="space-y-3">
                          {currentSegment.apps[0].benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.primary} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <i className="ri-check-line text-white text-xs"></i>
                              </div>
                              <span className={`${themeClasses.textTertiary} text-sm`}>{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary} text-white font-medium hover:shadow-lg ${colors.shadow} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
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
