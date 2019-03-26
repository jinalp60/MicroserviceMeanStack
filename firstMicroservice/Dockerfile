FROM ubuntu:latest
MAINTAINER jinalkapatel2304

RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get clean

RUN mkdir src
WORKDIR src/

#RUN npm install pm2 -g
COPY ./package.json src/package.json
RUN cd src
RUN npm install
COPY . src/

CMD ["npm", "start"]