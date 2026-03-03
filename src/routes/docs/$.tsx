import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { source } from "@/lib/source";
import browserCollections from "fumadocs-mdx:collections/browser";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
	PageLastUpdate,
} from "fumadocs-ui/layouts/docs/page";
import { baseOptions } from "@/lib/layout.shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import React, { Suspense } from "react";
import getMDXComponents from "@/components/mdx";
import { EditIcon } from "lucide-react";

export const Route = createFileRoute("/docs/$")({
	component: Page,
	loader: async ({ params }) => {
		const slugs = params._splat?.split("/") ?? [];
		const data = await serverLoader({ data: slugs });
		await clientLoader.preload(data.path);
		return data;
	},
});

const serverLoader = createServerFn({
	method: "GET",
})
	.inputValidator((slugs: string[]) => slugs)
	.handler(async ({ data: slugs }) => {
		const page = source.getPage(slugs);
		if (!page) throw notFound();

		return {
			path: page.path,
			pageTree: await source.serializePageTree(source.getPageTree()),
			lastModified: (page as { data?: { lastModified?: Date } }).data?.lastModified,
		};
	});

type PageProps = {
	path?: string;
	lastModified?: Date | string;
};

const clientLoader = browserCollections.docs.createClientLoader({
	component(
		{ toc, frontmatter, default: MDX },
		props: PageProps | undefined,
	) {
		const lastModifiedDate =
			props?.lastModified != null
				? typeof props.lastModified === "string"
					? new Date(props.lastModified)
					: props.lastModified
				: undefined;

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
						href={`https://github.com/whitigol/docs/blob/main/content/docs/${props?.path ?? ""}`}
						target="_blank"
						rel="noreferrer noopener"
						className="focus-visible:ring-fd-ring bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent/90 hover:text-fd-accent-foreground not-prose inline-flex items-center justify-center gap-1.5 rounded-md border p-2 px-2 py-1.5 text-xs font-medium transition-colors duration-100 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
					>
						<EditIcon className="size-3.5" />
						<span>Edit on GitHub</span>
					</a>
					{lastModifiedDate && <PageLastUpdate date={lastModifiedDate} />}
				</div>
			</DocsPage>
		);
	},
});

function Page() {
	const data = useFumadocsLoader(Route.useLoaderData());

	return (
		<DocsLayout {...baseOptions()} tree={data.pageTree} sidebar={{ collapsible: true }}>
			<Suspense>
				{clientLoader.useContent(data.path, {
					path: data.path,
					lastModified: data.lastModified,
				})}
			</Suspense>
		</DocsLayout>
	);
}
