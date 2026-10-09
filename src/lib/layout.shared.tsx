import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpenText, ScrollText } from 'lucide-react';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="size-6 invert dark:invert-0" />
          <span>{appName}</span>
        </div>
      ),
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        icon: <BookOpenText />,
        active: 'nested-url',
      },
      {
        text: 'Changelog',
        url: '/changelog',
        icon: <ScrollText />,
        active: 'nested-url',
      },
    ],
    themeSwitch: {
      enabled: false,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
