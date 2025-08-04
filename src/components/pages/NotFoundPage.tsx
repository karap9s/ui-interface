'use client';

import React from 'react';
import { Text, Heading } from '@radix-ui/themes';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto text-center px-4">
        <div className="flex flex-col gap-5">
          <Text size="9" weight="bold" className="text-gray-400 block">
            404
          </Text>
          <Heading size="6" className="text-gray-900">
            Page Not Found
          </Heading>
        </div>
      </div>
    </div>
  );
}
