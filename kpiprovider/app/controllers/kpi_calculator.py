from datetime import datetime, timedelta
from app.settings import database
from bson import ObjectId



def average_daily_incident_calc(incidents)-> float:
    total = 0 
    for day in incidents:
        total += day["incident"]
    return round(total/7, 1)

def most_incident_hour_range_calc(sensorIDs)-> str:
    today = datetime.today()
    rawDatasCollection = database.mongodb_connection("dev-agreg", "rawdatas")
    keep_count = {
        "00-06":0,
        "06-12":0,
        "12-18":0,
        "18-24":0,
    }
    print(sensorIDs)
    day = today - timedelta(days=7)
    start_of_day = datetime.combine(day, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())
    for sensorID in sensorIDs:
        query = {
            "sensorId": int(sensorID),
            "date": {"$gte": start_of_day, "$lt": end_of_day},
            "incident": True
        }
        documents = rawDatasCollection.find(query)
        for document in documents:
            document_time = document["date"].hour
            if 0 <= document_time < 6:
                keep_count["00-06"] += 1
            elif 6 <= document_time < 12:
                keep_count["06-12"] += 1
            elif 12 <= document_time < 18:
                keep_count["12-18"] += 1
            elif 18 <= document_time < 24:
                keep_count["18-24"] += 1

    max_range = max(keep_count, key=keep_count.get)
    return max_range

def presence_rate_calc(sensorIDs)-> float:
    today = datetime.today()
    rawDatasCollection = database.mongodb_connection("dev-agreg", "rawdatas")
    day = today - timedelta(days=7)
    start_of_day = datetime.combine(day, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())
    total_count = 0
    presence_count = 0

    for sensorID in sensorIDs:
        query = {
            "sensorId": int(sensorID),
            "date": {"$gte": start_of_day, "$lt": end_of_day}
        }
        total_count += rawDatasCollection.count_documents(query)

        query = {
            "sensorId": int(sensorID),
            "presence": True,
            "date": {"$gte": start_of_day, "$lt": end_of_day}
        }
        presence_count += rawDatasCollection.count_documents(query)
    
    return round(presence_count*100/total_count, 1)

def most_incident_building_calc(buildings_and_sensors)-> str:
    today = datetime.today()
    rawDatasCollection = database.mongodb_connection("dev-agreg", "rawdatas")
    buildings_count =  {}
    for _, value in buildings_and_sensors.items():
        buildings_count[value] = 0

    for i in range(7):
        day = today - timedelta(days=i)
        start_of_day = datetime.combine(day, datetime.min.time())
        end_of_day = datetime.combine(day, datetime.max.time())

        for sensorID in buildings_and_sensors:
            query = {
                "sensorId": int(sensorID),
                "incident": True,
                "date": {"$gte": start_of_day, "$lt": end_of_day}
            }
            buildings_count[buildings_and_sensors[sensorID]] += rawDatasCollection.count_documents(query)
    max = -1
    max_building = ''
    for key, value in buildings_count.items():
        if value > max:
            max_building = key
            
    buildingCollection = database.mongodb_connection("dev-ihm", "buildings")
    name = buildingCollection.find_one({"_id": ObjectId(max_building)})["name"]
    return name

def days_without_incident_calc(sensorIDs)-> int:
    today = datetime.today()
    rawDatasCollection = database.mongodb_connection("dev-agreg", "rawdatas")
    stop = False
    for i in range(30):
        day = today - timedelta(days=i)
        start_of_day = datetime.combine(day, datetime.min.time())
        end_of_day = datetime.combine(day, datetime.max.time())

        for sensorID in sensorIDs:
            query = {
                "sensorId": int(sensorID),
                "incident": True,
                "date": {"$gte": start_of_day, "$lt": end_of_day}
            }
            if (rawDatasCollection.count_documents(query)):
                stop = True
        
        if stop:
            break

    return i

def incident_per_day(sensorIDs)-> int:
    today = datetime.today()
    rawDatasCollection = database.mongodb_connection("dev-agreg", "rawdatas")
    rtn_val = []
    for i in range(7):
        day = today - timedelta(days=i)
        formatted_day = day.strftime("%d/%m")
        start_of_day = datetime.combine(day, datetime.min.time())
        end_of_day = datetime.combine(day, datetime.max.time())
        incident_count = 0

        for sensorID in sensorIDs:
            query = {
                "sensorId": int(sensorID),
                "incident": True,
                "date": {"$gte": start_of_day, "$lt": end_of_day}
            }
            incident_count += rawDatasCollection.count_documents(query)

        rtn_val.append({"name":formatted_day, "incident":incident_count})

    return rtn_val