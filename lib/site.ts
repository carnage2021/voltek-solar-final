/**
 * Central business details for Voltek Solar.
 * Every value marked "SAMPLE" is illustrative content from the design phase —
 * replace it with the real figure before launch.
 */
export const SITE = {
  name: 'Voltek Solar',
  url: 'https://www.voltek-solar.co.uk', // SAMPLE domain
  phoneDisplay: '01843 123 456', // SAMPLE
  phoneHref: 'tel:+441843123456', // SAMPLE
  whatsapp: 'https://wa.me/441843123456', // SAMPLE
  email: 'hello@voltek-solar.co.uk', // SAMPLE
  address: '12 Harbour Street, Ramsgate, Kent CT11 8HA', // SAMPLE
  hours: 'Mon–Fri 8:00–18:00 · Sat 9:00–13:00', // SAMPLE
  companyNo: '12345678', // SAMPLE
  googleRating: '4.9', // SAMPLE
  googleReviews: '127', // SAMPLE
  responseHours: '24', // SAMPLE
};

export const IMG = {
  hero: '/images/hero-rooftop-sunset.jpg',
  panelsCloseup: '/images/panels-closeup.jpg',
  ukRoof: '/images/uk-home-roof-solar.jpg',
  installers: '/images/installers-fitting-panels.jpg',
  installerRoof: '/images/installer-on-roof.jpg',
  ev: '/images/ev-charging.jpg',
  commercialRoof: '/images/commercial-roof.jpg',
  commercialArray: '/images/commercial-array.jpg',
  solarFarm: '/images/solar-farm-aerial.jpg',
  homeDusk: '/images/home-dusk.jpg',
  homeModern: '/images/home-modern.jpg',
  homeEvening: '/images/home-evening.jpg',
  homeClassic: '/images/home-classic.jpg',
  panelsSky: '/images/panels-sky.jpg',
  panelsField: '/images/panels-field.jpg',
  panelsHands: '/images/panels-hands.jpg',
  panelsTrees: '/images/panels-trees.jpg',
  panelsGrass: '/images/panels-grass.jpg',
  panelsMeadow: '/images/panels-meadow.jpg',
  kentFields: '/images/kent-fields-dusk.jpg',
  interior: '/images/interior-living.jpg',
} as const;

export const AVATARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((k) => `/images/avatar-${k}.jpg`);

export type NavKey = 'solar' | 'battery' | 'ev' | 'commercial' | 'projects' | 'about' | 'contact' | '';

export const NAV_LINKS: { label: string; href: string; key: NavKey }[] = [
  { label: 'Solar Panels', href: '/#solutions', key: 'solar' },
  { label: 'Batteries', href: '/battery-storage', key: 'battery' },
  { label: 'EV Chargers', href: '/#scale', key: 'ev' },
  { label: 'Commercial', href: '/#scale', key: 'commercial' },
  { label: 'Projects', href: '/projects', key: 'projects' },
  { label: 'About', href: '/#why', key: 'about' },
  { label: 'Contact', href: '/#contact', key: 'contact' },
];

export const TRUST = ['MCS', 'NICEIC / NAPIT', 'RECC / HIES', 'TrustMark'];

export type Town = {
  slug: string;
  name: string;
  pc: string;
  near: string;
  x: number;
  y: number;
  hero: string;
};

export const TOWNS: Town[] = [
  { slug: 'margate', name: 'Margate', pc: 'CT9', near: 'Westgate-on-Sea and Birchington', x: 81, y: 8, hero: IMG.homeClassic },
  { slug: 'ramsgate', name: 'Ramsgate', pc: 'CT11 & CT12', near: 'Minster and Cliffsend', x: 87, y: 22, hero: IMG.ukRoof },
  { slug: 'broadstairs', name: 'Broadstairs', pc: 'CT10', near: 'St Peter’s and Kingsgate', x: 92, y: 15, hero: IMG.homeModern },
  { slug: 'canterbury', name: 'Canterbury', pc: 'CT1–CT4', near: 'Sturry, Bridge and Chartham', x: 20, y: 37, hero: IMG.installers },
  { slug: 'herne-bay', name: 'Herne Bay', pc: 'CT6', near: 'Herne and Reculver', x: 30, y: 12, hero: IMG.homeEvening },
  { slug: 'whitstable', name: 'Whitstable', pc: 'CT5', near: 'Tankerton and Seasalter', x: 9, y: 16, hero: IMG.installerRoof },
  { slug: 'deal', name: 'Deal', pc: 'CT14', near: 'Walmer and Kingsdown', x: 84, y: 52, hero: IMG.homeDusk },
  { slug: 'dover', name: 'Dover', pc: 'CT15–CT17', near: 'River and St Margaret’s', x: 67, y: 77, hero: IMG.panelsTrees },
  { slug: 'sandwich', name: 'Sandwich', pc: 'CT13', near: 'Ash and Eastry', x: 72, y: 38, hero: IMG.panelsMeadow },
  { slug: 'folkestone', name: 'Folkestone', pc: 'CT18–CT20', near: 'Hythe and Hawkinge', x: 37, y: 89, hero: IMG.panelsSky },
];

export const townBySlug = (slug: string) => TOWNS.find((t) => t.slug === slug);

/** Postcode district prefill for the survey form when arriving from a town page. */
export const TOWN_PC: Record<string, string> = {
  margate: 'CT9', ramsgate: 'CT11', broadstairs: 'CT10', canterbury: 'CT1', 'herne-bay': 'CT6',
  whitstable: 'CT5', deal: 'CT14', dover: 'CT16', sandwich: 'CT13', folkestone: 'CT20',
};

/** SAMPLE reviews — replace with verified Google reviews before launch. */
export const REVIEWS = [
  { name: 'Sarah M.', town: 'Margate', sys: 'Solar + battery', text: 'From survey to switch-on in under three weeks. The team were tidy, explained everything, and our bills have dropped by more than half.' },
  { name: 'David R.', town: 'Canterbury', sys: 'Solar panels', text: 'No hard sell, just straight answers. They designed around our awkward roof and the system is producing more than the estimate.' },
  { name: 'Emma T.', town: 'Broadstairs', sys: 'Battery add-on', text: 'We added a battery to our old panels. Now we run the evening almost entirely on our own sunshine. Brilliant aftercare too.' },
  { name: 'James P.', town: 'Herne Bay', sys: 'Solar + EV charger', text: 'The charger now tops the car up from the roof on sunny days. Paperwork, DNO and MCS were all handled for us.' },
  { name: 'Priya K.', town: 'Folkestone', sys: 'Solar panels', text: 'Clear, fixed quote and they turned up exactly when they said. The app makes it easy to see what we generate each day.' },
  { name: 'Tom W.', town: 'Dover', sys: 'Solar + battery', text: 'Local team, proper engineers. Two days on site and the scaffold was gone. Would recommend to anyone in East Kent.' },
];

export const CREDITS = [
  { what: 'Domestic roof with solar panels', who: 'Albert Bridge', license: 'CC BY-SA 2.0', href: 'https://commons.wikimedia.org/w/index.php?curid=124065266' },
  { what: 'Installers fitting panels', who: '1010 Climate Action', license: 'CC BY 2.0', href: 'https://www.flickr.com/photos/39570195@N08/15765885464' },
  { what: 'Other photography', who: 'Unsplash contributors', license: 'Unsplash License', href: 'https://unsplash.com/license' },
];
