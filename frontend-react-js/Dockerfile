FROM node:16.18

ENV PORT=3000

COPY . /frontend-react-js

WORKDIR /frontend-react-js

RUN npm install
EXPOSE ${PORT}
CMD ["/frontend-react-js/start_script.sh"]