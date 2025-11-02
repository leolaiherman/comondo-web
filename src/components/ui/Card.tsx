import React, { ReactNode } from 'react';
import { colors, shadows, borderRadius, transitions } from '@/styles/designSystem';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  variant?: 'solid' | 'glass';
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'medium',
  onClick,
  variant = 'solid',
}: CardProps) {
  const paddingMap = {
    small: '1rem',      // 16px
    medium: '1.5rem',   // 24px
    large: '2rem',      // 32px
  };

  const baseStyle: React.CSSProperties = {
    borderRadius: borderRadius.xl,
    padding: paddingMap[padding],
    transition: `all ${transitions.duration.medium} ${transitions.easing.smooth}`,
    border: `1px solid ${variant === 'glass' ? 'rgba(255,255,255,0.35)' : colors.neutral.gray100}`,
    background: variant === 'glass' ? 'rgba(255,255,255,0.22)' : colors.neutral.white,
    boxShadow: variant === 'glass' ? '0 8px 24px rgba(12,77,56,0.08)' : shadows.card,
    backdropFilter: variant === 'glass' ? 'blur(10px)' as any : undefined,
    WebkitBackdropFilter: variant === 'glass' ? 'blur(10px)' as any : undefined,
  };

  return (
    <div
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = variant === 'glass' ? '0 12px 32px rgba(12,77,56,0.12)' : shadows.cardHover;
          e.currentTarget.style.transform = 'translateY(-4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = baseStyle.boxShadow || shadows.card;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}
