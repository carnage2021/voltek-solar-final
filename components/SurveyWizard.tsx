'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { LogoMark } from './Logo';
import { SITE, TOWN_PC } from '@/lib/site';

const SERVICES: [string, string, string][] = [
  ['solar', 'Solar panels', 'New rooftop system'],
  ['solar-battery', 'Solar + battery', 'Generate and store'],
  ['battery', 'Battery add-on', 'For existing solar'],
  ['ev', 'EV charger', 'Home charging'],
  ['commercial', 'Commercial solar', 'Business, farm, school'],
  ['repair', 'Maintenance & repairs', 'Checks and faults'],
];
const STEPS: [string, string][] = [
  ['Service', 'What are you interested in?'],
  ['Property', 'Tell us about your property'],
  ['Roof & bill', 'Your roof and energy use'],
  ['Contact', 'How can we reach you?'],
  ['Date', 'Pick a preferred survey date'],
];

type State = {
  service: string; ptype: string; owner: string; storeys: string; facing: string; shade: string;
  bill: number; name: string; email: string; phone: string; postcode: string; date: string; slot: string;
};
const INIT: State = { service: '', ptype: '', owner: '', storeys: '', facing: '', shade: '', bill: 150, name: '', email: '', phone: '', postcode: '', date: '', slot: 'Morning' };

const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fmtLong = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

