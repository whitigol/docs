import { Download } from 'lucide-react';

const latestReleaseUrl = 'https://github.com/WhitigolSoftware/wLauncher/releases/latest';

export function WLauncherDownloadButton() {
  return (
    <a
      href={latestReleaseUrl}
      className="inline-flex h-9 items-center gap-2 rounded-lg bg-fd-primary px-4 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
    >
      <Download className="size-4" />
      Download the latest release
    </a>
  );
}
