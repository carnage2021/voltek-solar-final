'use client';
import Link from 'next/link';
import { useState } from 'react';
import { TOWNS } from '@/lib/site';

/* Stylised East Kent coastline in the map's 0–100 space (sea to the north and east). */
const COAST = 'M0 21 C6 20 9 19.4 11.9 19.4 C20 18 26 16.6 31.4 16.2 C40 15.4 46 15 50.9 14.7 C60 14 66 12.6 70.4 12.3 C76 12 80 14 83.7 20.1 C84 24 81 26.5 79 28.7 C77 31 75.4 33 75.1 35 C75.6 38 78 40 78.2 42.8 C78.4 46 77.6 48 77.4 50.6 C76 56 73.6 60.4 70.4 64.6 C68 68 66.6 71 64.2 74 C56 79 46 81.6 37.6 83.3 C28 85 22 86.4 15.8 88 C9 89.6 4 91 0 92';

export default function AreasMap() {
  const [on, setOn] = useState(-1);
  return (
    <div className="areas">
      <div className="stack" data-reveal="" style={{ gap: 24 }}>
        <span className="eyebrow">09 · Areas we cover</span>
        <h2 id="areas-h" className="h2">Local installers for Thanet, Canterbury &amp; Dover</h2>
        <p className="lead">Our own team covers the whole of East Kent. Pick your town to see local installs and reviews.</p>
        <ul className="town-pills">
          {TOWNS.map((t, i) => (
            <li key={t.slug}>
              <Link href={`/areas/${t.slug}`} className={`town-pill${on === i ? ' is-on' : ''}`} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(-1)} onFocus={() => setOn(i)} onBlur={() => setOn(-1)}>
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="map" data-reveal="" data-reveal-delay="150" role="img" aria-label="Map of East Kent showing the ten towns Voltek Solar covers">
        <div className="map__dots" aria-hidden="true" />
        <svg className="map__coast" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={`${COAST} Z`} fill="rgba(246,243,238,.04)" />
          <path d={COAST} fill="none" stroke="rgba(232,179,106,.35)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeDasharray="4 5" />
        </svg>
        <span className="map__label" style={{ left: 24, top: 20 }} aria-hidden="true">THAMES ESTUARY</span>
        <span className="map__label" style={{ right: 24, bottom: 20 }} aria-hidden="true">ENGLISH CHANNEL</span>
        <div className="map__pins" aria-hidden="true">
          {TOWNS.map((t, i) => (
            <Link
              key={t.slug}
              href={`/areas/${t.slug}`}
              tabIndex={-1}
              className={`pin${t.x > 78 ? ' pin--left' : ''}${on === i ? ' is-on' : ''}`}
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
              onMouseEnter={() => setOn(i)}
              onMouseLeave={() => setOn(-1)}
            >
              <i />
              <span>{t.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
