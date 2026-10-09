import { usePathname } from 'fumadocs-core/framework';
import type { Folder } from 'fumadocs-core/page-tree';
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  useFolder,
  useFolderDepth,
} from 'fumadocs-ui/components/sidebar/base';
import type { SidebarPageTreeComponents } from 'fumadocs-ui/components/sidebar/page-tree';
import { useTreePath } from 'fumadocs-ui/contexts/tree';
import {
  createContext,
  use,
  useEffect,
  useState,
  type Dispatch,
  type MouseEvent,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { cn } from '@/lib/cn';

type OpenRootFolder = string | false | null;

interface SidebarAccordionContextValue {
  openRootFolder: OpenRootFolder;
  setOpenRootFolder: Dispatch<SetStateAction<OpenRootFolder>>;
}

interface DocsSidebarAccordionProps {
  children: ReactNode;
  routePath: string;
}

interface SidebarAccordionState {
  openRootFolder: OpenRootFolder;
  routePath: string;
}

interface DocsSidebarFolderProps {
  item: Folder;
  children: ReactNode;
}

interface RootFolderStateSyncProps {
  active: boolean;
  folderId: string;
}

const SidebarAccordionContext =
  createContext<SidebarAccordionContextValue | null>(null);

const itemClassName =
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0 transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none';

export const docsSidebarComponents = {
  Folder: DocsSidebarFolder,
} satisfies Partial<SidebarPageTreeComponents>;

export function DocsSidebarAccordion({
  children,
  routePath,
}: DocsSidebarAccordionProps): ReactNode {
  const [state, setState] = useState<SidebarAccordionState>({
    openRootFolder: null,
    routePath,
  });
  const openRootFolder =
    state.routePath === routePath ? state.openRootFolder : null;

  function setOpenRootFolder(
    update: SetStateAction<OpenRootFolder>,
  ): void {
    setState((currentState) => {
      const currentFolder =
        currentState.routePath === routePath
          ? currentState.openRootFolder
          : null;
      const nextFolder =
        typeof update === 'function' ? update(currentFolder) : update;

      return { openRootFolder: nextFolder, routePath };
    });
  }

  return (
    <SidebarAccordionContext
      value={{ openRootFolder, setOpenRootFolder }}
    >
      {children}
    </SidebarAccordionContext>
  );
}

function DocsSidebarFolder({
  item,
  children,
}: DocsSidebarFolderProps): ReactNode {
  const accordion = use(SidebarAccordionContext);
  if (accordion === null) {
    throw new Error(
      'DocsSidebarFolder must be rendered inside DocsSidebarAccordion.',
    );
  }
  const { setOpenRootFolder } = accordion;

  const parentDepth = useFolderDepth();
  const pathname = usePathname();
  const treePath = useTreePath();
  const active = item.index
    ? isPathActive(item.index.url, pathname, true)
    : treePath.includes(item);
  const isRootFolder = parentDepth === 0;
  const folderId = isRootFolder ? getRootFolderId(item) : null;

  function toggleRootFolder(): void {
    if (folderId === null) {
      throw new Error('Cannot toggle a nested folder as a root folder.');
    }

    setOpenRootFolder((currentFolder) => {
      const isCurrentlyOpen =
        currentFolder === null ? active : currentFolder === folderId;
      return isCurrentlyOpen ? false : folderId;
    });
  }

  function handleRootFolderLink(event: MouseEvent<HTMLAnchorElement>): void {
    const target = event.target;
    if (
      target instanceof Element &&
      target.matches('[data-icon], [data-icon] *')
    ) {
      event.preventDefault();
    }

    toggleRootFolder();
  }

  return (
    <SidebarFolder
      active={active}
      collapsible={item.collapsible}
      defaultOpen={item.defaultOpen}
    >
      {folderId === null ? null : (
        <RootFolderStateSync active={active} folderId={folderId} />
      )}
      {item.index ? (
        <SidebarFolderLink
          {...(isRootFolder ? { onClick: handleRootFolderLink } : {})}
          href={item.index.url}
          active={isPathActive(item.index.url, pathname, false)}
          external={item.index.external}
          className={cn(
            itemClassName,
            'w-full data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary',
            parentDepth > 0 &&
              "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5",
          )}
          style={{ paddingInlineStart: getItemOffset(parentDepth) }}
        >
          {item.icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger
          className={cn(itemClassName, 'w-full')}
          style={{ paddingInlineStart: getItemOffset(parentDepth) }}
          onClick={isRootFolder ? toggleRootFolder : undefined}
        >
          {item.icon}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent
        className={cn(
          'relative flex flex-col gap-0.5 pt-0.5',
          parentDepth === 0 &&
            "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:inset-s-2.5",
        )}
      >
        {children}
      </SidebarFolderContent>
    </SidebarFolder>
  );
}

function RootFolderStateSync({
  active,
  folderId,
}: RootFolderStateSyncProps): null {
  const accordion = use(SidebarAccordionContext);
  const folder = useFolder();
  if (accordion === null) {
    throw new Error(
      'RootFolderStateSync must be rendered inside DocsSidebarAccordion.',
    );
  }
  if (folder === null) {
    throw new Error(
      'RootFolderStateSync must be rendered inside a Fumadocs sidebar folder.',
    );
  }

  const shouldOpen =
    accordion.openRootFolder === null
      ? active
      : accordion.openRootFolder === folderId;

  useEffect(() => {
    folder.setOpen(shouldOpen);
  }, [folder.setOpen, shouldOpen]);

  return null;
}

function getRootFolderId(item: Folder): string {
  if (item.index === undefined) {
    throw new Error(
      `Top-level documentation folder "${String(item.name)}" must have an index page to participate in the sidebar accordion.`,
    );
  }

  return item.index.url;
}

function getItemOffset(depth: number): string {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
}

function isPathActive(href: string, pathname: string, nested: boolean): boolean {
  const normalizedHref = normalizePath(href);
  const normalizedPathname = normalizePath(pathname);

  return (
    normalizedHref === normalizedPathname ||
    (nested && normalizedPathname.startsWith(`${normalizedHref}/`))
  );
}
