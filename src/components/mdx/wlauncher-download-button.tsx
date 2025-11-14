import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Loader2, TriangleAlertIcon } from "lucide-react";

export function WLauncherDownloadButton() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["wlauncher-latest-version"],
		queryFn: async () => {
			const response = await fetch("https://api.github.com/repos/WhitigolSoftware/wLauncher/releases/latest");
			const data = await response.json();
			const exePath = data.assets.find((asset: { name: string }) => asset.name.endsWith(".exe"))?.browser_download_url;
			return {
				version: data.tag_name,
				exePath: exePath,
			};
		},
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 24,
	});

	return (
		<>
			{error ? (
				<div className="flex flex-row items-center gap-2">
					<TriangleAlertIcon className="size-4" />
					<p>Failed to fetch the latest release</p>
					<a href="https://github.com/WhitigolSoftware/wLauncher/releases/latest" target="_blank">
						<Button variant="outline" className="h-6 cursor-pointer">
							Go to Releases
						</Button>
					</a>
				</div>
			) : isLoading ? (
				<Loader2 className="size-4 animate-spin" />
			) : (
				<a href={data?.exePath} download className="h-6">
					<Button className="h-6 cursor-pointer">Download {data?.version}</Button>
				</a>
			)}
		</>
	);
}
