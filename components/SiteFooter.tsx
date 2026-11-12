import Link from 'next/link';
import Logo from './Logo';
import { Shield } from './Icons';
import ToTop from './ToTop';
import { CREDITS, SITE, TOWNS, TRUST } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo size={44} tone="onDark" />
            <p>MCS-certified solar, battery and EV charger installers serving homes and businesses across East Kent.</p>
          </div>
          <nav aria-label="Company" className="footer__col">
            <strong>Company</strong>
            <Link href="/#why">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/book-a-survey">Book a Survey</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <nav aria-label="Services" className="footer__col">
            <strong>Services</strong>
            <Link href="/#solutions">Solar panels</Link>
            <Link href="/battery-storage">Battery storage</Link>
            <Link href="/battery-storage#pricing">Battery add-on</Link>
            <Link href="/#scale">EV chargers</Link>
            <Link href="/#scale">Commercial solar</Link>
            <Link href="/book-a-survey?service=repair">Maintenance &amp; repairs</Link>
          </nav>
          <nav aria-label="Areas covered" className="footer__col">
            <strong>Areas</strong>
            {TOWNS.map((t) => (
              <Link key={t.slug} href={`/areas/${t.slug}`}>Solar panels {t.name}</Link>
            ))}
          </nav>
        </div>
        <div className="trust-row">
          {TRUST.map((t) => (
            <div key={t} className="trust-tile"><Shield /> {t}</div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Voltek Solar Ltd · Company no. {SITE.companyNo}</span>
          <div className="footer__legal">
            <Link href="/#contact">Privacy</Link>
            <Link href="/#contact">Cookies</Link>
            <Link href="/#contact">Terms</Link>
            <Link href="/#contact">Complaints</Link>
          </div>
          <ToTop />
        </div>
        <p className="footer__credits">
          Photography:{' '}
          {CREDITS.map((c, i) => (
            <span key={c.who}>
              {c.what} by <a href={c.href} target="_blank" rel="noopener noreferrer">{c.who}</a> ({c.license}){i < CREDITS.length - 1 ? ' · ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
