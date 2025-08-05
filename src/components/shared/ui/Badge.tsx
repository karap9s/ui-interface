import React, { FC, JSX, memo } from 'react';
import { Badge as RadixBadge } from '@radix-ui/themes';

interface BadgeProps {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
  variant?: 'solid' | 'soft' | 'surface' | 'outline';
  highContrast?: boolean;
  size?: '1' | '2' | '3';
}

const Badge: FC<BadgeProps> = memo(
  ({
    value,
    trueLabel = 'Active',
    falseLabel = 'Inactive',
    variant = 'soft',
    size = '2',
  }): JSX.Element => {
    return (
      <RadixBadge
        color={value ? 'green' : 'red'}
        variant={variant}
        size={size}
        className={`${
          value
            ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900 text-emerald-800 border-emerald-200 dark:text-emerald-500 dark:border-emerald-800'
            : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 text-red-800 border-red-200 dark:text-red-100 dark:border-red-800'
        } font-medium shadow-sm text-xs sm:text-sm`}
      >
        {value ? trueLabel : falseLabel}
      </RadixBadge>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
