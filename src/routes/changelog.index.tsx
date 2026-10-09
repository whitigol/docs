import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { formatChangelogDate, getProductEntries } from '@/lib/changelog';
import {
  getSectionProducts,
  productSections,
  type Product,
  type ProductSection,
} from '@/lib/products';

export const Route = createFileRoute('/changelog/')({
  head: () => ({
    meta: [
      { title: 'Product Changelogs | Whitigol Software' },
      {
        name: 'description',
        content: 'Release histories and product updates from Whitigol Software.',
      },
    ],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-fd-primary">PRODUCT UPDATES</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Changelogs</h1>
        <p className="mt-4 text-lg leading-8 text-fd-muted-foreground">
          Follow releases, fixes, and improvements for each Whitigol Software product.
        </p>
      </header>

      <div className="mt-14 space-y-14">
        {productSections.map((section) => (
          <ProductSectionGroup key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}

function ProductSectionGroup({ section }: { section: ProductSection }) {
  const sectionProducts = getSectionProducts(section.id);
  const SectionIcon = section.icon;

  return (
    <section aria-labelledby={`${section.id}-heading`}>
      <div className="mb-5 flex items-center gap-4 border-b pb-5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
          <SectionIcon className="size-5" />
        </div>
        <div>
          <h2 id={`${section.id}-heading`} className="text-xl font-semibold">
            {section.name}
          </h2>
          <p className="mt-1 text-sm text-fd-muted-foreground">{section.description}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sectionProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const entries = getProductEntries(product.id);
  const latestEntry = entries[0];
  const ProductIcon = product.icon;

  return (
    <Link
      to="/changelog/$product"
      params={{ product: product.id }}
      className="group flex min-h-60 flex-col rounded-xl border bg-fd-card p-6 transition-colors hover:bg-fd-accent"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
          <ProductIcon className="size-6" />
        </div>
        <span className="rounded-full border px-2.5 py-1 text-xs text-fd-muted-foreground">
          {entries.length} {entries.length === 1 ? 'update' : 'updates'}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{product.description}</p>

      <div className="mt-auto pt-6">
        {latestEntry === undefined ? (
          <p className="text-sm text-fd-muted-foreground">No updates published yet.</p>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
              <CalendarDays className="size-3.5" />
              <time dateTime={latestEntry.date}>{formatChangelogDate(latestEntry.date)}</time>
            </div>
            <p className="mt-1.5 text-sm font-medium">{latestEntry.title}</p>
          </div>
        )}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-fd-primary">
          View changelog <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
