# Build for local development

FROM node:22-alpine AS development
WORKDIR /usr/src/app
COPY --chown=node:node ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY --chown=node:node . .
USER node

# Build for production

FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node ["package.json", "package-lock.json*", "./"]
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npx prisma generate
#RUN npm run prisma:db # Migrations have to be manually applied to production
RUN npm run build
ENV NODE_ENV production
# The following line would remove the generated prisma client. -> To be fixed.
# RUN npm ci --only=production --omit=dev && npm cache clean --force
USER node

# Production

FROM node:22-alpine AS production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env .env
#COPY --chown=node:node --from=build /usr/src/app/prisma/dev.db dev.db
CMD [ "node", "dist/src/main.js" ]
