# syntax=docker/dockerfile:1
FROM node:16.15.1-alpine
WORKDIR /app
COPY . .
RUN npm i -g @nestjs/cli@8.0.0 && npm install -g typescript@4.3.5
RUN npm i 
CMD [ "sh", "-c", "npm run start:prod"]
EXPOSE 3000