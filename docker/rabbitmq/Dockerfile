FROM rabbitmq:3.12.12-management-alpine
# RUN rabbitmq-plugins enable --offline rabbitmq_lazy_queues rabbitmq_mqtt rabbitmq_web_mqtt rabbitmq_amqp1_0
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_web_mqtt rabbitmq_amqp1_0

COPY docker-entrypoint.sh docker-entrypoint.sh
