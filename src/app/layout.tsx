import './globals.css';
import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';

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
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
