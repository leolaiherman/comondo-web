import React, { ReactNode } from 'react';
import Link from 'next/link';
import { colors, borderRadius, shadows, transitions, typography } from '@/styles/designSystem';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const variants = {
    primary: {
      background: colors.primary.forest,
      color: colors.neutral.white,
      border: 'none',
      hoverBg: colors.primary.forestDark,
      hoverColor: colors.neutral.white,
      shadow: '0 10px 24px rgba(12,77,56,0.22)',
      hoverShadow: '0 14px 28px rgba(12,77,56,0.28)',
    },
    secondary: {
      background: colors.secondary.orange,
      color: colors.neutral.white,
      border: 'none',
      hoverBg: colors.secondary.orangeDark,
      hoverColor: colors.neutral.white,
      shadow: '0 10px 24px rgba(226,134,29,0.22)',
      hoverShadow: '0 14px 28px rgba(226,134,29,0.28)',
    },
    outline: {
      background: 'transparent',
      color: colors.primary.forest,
      border: `2px solid ${colors.primary.forest}`,
      hoverBg: colors.primary.forest,
      hoverColor: colors.neutral.white,
      shadow: 'none',
      hoverShadow: shadows.md,
    },
    ghost: {
      background: 'transparent',
      color: colors.primary.forest,
      border: 'none',
      hoverBg: colors.neutral.gray50,
      hoverColor: colors.primary.forest,
      shadow: 'none',
      hoverShadow: 'none',
    },
    glass: {
      background: 'rgba(255,255,255,0.2)',
      color: colors.primary.forest,
      border: '1px solid rgba(255,255,255,0.45)',
      hoverBg: 'rgba(255,255,255,0.28)',
      hoverColor: colors.primary.forest,
      shadow: '0 8px 20px rgba(12,77,56,0.10)',
      hoverShadow: '0 10px 24px rgba(12,77,56,0.14)',
    },
  } as const;

  const sizes = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem', // 14px
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem', // 16px
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.125rem', // 18px
    },
  };

  const style = variants[variant];
  const sizeStyle = sizes[size];

  const buttonStyle = {
    background: style.background,
    color: style.color,
    border: style.border,
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: typography.weights.semibold,
    borderRadius: 9999,
    boxShadow: style.shadow,
    transition: `all ${transitions.duration.medium} ${transitions.easing.smooth}`,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    backdropFilter: variant === 'glass' ? ('blur(10px)' as any) : undefined,
    WebkitBackdropFilter: variant === 'glass' ? ('blur(10px)' as any) : undefined,
  } as React.CSSProperties;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = style.hoverBg;
    if (style.hoverColor) e.currentTarget.style.color = style.hoverColor;
    e.currentTarget.style.boxShadow = style.hoverShadow || style.shadow;
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = style.background;
    e.currentTarget.style.color = style.color;
    e.currentTarget.style.boxShadow = style.shadow;
    e.currentTarget.style.transform = 'translateY(0)';
  };

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
