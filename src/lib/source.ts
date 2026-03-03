import { loader } from "fumadocs-core/source";
import { docs } from "fumadocs-mdx:collections/server";
import { resolveIcon } from "@/lib/resolve-icon";

export const source = loader({
	source: docs.toFumadocsSource(),
	baseUrl: "/docs",
	icon(icon) {
		if (typeof icon === "string") return resolveIcon(icon);
		return icon;
	},
});
