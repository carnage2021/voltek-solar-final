'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Fades/slides in every [data-reveal] element as it enters the viewport ("sunrise, not fireworks"). */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.add('is-in');
          const d = Number(el.dataset.revealDelay || 0);
          if (el.hasAttribute('data-roll')) roll(el, d);
          el.querySelectorAll<HTMLElement>('[data-roll]').forEach((r) => roll(r, d));
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    const scan = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-rv])').forEach((el) => {
        el.setAttribute('data-rv', '');
        const d = el.dataset.revealDelay;
        if (d) el.style.setProperty('--d', `${d}ms`);
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}

/** Counts a figure up from zero, keeping prefix/suffix — e.g. "£2.4M+" or "1,250+". */
function roll(el: HTMLElement, delay: number) {
  const target = el.dataset.roll || el.textContent || '';
  const m = target.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const [, pre, numStr, post] = m;
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  const end = parseFloat(numStr.replace(/,/g, ''));
  const t0 = performance.now() + delay + 150;
  const step = (now: number) => {
    const k = Math.min(1, Math.max(0, (now - t0) / 1400));
    const e = 1 - Math.pow(1 - k, 3);
    el.textContent = pre + (end * e).toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + post;
    if (k < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
