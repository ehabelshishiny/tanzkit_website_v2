import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Tranzkit Icon */}
      <Image
        src="/assets/icon/Tranzkit_icon_svg.svg"
        alt="Tranzkit Icon"
        width={32}
        height={32}
        className="w-8 h-8"
        priority
      />

      {/* Tranzkit Wordmark - Light Mode */}
      <Image
        src="/assets/logo/color_transparent.svg"
        alt="Tranzkit"
        width={120}
        height={32}
        className="h-6 w-auto dark:hidden"
        priority
      />

      {/* Tranzkit Wordmark - Dark Mode */}
      <Image
        src="/assets/logo/white_transparent.svg"
        alt="Tranzkit"
        width={120}
        height={32}
        className="h-6 w-auto hidden dark:block"
        priority
      />
    </div>
  );
}

