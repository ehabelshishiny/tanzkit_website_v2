import { useTranslations } from 'next-intl';
import { Typography } from '@/components/ui/typography';
import { Logo } from '@/components/layout/logo';
import { Loader2 } from 'lucide-react';

export default function TrialPage() {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 text-center px-6">
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>

        <div className="space-y-4 max-w-md">
          <Typography variant="h2" align="center" className="tracking-tight">
            {t('redirecting')}
          </Typography>
          
          <Typography variant="subtitle" align="center" className="text-muted-foreground">
            {t('preparingTrial')}
          </Typography>
        </div>
 
        <Typography variant="caption" align="center" className="mt-8 text-muted-foreground/60">
          {/* This page will redirect to the application sign-in URL */}
        </Typography>
      </div>
    </div>
  );
}
