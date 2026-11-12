'use client';
import { useEffect, useRef, useState } from 'react';

const STEPS: [string, string, string[]][] = [
  ['Free Consultation', 'A quick call to understand your home, bills and goals.', ['Expert advice', 'No pressure']],
  ['Home Survey', 'We check your roof, shading, fuse board and usage in person.', ['About an hour', 'Free']],
  ['Custom Design & Quote', 'A system designed for your roof with clear, fixed pricing.', ['3D layout', 'Fixed price']],
  ['Professional Installation', 'Our own qualified team fits everything, usually in a few days.', ['Own installers', 'Tidy site']],
  ['Grid Connection & MCS Certificate', 'We handle the DNO paperwork and register your MCS certificate.', ['DNO handled', 'SEG-ready']],
  ['Save & Enjoy', 'Track generation in the app and watch your bills fall.', ['Live app', 'Ongoing support']],
];

/** Desktop: vertical scroll drives a pinned horizontal track. Mobile: native swipe with snap. */
export default function Process() {
  const outer = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let max = 0;
    let raf = 0;

    const update = () => {
      const o = outer.current, t = track.current, b = bar.current, s = scroller.current;
      if (!o || !t || !s) return;
      if (!mq.matches || reduced) {
        const m = s.scrollWidth - s.clientWidth;
        if (b) b.style.width = `${m > 0 ? (s.scrollLeft / m) * 100 : 0}%`;
        return;
      }
      const r = o.getBoundingClientRect();
      const total = o.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      t.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (b) b.style.width = `${p * 100}%`;
    };
    const layout = () => {
      const o = outer.current, t = track.current;
      if (!o || !t) return;
      const isDesk = mq.matches && !reduced;
      setDesktop(isDesk);
      if (!isDesk) {
        o.style.height = '';
        t.style.transform = '';
      } else {
        max = Math.max(0, t.scrollWidth - window.innerWidth);
        o.style.height = `${window.innerHeight + max}px`;
      }
      update();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    layout();
    const late = setTimeout(layout, 400);
    window.addEventListener('resize', layout);
    window.addEventListener('scroll', onScroll, { passive: true });
    scroller.current?.addEventListener('scroll', onScroll, { passive: true });
    const sc = scroller.current;
    return () => {
      clearTimeout(late);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', layout);
      window.removeEventListener('scroll', onScroll);
      sc?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="proc" aria-labelledby="proc-h" ref={outer}>
      <div className="proc__sticky">
        <div className="container sec-head" style={{ marginBottom: 44 }}>
          <div className="stack" data-reveal="">
            <span className="eyebrow">05 · How it works</span>
            <h2 id="proc-h" className="h2">
              Simple Process.
              <br />
              <span className="grad-deep">Maximum Savings.</span>
            </h2>
          </div>
          <div className="proc__meta">
            <span>{desktop ? 'Scroll' : 'Swipe'}</span>
            <div className="proc__progress"><i ref={bar} /></div>
          </div>
        </div>
        <div className="proc__scroller" ref={scroller}>
          <ol className="proc__track" ref={track}>
            {STEPS.map(([t, d, chips], i) => (
              <li key={t} className={`step${i % 2 === 1 ? ' step--dark' : ''}`}>
                <div className="step__top">
                  <span className="step__n">0{i + 1}</span>
                  <span className="step__of">Step 0{i + 1}/06</span>
                </div>
                <div className="stack" style={{ gap: 14 }}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <div className="step__chips">
                    {chips.map((c) => <span key={c}>{c}</span>)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
