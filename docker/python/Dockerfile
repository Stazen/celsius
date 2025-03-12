FROM python:3.9.18-bullseye

RUN apt-get update -y && apt-get upgrade -y && apt-get install netcat -y

WORKDIR /app

RUN pip install paho-mqtt

COPY docker-entrypoint.sh docker-entrypoint.sh
