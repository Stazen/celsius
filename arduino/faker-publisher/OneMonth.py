# python 3.6

import random
import time
import datetime
import json

from paho.mqtt import client as mqtt_client


broker = "celsius.ovh"
port = 1883
topic = "sensor/twofive"  

# Generate a Client ID with the publish prefix.
client_id = f'publish-{random.randint(0, 1000)}'
username = 'celsius123'
password = 'celsius123'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print(f"Connected to `{broker}` MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def publish(client):
    msg_count = 1
    
    time.sleep(10)
    unix_time = int(time.time())
    cpt = 0
    for id in [3,5]:
        date = int(time.time()) - 5260000
        while date < unix_time:
            cpt +=1
            # Generates a random number between 1 (inclusive) and 4 (exclusive)
            random_sensor_temp = random.randrange(18, 23) + (random.randrange(1,10)*1/10)


            # pour donner un semblant de coherence aux données, 
            # on met un fort taux de co2 aux heures paires et un taux faible aux heure impaires
            # ca depend aussi de l'id du sensor pour que ca varie en fonction des capteurs
            current_datetime = datetime.datetime.fromtimestamp(date)
            current_hour = current_datetime.hour
            if (current_hour % 2 == 0 and id == 3):
                random_sensor_co2 = random.randrange(800, 3000)
            else:
                random_sensor_co2 = random.randrange(400, 1000)

            random_sensor_temp = float(random_sensor_temp)

            if random.randrange(0,101) < 90:
                msg = json.dumps({"date":date, "sensorId":id, "temp":random_sensor_temp, "CO2":random_sensor_co2})
                result = client.publish(topic, msg)
                result: [0, 1]
                status = result[0]
                if status == 0:
                    print(f"Send `{msg}` to topic `{topic}`")
                else:
                    print(f"Failed to send message to topic {topic}")
                msg_count += 1
                if msg_count > 864000:
                    break
            date += 180     
    print(cpt)       
                        


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
    client.loop_stop()


run()
