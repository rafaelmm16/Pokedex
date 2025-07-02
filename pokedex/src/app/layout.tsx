"use client";

import '../app/globals.css';
import SideMenu from '../components/SideMenu'; // Importe o SideMenu

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground font-sans transition-colors duration-500">
        <div className="flex">
          <SideMenu />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}