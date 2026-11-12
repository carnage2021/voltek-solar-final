'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { GoogleG } from '../Icons';
import { AVATARS, REVIEWS, SITE } from '@/lib/site';

export default function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);
  const by = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('blockquote');
    const w = card ? card.getBoundingClientRect().width + 16 : 436;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section className="bg-sunset" aria-labelledby="rev-h">
      <div className="container sec-head" style={{ paddingTop: 'clamp(40px,5vw,60px)', marginBottom: 32 }}>
        <div className="stack" data-reveal="">
          <span className="eyebrow">08 · Reviews</span>
          <h2 id="rev-h" className="h2">What Our Customers Say</h2>
          <span className="g-inline">
            <i><GoogleG size={16} /></i>
            Google Reviews · <strong>{SITE.googleRating}</strong> from {SITE.googleReviews} reviews
          </span>
        </div>
        <div className="rev-nav">
          <button type="button" className="round-btn" aria-label="Previous review" onClick={() => by(-1)}>←</button>
          <button type="button" className="round-btn round-btn--dark" aria-label="Next review" onClick={() => by(1)}>→</button>
        </div>
      </div>
      <div className="rev-scroller" ref={scroller} tabIndex={0} aria-label="Customer reviews">
        <div className="rev-track">
          {REVIEWS.map((r, i) => (
            <blockquote key={r.name} className={`review${i % 2 === 1 ? ' review--dark' : ''}`}>
              <div className="stack">
                <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
                <p>“{r.text}”</p>
              </div>
              <footer>
                <div className="avatar">
                  <Image src={AVATARS[i % AVATARS.length]} alt="" fill sizes="52px" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <cite>{r.name}</cite>
                  <span className="meta">{r.town} · {r.sys}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
