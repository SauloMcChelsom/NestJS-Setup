# syntax=docker/dockerfile:1
FROM node:16.15.1

RUN apt-get -y update

# Install software 
RUN apt-get install -y git

# show version Node.JS
RUN node -v

# show version NPM
RUN npm -v

# show version git
RUN git --version

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

CMD [ "sh", "-c", "npm run start:prod"]

EXPOSE 80