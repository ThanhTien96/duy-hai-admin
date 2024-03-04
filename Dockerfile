FROM node:18

RUN apt-get update && apt-get install -y xdg-utils

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4173

CMD [ "yarn", "preview" ]