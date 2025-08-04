'use client';

import React from 'react';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { RefreshCwIcon, AlertTriangleIcon } from 'lucide-react';

interface GlobalErrorPageProps {
  reset: () => void;
}

export default function GlobalErrorPage({ reset }: GlobalErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangleIcon className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <Heading size="6" className="text-gray-900 mb-4">
            Something went wrong
          </Heading>
        </div>

        <Flex direction="column" gap="3" className="w-full">
          <Button
            className="w-full hover:cursor-pointer"
            size="3"
            onClick={reset}
          >
            <RefreshCwIcon className="w-4 h-4" />
            Try again
          </Button>
        </Flex>
      </div>
    </div>
  );
}
