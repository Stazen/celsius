# python3.6

import random

from paho.mqtt import client as mqtt_client


broker = 'maxencevacheron.fr'
port = 80
topic = 'sensor/data'
# Generate a Client ID with the subscribe prefix.
# client_id = f'subscribe-{random.randint(0, 100)}'
client_id = f'subscribe-2'
username = 'celsius123'
password = 'celsius123'

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print(f"Connected to {broker} at {topic} topic MQTT Broker en fait!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id, clean_session=False)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic, 1)
    client.on_message = on_message


def run():
    print("Run en fait")
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()
