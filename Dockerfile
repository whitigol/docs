# Dependencies stage: install node_modules only
FROM oven/bun:1.3.5-debian AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build stage: copy deps and source, then build
FROM oven/bun:1.3.5-debian AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
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