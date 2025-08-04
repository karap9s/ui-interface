'use client';

import ErrorPage from '@/src/components/pages/ErrorPage';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorPage reset={reset} />;
}
