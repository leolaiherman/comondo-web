import React from 'react';
import { colors, typography, borderRadius, shadows } from '@/styles/designSystem';
import Card from './Card';

interface IconCardProps {
  icon: string;
  title: string;
  description: string;
  hover?: boolean;
}

export default function IconCard({ icon, title, description, hover = true }: IconCardProps) {
  return (
    <Card hover={hover} padding="large" className="h-full">
      <div className="flex flex-col items-center text-center gap-4 md:gap-5">
        <div className="text-4xl md:text-5xl mb-1">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: colors.neutral.black, margin: 0 }}>
          {title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.neutral.gray700, margin: 0 }}>
          {description}
        </p>
      </div>
    </Card>
  );
}
