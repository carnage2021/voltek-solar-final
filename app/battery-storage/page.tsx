import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd, { faqSchema } from '@/components/JsonLd';
import DayCycle from '@/components/battery/DayCycle';
import BatteryArt from '@/components/battery/BatteryArt';
import { IMG, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Solar Battery Storage East Kent | Battery Add-on Installers',
  description: 'Home battery storage and battery add-ons for existing solar across East Kent. MCS-certified installers in Thanet, Canterbury and Dover. Book a free survey.',
  alternates: { canonical: '/battery-storage' },
  openGraph: { title: 'Battery Storage — Voltek Solar, East Kent', description: 'Use more of your own solar. Battery storage and add-ons, installed locally.' },
};

const BENEFITS: [string, string][] = [
  ['Use more of your solar', 'Store surplus daytime generation instead of exporting it for less.'],
  ['Charge on cheap rates', 'Top up overnight on an off-peak tariff and avoid peak prices.'],
  ['Add to existing panels', 'Most existing solar systems can take a battery with an AC-coupled install.'],
  ['Backup options', 'Some systems can keep essential circuits running during a power cut.'],
];

const PRODUCTS: { t: string; d: string; cap: string; warr: string; pop: boolean }[] = [
  { t: 'Compact', d: 'Slim wall-mounted battery for smaller homes and simple add-ons to existing panels.', cap: '5 kWh', warr: '10 years', pop: false },
  { t: 'Modular', d: 'Stackable system that grows with your household — add modules as your needs change.', cap: '5–15 kWh', warr: '10 years', pop: true },
  { t: 'Hybrid + Backup', d: 'Hybrid inverter and battery in one system, with an optional whole-home backup gateway.', cap: '13.5 kWh', warr: '12 years', pop: false },
];

const PRICES: [string, string, string][] = [
  ['Battery add-on', '5 kWh', '£3,400'],
  ['Battery add-on · large', '10 kWh', '£5,200'],
  ['Solar + battery', '4 kWp + 5 kWh', '£9,200'],
  ['Backup gateway', 'Add-on', '£650'],
];

const STEPS: [string, string][] = [
  ['Free survey', 'We check your existing system, consumer unit and usage.'],
  ['Battery design', 'We size the battery to your evening demand and tariff.'],
  ['Fixed quote', 'One clear price, no pressure to decide on the day.'],
  ['Installation', 'Usually completed in a single day by our own engineers.'],
  ['Set-up & app', 'We configure your tariff settings and show you the app.'],
];

const FAQS: [string, string][] = [
  ['Can I add a battery to my existing solar panels?', 'In most cases, yes. An AC-coupled battery works alongside your current inverter. We check compatibility during the survey.'],
  ['What size battery do I need?', 'It depends on how much electricity you use in the evening and overnight. We size it from your bills and, where available, smart meter data.'],
  ['Will a battery work in a power cut?', 'Only if it is installed with a backup or EPS function. Standard setups switch off for safety during a grid outage.'],
  ['Do I need to tell my network operator?', 'Yes, and we handle this for you as part of the installation.'],
  ['How long do batteries last?', 'Most come with 10–12-year warranties and are designed for 6,000+ charge cycles. Warranty details are confirmed in your quote.'],
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Service', name: 'Solar battery storage installation', serviceType: 'Battery storage', provider: { '@type': 'ElectricalContractor', name: SITE.name }, areaServed: 'East Kent' },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url }, { '@type': 'ListItem', position: 2, name: 'Battery Storage' }] },
  ],
};

