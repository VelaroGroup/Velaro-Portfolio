import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { site, siteUrl } from '@/lib/site';
import './design-system.css';
import './previews.css';
import './services.css';
import './secondary.css';

const inter = localFont({ src: '../public/fonts/inter-latin.woff2', variable: '--font-body', weight: '100 900', display: 'swap' });

export const viewport: Viewport = { themeColor: '#0a1628' };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Velaro | Custom Platforms & Business Automation', template: '%s | Velaro' },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: site.name, title: 'Velaro | Less busywork. More possibility.',
    description: site.description, url: siteUrl,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: {
    icon: { url: '/velaro-mark.png', type: 'image/png', sizes: '680x680' },
    apple: { url: '/velaro-mark.png', type: 'image/png', sizes: '680x680' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization', name: site.name,
    url: siteUrl, logo: `${siteUrl}/velaro-mark.png`, email: site.email, description: site.description,
  };
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
