import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import * as AccordionComponents from 'fumadocs-ui/components/accordion';
import {
  Braces,
  Check,
  Code,
  Download,
  FileCode,
  FileType,
  Folder,
  ListChecks,
  MessageCircle,
  Package,
  Plus,
  Settings,
  ShieldAlert,
  Terminal,
  TriangleAlert,
  Upload,
  Wrench,
  X,
} from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { WLauncherDownloadButton } from './wlauncher-download-button';

const Lucide = {
  Braces,
  Check,
  Code,
  Download,
  FileCode,
  FileType,
  Folder,
  ListChecks,
  MessageCircle,
  Package,
  Plus,
  Settings,
  ShieldAlert,
  Terminal,
  TriangleAlert,
  Upload,
  Wrench,
  X,
};

const ReactIcons = {
  SiDiscord,
};

function ZoomableImage(props: ComponentProps<'img'>) {
  return <ImageZoom {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...AccordionComponents,
    img: ZoomableImage,
    Lucide,
    ReactIcons,
    WLauncherDownloadButton,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
