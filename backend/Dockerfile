FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
RUN mkdir -p logs uploads

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
