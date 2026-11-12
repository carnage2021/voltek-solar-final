'use client';

export default function ToTop() {
  return (
    <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Back to top <span aria-hidden="true">↑</span>
    </button>
  );
}
