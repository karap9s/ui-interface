'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutClientProps {
  children: ReactNode;
  header: ReactNode;
}

export default function LayoutClient({ children, header }: LayoutClientProps) {
  const pathname = usePathname();

  const validRoutes = ['/', '/pages', '/products', '/price-plans'];

  const isErrorPage =
    pathname.includes('/error') ||
    !validRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
    );

  if (isErrorPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        {header}
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
