import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-sunset" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container stack" style={{ paddingTop: 140, paddingBottom: 100, gap: 24 }}>
        <span className="eyebrow">404 · Page not found</span>
        <h1 className="h1">
          This page is <span className="grad-deep">off-grid</span>
        </h1>
        <p className="lead">The page you were looking for has moved or no longer exists.</p>
        <div className="btn-row">
          <Link href="/" className="btn btn--dark">Back to homepage</Link>
          <Link href="/book-a-survey" className="btn btn--ghost-dark">Book a Free Survey</Link>
        </div>
      </div>
    </section>
  );
}
