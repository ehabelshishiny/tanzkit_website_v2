import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-start gap-3 ${className}`}>
      {/* Tranzkit Icon - Increased size for better visibility and balance */}
      <div className="flex items-center justify-center h-20">
        <Image
          src="/assets/icon/Tranzkit_icon_svg.svg"
          alt="Tranzkit Icon"
          width={44}
          height={44}
          className="w-8 h-8"
          priority
        />
      </div>

      {/* Tranzkit Wordmark - Light Mode - Increased size for prominence */}
      <div className="flex items-center justify-center h-20">
        <Image
          src="/assets/logo/color_transparent.svg"
          alt="Tranzkit"
          width={210}
          height={56}
          className="h-24 w-auto dark:hidden"
          priority
        />
      </div>

      {/* Tranzkit Wordmark - Dark Mode - Increased size for prominence */}
      <div className="flex items-center justify-center h-20">
        <Image
          src="/assets/logo/white_transparent.svg"
          alt="Tranzkit"
          width={210}
          height={56}
          className="h-24 w-auto hidden dark:block"
          priority
        />
      </div>
    </div>
  );
}

