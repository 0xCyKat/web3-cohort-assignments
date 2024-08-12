FROM node:slim

WORKDIR /app

COPY dist/ /app/
COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

CMD ["node", "index.js"]

EXPOSE 3000
