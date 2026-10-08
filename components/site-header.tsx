'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Brand } from './brand';
import { serviceNavigation } from '@/lib/service-navigation';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);

  function closeMenus() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    const mobileLayout = window.matchMedia('(max-width: 700px)');
    const handleLayoutChange = () => {
      setMenuOpen(false);
      setServicesOpen(false);
    };
    const handleOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    mobileLayout.addEventListener('change', handleLayoutChange);
    return () => {
      document.removeEventListener('pointerdown', handleOutside);
      mobileLayout.removeEventListener('change', handleLayoutChange);
    };
  }, []);

  return (
    <header className="site-header" ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
    }} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        const returnTarget = menuOpen ? menuButton.current : servicesButton.current;
        closeMenus();
        returnTarget?.focus();
      }
    }}>
      <div className="shell header-inner">
        <Link href="/" aria-label="Velaro home" onClick={closeMenus}><Brand /></Link>
        <Link href="/about" className="mobile-about-link" onClick={closeMenus} aria-current={pathname === '/about' ? 'page' : undefined}>About Us</Link>
        <button ref={menuButton} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => { setMenuOpen(!menuOpen); setServicesOpen(false); }}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav id="primary-navigation" className={`nav${menuOpen ? ' nav-open' : ''}`} aria-label="Primary navigation">
          <Link href="/about" className="nav-about" onClick={closeMenus} aria-current={pathname === '/about' ? 'page' : undefined}>About Us</Link>
          <div className="nav-services">
            <button ref={servicesButton} type="button" className={`nav-service-trigger${pathname.startsWith('/services/') ? ' current' : ''}`} aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen(!servicesOpen)}>
              Services <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div id="services-menu" className="nav-dropdown" hidden={!servicesOpen}>
              <span className="nav-dropdown-label">Built around your business</span>
              {serviceNavigation.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenus} aria-current={pathname === `/services/${service.slug}` ? 'page' : undefined}>
                  <span>{service.name}</span><ArrowRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <Link href="/work" onClick={closeMenus} aria-current={pathname.startsWith('/work') ? 'page' : undefined}>Work</Link>
          <Link href="/contact" className="button button-primary nav-cta" onClick={closeMenus}>Let’s talk <ArrowRight size={17} aria-hidden="true" /></Link>
        </nav>
      </div>
    </header>
  );
}
