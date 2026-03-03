import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";

export const docs = defineDocs({
	dir: "content/docs",
});

// Skip lastModified in Docker/CI: plugin runs `git log` per file; without .git
// the child process can cause "Premature close" stream errors during build.
const isDockerOrCI =
	typeof process !== "undefined" &&
	(process.env.DOCKER_BUILD === "1" || process.env.CI === "true");

export default defineConfig({
	plugins: isDockerOrCI ? [] : [lastModified()],
});
