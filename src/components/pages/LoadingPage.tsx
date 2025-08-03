import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Flex direction="column" align="center" gap="4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        <Text size="3" className="text-gray-600">
          Loading...
        </Text>
      </Flex>
    </div>
  );
} 