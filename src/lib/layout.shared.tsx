import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<div className="flex items-center gap-2">
					<img src="/logo.svg" alt="Whitigol Software" className="size-6" />
					<span>Whitigol Software</span>
				</div>
			),
		},
		githubUrl: "https://github.com/whitigol/docs/",
	};
}
