import React from 'react';
import { colors } from '@/styles/designSystem';

interface SDGBadgeProps {
  goal: number;
  title: string;
  description?: string;
}

export default function SDGBadge({ goal, title, description }: SDGBadgeProps) {
  // Build the expected public asset path for the SDG logo. Files in `public/` are named like `sdg2logo.jpg`.
  const imgSrc = `/sdg${goal}logo.jpg`;

  return (
    // Use a fixed width per badge so titles wrap consistently and heights align across the row.
    <div className={description ? 'flex gap-4 md:gap-5 items-start w-full md:max-w-xs' : 'flex flex-col items-center gap-3 w-36 md:w-48'}>
      <div className="w-14 h-14 md:w-24 md:h-24 flex items-center justify-center flex-shrink-0 rounded-lg shadow-sm overflow-hidden bg-white">
        {/* Use the public image for the SDG logo. If the file is missing, the image will show broken state — adjust file names/extensions in `public/` if needed. */}
        <img
          src={imgSrc}
          alt={`SDG ${goal} logo - ${title}`}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      <div className={description ? 'flex flex-col gap-2 md:gap-3' : 'w-full'}>
        <h4 className="text-sm md:text-base font-semibold text-center leading-tight whitespace-normal break-words" style={{ color: colors.neutral.black, margin: 0 }}>
          {title}
        </h4>
        {description && (
          <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.neutral.gray700, margin: 0 }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
