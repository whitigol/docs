import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Monitor, ScrollText } from 'lucide-react';
import type { ReactNode } from 'react';
import { SiFivem, SiNpm } from 'react-icons/si';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-14 px-6 py-20 md:py-28">
        <section className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.svg" alt="Whitigol Software" className="size-12 invert dark:invert-0" />
            <span className="text-sm font-medium tracking-wide text-fd-muted-foreground">WHITIGOL SOFTWARE</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Build, configure, and ship with confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">
            Guides and references for Whitigol Software, npm packages, and FiveM resources.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/docs/$"
              params={{ _splat: '' }}
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground"
            >
              Browse documentation <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/changelog"
              className="inline-flex items-center gap-2 rounded-lg border bg-fd-card px-4 py-2.5 text-sm font-medium"
            >
              <ScrollText className="size-4" /> Changelog
            </Link>
          </div>
        </section>

        <section aria-label="Documentation sections" className="grid gap-4 md:grid-cols-3">
          <SectionCard
            title="Software"
            description="Setup and usage guides for desktop software."
            slug="software"
            icon={<Monitor className="size-5" />}
          />
          <SectionCard
            title="npm packages"
            description="References for project tooling and packages."
            slug="npm-packages"
            icon={<SiNpm className="size-5" />}
          />
          <SectionCard
            title="FiveM scripts"
            description="Installation, configuration, and API references."
            slug="fivem-scripts"
            icon={<SiFivem className="size-5" />}
          />
        </section>
      </main>
    </HomeLayout>
  );
}

function SectionCard({
  title,
  description,
  slug,
  icon,
}: {
  title: string;
  description: string;
  slug: string;
  icon: ReactNode;
}) {
  return (
    <Link
      to="/docs/$"
      params={{ _splat: slug }}
      className="group rounded-xl border bg-fd-card p-6 transition-colors hover:bg-fd-accent"
    >
      <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
        {icon}
      </div>
      <h2 className="font-medium">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{description}</p>
      <ArrowRight className="mt-5 size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
