#syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:6.0

WORKDIR /usr/src/app

COPY *.csproj ./
COPY docker-entrypoint.sh .

RUN dotnet add package MongoDB.Driver &&\
  dotnet add package RabbitMQ.Client &&\
  dotnet add package Newtonsoft.Json

ENV DOTNET_USE_POLLING_FILE_WATCHER 1
ENV PATH $PATH:/root/.dotnet/tools

EXPOSE 5001

CMD ["./docker-entrypoint.sh"]
