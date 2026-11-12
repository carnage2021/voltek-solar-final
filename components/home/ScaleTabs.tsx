'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IMG } from '@/lib/site';

const TABS = [
  { label: 'Homes', tag: 'Most popular', d: 'Rooftop solar sized to your household, with optional battery and EV charger.', size: '3.5–6 kWp', save: '£900/yr', time: '1–2 days', warr: '25 years', img: IMG.ukRoof, alt: 'Tiled family home roof fitted with solar panels', service: 'solar' },
  { label: 'Battery Add-on', tag: 'Existing solar', d: 'Add storage to panels you already have and use more of what they generate.', size: '5–13.5 kWh', save: '£450/yr', time: '1 day', warr: '10 years', img: IMG.homeDusk, alt: 'Home at dusk with warm lights on', service: 'battery' },
  { label: 'EV Charging', tag: 'Smart charging', d: 'A home charger that can prioritise surplus solar or off-peak rates.', size: '7 kW', save: '£600/yr', time: '3–4 hours', warr: '3 years', img: IMG.ev, alt: 'Electric car plugged in and charging', service: 'ev' },
  { label: 'Commercial', tag: 'Business', d: 'Cut daytime running costs for offices, warehouses, schools and retail.', size: '30–250 kWp', save: '£8,500/yr', time: '1–3 weeks', warr: '25 years', img: IMG.commercialRoof, alt: 'Commercial building with a large solar array', service: 'commercial' },
  { label: 'Farms', tag: 'Agriculture', d: 'Barn roofs and ground-mount systems for farms across rural Kent.', size: '50–500 kWp', save: '£12,000/yr', time: '2–4 weeks', warr: '25 years', img: IMG.solarFarm, alt: 'Aerial view of ground-mounted solar rows in farmland', service: 'commercial' },
];

export default function ScaleTabs() {
  const [tab, setTab] = useState(0);
  const cur = TABS[tab];
  return (
    <div className="scale">
      <div role="tablist" aria-label="System types" className="scale__tabs">
        {TABS.map((t, i) => (
          <button key={t.label} type="button" role="tab" id={`tab-${i}`} aria-selected={tab === i} aria-controls="scale-panel" className="scale__tab" onClick={() => setTab(i)}>
            <span>{t.label}</span>
            <span className="arr" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" id="scale-panel" aria-labelledby={`tab-${tab}`} className="scale__panel">
        <div className="scale__img">
          {TABS.map((t, i) => (
            <div key={t.label} className={tab === i ? 'is-on' : ''} aria-hidden={tab !== i}>
              <Image src={t.img} alt={t.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            </div>
          ))}
        </div>
        <div className="scale__card">
          <div key={tab} className="stack fade-swap" style={{ gap: 12 }}>
            <span className="badge-lime" style={{ alignSelf: 'flex-start' }}>{cur.tag}</span>
            <h3>{cur.label}</h3>
            <p>{cur.d}</p>
          </div>
          <dl className="spec">
            <div><dt>Typical system</dt><dd className="gold">{cur.size}</dd></div>
            <div><dt>Typical saving</dt><dd className="gold">{cur.save}</dd></div>
            <div><dt>Install time</dt><dd>{cur.time}</dd></div>
            <div><dt>Warranty</dt><dd>{cur.warr}</dd></div>
          </dl>
          <Link href={`/book-a-survey?service=${cur.service}`} className="btn btn--light btn--sm btn--block">Book a Free Survey</Link>
        </div>
      </div>
    </div>
  );
}
