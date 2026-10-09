import { llms, loader } from 'fumadocs-core/source';
import { defineDocs } from 'fumadocs-mdx/macro';
import { icons } from 'lucide-react';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { SiFivem, SiNpm } from 'react-icons/si';
import { DevMateLogo, WLauncherLogo } from '@/components/product-logo';
import { docsRoute } from './shared';

type IconComponent = ComponentType<{ className?: string }>;

const iconComponents: Readonly<Record<string, IconComponent>> = {
  ...icons,
  DevMateLogo,
  SiFivem,
  SiNpm,
  WLauncherLogo,
};

function resolveIcon(icon: string | undefined): ReactNode {
  if (icon === undefined) return undefined;

  const Icon = iconComponents[icon];
  if (Icon === undefined) {
    throw new Error(`Unknown documentation icon: ${icon}`);
  }

  return createElement(Icon, { className: 'size-4' });
}

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
  icon: resolveIcon,
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