export default function SurveyWizard() {
  const params = useSearchParams();
  const [s, setS] = useState<State>(INIT);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [anim, setAnim] = useState(true);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);
  const topRef = useRef<HTMLDivElement>(null);
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const sv = params.get('service');
    const t = params.get('town');
    setS((p) => ({
      ...p,
      ...(sv && SERVICES.some((x) => x[0] === sv) ? { service: sv } : {}),
      ...(t && TOWN_PC[t] ? { postcode: `${TOWN_PC[t]} ` } : {}),
    }));
  }, [params]);

  useEffect(() => {
    const out: Date[] = [];
    const d = new Date();
    d.setDate(d.getDate() + 2);
    while (out.length < 12) {
      if (d.getDay() !== 0) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    setDates(out);
  }, []);

  const valid = (i: number) => {
    if (i === 0) return !!s.service;
    if (i === 1) return !!(s.ptype && s.owner);
    if (i === 2) return !!s.facing;
    if (i === 3) return s.name.trim().length > 1 && /\S+@\S+\.\S+/.test(s.email) && s.phone.replace(/\D/g, '').length >= 10 && s.postcode.trim().length >= 3;
    if (i === 4) return !!s.date;
    return true;
  };
  const ok = valid(step);

  const scrollUp = () => {
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 100, behavior: 'smooth' });
  };
  const go = (i: number) => {
    setAnim(false);
    setTimeout(() => {
      setStep(i);
      setMaxStep((m) => Math.max(m, i));
      setAnim(true);
      setTried(false);
      scrollUp();
    }, 220);
  };
  const next = (e: FormEvent) => {
    e.preventDefault();
    if (!ok) return setTried(true);
    if (step === 4) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    go(step + 1);
  };

  const opt = (key: keyof State, label: string) => (
    <button key={label} type="button" className="opt" style={{ minHeight: 48, fontSize: 16 }} aria-pressed={s[key] === label} onClick={() => set(key, label as never)}>
      {label}
    </button>
  );
  const group = (title: string, key: keyof State, opts: string[]) => (
    <fieldset className="fieldset" key={title}>
      <legend>{title}</legend>
      <div className="opt-row">{opts.map((o) => opt(key, o))}</div>
    </fieldset>
  );

  const svc = SERVICES.find((x) => x[0] === s.service);
  const selDate = dates.find((d) => isoDay(d) === s.date);
  const pct = Math.round(((step + (ok ? 1 : 0.5)) / 5) * 100);
  const contactErr = (k: 'name' | 'email' | 'phone' | 'postcode') => tried && step === 3 && !String(s[k]).trim();

  const summary = useMemo(
    () => [
      ['Service', svc ? svc[1] : '—'],
      ['Property', s.ptype || '—'],
      ['Roof', s.facing ? s.facing + (s.shade ? ` · ${s.shade.toLowerCase()} shade` : '') : '—'],
      ['Monthly bill', maxStep >= 2 ? `£${s.bill}` : '—'],
      ['Postcode', s.postcode.trim().toUpperCase() || '—'],
      ['Date', selDate ? `${fmtLong(selDate)} · ${s.slot}` : '—'],
    ],
    [svc, s, selDate, maxStep]
  );

  return (
    <div className="container book">
      <div className="book__main" ref={topRef}>
        <div className="stack" data-reveal="" style={{ gap: 16 }}>
          <span className="eyebrow">Free · no obligation · about 2 minutes</span>
          <h1 className="h1">
            Book a Free <span className="grad-deep">Solar Survey</span>
          </h1>
        </div>

        <div className="wizard" data-reveal="" data-reveal-delay="100">
          {done ? (
            <div className="booked" role="status">
              <LogoMark size={64} />
              <h2>You&apos;re booked in, {s.name.trim().split(' ')[0] || 'there'}.</h2>
              <p>
                We&apos;ve pencilled in <strong>{selDate ? `${fmtLong(selDate)} (${s.slot.toLowerCase()})` : ''}</strong>. A local adviser will call within {SITE.responseHours} working hours to confirm, and you&apos;ll get an email at {s.email}.
              </p>
              <div className="btn-row">
                <Link href="/" className="btn btn--sm btn--dark">Back to homepage</Link>
                <Link href="/projects" className="btn btn--sm btn--ghost-dark">See recent projects</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="wizard__head">
                <div className="wizard__status">
                  <b>Step {step + 1} of 5 · {STEPS[step][0]}</b>
                  <span>{pct}%</span>
                </div>
                <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Booking progress">
                  <i style={{ width: `${pct}%` }} />
                </div>
                <ol className="wizard__steps">
                  {STEPS.map(([label], i) => (
                    <li key={label}>
                      <button type="button" disabled={i > maxStep} className={i === step ? 'cur' : i <= maxStep ? 'done' : ''} onClick={() => i <= maxStep && i !== step && go(i)}>
                        {i + 1}. {label}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <form onSubmit={next} noValidate>
                <div className={`wizard__body${anim ? '' : ' is-out'}`}>
                  <h2>{STEPS[step][1]}</h2>

                  {step === 0 && (
                    <div role="radiogroup" aria-label="Service" className="svc-grid">
                      {SERVICES.map(([k, label, d]) => (
                        <button key={k} type="button" role="radio" aria-checked={s.service === k} className="svc" onClick={() => set('service', k)}>
                          <b>{label}</b>
                          <span>{d}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="stack" style={{ gap: 22 }}>
                      {group('Property type', 'ptype', ['Terraced', 'Semi-detached', 'Detached', 'Bungalow', 'Flat', 'Business / farm'])}
                      {group('Do you own the property?', 'owner', ['Yes, I own it', 'Landlord', 'Tenant'])}
                      {group('Storeys', 'storeys', ['1', '2', '3+'])}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="stack" style={{ gap: 22 }}>
                      {group('Which way does your main roof face?', 'facing', ['South', 'East / West', 'North', 'Not sure'])}
                      {group('Any shading?', 'shade', ['None', 'Some', 'A lot', 'Not sure'])}
                      <label className="field" style={{ gap: 12, fontWeight: 600 }}>
                        <span className="range-head">
                          <span>Monthly electricity bill</span>
                          <span className="range-val">£{s.bill}</span>
                        </span>
                        <input type="range" min={50} max={400} step={5} value={s.bill} onChange={(e) => set('bill', Number(e.target.value))} />
                        <span className="range-scale"><span>£50</span><span>£400+</span></span>
                      </label>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="fields">
                      <label className="field full">Full name
                        <input className={`input${contactErr('name') ? ' is-error' : ''}`} value={s.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                      </label>
                      <label className="field">Email
                        <input type="email" className={`input${tried && step === 3 && !/\S+@\S+\.\S+/.test(s.email) ? ' is-error' : ''}`} value={s.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                      </label>
                      <label className="field">Phone
                        <input type="tel" className={`input${tried && step === 3 && s.phone.replace(/\D/g, '').length < 10 ? ' is-error' : ''}`} value={s.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="07…" />
                      </label>
                      <label className="field full">Postcode
                        <input className={`input upper${contactErr('postcode') ? ' is-error' : ''}`} value={s.postcode} onChange={(e) => set('postcode', e.target.value)} autoComplete="postal-code" placeholder="e.g. CT1 2AB" />
                      </label>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="stack" style={{ gap: 22 }}>
                      <div className="dates">
                        {dates.map((d) => {
                          const k = isoDay(d);
                          return (
                            <button key={k} type="button" className="date" aria-pressed={s.date === k} onClick={() => set('date', k)} aria-label={fmtLong(d)}>
                              <small>{d.toLocaleDateString('en-GB', { weekday: 'short' })}</small>
                              <b>{d.getDate()}</b>
                              <small>{d.toLocaleDateString('en-GB', { month: 'short' })}</small>
                            </button>
                          );
                        })}
                      </div>
                      {group('Preferred time', 'slot', ['Morning', 'Afternoon', 'Evening'])}
                      <span style={{ fontSize: 15, color: 'var(--muted2)' }}>We&apos;ll call to confirm the exact time. Weekend slots subject to availability.</span>
                    </div>
                  )}
                </div>

                <div className="wizard__foot">
                  <button type="button" className="btn btn--sm btn--ghost-dark wizard__back" disabled={step === 0} onClick={() => step > 0 && go(step - 1)}>← Back</button>
                  <span className="wizard__err" role="alert">{tried && !ok ? (step === 3 ? 'Please complete all contact fields.' : 'Please choose an option to continue.') : ''}</span>
                  <button type="submit" className={`btn btn--sm ${step === 4 ? 'btn--gold' : 'btn--dark'}`}>{step === 4 ? 'Book My Free Survey' : 'Continue →'}</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <aside className="book__aside" aria-label="Your booking" data-reveal="" data-reveal-delay="200">
        <div className="summary">
          <span className="eyebrow">Your survey</span>
          <dl>
            {summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className={v === '—' ? 'empty-v' : ''}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="next-card">
          <strong>What happens next</strong>
          <ol>
            <li>We call to confirm your slot.</li>
            <li>A local adviser visits (about an hour).</li>
            <li>You get a fixed quote and system design.</li>
          </ol>
          <span>
            Prefer to talk? <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          </span>
        </div>
      </aside>
    </div>
  );
}
