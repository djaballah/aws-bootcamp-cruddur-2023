FROM python:3.10-slim-buster

WORKDIR /backend-flask

RUN apt-get -y update; apt-get -y install curl

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}
CMD ["/backend-flask/start_script.sh"]