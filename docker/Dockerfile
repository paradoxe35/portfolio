# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.17.1
FROM node:${NODE_VERSION}-slim as base

# Next.js app lives here
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_BUILD_OUTPUT_TYPE=standalone


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install PNPM
RUN npm install -g pnpm --force

# Install node modules
COPY --link package.json ./
COPY --link pnpm-lock.yaml ./

RUN pnpm install --ignore-scripts

# Copy application code, Ensure that .env.local exists
COPY .env.local .env.local
COPY --link . .

ENV NODE_ENV=production
# Build application
RUN pnpm build

# Remove development dependencies
RUN pnpm prune --prod --ignore-scripts


# Final stage for app image
FROM base

ENV NODE_ENV=production

# Copy built application
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./apps/.next/static
COPY --from=build /app/public ./apps/public

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

ENV PORT=3000

CMD [ "node", "./apps/web/server.js" ]
