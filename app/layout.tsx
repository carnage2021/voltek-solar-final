import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import { SITE } from '@/lib/site';

const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter-tight',
  display: 'swap',
});
const mono = localFont({
  src: [
    { path: '../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', weight: '500' },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Solar Panels East Kent | Solar, Battery & EV Chargers | Voltek Solar',
    template: '%s | Voltek Solar',
  },
  description:
    'MCS-certified solar panel, battery storage and EV charger installation across East Kent — Margate, Ramsgate, Broadstairs, Canterbury, Herne Bay, Whitstable, Deal, Dover, Sandwich and Folkestone. Book a free solar survey.',
  openGraph: {
    type: 'website',
    siteName: 'Voltek Solar',
    locale: 'en_GB',
    title: 'Voltek Solar — Solar, Battery & EV Charger Installers in East Kent',
    description: 'Turn your roof into your own power station. Book a free solar survey.',
    images: [{ url: '/og-image.png', width: 1686, height: 728, alt: 'Voltek Solar' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#2B2724',
  width: 'device-width',
  initialScale: 1,
};

/* Runs before paint: enables reveal animations only when JS is on. */
const prePaint = `document.documentElement.classList.add('js');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
