'use client';
import { useState } from 'react';
import { LogoMark } from '../Logo';
import { SITE } from '@/lib/site';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="form-card"
      data-reveal=""
      data-reveal-delay="150"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <div className="form-done" role="status">
          <LogoMark size={56} />
          <strong>Thank you — we&apos;ll be in touch within {SITE.responseHours} working hours.</strong>
          <span>A local adviser will call to arrange your free survey.</span>
        </div>
      ) : (
        <>
          <h3 className="full">Book your free solar survey</h3>
          <label className="field">Name<input className="input" required autoComplete="name" name="name" /></label>
          <label className="field">Email<input className="input" required type="email" autoComplete="email" name="email" /></label>
          <label className="field">Phone<input className="input" required type="tel" autoComplete="tel" name="phone" /></label>
          <label className="field">Postcode<input className="input upper" required autoComplete="postal-code" name="postcode" /></label>
          <label className="field full">
            Service interested in
            <select className="input" name="service" defaultValue="Solar panels">
              <option>Solar panels</option>
              <option>Solar + battery</option>
              <option>Battery add-on for existing solar</option>
              <option>EV charger</option>
              <option>Commercial solar</option>
              <option>Maintenance &amp; repairs</option>
            </select>
          </label>
          <label className="field full">Message<textarea className="input" rows={4} name="message" /></label>
          <button type="submit" className="btn btn--dark btn--block full" style={{ minHeight: 60, fontSize: 18 }}>Book My Free Survey</button>
          <span className="form-note full">
            No obligation. We&apos;ll never share your details. See our <a href="#contact">privacy policy</a>.
          </span>
        </>
      )}
    </form>
  );
}
