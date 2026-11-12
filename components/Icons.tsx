export const ICON_PATHS = {
  panel: 'M4 8 L24 8 L22 20 L6 20 Z M10 8 L9 20 M18 8 L19 20 M5 14 L23 14 M14 20 L14 25 M10 25 L18 25',
  battery: 'M7 6 H21 V25 H7 Z M11 3 H17 V6 M11 13 L14 10 L14 15 L17 12 M10 20 H18',
  ev: 'M8 4 H18 V25 H8 Z M11 9 H15 M18 12 H21 V20 A2 2 0 0 0 25 20 V10 L23 8 M12 14 L10 18 H14 L12 22',
  commercial: 'M3 25 H25 M5 25 V12 H12 V25 M12 25 V6 H22 V25 M15 10 H19 M15 14 H19 M15 18 H19',
  repair: 'M14 3 A11 11 0 1 0 14.01 3 M14 8 V14 L18 17',
  sun: 'M14 9 A5 5 0 1 0 14.01 9 M14 2 V5 M14 23 V26 M2 14 H5 M23 14 H26 M5.5 5.5 L7.6 7.6 M20.4 20.4 L22.5 22.5 M5.5 22.5 L7.6 20.4 M20.4 7.6 L22.5 5.5',
  home: 'M4 13 L14 4 L24 13 M7 11 V24 H21 V11 M12 24 V17 H16 V24',
  moon: 'M20 17 A8 8 0 1 1 11 6 A6.5 6.5 0 0 0 20 17 Z',
} as const;

export type IconName = keyof typeof ICON_PATHS;

export function Icon({ name, size = 28, color = 'currentColor', stroke = 1.6 }: { name: IconName; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function Shield({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}
