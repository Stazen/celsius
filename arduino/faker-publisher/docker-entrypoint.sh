#!/bin/bash
while ! nc -z rabbitmq 1883 ; do sleep 2 ; done ;

python3 /app/main.py
