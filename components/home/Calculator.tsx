'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const PROPS = ['Terraced', 'Semi-detached', 'Detached', 'Bungalow', 'Business'] as const;
type Prop = (typeof PROPS)[number];
const MAX_KW: Record<Prop, number> = { Terraced: 4, 'Semi-detached': 5, Detached: 7, Bungalow: 6, Business: 30 };
const IMPORT = 0.27;
const EXPORT = 0.12;
const YIELD = 950;

function calc(bill: number, prop: Prop, battery: boolean) {
  const annual = (bill * 12) / IMPORT;
  const size = Math.min(MAX_KW[prop], Math.max(2.4, (annual * 0.9) / YIELD));
  const gen = size * YIELD;
  const self = Math.min(gen * (battery ? 0.7 : 0.4), annual * 0.85);
  const saving = self * IMPORT + (gen - self) * EXPORT;
  const cost = size * 1400 + (battery ? 3500 : 0) + 900;
  return { size, saving, payback: cost / saving, cost };
}

const fmt = (n: number) => Math.round(n).toLocaleString('en-GB');
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Calculator() {
  const [bill, setBill] = useState(150);
  const [prop, setProp] = useState<Prop>('Semi-detached');
  const [battery, setBattery] = useState(true);
  const [postcode, setPostcode] = useState('');
  const c = useMemo(() => calc(bill, prop, battery), [bill, prop, battery]);
  const [disp, setDisp] = useState({ size: 0, saving: 0, payback: 0 });
  const dispRef = useRef(disp);
  dispRef.current = disp;
  const raf = useRef(0);

  useEffect(() => {
    const from = { ...dispRef.current };
    const t0 = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (now: number) => {
      const k = ease(Math.min(1, (now - t0) / 700));
      setDisp({ size: from.size + (c.size - from.size) * k, saving: from.saving + (c.saving - from.saving) * k, payback: from.payback + (c.payback - from.payback) * k });
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [c]);

  const pc = postcode.trim().toUpperCase();
  const inArea = /^CT\d/.test(pc);
  const max = Math.max(c.saving * 25, c.cost) * 1.08;
  const bars = [5, 10, 15, 20, 25].map((y) => ({ y, h: ((c.saving * y) / max) * 100, paid: c.saving * y >= c.cost }));

  return (
    <div className="calc" data-reveal="">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="stack" style={{ gap: 14 }}>
          <span className="eyebrow">04 · Savings calculator</span>
          <h2 id="calc-h" className="h2 h2--sm">What could solar save you?</h2>
        </div>
        <label className="field">
          Postcode
          <span className="pc-wrap">
            <input className="input upper" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. CT9" autoComplete="postal-code" maxLength={8} />
            {pc.length >= 2 && (
              <span className="pc-badge" style={{ background: inArea ? 'var(--lime)' : 'var(--stone)' }}>
                {inArea ? 'In our area' : 'We’ll check coverage'}
              </span>
            )}
          </span>
        </label>
        <label className="field" style={{ gap: 12 }}>
          <span className="range-head">
            <span>Monthly electricity bill</span>
            <span className="range-val">£{bill}</span>
          </span>
          <input type="range" min={50} max={400} step={5} value={bill} onChange={(e) => setBill(Number(e.target.value))} aria-label="Monthly electricity bill in pounds" />
          <span className="range-scale"><span>£50</span><span>£400</span></span>
        </label>
        <div className="field" style={{ gap: 10 }}>
          <span id="ptype">Property type</span>
          <div className="opt-row" role="group" aria-labelledby="ptype">
            {PROPS.map((p) => (
              <button key={p} type="button" className="opt" aria-pressed={prop === p} onClick={() => setProp(p)}>{p}</button>
            ))}
          </div>
        </div>
        <button type="button" role="switch" aria-checked={battery} className="switch" onClick={() => setBattery((b) => !b)}>
          <span>Interested in a battery?</span>
          <span className="switch__track"><i /></span>
        </button>
      </form>

      <div className="calc__out" aria-live="polite">
        <div className="calc__kpis">
          <div className="kpi">
            <small>Estimated system</small>
            <strong>{disp.size.toFixed(1)}<em> kWp</em></strong>
            <small>≈ {Math.ceil(c.size / 0.43)} panels</small>
          </div>
          <div className="kpi">
            <small>Yearly saving</small>
            <strong style={{ color: 'var(--gold-light)' }}>£{fmt(disp.saving)}</strong>
            <small>bills + export</small>
          </div>
          <div className="kpi">
            <small>Payback</small>
            <strong>{disp.payback ? disp.payback.toFixed(1) : '0.0'}<em> yrs</em></strong>
            <small>approximate</small>
          </div>
        </div>
        <div className="stack" style={{ gap: 10 }}>
          <span style={{ fontSize: 14, color: 'var(--taupe)' }}>Cumulative saving vs. estimated cost</span>
          <div className="chart">
            <div className="chart__cost" style={{ bottom: `${(c.cost / max) * 100}%` }}>
              <span>Est. cost £{fmt(Math.round(c.cost / 100) * 100)}</span>
            </div>
            {bars.map((b) => (
              <div key={b.y} className="chart__bar">
                <i style={{ height: `${b.h}%`, background: b.paid ? 'linear-gradient(180deg,#F3CB8C,#C9894A)' : 'rgba(246,243,238,.22)' }} />
              </div>
            ))}
          </div>
          <div className="chart__x">
            {bars.map((b) => <span key={b.y}>Yr {b.y}</span>)}
          </div>
        </div>
        <p className="calc__note">
          Estimate only — your free survey gives exact figures.
          <br />
          <span>Assumes 27p/kWh import, 12p/kWh export, ~950 kWh per kWp in Kent and indicative pricing.</span>
        </p>
        <Link href="/book-a-survey" className="btn btn--gold btn--block">Get My Exact Quote →</Link>
      </div>
    </div>
  );
}
