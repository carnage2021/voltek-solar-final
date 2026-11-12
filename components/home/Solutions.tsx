'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Icon, type IconName } from '../Icons';

const SOLS: { t: string; d: string; icon: IconName; href: string }[] = [
  { t: 'Residential Solar', d: 'Panels designed around your roof, usage and budget.', icon: 'panel', href: '/book-a-survey?service=solar' },
  { t: 'Battery Storage', d: 'Keep daytime solar for evenings and cheap-rate charging.', icon: 'battery', href: '/battery-storage' },
  { t: 'EV Chargers', d: 'Smart home chargers that can run on your own solar.', icon: 'ev', href: '/#scale' },
  { t: 'Commercial Solar', d: 'Farms, warehouses, schools and retail rooftops.', icon: 'commercial', href: '/#scale' },
  { t: 'Maintenance & Repairs', d: 'Health checks, cleaning, fault-finding and inverter swaps.', icon: 'repair', href: '/book-a-survey?service=repair' },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <div className="sol-grid">
      {SOLS.map((s, i) => (
        <article key={s.t} data-reveal="" data-reveal-delay={String(i * 80)} onMouseEnter={() => setActive(i)}>
          <Link href={s.href} className={`sol-card${active === i ? ' is-active' : ''}`} onFocus={() => setActive(i)} style={{ height: '100%' }}>
            <div className="sol-card__icon">
              <Icon name={s.icon} color="#2B2724" />
            </div>
            <div className="sol-card__body">
              <span className="num">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <span className="more">
                Explore <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
