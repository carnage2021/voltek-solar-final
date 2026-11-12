/** Studio-style product renderings of three generic home battery formats, on a warm wall. */
export default function BatteryArt({ variant, dark = false }: { variant: 0 | 1 | 2; dark?: boolean }) {
  const wall = dark ? ['#3A3430', '#2B2724'] : ['#EFE9E1', '#E2DAD0'];
  const floor = dark ? '#211D1B' : '#D8CEC2';
  const id = `ba-${variant}-${dark ? 'd' : 'l'}`;
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label={['Compact wall-mounted battery', 'Stackable modular battery', 'Hybrid inverter with battery'][variant]}>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={wall[0]} />
          <stop offset="1" stopColor={wall[1]} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="78%" cy="18%" r="70%">
          <stop offset="0" stopColor="#F3CB8C" stopOpacity={dark ? 0.28 : 0.55} />
          <stop offset="1" stopColor="#F3CB8C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-unit`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBFAF7" />
          <stop offset="1" stopColor="#E4DED6" />
        </linearGradient>
        <linearGradient id={`${id}-dark`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A433E" />
          <stop offset="1" stopColor="#2B2724" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="6" dy="14" stdDeviation="10" floodColor="#2B2724" floodOpacity="0.28" />
        </filter>
      </defs>
      <rect width="400" height="260" fill={`url(#${id}-wall)`} />
      <rect width="400" height="260" fill={`url(#${id}-sun)`} />
      <rect y="214" width="400" height="46" fill={floor} />
      <rect y="213" width="400" height="2" fill="#2B2724" opacity="0.08" />

      {variant === 0 && (
        <g filter={`url(#${id}-sh)`}>
          <rect x="140" y="42" width="120" height="150" rx="18" fill={`url(#${id}-unit)`} />
          <rect x="140" y="42" width="120" height="150" rx="18" fill="none" stroke="#2B2724" strokeOpacity="0.08" />
          <circle cx="200" cy="96" r="13" fill="none" stroke="#C9894A" strokeWidth="2" />
          <path d="M202 86 L196 98 L203 98 L198 107" fill="none" stroke="#C9894A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="176" y="160" width="48" height="4" rx="2" fill="#2B2724" opacity="0.12" />
          <rect x="176" y="160" width="34" height="4" rx="2" fill="#D4F25A" />
          <rect x="190" y="192" width="20" height="22" fill="#9A918A" />
        </g>
      )}

      {variant === 1 && (
        <g filter={`url(#${id}-sh)`}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="146" y={70 + i * 48} width="108" height="44" rx="10" fill={`url(#${id}-unit)`} />
              <rect x="146" y={70 + i * 48} width="108" height="44" rx="10" fill="none" stroke="#2B2724" strokeOpacity="0.1" />
              <rect x="160" y={90 + i * 48} width="80" height="3" rx="1.5" fill="#2B2724" opacity="0.08" />
            </g>
          ))}
          <rect x="146" y="30" width="108" height="36" rx="10" fill={`url(#${id}-dark)`} />
          <circle cx="166" cy="48" r="4" fill="#D4F25A" />
          <rect x="180" y="45" width="56" height="6" rx="3" fill="#E8B36A" opacity="0.85" />
          <rect x="150" y="214" width="100" height="4" fill="#2B2724" opacity="0.15" />
        </g>
      )}

      {variant === 2 && (
        <g filter={`url(#${id}-sh)`}>
          <rect x="96" y="54" width="92" height="118" rx="14" fill={`url(#${id}-dark)`} />
          <rect x="114" y="74" width="56" height="30" rx="5" fill="#171412" />
          <path d="M120 96 L132 88 L142 92 L154 82 L164 86" fill="none" stroke="#E8B36A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="126" cy="150" r="4" fill="#D4F25A" />
          <rect x="136" y="148" width="34" height="4" rx="2" fill="#F6F3EE" opacity="0.3" />
          <rect x="204" y="40" width="104" height="174" rx="16" fill={`url(#${id}-unit)`} />
          <rect x="204" y="40" width="104" height="174" rx="16" fill="none" stroke="#2B2724" strokeOpacity="0.08" />
          <rect x="222" y="62" width="68" height="6" rx="3" fill="#C9894A" />
          <rect x="222" y="190" width="68" height="3" rx="1.5" fill="#2B2724" opacity="0.1" />
          <path d="M188 120 C196 120 196 130 204 130" fill="none" stroke="#5E564F" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
