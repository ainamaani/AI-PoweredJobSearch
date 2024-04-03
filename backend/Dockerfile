FROM node:17-alpine

WORKDIR /workdirectory

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5550

CMD [ "npm","run","serve" ]