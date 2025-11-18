import { useTranslations } from 'next-intl';
import { Logo } from '@/components/layout/logo';
import { Loader2 } from 'lucide-react';

export default function TrialPage() {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 text-center px-6">
        {/* Tranzkit Logo */}
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>

        {/* Heading */}
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('redirecting')}
          </h1>
          
          {/* Subtext */}
          <p className="text-lg text-muted-foreground">
            {t('preparingTrial')}
          </p>
        </div>
 
        {/* Optional: Add a note for developers */}
        <div className="mt-8 text-xs text-muted-foreground/60">
          {/* This page will redirect to the application sign-in URL */}
        </div>
      </div>
    </div>
  );
}

