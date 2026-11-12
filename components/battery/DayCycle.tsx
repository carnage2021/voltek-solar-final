'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon, type IconName } from '../Icons';

const PHASES = [
  { tab: 'Daytime', time: 'Morning – afternoon', t: 'Panels power the home and fill the battery', d: 'Solar runs your appliances first. Any surplus charges the battery before anything is exported.', w: '33%', sky: 'radial-gradient(circle at 20% 10%, rgba(243,203,140,.22), transparent 55%)' },
  { tab: 'Evening', time: 'Evening', t: 'The battery takes over', d: 'As the sun goes down, the battery supplies the home through the evening peak.', w: '66%', sky: 'radial-gradient(circle at 10% 90%, rgba(201,137,74,.22), transparent 55%)' },
  { tab: 'Overnight', time: 'Overnight', t: 'Top up on a cheaper rate', d: 'On a smart tariff, the battery can charge from the grid at off-peak prices, ready for the morning.', w: '100%', sky: 'radial-gradient(circle at 50% 0%, rgba(120,130,170,.14), transparent 60%)' },
];

const GOLD = 'linear-gradient(135deg,#E8B36A,#C9894A)';
const DIM = 'rgba(246,243,238,.12)';
const STATES: [string, string, string][][] = [
  [['Generating', GOLD, '18px'], ['Charging', GOLD, '14px'], ['Solar-powered', '#F6F3EE', '0px']],
  [['Idle', DIM, '0px'], ['Discharging', GOLD, '14px'], ['Battery-powered', '#F6F3EE', '0px']],
  [['Off', DIM, '0px'], ['Charging · off-peak', GOLD, '8px'], ['Off-peak grid', '#C9BFB4', '0px']],
];
const NODES: { label: string; icon: IconName; r: string }[] = [
  { label: 'Solar panels', icon: 'sun', r: '50%' },
  { label: 'Battery', icon: 'battery', r: '20px' },
  { label: 'Your home', icon: 'home', r: '20px' },
];

export default function DayCycle() {
  const [ph, setPh] = useState(0);
  const auto = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    auto.current = setInterval(() => setPh((p) => (p + 1) % 3), 4200);
    return () => {
      if (auto.current) clearInterval(auto.current);
    };
  }, []);

  const pick = (i: number) => {
    if (auto.current) clearInterval(auto.current);
    setPh(i);
  };
  const phase = PHASES[ph];
  const a1 = ph === 0;
  const a2 = ph !== 2;

  return (
    <>
      <div className="sec-head" style={{ marginBottom: 48 }}>
        <div className="stack" data-reveal="">
          <span className="eyebrow">02 · How it works</span>
          <h2 id="how-h" className="h2">A day with a battery</h2>
        </div>
        <div role="tablist" aria-label="Time of day" className="day-tabs">
          {PHASES.map((p, i) => (
            <button key={p.tab} type="button" role="tab" aria-selected={ph === i} onClick={() => pick(i)}>{p.tab}</button>
          ))}
        </div>
      </div>
      <div className="day" data-reveal="">
        <div className="flow" aria-hidden="true">
          <div className="flow__sky" style={{ background: phase.sky }} />
          {NODES.map((n, i) => {
            const [state, bg, glow] = STATES[ph][i];
            const lit = bg !== DIM;
            return (
              <div key={n.label} className="flow__node" style={{ gridColumn: i * 2 + 1, gridRow: 1 }}>
                <div className="flow__orb" style={{ borderRadius: n.r, background: bg, boxShadow: `0 0 0 ${glow} rgba(232,179,106,.18)` }}>
                  <Icon name={n.icon} color={lit ? '#2B2724' : 'rgba(246,243,238,.45)'} stroke={1.8} />
                </div>
                <b>{n.label}</b>
                <small>{state}</small>
              </div>
            );
          })}
          <div className={`flow__arrow${a1 ? ' is-on' : ''}`} style={{ gridColumn: 2, gridRow: 1, color: a1 ? '#E8B36A' : 'rgba(246,243,238,.2)' }}>→</div>
          <div className={`flow__arrow${a2 ? ' is-on' : ''}`} style={{ gridColumn: 4, gridRow: 1, color: a2 ? '#E8B36A' : 'rgba(246,243,238,.2)' }}>→</div>
        </div>
        <div className="day__text" aria-live="polite">
          <span className="eyebrow">{phase.time}</span>
          <div key={ph} className="stack fade-swap" style={{ gap: 14 }}>
            <h3>{phase.t}</h3>
            <p>{phase.d}</p>
          </div>
          <div className="bar-track"><i style={{ width: phase.w }} /></div>
        </div>
      </div>
    </>
  );
}
