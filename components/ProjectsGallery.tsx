'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PROJECTS, SVC_LABEL, type Svc } from '@/lib/projects';
import { TOWNS } from '@/lib/site';

export default function ProjectsGallery() {
  const params = useSearchParams();
  const [svc, setSvc] = useState<'all' | Svc>('all');
  const [town, setTown] = useState('all');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = params.get('town');
    const m = t && TOWNS.find((x) => x.slug === t);
    if (m) setTown(m.name);
  }, [params]);

  const apply = (fn: () => void) => {
    setFading(true);
    setTimeout(() => {
      fn();
      setFading(false);
    }, 180);
  };

  const byTown = PROJECTS.filter((p) => town === 'all' || p.town === town);
  const list = byTown.filter((p) => svc === 'all' || p.svc === svc);
  const opts: ['all' | Svc, string][] = [['all', 'All'], ...(Object.entries(SVC_LABEL) as [Svc, string][])];

  return (
    <>
      <div className="filter-bar">
        <div className="container filter-bar__inner">
          <div role="group" aria-label="Filter by service" className="filter-pills">
            {opts.map(([k, label]) => (
              <button key={k} type="button" className="opt" aria-pressed={svc === k} onClick={() => apply(() => setSvc(k))}>
                {label}
                <span>{k === 'all' ? byTown.length : byTown.filter((p) => p.svc === k).length}</span>
              </button>
            ))}
          </div>
          <label className="town-select">
            Town
            <select className="input" value={town} onChange={(e) => { const v = e.target.value; apply(() => setTown(v)); }}>
              <option value="all">All towns</option>
              {TOWNS.map((t) => (
                <option key={t.slug} value={t.name}>{t.name}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section aria-label="Project gallery" className="container" style={{ paddingTop: 'clamp(32px,4vw,48px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
        <p aria-live="polite" style={{ margin: '0 0 24px', fontSize: 16, color: 'var(--muted2)' }}>
          Showing <strong style={{ color: 'var(--charcoal)' }}>{list.length}</strong> of {PROJECTS.length} projects{town === 'all' ? '' : ` in ${town}`}
        </p>
        {list.length > 0 ? (
          <div className={`proj-grid${fading ? ' is-fading' : ''}`}>
            {list.map((p, i) => (
              <article key={`${p.town}-${p.size}`} className={`proj${i % 4 === 1 ? ' proj--dark' : ''}`}>
                <div className="proj__img">
                  <Image src={p.img} alt={p.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  <span className="proj__tag">{SVC_LABEL[p.svc]}</span>
                </div>
                <div className="proj__body">
                  <h2>{p.town} · {p.size}</h2>
                  <div className="proj__chips">
                    <span>{p.prop}</span>
                    <span>Battery: {p.bat}</span>
                    <span>{p.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <strong>No matching projects yet</strong>
            <span>We may still have worked near you — ask us for local examples.</span>
            <button type="button" className="btn btn--sm btn--ghost-dark" onClick={() => apply(() => { setSvc('all'); setTown('all'); })}>Clear filters</button>
          </div>
        )}
      </section>
    </>
  );
}
