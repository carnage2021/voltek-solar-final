import Image from 'next/image';
import Link from 'next/link';
import Splash from '@/components/home/Splash';
import Hero from '@/components/home/Hero';
import Solutions from '@/components/home/Solutions';
import ScaleTabs from '@/components/home/ScaleTabs';
import Calculator from '@/components/home/Calculator';
import Process from '@/components/home/Process';
import Reviews from '@/components/home/Reviews';
import AreasMap from '@/components/home/AreasMap';
import ContactForm from '@/components/home/ContactForm';
import Faq from '@/components/Faq';
import JsonLd, { faqSchema } from '@/components/JsonLd';
import { Shield } from '@/components/Icons';
import { IMG, SITE, TOWNS } from '@/lib/site';

const BENEFITS: [string, string][] = [
  ['Lower energy bills', 'Generate your own electricity during the day and buy far less from the grid.'],
  ['Get paid for exported energy', 'Earn from surplus power through the Smart Export Guarantee (SEG) with a participating supplier.'],
  ['Store power with a battery', 'Save daytime solar for the evening, or charge up on cheaper overnight tariffs.'],
  ['Energy independence', 'Rely less on the grid and protect your household from future price rises.'],
  ['Higher home value', 'An improved EPC rating can make your home more attractive to buyers.'],
  ['25+ year panel warranties', 'Quality panels carry long product and performance warranties.'],
];

const TRUST_LOGOS: [string, string][] = [
  ['MCS', 'Certified'],
  ['NICEIC', 'Approved'],
  ['RECC', 'Member'],
  ['TrustMark', 'Registered'],
  ['Tier-1', 'Panels'],
  ['Hybrid', 'Inverters'],
  ['Smart', 'Batteries'],
];

const STATS: { l: string; v: string; dark: boolean }[] = [
  { l: 'Systems installed', v: '1,250+', dark: true },
  { l: 'Customer savings', v: '£2.4M+', dark: false },
  { l: 'Tonnes of CO₂ saved', v: '3,800+', dark: false },
  { l: 'Customer satisfaction', v: '98%', dark: true },
];

const PROJECTS = [
  { label: 'Ramsgate · 4.8kW + 9.5kWh battery', img: IMG.installers, alt: 'Voltek installers fitting solar panels on a Ramsgate roof', cls: 'c2 r2' },
  { label: 'Canterbury · 4.1kW', img: IMG.ukRoof, alt: 'Solar panels on a tiled roof in Canterbury', cls: '' },
  { label: 'Whitstable · 5.2kW + 5kWh battery', img: IMG.installerRoof, alt: 'Installer placing a black solar panel on a Whitstable roof', cls: '' },
  { label: 'Deal · 3.6kW + EV charger', img: IMG.ev, alt: 'Electric car charging at home in Deal', cls: '' },
  { label: 'Herne Bay · 6.4kW', img: IMG.panelsTrees, alt: 'Solar array beside trees in Herne Bay', cls: '' },
  { label: 'Sandwich · 48kW commercial', img: IMG.commercialRoof, alt: 'Commercial building roof with a large solar array in Sandwich', cls: 'cfull' },
];

