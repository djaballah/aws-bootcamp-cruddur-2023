FROM node:16.18

ENV PORT=3001

COPY . /app

WORKDIR /app

RUN npm install
EXPOSE ${PORT}
CMD npm start