'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PhoneIcon } from './Icons';
import { SITE } from '@/lib/site';

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l1.4-4.2A8 8 0 1 1 8.5 19z" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </svg>
  );
}

/** Mobile-only floating round button that fans out Call / WhatsApp / Book Survey. */
export default function QuickFab() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (pathname.startsWith('/book-a-survey')) return null;

  return (
    <div ref={ref} className={`fab${open ? ' is-open' : ''}`}>
      <nav id="fab-menu" aria-label="Quick actions" className="fab__menu" aria-hidden={!open}>
        <Link href="/book-a-survey" className="fab__item fab__item--gold" tabIndex={open ? 0 : -1} style={{ ['--i' as string]: 0 }}>
          <span>Book Survey</span>
          <i><CalIcon /></i>
        </Link>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="fab__item" tabIndex={open ? 0 : -1} style={{ ['--i' as string]: 1 }}>
          <span>WhatsApp</span>
          <i><ChatIcon /></i>
        </a>
        <a href={SITE.phoneHref} className="fab__item" tabIndex={open ? 0 : -1} style={{ ['--i' as string]: 2 }}>
          <span>Call us</span>
          <i><PhoneIcon /></i>
        </a>
      </nav>
      <button type="button" className="fab__btn" aria-label={open ? 'Close quick actions' : 'Open quick actions'} aria-expanded={open} aria-controls="fab-menu" onClick={() => setOpen((o) => !o)}>
        <span className="fab__ico fab__ico--a"><PhoneIcon size={22} /></span>
        <span className="fab__ico fab__ico--b" aria-hidden="true">×</span>
      </button>
    </div>
  );
}