export default function BatteryPage() {
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(FAQS)} />

      <section className="page-hero" aria-labelledby="h1">
        <div className="page-hero__img">
          <Image src={IMG.homeDusk} alt="Modern home glowing with warm evening lights" fill priority sizes="100vw" style={{ objectPosition: '60% 50%' }} />
        </div>
        <div className="page-hero__shade" aria-hidden="true" />
        <div className="container page-hero__content">
          <nav aria-label="Breadcrumb" className="crumbs" data-reveal="">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Battery Storage</span>
          </nav>
          <h1 id="h1" className="h1" data-reveal="" data-reveal-delay="100" style={{ maxWidth: 880 }}>
            Keep your sunshine <span className="grad">for the evening</span>
          </h1>
          <p className="hero-lead" data-reveal="" data-reveal-delay="220">
            Battery storage for new solar systems, or as an add-on to panels you already have. Installed by our own team across East Kent.
          </p>
          <div className="btn-row" data-reveal="" data-reveal-delay="320">
            <Link href="/book-a-survey?service=battery" className="btn btn--gold">Book a Free Survey →</Link>
            <a href="#pricing" className="btn btn--ghost-light">See pricing guide</a>
          </div>
          <div className="btn-row" data-reveal="" data-reveal-delay="420" style={{ gap: 8, marginTop: 8 }}>
            <span className="chip"><span className="dot-lime" style={{ width: 7, height: 7, boxShadow: 'none' }} />Works with most existing solar</span>
            <span className="chip">Off-peak tariff ready</span>
            <span className="chip">Optional backup power</span>
          </div>
        </div>
      </section>

      <section className="bg-cream" aria-labelledby="ben-h">
        <div className="container section-pad">
          <div className="stack" data-reveal="" style={{ marginBottom: 56, maxWidth: 820 }}>
            <span className="eyebrow">01 · Benefits</span>
            <h2 id="ben-h" className="h2">Why add a battery?</h2>
          </div>
          <div className="grid-auto">
            {BENEFITS.map(([t, d], i) => (
              <article key={t} className={`num-card${i % 2 === 1 ? ' num-card--dark' : ''}`} data-reveal="" data-reveal-delay={String(i * 80)}>
                <span className="big">0{i + 1}</span>
                <div className="stack" style={{ gap: 12 }}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark" aria-labelledby="how-h">
        <div className="container section-pad">
          <DayCycle />
        </div>
      </section>

      <section className="bg-stone" aria-labelledby="prod-h">
        <div className="container section-pad">
          <div className="stack" data-reveal="" style={{ marginBottom: 48, maxWidth: 760 }}>
            <span className="eyebrow">03 · Product options</span>
            <h2 id="prod-h" className="h2">Batteries we install</h2>
          </div>
          <div className="grid-3">
            {PRODUCTS.map((p, i) => (
              <article key={p.t} className={`product${i === 1 ? ' product--dark' : ''}`} data-reveal="" data-reveal-delay={String(i * 90)}>
                <div className="product__img">
                  <BatteryArt variant={i as 0 | 1 | 2} dark={i === 1} />
                </div>
                <div className="product__body">
                  <div className="row">
                    <h3>{p.t}</h3>
                    {p.pop && <span className="badge-lime">Most chosen</span>}
                  </div>
                  <p>{p.d}</p>
                  <dl>
                    <div><dt>Capacity</dt><dd>{p.cap}</dd></div>
                    <div><dt>Warranty</dt><dd>{p.warr}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ background: 'linear-gradient(180deg,#EEEBE6,#F4E3D0)' }} aria-labelledby="price-h">
        <div className="container price-split" style={{ paddingBottom: 'clamp(80px,10vw,140px)' }}>
          <div className="stack" data-reveal="">
            <span className="eyebrow">04 · Pricing guide</span>
            <h2 id="price-h" className="h2">Clear prices, fixed after your survey</h2>
            <p className="lead">Guide prices include supply, installation, commissioning and paperwork. Your exact price depends on your consumer unit, location and chosen battery.</p>
          </div>
          <div className="price-card" data-reveal="" data-reveal-delay="120">
            <table>
              <caption>Guide prices · 0% VAT on residential batteries</caption>
              <thead>
                <tr><th scope="col">Package</th><th scope="col">Typical size</th><th scope="col" className="from">From</th></tr>
              </thead>
              <tbody>
                {PRICES.map(([p, s, f]) => (
                  <tr key={p}><th scope="row">{p}</th><td>{s}</td><td className="from">{f}</td></tr>
                ))}
              </tbody>
            </table>
            <Link href="/book-a-survey?service=battery" className="btn btn--dark btn--block">Get my fixed price</Link>
          </div>
        </div>
      </section>

      <section className="bg-cream" aria-labelledby="bproc-h">
        <div className="container section-pad">
          <div className="stack" data-reveal="" style={{ marginBottom: 48 }}>
            <span className="eyebrow">05 · Process</span>
            <h2 id="bproc-h" className="h2">From survey to switched on</h2>
          </div>
          <ol className="hair-steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <div className="stack" style={{ gap: 12 }} data-reveal="" data-reveal-delay={String(i * 70)}>
                  <span className="num">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone" aria-labelledby="bfaq-h">
        <div className="container section-pad faq-layout">
          <div className="faq-side" data-reveal="">
            <span className="eyebrow">06 · FAQ</span>
            <h2 id="bfaq-h" className="h2">Battery questions</h2>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      <CtaBand
        title={<>Ready to store your own <span className="grad">sunshine?</span></>}
        text="A free survey tells you which battery suits your home and what it will save."
        href="/book-a-survey?service=battery"
      />
    </>
  );
}
