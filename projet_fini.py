from datetime import datetime, timedelta
import random

start_date = datetime.now() - timedelta(days=30)
time_increment = timedelta(minutes=10)
current_date = start_date

co2 = 450
temperature = 20.3
humidity = 50.2


while current_date <= datetime.now():

    if (current_date.weekday() == 2 and current_date.hour > 12 and current_date.hour <18):
        co2 = min(co2 - 20 + random.randint(-9, 9), 450)
        temperature = 20.3
        presence = False
        heating = True

    elif (current_date.weekday() < 5 and current_date.hour > 8 and current_date.hour <18):
        temperature = 20.3
        co2 = min(co2 + 30 + random.randint(-9, 9), 1200)
        presence = True
        heating = True

    else :
        co2 = max(co2 - 20 + random.randint(-9, 9), 450)
        temperature = temperature - 0.2 + (random.randint(-1, 1) / 10)
        presence = False
        heating = False

    data = {
        "sensorId": 1,
        "date": current_date.strftime("%Y-%m-%dT%H:%M:%S"),
        "co2": co2,
        "presence": presence,
        "heating": heating,
        "incident": True if presence and not heating else False,
        "temperature": temperature,
        "humidity": humidity
        }
    current_date += time_increment

    
