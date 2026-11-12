type Props = { size?: number; tone?: 'onLight' | 'onDark'; wordmark?: boolean; className?: string };

/** Voltek Solar mark — gold sun disc with a thin orbit ring and a charcoal bolt. */
export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ flex: 'none', display: 'block' }}>
      <defs>
        <linearGradient id="vk-disc" x1="20%" y1="10%" x2="85%" y2="90%">
          <stop offset="0" stopColor="#F0C27E" />
          <stop offset="0.55" stopColor="#E8B36A" />
          <stop offset="1" stopColor="#D2934F" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46.5" fill="none" stroke="#E8CBA8" strokeWidth="2.6" />
      <circle cx="50" cy="50" r="38" fill="url(#vk-disc)" />
      <path d="M55.6 17.5 L52.6 42.6 L68.2 42.6 L41.2 81.4 L46.4 55.2 L30.6 55.2 Z" fill="#2B2724" />
    </svg>
  );
}

/** Full logo: mark + VOLTEK / SOLAR wordmark. */
export default function Logo({ size = 38, tone = 'onLight', wordmark = true, className }: Props) {
  const fg = tone === 'onDark' ? '#F6F3EE' : '#2B2724';
  const sub = tone === 'onDark' ? '#E8B36A' : '#A86A33';
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, lineHeight: 1 }}>
      <LogoMark size={size} />
      {wordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: size * 0.1 }}>
          <span style={{ fontWeight: 700, fontSize: size * 0.56, letterSpacing: '-0.035em', color: fg, transition: 'color .4s' }}>VOLTEK</span>
          <span style={{ fontWeight: 500, fontSize: size * 0.2, letterSpacing: '0.62em', color: sub, transition: 'color .4s' }}>SOLAR</span>
        </span>
      )}
    </span>
  );
}
