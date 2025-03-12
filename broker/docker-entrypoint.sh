#!/bin/bash

# rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_lazy_queues rabbitmq_web_mqtt rabbitmq_amqp1_0;rabbitmqctl add_user celsius123 celsius123; rabbitmqctl set_permissions -p / celsius123 ".*" ".*" ".*"; rabbitmqctl set_user_tags celsius123 management; rabbitmq-server
rabbitmqctl add_user celsius123 celsius123; rabbitmqctl set_permissions -p / celsius123 ".*" ".*" ".*"; rabbitmqctl set_user_tags celsius123 management; rabbitmq-server
