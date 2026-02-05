FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

# Install serve to host static files
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