const FAQS: [string, string][] = [
  ['How much do solar panels cost?', 'Most homes in East Kent fall between £5,500 and £8,500 for panels, and £9,000–£13,000 with a battery. Your free survey gives a fixed price for your roof.'],
  ['Do I need planning permission?', 'Most rooftop systems on houses are permitted development, so planning permission is not needed. Listed buildings, conservation areas and some flat roofs can be different — we check this during your survey.'],
  ['Is a battery worth it?', 'A battery lets you use more of your own solar in the evening and can charge on cheaper overnight tariffs. It suits most households who are out during the day. We model the numbers with and without one.'],
  ['What is the Smart Export Guarantee?', 'The SEG requires larger energy suppliers to pay you for electricity you export to the grid. Rates vary by supplier and tariff, and you need an MCS-certified installation to qualify.'],
  ['How long does installation take?', 'A typical home installation takes 1–2 days on site, plus scaffolding either side. Commercial projects are scheduled individually.'],
  ['Do you handle the grid (DNO) paperwork?', 'Yes. We submit the notification or application to the local network operator (UK Power Networks) and register your MCS certificate.'],
  ['What warranties do I get?', 'Panels typically carry 25-year product and 30-year performance warranties, plus 10–12 years on inverters and batteries and a 10-year Voltek workmanship guarantee.'],
];

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ElectricalContractor',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  priceRange: '££',
  address: { '@type': 'PostalAddress', streetAddress: '12 Harbour Street', addressLocality: 'Ramsgate', addressRegion: 'Kent', postalCode: 'CT11 8HA', addressCountry: 'GB' },
  areaServed: TOWNS.map((t) => t.name),
  makesOffer: ['Solar panel installation', 'Battery storage', 'EV charger installation', 'Commercial solar'].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={faqSchema(FAQS)} />
      <Splash />
      <Hero />

      {/* Accreditations */}
      <section className="bg-cream trust-strip" aria-label="Accreditations and partner brands">
        <div className="container trust-strip__inner">
          <span className="trust-strip__label">Accredited &amp; trusted</span>
          <div className="trust-strip__row">
            {TRUST_LOGOS.map(([n, s], i) => (
              <div key={n} className="trust-logo">
                {i < 4 && <Shield />}
                <span>{n}</span>
                <small>{s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01 Why */}
      <section id="why" className="bg-cream" aria-labelledby="why-h">
        <div className="container section-pad">
          <div className="split-head">
            <div className="stack" data-reveal="">
              <span className="eyebrow">01 · Why solar</span>
              <h2 id="why-h" className="h2">
                Why East Kent Homes Are Switching to <span className="grad-deep">Solar</span>
              </h2>
            </div>
            <p className="lead" data-reveal="" data-reveal-delay="120">
              The South East is one of the sunniest parts of the UK. A well-designed system puts that light to work on your bills from the first day.
            </p>
          </div>
          <div className="hair-grid">
            {BENEFITS.map(([t, d], i) => (
              <article key={t} className="hair-cell">
                <div className="stack" style={{ gap: 14 }} data-reveal="" data-reveal-delay={String((i % 3) * 80)}>
                  <span className="num">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Solutions */}
      <section id="solutions" className="bg-dark" aria-labelledby="sol-h">
        <div className="container section-pad">
          <div className="sec-head">
            <div className="stack" data-reveal="">
              <span className="eyebrow">02 · Solutions</span>
              <h2 id="sol-h" className="h2">Solar Solutions for Every Home and Business</h2>
            </div>
            <Link href="/book-a-survey" className="btn btn--sm btn--ghost-light to-gold" data-reveal="">Book a Free Survey</Link>
          </div>
          <Solutions />
        </div>
      </section>

      {/* 03 Scale */}
      <section id="scale" style={{ background: 'linear-gradient(180deg,#F6F3EE 0%,#F4E3D0 100%)' }} aria-labelledby="scale-h">
        <div className="container section-pad">
          <div className="stack" data-reveal="" style={{ marginBottom: 48, maxWidth: 760 }}>
            <span className="eyebrow">03 · Every scale</span>
            <h2 id="scale-h" className="h2">Solar for Every Scale</h2>
          </div>
          <ScaleTabs />
        </div>
      </section>

      {/* 04 Calculator */}
      <section id="calculator" className="bg-peach" aria-labelledby="calc-h">
        <div className="container" style={{ paddingBottom: 'clamp(80px,10vw,140px)' }}>
          <Calculator />
        </div>
      </section>

      {/* 05 Process */}
      <Process />

      {/* 06 Impact */}
      <section className="bg-stone" aria-labelledby="impact-h">
        <div className="container section-pad impact">
          <div className="impact__img" data-reveal="">
            <Image src={IMG.panelsCloseup} alt="Close-up of solar panel cells" fill sizes="(max-width: 960px) 100vw, 50vw" />
          </div>
          <div className="stack" style={{ gap: 16 }}>
            <div className="stack" data-reveal="" style={{ padding: '8px 0 16px', gap: 16 }}>
              <span className="eyebrow">06 · Our impact</span>
              <h2 id="impact-h" className="h2 h2--sm">Real results across East Kent</h2>
            </div>
            <dl className="impact__stats">
              {STATS.map((s, i) => (
                <div key={s.l} className={`stat${s.dark ? ' stat--dark' : ''}`} data-reveal="" data-reveal-delay={String(i * 90)}>
                  <dt>{s.l}</dt>
                  <dd data-roll={s.v}>{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 07 Projects */}
      <section id="projects" className="bg-cream" aria-labelledby="proj-h">
        <div className="container section-pad">
          <div className="sec-head" style={{ marginBottom: 44 }}>
            <div className="stack" data-reveal="">
              <span className="eyebrow">07 · Recent projects</span>
              <h2 id="proj-h" className="h2">Installed near you</h2>
            </div>
            <Link href="/projects" className="btn btn--sm btn--dark" data-reveal="">View All Projects →</Link>
          </div>
          <div className="bento">
            {PROJECTS.map((p, i) => (
              <figure key={p.label} className={p.cls} data-reveal="" data-reveal-delay={String((i % 3) * 90)}>
                <Image src={p.img} alt={p.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                <figcaption><span className="pill-label">{p.label}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 08 Reviews */}
      <Reviews />

      {/* 09 Areas */}
      <section id="areas" className="bg-dark" aria-labelledby="areas-h">
        <div className="container section-pad">
          <AreasMap />
        </div>
      </section>

      {/* 10 FAQ */}
      <section id="faq" className="bg-cream" aria-labelledby="faq-h">
        <div className="container section-pad faq-layout">
          <div className="faq-side faq-side--sticky" data-reveal="">
            <span className="eyebrow">10 · FAQ</span>
            <h2 id="faq-h" className="h2">Questions? We&apos;ve Got Answers</h2>
            <div className="advice">
              <strong>Still unsure? Talk to a local adviser.</strong>
              <span>No sales scripts. Straight answers about your roof and your bills.</span>
              <div className="btn-row" style={{ gap: 10 }}>
                <a href={SITE.phoneHref} className="btn btn--light btn--sm" style={{ minHeight: 50 }}>Call {SITE.phoneDisplay}</a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light btn--sm" style={{ minHeight: 50 }}>WhatsApp</a>
              </div>
            </div>
          </div>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* 11 Contact */}
      <section id="contact" className="bg-dark contact" aria-labelledby="contact-h">
        <div className="contact__glow" aria-hidden="true" />
        <div className="container section-pad contact__grid">
          <div className="stack" data-reveal="" style={{ gap: 32 }}>
            <span className="eyebrow">11 · Free survey</span>
            <h2 id="contact-h" className="h2" style={{ fontSize: 'clamp(40px,6vw,84px)', letterSpacing: '-0.04em', lineHeight: 0.98 }}>
              Let&apos;s Power Your Home <span className="grad">Together</span>
            </h2>
            <address className="addr">
              <div><small>Phone</small><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></div>
              <div><small>Email</small><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              <div><small>Address</small><span>{SITE.address}</span></div>
              <div><small>Opening hours</small><span>{SITE.hours}</span></div>
              <div className="full"><small>Service area</small><span>Thanet, Canterbury, Dover &amp; Folkestone districts</span></div>
            </address>
            <svg width="260" height="150" viewBox="0 0 260 150" aria-hidden="true" fill="none" stroke="#E8B36A" strokeWidth="1.2" style={{ opacity: 0.8, maxWidth: '100%' }}>
              <circle cx="214" cy="34" r="18" />
              <path d="M40 40 L190 40 L220 110 L10 110 Z" />
              <path d="M90 40 L80 110 M140 40 L150 110 M25 75 L205 75" />
              <path d="M115 110 L115 140 M85 140 L145 140" />
            </svg>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
