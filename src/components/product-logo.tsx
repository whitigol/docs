interface ProductLogoProps {
  className?: string;
}

export function DevMateLogo({ className }: ProductLogoProps) {
  return (
    <img
      src="/icons/devmate.svg"
      alt=""
      aria-hidden="true"
      className={`${className ?? 'size-4'} shrink-0 object-contain`}
    />
  );
}

export function WLauncherLogo({ className }: ProductLogoProps) {
  return (
    <img
      src="/icons/wlauncher.svg"
      alt=""
      aria-hidden="true"
      className={`${className ?? 'size-4'} shrink-0 object-contain`}
    />
  );
}
