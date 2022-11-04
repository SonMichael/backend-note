# Install dependencies only when needed
FROM node:14-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run postinstall && npm run build


FROM node:14-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
COPY --chown=nodejs:nodejs . .
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

RUN npm i -g pm2
USER nodejs
RUN npm run postinstall

# Production
CMD ["pm2-runtime", "ecosystem.json", "--env", "production"]