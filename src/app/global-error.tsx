'use client';

import GlobalErrorPage from '@/src/components/pages/GlobalErrorPage';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <GlobalErrorPage reset={reset} />
      </body>
    </html>
  );
}
