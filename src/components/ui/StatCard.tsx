import React from 'react';
import { colors, typography } from '@/styles/designSystem';

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
  trend?: 'up' | 'down';
  highlight?: boolean;
}

export default function StatCard({ value, label, icon, trend, highlight = false }: StatCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center gap-3 md:gap-4 p-5 md:p-7 rounded-2xl bg-white"
      style={{
        background: highlight ? colors.accent.coconutWhite : colors.neutral.white,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {icon && (
        <div className="text-3xl md:text-4xl mb-1">
          {icon}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div
          className="text-3xl md:text-4xl font-bold leading-tight"
          style={{
            color: highlight ? colors.primary.forest : colors.neutral.black,
          }}
        >
          {value}
        </div>
        {trend && (
          <span className={`text-xl ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '↗' : '↘'}
          </span>
        )}
      </div>
      <div
        className="text-xs md:text-sm font-medium leading-snug"
        style={{
          color: colors.neutral.gray700,
        }}
      >
        {label}
      </div>
    </div>
  );
}
