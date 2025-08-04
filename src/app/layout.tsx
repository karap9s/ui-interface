import './globals.css';
import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import Header from '@/src/components/widgets/Header/ui/Header';
import LayoutClient from '@/src/components/pages/LayoutClient';

export const metadata: Metadata = {
  title: 'Ui-Interface',
  description: 'Test app for Systeme.io',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Theme>
          <LayoutClient header={<Header />}>{children}</LayoutClient>
        </Theme>
      </body>
    </html>
  );
}
