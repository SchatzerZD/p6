FROM node:18-alpine
WORKDIR /p6
COPY . .
CMD ["node", "src/server.mjs"]