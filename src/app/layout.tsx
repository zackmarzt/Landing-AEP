import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Roboto, Space_Grotesk } from 'next/font/google';
import CookieBanner from '@/components/landing/cookie-banner';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'AEP',
  description: 'Um MVP para a AEP. Feito por Zack Marzinkowski',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${roboto.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        {children}
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}
