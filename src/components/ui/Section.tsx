import React, { ReactNode } from 'react';
import { colors } from '@/styles/designSystem';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'coconut' | 'cream' | 'forest' | 'gradient';
  padding?: 'small' | 'medium' | 'large';
  id?: string;
  // Extra classes for the inner content wrapper so callers can override padding (e.g., px-12)
  contentClassName?: string;
}

export default function Section({
  children,
  className = '',
  background = 'white',
  padding = 'large',
  id,
  contentClassName = ''
}: SectionProps) {
  const bgColors = {
    white: colors.neutral.white,
    coconut: colors.accent.coconutWhite,
    cream: colors.accent.coconutWhite,
    forest: colors.primary.forest,
    gradient: 'linear-gradient(135deg, #F8F6F0 0%, #FFFFFF 100%)',
  };

  const verticalPadding = {
    small: 'py-12 sm:py-14 md:py-16',
    medium: 'py-16 sm:py-20 md:py-24',
    large: 'py-20 sm:py-24 md:py-28',
  };

  const horizontalPadding = {
    // use slightly smaller mobile padding to avoid visual "left-packed" layout
    small: 'px-4 sm:px-8',
    medium: 'px-4 sm:px-10 lg:px-14',
    large: 'px-4 sm:px-12 lg:px-16',
  };

  return (
    <section
      id={id}
      className={`w-full ${className}`}
      style={{
        background: bgColors[background],
      }}
    >
      <div
        className={`mx-auto w-full max-w-screen-2xl leading-relaxed flow ${verticalPadding[padding]} ${horizontalPadding[padding]} ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
