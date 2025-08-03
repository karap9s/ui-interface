'use client';

import React, { useEffect } from 'react';

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    // Log critical error
    console.error('Global application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 19.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Critical Error
          </h1>
          
          <p className="text-gray-600 mb-4">
            A serious application error occurred. Please reload the page.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-3 bg-gray-100 rounded-md text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                Error details (development only)
              </summary>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-auto">
                {error.message}
                {error.stack && `\n\nStack trace:\n${error.stack}`}
              </pre>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </details>
          )}
        </div>

        <div className="space-y-3">
          <button 
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={reset}
          >
            Try again
          </button>
          
          <button 
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </button>
          
          <button 
            className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If the problem persists, please contact an administrator
          </p>
        </div>
      </div>
    </div>
  );
} 