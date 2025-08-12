FROM node:20-alpine
WORKDIR /app
COPY . .
# Only run npm install if package.json exists
RUN if [ -f package.json ]; then npm ci --omit=dev || npm install --omit=dev; fi
EXPOSE 9090
CMD ["node","server.js"]
