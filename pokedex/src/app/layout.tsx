"use client";

import '../app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground font-sans transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}