FROM mcr.microsoft.com/playwright:v1.64.0-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV PW_CHANNEL=chromium
CMD ["npx", "playwright", "test"]
