import { defineCollections } from 'fumadocs-mdx/macro';
import { z } from 'zod';
import { productIds, type ProductId } from './products';

export const changelog = defineCollections({
  type: 'doc',
  dir: 'content/changelog',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.iso.date(),
    product: z.enum(productIds),
    version: z.string().min(1).optional(),
    tags: z.array(z.string().min(1)).min(1).optional(),
    authors: z.array(z.string().min(1)).min(1).optional(),
  }),
});

export type ChangelogEntry = (typeof changelog.entries)[number];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function getProductEntries(productId: ProductId): ChangelogEntry[] {
  return changelog.entries
    .filter((entry) => entry.product === productId)
    .sort((left, right) => {
      const dateOrder = right.date.localeCompare(left.date);
      if (dateOrder !== 0) return dateOrder;

      return (right.version ?? '').localeCompare(left.version ?? '', undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
}

export function formatChangelogDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}
