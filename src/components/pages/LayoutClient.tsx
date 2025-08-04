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
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {header}
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}
