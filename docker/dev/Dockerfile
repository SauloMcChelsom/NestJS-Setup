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

# Clone the conf files into the docker container
RUN git clone -b develop https://github.com/SauloMcChelsom/NestJS-Setup.git  app
WORKDIR /app
RUN git pull
RUN npm i
CMD [ "sh", "-c", "npm run start:dev"]
EXPOSE 3000