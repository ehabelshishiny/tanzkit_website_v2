import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex flex-row items-center justify-start gap-1 ${className}`}>
      {/* Tranzkit Icon - Theme-aware with CSS filter for dark mode */}
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
        {/* Light Mode Icon - Colored version */}
        <Image
          src="/assets/icon/Tranzkit_icon_svg.svg"
          alt="Tranzkit Icon"
          width={32}
          height={32}
          className="w-8 h-8 dark:opacity-0 dark:invisible transition-opacity duration-200"
          priority
        />
        {/* Dark Mode Icon - Same icon with CSS filter to make it white */}
        <Image
          src="/assets/icon/Tranzkit_icon_svg.svg"
          alt="Tranzkit Icon"
          width={32}
          height={32}
          className="absolute inset-0 w-8 h-8 opacity-0 invisible dark:opacity-100 dark:visible transition-opacity duration-200 [filter:brightness(0)_invert(1)]"
          priority
        />
      </div>

      {/* Tranzkit Wordmark - Both themes in same container to prevent shift */}
      {/* Increased size: 1020px width (100% larger - doubled from 510px), natural sizing with w-auto */}
      {/* Using object-cover to crop SVG whitespace and scale to match icon height */}
      <div className="relative h-12 shrink-0 overflow-hidden">
        {/* Light Mode Wordmark - In normal flow to size the container */}
        <Image
          src="/assets/logo/color_transparent.svg"
          alt="Tranzkit"
          width={1020}
          height={96}
          className="h-[200%] w-auto object-cover object-center dark:opacity-0 dark:invisible transition-opacity duration-200"
          style={{ transform: 'translateY(-21.5%)' }}
          priority
        />
        {/* Dark Mode Wordmark - Absolutely positioned over light mode */}
        <Image
          src="/assets/logo/white_transparent.svg"
          alt="Tranzkit"
          width={1020}
          height={96}
          className="absolute inset-0 h-[200%] w-auto object-cover object-center opacity-0 invisible dark:opacity-100 dark:visible transition-opacity duration-200"
          style={{ transform: 'translateY(-21.5%)' }}
          priority
        />
      </div>
    </div>
  );
}

