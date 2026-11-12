'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { PhoneIcon } from './Icons';
import QuickFab from './QuickFab';
import { NAV_LINKS, SITE, type NavKey } from '@/lib/site';

/** Routes whose hero is dark — the nav starts transparent with light text on these. */
const DARK_HERO = (p: string) => p === '/' || p.startsWith('/battery-storage') || p.startsWith('/areas/');

function currentKey(p: string): NavKey {
  if (p.startsWith('/battery-storage')) return 'battery';
  if (p.startsWith('/projects')) return 'projects';
  return '';
}

export default function SiteNav() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const onDark = DARK_HERO(pathname);
  const cur = currentKey(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const solid = scrolled || menu;
  const lightText = onDark && !solid;
  const cls = ['site-header', onDark && 'on-dark', solid && 'is-solid', scrolled && 'is-scrolled', menu && 'is-menu'].filter(Boolean).join(' ');

  return (
    <>
      <header className={cls}>
        <nav aria-label="Main" className="nav container">
          <Link href="/" aria-label="Voltek Solar home" className="nav__brand">
            <Logo size={38} tone={lightText ? 'onDark' : 'onLight'} />
          </Link>
          <ul className="nav__links">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} aria-current={l.key && l.key === cur ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__actions">
            <a href={SITE.phoneHref} className="nav__phone">{SITE.phoneDisplay}</a>
            <Link href="/book-a-survey" className="nav__cta">Book Free Survey</Link>
            <button type="button" className="burger" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
              <span />
              <span />
            </button>
          </div>
        </nav>
        {menu && (
          <div id="mobile-menu" className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="mm-link" onClick={() => setMenu(false)}>
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
            <div className="mm-foot">
              <Link href="/book-a-survey" className="btn btn--gold btn--block" onClick={() => setMenu(false)}>Book a Free Survey →</Link>
              <a href={SITE.phoneHref} className="btn btn--ghost-dark btn--block">
                <PhoneIcon /> Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </header>
      <QuickFab />
    </>
  );
}
