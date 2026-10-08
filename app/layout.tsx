import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { JsonLd } from '@/components/json-ld';
import { site, siteUrl } from '@/lib/site';
import { organizationSchema } from '@/lib/structured-data';
import './design-system.css';
import './previews.css';
import './services.css';
import './secondary.css';
import './home.css';
import './about-navigation.css';
import './workflow-explorer.css';

const inter = localFont({ src: '../public/fonts/inter-latin.woff2', variable: '--font-body', weight: '100 900', display: 'swap' });

export const viewport: Viewport = { themeColor: '#0a1628' };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Velaro | Websites, E-commerce, Automation & Custom Platforms', template: '%s | Velaro' },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: site.name, title: 'Velaro | Digital solutions. Built around you.',
    description: site.description, url: siteUrl,
  },
  twitter: { card: 'summary_large_image' },
  other: { 'velaro-release': process.env.VELARO_RELEASE_SHA || 'local' },
  robots: process.env.SITE_NOINDEX === '1'
    ? { index: false, follow: false }
    : { index: true, follow: true, 'max-image-preview': 'large' },
  icons: {
    icon: { url: '/velaro-mark.png', type: 'image/png', sizes: '680x680' },
    apple: { url: '/velaro-mark.png', type: 'image/png', sizes: '680x680' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  );
}
