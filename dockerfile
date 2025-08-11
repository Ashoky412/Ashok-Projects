# Use your app’s base; this is just an example
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY . .
EXPOSE 9090
CMD ["node","server.js"]