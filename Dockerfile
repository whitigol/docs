# Dependencies stage: install node_modules only (skip postinstall; needs source.config.ts)
FROM oven/bun:1.3.5-debian AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

# Build stage: copy deps and source, then build
FROM oven/bun:1.3.5-debian AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Explicit copy of every required path so build has everything (no .dockerignore surprises)
COPY package.json bun.lock ./
COPY source.config.ts vite.config.ts tsconfig.json components.json ./
COPY src ./src
COPY content ./content
COPY public ./public

# Disable fumadocs lastModified plugin (git) to avoid "Premature close" in container
ENV DOCKER_BUILD=1
# Avoid OOM (exit 137) during Vite/Nitro build; bump Node heap for bundling
ENV NODE_OPTIONS=--max-old-space-size=4096

# postinstall (fumadocs-mdx) requires source.config.ts; run it here before build
RUN bun run postinstall
RUN bun run build

# Production stage: minimal image with only the built app
FROM oven/bun:1.3.5-debian AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy the built application
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json

# Expose the port
EXPOSE 3000

# Start the application
CMD ["bun", "run", ".output/server/index.mjs"]