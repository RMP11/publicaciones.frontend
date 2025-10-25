FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn cache clean --all
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install

COPY . .

ARG VITE_BACKEND_URL_BASE
ENV VITE_BACKEND_URL_BASE=${VITE_BACKEND_URL_BASE}

RUN npm run build


# EXPOSE 4000
CMD ["npm", "run", "preview", "--", "--host"]