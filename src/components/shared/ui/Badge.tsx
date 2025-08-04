import React, { FC, JSX, memo } from 'react';
import { Badge as RadixBadge } from '@radix-ui/themes';

interface BadgeProps {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
  variant?: 'solid' | 'soft' | 'surface' | 'outline';
  highContrast?: boolean;
}

const Badge: FC<BadgeProps> = memo(
  ({
    value,
    trueLabel = 'Active',
    falseLabel = 'Inactive',
    variant = 'soft',
  }): JSX.Element => {
    return (
      <RadixBadge color={value ? 'green' : 'red'} variant={variant} size="3">
        {value ? trueLabel : falseLabel}
      </RadixBadge>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
