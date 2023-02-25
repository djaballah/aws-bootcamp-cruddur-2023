FROM python:3.10-slim-buster

WORKDIR /backend-flask
COPY . .

RUN apt-get -y update; apt-get -y install curl \
 && pip3 install -r requirements.txt

ENV FLASK_ENV=development

EXPOSE ${PORT}
CMD ["/backend-flask/start_script.sh"]