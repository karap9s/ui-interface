'use client';

import React, { useEffect } from 'react';
import { Button, Flex, Text, Heading } from '@radix-ui/themes';
import { RefreshCwIcon, HomeIcon, AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          
          <Text size="3" className="text-gray-600 mb-2">
            An unexpected error occurred. We&apos;re already working on fixing it.
          </Text>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-3 bg-gray-100 rounded-md text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                Error details (development only)
              </summary>
              <Text size="1" className="text-gray-600 font-mono whitespace-pre-wrap">
                {error.message}
              </Text>
              {error.digest && (
                <Text size="1" className="text-gray-500 mt-2 block">
                  Digest: {error.digest}
                </Text>
              )}
            </details>
          )}
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
          
          <Link href="/" className="w-full">
            <Button 
              variant="soft" 
              color="gray" 
              className="w-full hover:cursor-pointer"
              size="3"
            >
              <HomeIcon className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </Flex>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Text size="2" className="text-gray-500">
            If the error persists, please contact technical support
          </Text>
        </div>
      </div>
    </div>
  );
} 