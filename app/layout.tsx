'use client';

import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
