import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';

export default function CtaBand({ title, text, href = '/book-a-survey', showCall = true }: { title: ReactNode; text?: string; href?: string; showCall?: boolean }) {
  return (
    <section className="cta-band bg-dark" aria-labelledby="cta-h">
      <div className="cta-band__glow" aria-hidden="true" />
      <div className="cta-band__inner" data-reveal="">
        <h2 id="cta-h" className="h2 h2--xl">{title}</h2>
        {text && <p>{text}</p>}
        <div className="btn-row">
          <Link href={href} className="btn btn--gold">
            Book a Free Survey <span aria-hidden="true">→</span>
          </Link>
          {showCall && (
            <a href={SITE.phoneHref} className="btn btn--ghost-light">
              Call {SITE.phoneDisplay}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
