import type { ComponentType } from 'react';
import { Monitor, Package } from 'lucide-react';
import { SiFivem, SiNpm } from 'react-icons/si';
import { DevMateLogo, WLauncherLogo } from '../components/product-logo';

export const productIds = ['wlauncher', 'devmate', 'create-fivem', 'fivem-compiler'] as const;
export const productSectionIds = ['software', 'fivem-scripts', 'npm-packages'] as const;

export type ProductId = (typeof productIds)[number];
export type ProductSectionId = (typeof productSectionIds)[number];

export interface Product {
  id: ProductId;
  section: ProductSectionId;
  name: string;
  description: string;
  docsHref: string;
  icon: ComponentType<{ className?: string }>;
}

export interface ProductSection {
  id: ProductSectionId;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export const productSections = [
  {
    id: 'software',
    name: 'Software',
    description: 'Desktop applications and tools.',
    icon: Monitor,
  },
  {
    id: 'fivem-scripts',
    name: 'FiveM Scripts',
    description: 'Resources for FiveM servers and developers.',
    icon: SiFivem,
  },
  {
    id: 'npm-packages',
    name: 'NPM Packages',
    description: 'Packages and project tooling published on npm.',
    icon: SiNpm,
  },
] as const satisfies readonly ProductSection[];

export const products = [
  {
    id: 'wlauncher',
    section: 'software',
    name: 'wLauncher',
    description: 'Releases and improvements for the FiveM launcher.',
    docsHref: '/docs/software/wlauncher',
    icon: WLauncherLogo,
  },
  {
    id: 'devmate',
    section: 'fivem-scripts',
    name: 'DevMate',
    description: 'FiveM development and server-management updates.',
    docsHref: '/docs/fivem-scripts/devmate',
    icon: DevMateLogo,
  },
  {
    id: 'create-fivem',
    section: 'npm-packages',
    name: 'create-fivem',
    description: 'Changes to the FiveM project scaffolding experience.',
    docsHref: '/docs/npm-packages/create-fivem',
    icon: Package,
  },
  {
    id: 'fivem-compiler',
    section: 'npm-packages',
    name: 'fivem-compiler',
    description: 'Compiler features, fixes, and compatibility updates.',
    docsHref: '/docs/npm-packages/fivem-compiler',
    icon: Package,
  },
] as const satisfies readonly Product[];

export function getProduct(productId: string): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getSectionProducts(sectionId: ProductSectionId): Product[] {
  return products.filter((product) => product.section === sectionId);
}
