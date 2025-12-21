import { Metadata } from 'next';
import { getActiveCareers } from '@/lib/sanity/queries';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface CareersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'ar' ? 'الوظائف' : 'Careers',
    description: locale === 'ar' 
      ? 'انضم إلى فريقنا واستكشف الفرص الوظيفية المتاحة'
      : 'Join our team and explore available career opportunities',
  };
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  const careers = await getActiveCareers(locale);
  const t = await getTranslations('about.careers');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-16 border-b bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4">
            {locale === 'ar' ? 'انضم إلى فريقنا' : 'Join Our Team'}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {locale === 'ar' ? 'الوظائف المتاحة' : 'Career Opportunities'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {locale === 'ar'
              ? 'نحن نبحث عن أشخاص موهوبين ومتحمسين للانضمام إلى فريقنا المتنامي'
              : 'We are looking for talented and passionate individuals to join our growing team'}
          </p>
        </div>
      </div>

      {/* Careers Listing */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {!careers || careers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {locale === 'ar'
                  ? 'لا توجد وظائف متاحة حالياً. يرجى التحقق مرة أخرى قريباً.'
                  : 'No open positions at the moment. Please check back soon.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {careers.map((job: any) => (
                <Card key={job._key} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Job Info */}
                    <div className="flex-grow space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                        <p className="text-muted-foreground">{job.description}</p>
                      </div>

                      {/* Job Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <Badge variant="secondary">{job.department}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <Badge variant="secondary">{job.location}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                        {job.postedDate && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(job.postedDate).toLocaleDateString(
                                locale === 'ar' ? 'ar-SA' : 'en-US',
                                { year: 'numeric', month: 'long', day: 'numeric' }
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <Button asChild size="lg" className="lg:flex-shrink-0">
                      <Link href={`/${locale}/careers/${job.slug.current}`}>
                        {t('applyNow')}
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

