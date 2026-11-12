'use client';
import { useId, useState } from 'react';

export type FaqItem = [question: string, answer: string];

export default function Faq({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <div className="faq">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        const id = `${uid}-a${i}`;
        return (
          <div key={q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
            <h3>
              <button type="button" className="faq__q" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{q}</span>
                <span className="faq__icon" aria-hidden="true">+</span>
              </button>
            </h3>
            <div className="faq__a" id={id} role="region" aria-hidden={!isOpen}>
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
