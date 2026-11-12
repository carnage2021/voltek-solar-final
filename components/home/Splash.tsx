'use client';
import { useEffect, useState } from 'react';
import { LogoMark } from '../Logo';

/** Sunrise intro: sun rises, mark spins in, wordmark fades up, then the curtain lifts. Shown on every homepage load. */
export default function Splash() {
  const [phase, setPhase] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const t = [
      setTimeout(() => setPhase(1), 60),
      setTimeout(() => setPhase(2), 550),
      setTimeout(() => {
        setPhase(3);
        document.documentElement.style.overflow = '';
      }, 1900),
      setTimeout(() => setGone(true), 2900),
    ];
    return () => {
      t.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (gone) return null;
  const cls = ['splash', phase >= 1 && 'p1', phase >= 2 && 'p2', phase >= 3 && 'is-out'].filter(Boolean).join(' ');
  return (
    <div className={cls} aria-hidden="true">
      <div className="splash__sun" />
      <div className="splash__inner">
        <div className="splash__mark">
          <LogoMark size={92} />
        </div>
        <div className="splash__word">
          <b>VOLTEK</b>
          <span>SOLAR</span>
        </div>
        <div className="splash__bar">
          <i />
        </div>
      </div>
    </div>
  );
}
