'use client';
import Link from 'next/link';
import { useState } from 'react';
import { services } from '@/lib/content';
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="brand" aria-label="Velaro home" onClick={() => setOpen(false)}><span className="brand-icon"><img src="/velaro-logo.png" alt="" /></span><span>VELARO<span className="brand-period">.</span></span></Link>
    <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span/><span/></button>
    <nav id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label="Primary navigation"><div className="nav-services"><Link href="/#services" onClick={() => setOpen(false)}>Services</Link><div className="nav-dropdown">{services.map(s=><Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)}>{s.name}</Link>)}</div></div><Link href="/work" onClick={() => setOpen(false)}>Work</Link><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Start a project <span aria-hidden="true">↗</span></Link></nav>
  </div></header>;
}
