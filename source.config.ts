import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";

export const docs = defineDocs({
	dir: "content/docs",
});

// Disable lastModified in Docker/CI: plugin runs `git log` per file; the child process
// can trigger "Premature close" stream errors in containerized builds.
const isDockerOrCI = typeof process !== "undefined" && (process.env.DOCKER_BUILD === "1" || process.env.CI === "true");

export default defineConfig({
	plugins: isDockerOrCI ? [] : [lastModified()],
});
