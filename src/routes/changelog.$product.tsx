import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, BookOpen, CalendarDays, Tag, Tags, Users } from 'lucide-react';
import { getMDXComponents } from '@/components/mdx';
import { formatChangelogDate, getProductEntries } from '@/lib/changelog';
import { getProduct } from '@/lib/products';

export const Route = createFileRoute('/changelog/$product')({
  loader: ({ params }) => {
    const product = getProduct(params.product);
    if (product === undefined) throw notFound();

    return {
      productId: product.id,
      productName: product.name,
      productDescription: product.description,
    };
  },
  head: ({ loaderData }) => {
    if (loaderData === undefined) {
      throw new Error('Product changelog metadata loaded without route data.');
    }

    return {
      meta: [
        { title: `${loaderData.productName} Changelog | Whitigol Software` },
        { name: 'description', content: loaderData.productDescription },
      ],
    };
  },
  component: ProductChangelogPage,
});

function ProductChangelogPage() {
  const { productId } = Route.useLoaderData();
  const product = getProduct(productId);
  if (product === undefined) {
    throw new Error(`Unknown changelog product: ${productId}`);
  }

  const entries = getProductEntries(product.id);
  const ProductIcon = product.icon;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 md:py-24">
      <Link
        to="/changelog"
        className="mb-10 inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground"
      >
        <ArrowLeft className="size-4" /> All product changelogs
      </Link>

      <header className="mb-14 border-b pb-10">
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary">
          <ProductIcon className="size-7" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
        <p className="mt-4 text-lg leading-8 text-fd-muted-foreground">{product.description}</p>
        <a
          href={product.docsHref}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-fd-primary hover:underline"
        >
          <BookOpen className="size-4" /> View documentation
        </a>
      </header>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="font-medium">No updates published yet</h2>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            The first {product.name} changelog entry will appear here.
          </p>
        </div>
      ) : (
        <div className="relative space-y-14 before:absolute before:inset-y-2 before:left-[7px] before:w-px before:bg-fd-border">
          {entries.map((entry) => {
            const Entry = entry.body;

            return (
              <article key={entry.info.path} className="relative pl-10">
                <span className="absolute left-0 top-2 size-[15px] rounded-full border-4 border-fd-background bg-fd-primary" />
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fd-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    <time dateTime={entry.date}>{formatChangelogDate(entry.date)}</time>
                  </span>
                  {entry.version === undefined ? null : (
                    <span className="inline-flex items-center gap-2">
                      <Tag className="size-4" /> {entry.version}
                    </span>
                  )}
                  {entry.tags === undefined ? null : (
                    <span className="inline-flex items-center gap-2">
                      <Tags className="size-4" /> {entry.tags.join(', ')}
                    </span>
                  )}
                  {entry.authors === undefined ? null : (
                    <span className="inline-flex items-center gap-2">
                      <Users className="size-4" /> {entry.authors.join(', ')}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">{entry.title}</h2>
                <p className="mt-2 text-fd-muted-foreground">{entry.description}</p>
                <div className="prose mt-6">
                  <Entry components={getMDXComponents()} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
