import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/CtaBand';
import Faq from '@/components/Faq';
import JsonLd, { faqSchema } from '@/components/JsonLd';
import { AVATARS, IMG, REVIEWS, SITE, TOWNS, townBySlug } from '@/lib/site';

type Params = { params: Promise<{ town: string }> };

export function generateStaticParams() {
  return TOWNS.map((t) => ({ town: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = townBySlug((await params).town);
  if (!t) return {};
  return {
    title: `Solar Panels ${t.name} | Local Solar & Battery Installers`,
    description: `MCS-certified solar panel and battery installers in ${t.name} and across East Kent. See local installs and reviews, then book a free solar survey.`,
    alternates: { canonical: `/areas/${t.slug}` },
    openGraph: { title: `Solar Panels in ${t.name} — Voltek Solar` },
  };
}

const PROJ_IMGS = [IMG.installers, IMG.ukRoof, IMG.installerRoof, IMG.panelsTrees, IMG.homeModern, IMG.panelsHands, IMG.panelsMeadow, IMG.homeClassic, IMG.panelsSky, IMG.homeEvening];
const SAMPLE_REVIEWS = [
  { sys: 'Solar + battery', text: 'Professional from start to finish. The survey was thorough and the install was done in two days. Our bills are a fraction of what they were.' },
  { sys: 'Solar panels', text: 'Really pleased we went with a local team. They answered every question honestly and left the place spotless.' },
  { sys: 'Battery add-on', text: 'The battery has transformed how much of our solar we actually use. Great advice on the right tariff too.' },
];

export default async function TownPage({ params }: Params) {
  const t = townBySlug((await params).town);
  if (!t) notFound();
  const idx = TOWNS.indexOf(t);

  const facts: [string, string][] = [
    ['Local engineers', 'Our own team, based in East Kent — not subcontractors.'],
    ['Free home survey', `In person, at a time that suits you in ${t.name}.`],
    ['Paperwork handled', 'DNO notification, MCS certificate and SEG set-up.'],
    ['Aftercare nearby', 'Fast call-outs for checks, faults and repairs.'],
  ];
  const projects = [
    ['4.6kW + 5kWh battery', 'Semi-detached'],
    ['3.9kW', 'Terraced'],
    ['5.8kW + EV charger', 'Detached'],
  ].map(([label, type], i) => ({ label: `${t.name} · ${label}`, type, img: PROJ_IMGS[(idx + i * 3) % PROJ_IMGS.length] }));
  const faqs: [string, string][] = [
    [`Do I need planning permission for solar panels in ${t.name}?`, `Most rooftop systems are permitted development. Listed buildings and conservation areas in ${t.name} may need consent — we check this before quoting and help with any application.`],
    [`How soon can you install in ${t.name}?`, 'Surveys are usually available within 7 days, and installation typically follows within 2–4 weeks of your go-ahead.'],
    [`Is ${t.name} sunny enough for solar?`, 'East Kent is one of the sunnier parts of the UK. Panels also generate on bright, overcast days — your survey estimates output for your exact roof.'],
    ['Who is the network operator here?', 'UK Power Networks runs the local grid. We submit the required notification or application on your behalf.'],
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: `Solar panel installation in ${t.name}`, serviceType: 'Solar panel installation', provider: { '@type': 'ElectricalContractor', name: SITE.name }, areaServed: { '@type': 'City', name: t.name } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url }, { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE.url}/#areas` }, { '@type': 'ListItem', position: 3, name: t.name }] },
    ],
  };
  const installs = 40 + ((idx * 37) % 90);

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(faqs)} />

      <section className="town-hero" aria-labelledby="h1">
        <div className="container town-hero__grid">
          <div className="stack" style={{ gap: 26 }}>
            <nav aria-label="Breadcrumb" className="crumbs" data-reveal="">
              <Link href="/">Home</Link> / <Link href="/#areas">Areas</Link> / <span aria-current="page">{t.name}</span>
            </nav>
            <span className="chip" data-reveal="" data-reveal-delay="60" style={{ alignSelf: 'flex-start' }}>
              <span className="dot-lime" style={{ width: 7, height: 7, boxShadow: 'none' }} />
              Local team · covering {t.pc}
            </span>
            <h1 id="h1" className="h1" data-reveal="" data-reveal-delay="120">
              Solar Panels in <span className="grad">{t.name}</span>
            </h1>
            <p className="hero-lead" data-reveal="" data-reveal-delay="220">
              MCS-certified solar, battery and EV charger installation for homes and businesses in {t.name} and nearby {t.near}.
            </p>
            <div className="btn-row" data-reveal="" data-reveal-delay="320">
              <Link href={`/book-a-survey?town=${t.slug}`} className="btn btn--gold">Book a Free Survey →</Link>
              <Link href="/#calculator" className="btn btn--ghost-light">Calculate My Savings</Link>
            </div>
          </div>
          <div className="town-hero__img" data-reveal="" data-reveal-delay="200">
            <Image src={t.hero} alt={`Solar installation near ${t.name}`} fill priority sizes="(max-width: 960px) 100vw, 50vw" />
            <div className="town-hero__tags">
              <span className="pill-label">{installs} installs in {t.name}</span>
              <span className="pill-label">★ {SITE.googleRating} local rating</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream" aria-label="Why choose a local installer" style={{ borderBottom: '1px solid rgba(43,39,36,.12)' }}>
        <div className="container">
          <div className="facts">
            {facts.map(([b, s]) => (
              <div key={b}><b>{b}</b><span>{s}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream" aria-labelledby="lp-h">
        <div className="container section-pad">
          <div className="sec-head" style={{ marginBottom: 44 }}>
            <div className="stack" data-reveal="">
              <span className="eyebrow">01 · Local projects</span>
              <h2 id="lp-h" className="h2">Recent installs in {t.name}</h2>
            </div>
            <Link href={`/projects?town=${t.slug}`} className="btn btn--sm btn--dark" data-reveal="">All {t.name} projects →</Link>
          </div>
          <div className="grid-3 local-proj">
            {projects.map((p, i) => (
              <figure key={p.label} data-reveal="" data-reveal-delay={String(i * 90)}>
                <div className="media">
                  <Image src={p.img} alt={`${p.label} installation`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                </div>
                <figcaption><strong style={{ fontWeight: 500 }}>{p.label}</strong><span>{p.type}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sunset" aria-labelledby="lr-h">
        <div className="container" style={{ paddingBottom: 'clamp(80px,10vw,140px)' }}>
          <div className="stack" data-reveal="" style={{ marginBottom: 44 }}>
            <span className="eyebrow">02 · Local reviews</span>
            <h2 id="lr-h" className="h2">What {t.name} customers say</h2>
          </div>
          <div className="grid-3">
            {SAMPLE_REVIEWS.map((r, i) => {
              const name = REVIEWS[(idx + i) % REVIEWS.length].name;
              return (
                <blockquote key={r.sys} className={`review${i === 1 ? ' review--dark' : ''}`} style={{ width: 'auto', minHeight: 320 }} data-reveal="" data-reveal-delay={String(i * 90)}>
                  <div className="stack" style={{ gap: 16 }}>
                    <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
                    <p>“{r.text}”</p>
                  </div>
                  <footer>
                    <div className="avatar" style={{ width: 48, height: 48 }}>
                      <Image src={AVATARS[(idx + i) % AVATARS.length]} alt="" fill sizes="48px" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <cite>{name}</cite>
                      <span className="meta">{t.name} · {r.sys}</span>
                    </div>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream" aria-labelledby="tfaq-h">
        <div className="container section-pad faq-layout">
          <div className="faq-side" data-reveal="" style={{ gap: 24 }}>
            <span className="eyebrow">03 · FAQ</span>
            <h2 id="tfaq-h" className="h2">Solar in {t.name}: your questions</h2>
            <div className="stack" style={{ gap: 12 }}>
              <span style={{ fontSize: 15, color: 'var(--muted2)' }}>We also cover</span>
              <div className="other-towns">
                {TOWNS.filter((o) => o.slug !== t.slug).map((o) => (
                  <Link key={o.slug} href={`/areas/${o.slug}`}>{o.name}</Link>
                ))}
              </div>
            </div>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand
        title={<>Book your free survey in <span className="grad">{t.name}</span></>}
        text="A local adviser visits, checks your roof and gives you exact figures. No obligation."
        href={`/book-a-survey?town=${t.slug}`}
      />
    </>
  );
}
