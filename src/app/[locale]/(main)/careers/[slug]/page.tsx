import { notFound } from 'next/navigation';
import { getCareerBySlug, getJobApplicationFormLabels } from '@/lib/sanity/queries';
import { JobApplicationForm } from '@/components/forms/job-application-form';
import { PortableText } from '@/components/sanity/portable-text';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { CalendarIcon, MapPinIcon, BriefcaseIcon, BuildingIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface JobDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { locale, slug } = await params;
  
  // Fetch job data and form labels in parallel
  const [job, formLabels, t] = await Promise.all([
    getCareerBySlug(slug, locale),
    getJobApplicationFormLabels(locale),
    getTranslations('about.careers'),
  ]);

  // If job not found or not active, show 404
  if (!job || !job.isActive) {
    notFound();
  }

  // Format posted date
  const postedDate = job.postedDate 
    ? new Date(job.postedDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Format closing date
  const closingDate = job.closingDate
    ? new Date(job.closingDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}`}>
                {locale === 'ar' ? 'الرئيسية' : 'Home'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}/about#careers`}>
                {locale === 'ar' ? 'الوظائف' : 'Careers'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{job.title}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Job Header */}
      <section className="container pb-12">
        <Card className="p-8">
          <div className="space-y-6">
            {/* Title and Department */}
            <div>
              <Typography variant="h1" className="mb-2">
                {job.title}
              </Typography>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BuildingIcon className="w-3 h-3" />
                  {job.department}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <BriefcaseIcon className="w-3 h-3" />
                  {job.type}
                </Badge>
              </div>
            </div>

            {/* Dates */}
            {(postedDate || closingDate) && (
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {postedDate && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {locale === 'ar' ? 'تاريخ النشر:' : 'Posted:'} {postedDate}
                    </span>
                  </div>
                )}
                {closingDate && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-destructive font-medium">
                      {locale === 'ar' ? 'آخر موعد للتقديم:' : 'Closing:'} {closingDate}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Short Description */}
            {job.description && (
              <Typography variant="body" className="text-lg text-muted-foreground">
                {job.description}
              </Typography>
            )}
          </div>
        </Card>
      </section>

      {/* Job Description */}
      {job.fullDescription && (
        <section className="container pb-12">
          <Card className="p-8">
            <Typography variant="h2" className="mb-6">
              {locale === 'ar' ? 'تفاصيل الوظيفة' : 'Job Description'}
            </Typography>
            <PortableText value={job.fullDescription} />
          </Card>
        </section>
      )}

      {/* Application Form */}
      <section className="container pb-16">
        <Card className="p-8">
          <Typography variant="h2" className="mb-6">
            {locale === 'ar' ? 'قدّم طلبك' : 'Apply for this Position'}
          </Typography>
          <JobApplicationForm
            jobSlug={slug}
            jobTitle={job.title}
            applicationEmail={job.applicationEmail}
            labels={formLabels}
          />
        </Card>
      </section>
    </main>
  );
}

