'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Flex, Text, Heading } from '@radix-ui/themes';
import { HomeIcon, ArrowLeftIcon } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <Text size="9" weight="bold" className="text-gray-400 block">
            404
          </Text>
          <Heading size="6" className="text-gray-900 mt-2 mb-4">
            Page Not Found
          </Heading>
          <Text size="3" className="text-gray-600">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </Text>
        </div>

        <Flex direction="column" gap="3" className="w-full">
          <Link href="/" className="w-full">
            <Button className="w-full hover:cursor-pointer" size="3">
              <HomeIcon className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          
          <Button 
            variant="soft" 
            color="gray" 
            className="w-full hover:cursor-pointer"
            size="3"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Go Back
          </Button>
        </Flex>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Text size="2" className="text-gray-500">
            If the problem persists, please contact support
          </Text>
        </div>
      </div>
    </div>
  );
} 