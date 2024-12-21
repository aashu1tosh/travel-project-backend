FROM node:18.17.0

# Create folder if not exist
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD [ "npm","run","start:dev" ]