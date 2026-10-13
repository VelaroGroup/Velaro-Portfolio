import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './brand';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-intro">
            <Link href="/" aria-label="Velaro home"><Brand /></Link>
            <p>A digital studio for custom platforms, business automation, websites and e-commerce.</p>
          </div>
          <div><h2>What we do</h2>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}</div>
          <div><h2>Explore</h2><Link href="/work">Our work</Link><Link href="/about">About Velaro</Link><Link href="/contact">Start a conversation</Link><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of service</Link></div>
          <div className="footer-contact"><h2>Say hello</h2><a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={16} aria-hidden="true" /></a><p>{site.region}</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Velaro. All rights reserved.</span><span>Built around your business.</span></div>
      </div>
    </footer>
  );
}
