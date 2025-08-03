'use client';

import GlobalErrorPage from '@/src/components/pages/GlobalErrorPage';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <GlobalErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
} 