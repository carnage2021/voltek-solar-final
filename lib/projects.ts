import { IMG } from './site';

export type Svc = 'solar' | 'battery' | 'ev' | 'commercial';
export const SVC_LABEL: Record<Svc, string> = { solar: 'Solar panels', battery: 'Battery', ev: 'EV charger', commercial: 'Commercial' };

/** SAMPLE project list — swap in real installs (photos, sizes, dates) when available. */
export const PROJECTS: { town: string; svc: Svc; size: string; prop: string; bat: 'Yes' | 'No'; date: string; img: string; alt: string }[] = [
  { town: 'Ramsgate', svc: 'battery', size: '4.8kW + 9.5kWh', prop: 'Semi-detached', bat: 'Yes', date: 'Oct 2026', img: IMG.installers, alt: 'Installers fitting panels on a Ramsgate roof' },
  { town: 'Canterbury', svc: 'solar', size: '4.1kW', prop: 'Terraced', bat: 'No', date: 'Sep 2026', img: IMG.ukRoof, alt: 'Solar panels on a tiled Canterbury roof' },
  { town: 'Whitstable', svc: 'battery', size: '5.2kW + 5kWh', prop: 'Detached', bat: 'Yes', date: 'Sep 2026', img: IMG.installerRoof, alt: 'Installer placing a panel on a Whitstable home' },
  { town: 'Deal', svc: 'ev', size: '3.6kW + EV charger', prop: 'Detached', bat: 'No', date: 'Aug 2026', img: IMG.ev, alt: 'EV charging at a home in Deal' },
  { town: 'Sandwich', svc: 'commercial', size: '48kW', prop: 'Warehouse', bat: 'No', date: 'Aug 2026', img: IMG.commercialArray, alt: 'Commercial solar array in Sandwich' },
  { town: 'Margate', svc: 'solar', size: '3.9kW', prop: 'Semi-detached', bat: 'No', date: 'Jul 2026', img: IMG.homeClassic, alt: 'Family home in Margate' },
  { town: 'Broadstairs', svc: 'battery', size: '10kWh add-on', prop: 'Bungalow', bat: 'Yes', date: 'Jul 2026', img: IMG.homeModern, alt: 'Modern bungalow in Broadstairs' },
  { town: 'Herne Bay', svc: 'solar', size: '6.4kW', prop: 'Detached', bat: 'No', date: 'Jun 2026', img: IMG.panelsTrees, alt: 'Solar panels beside trees in Herne Bay' },
  { town: 'Dover', svc: 'ev', size: '7kW charger', prop: 'Terraced', bat: 'No', date: 'Jun 2026', img: IMG.homeEvening, alt: 'Home in Dover at dusk' },
  { town: 'Folkestone', svc: 'battery', size: '5.4kW + 9.5kWh', prop: 'Semi-detached', bat: 'Yes', date: 'May 2026', img: IMG.panelsSky, alt: 'Solar panels under a bright Folkestone sky' },
  { town: 'Canterbury', svc: 'commercial', size: '96kW', prop: 'School', bat: 'No', date: 'Apr 2026', img: IMG.commercialRoof, alt: 'School roof with large solar array in Canterbury' },
  { town: 'Ramsgate', svc: 'solar', size: '4.4kW', prop: 'Terraced', bat: 'No', date: 'Mar 2026', img: IMG.panelsHands, alt: 'Close-up of an installer handling a solar panel' },
];
