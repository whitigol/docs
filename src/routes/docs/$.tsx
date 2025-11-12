import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { source } from "@/lib/source";
import type * as PageTree from "fumadocs-core/page-tree";
import { useMemo, useState, useEffect } from "react";
import { docs } from "@/.source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { createClientLoader } from "fumadocs-mdx/runtime/vite";
import { baseOptions } from "@/lib/layout.shared";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Io from "react-icons/io5";
import * as Si from "react-icons/si";
import * as icons from "lucide-static";
import getMDXComponents from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export const Route = createFileRoute("/docs/$")({
	component: Page,
	loader: async ({ params }) => {
		const slugs = params._splat?.split("/") ?? [];
		const data = await loader({ data: slugs });
		await clientLoader.preload(data.path);
		return data;
	},
});

const loader = createServerFn({
	method: "GET",
})
	.inputValidator((slugs: string[]) => slugs)
	.handler(async ({ data: slugs }) => {
		const page = source.getPage(slugs);
		if (!page) throw notFound();

		return {
			tree: source.pageTree as object,
			path: page.path,
			lastModifiedTime: page.data.lastModified,
		};
	});

const clientLoader = createClientLoader(docs.doc, {
	id: "docs",
	component({ toc, frontmatter, default: MDX }) {
		const data = Route.useLoaderData();
		const [isClient, setIsClient] = useState(false);

		useEffect(() => {
			setIsClient(true);
		}, []);

		return (
			<DocsPage
				toc={toc}
				tableOfContent={{
					style: "clerk",
				}}
			>
				<DocsTitle>{frontmatter.title}</DocsTitle>
				<DocsDescription>{frontmatter.description}</DocsDescription>
				<DocsBody>
					<MDX components={getMDXComponents() as any} />
				</DocsBody>
				<div className="flex flex-row flex-wrap items-center justify-between gap-4 empty:hidden">
					<a
						href={`https://github.com/whitigol/docs/blob/main/content/docs/${data.path}`}
						target="_blank"
						className="focus-visible:ring-fd-ring bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent/90 hover:text-fd-accent-foreground not-prose inline-flex items-center justify-center gap-1.5 rounded-md border p-2 px-2 py-1.5 text-xs font-medium transition-colors duration-100 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
						rel="noopener noreferrer"
					>
						<EditIcon className="size-3.5" />
						<span>Edit on GitHub</span>
					</a>

					<p className="text-muted-foreground text-sm">
						Last updated: {isClient && data.lastModifiedTime ? new Date(data.lastModifiedTime).toLocaleDateString() : data.lastModifiedTime ? "Loading..." : "Unknown"}
					</p>
				</div>
			</DocsPage>
		);
	},
});

function Page() {
	const data = Route.useLoaderData();
	const Content = clientLoader.getComponent(data.path);

	// Transform tree only on client to avoid serialization issues during SSR
	const tree = useMemo(() => {
		// Only transform on client side (browser)
		if (typeof window !== "undefined") {
			return transformPageTree(data.tree as PageTree.Root);
		}
		// On server, return original tree (with string icons)
		return data.tree as PageTree.Root;
	}, [data.tree]);

	return (
		<DocsLayout
			{...baseOptions()}
			sidebar={{
				collapsible: true,
			}}
			tree={tree}
		>
			<Content />
		</DocsLayout>
	);
}

function transformPageTree(root: PageTree.Root): PageTree.Root {
	const resolveIcon = (iconName: string): React.ReactNode | undefined => {
		if (iconName.startsWith("Bs")) {
			const Component = Bs[iconName as keyof typeof Bs];
			if (Component) {
				return (
					<span data-icon-name={iconName} data-icon-type="react-icon" data-icon-library="Bs">
						<Component className="h-4 w-4" />
					</span>
				);
			}
		}

		if (iconName.startsWith("Fa")) {
			const Component = Fa[iconName as keyof typeof Fa];
			if (Component) {
				return (
					<span data-icon-name={iconName} data-icon-type="react-icon" data-icon-library="Fa">
						<Component className="h-4 w-4" />
					</span>
				);
			}
		}

		if (iconName.startsWith("Md")) {
			const Component = Md[iconName as keyof typeof Md];
			if (Component) {
				return (
					<span data-icon-name={iconName} data-icon-type="react-icon" data-icon-library="Md">
						<Component className="h-4 w-4" />
					</span>
				);
			}
		}

		if (iconName.startsWith("Io")) {
			const Component = Io[iconName as keyof typeof Io];
			if (Component) {
				return (
					<span data-icon-name={iconName} data-icon-type="react-icon" data-icon-library="Io">
						<Component className="h-4 w-4" />
					</span>
				);
			}
		}

		if (iconName.startsWith("Si")) {
			const Component = Si[iconName as keyof typeof Si];
			if (Component) {
				return (
					<span data-icon-name={iconName} data-icon-type="react-icon" data-icon-library="Si">
						<Component className="h-4 w-4" />
					</span>
				);
			}
		}

		if (iconName in icons) {
			return (
				<span
					className="inline-block h-4 w-4"
					data-icon-name={iconName}
					data-icon-type="lucide"
					dangerouslySetInnerHTML={{
						__html: icons[iconName as keyof typeof icons],
					}}
				/>
			);
		}

		// Fallback for custom HTML icons
		return (
			<span
				data-icon-name={iconName}
				data-icon-type="html-fallback"
				dangerouslySetInnerHTML={{
					__html: iconName,
				}}
			/>
		);
	};

	const transformNode = (node: PageTree.Node): PageTree.Node => {
		const transformed: PageTree.Node = { ...node };

		// Transform icon if it's a string
		if (typeof node.icon === "string") {
			const iconName = node.icon as string;
			const resolved = resolveIcon(iconName);
			if (resolved) {
				(transformed as any).icon = resolved as React.ReactElement;
			}
		}

		// Handle folder nodes
		if (node.type === "folder") {
			const folderNode = transformed as PageTree.Folder;
			folderNode.children = node.children.map(transformNode);

			// Handle folder index icon if it exists
			if (node.index) {
				folderNode.index = { ...node.index };
				if (typeof node.index.icon === "string") {
					const iconName = node.index.icon as string;
					const resolved = resolveIcon(iconName);
					if (resolved) {
						(folderNode.index as any).icon = resolved as React.ReactElement;
					}
				}
			}
		}

		return transformed;
	};

	const transformedRoot: PageTree.Root = {
		...root,
		children: root.children.map(transformNode),
	};

	// Handle fallback if it exists
	if ("fallback" in root && root.fallback) {
		(transformedRoot as any).fallback = {
			...root.fallback,
			children: root.fallback.children.map(transformNode),
		};
	}

	return transformedRoot;
}
