from datetime import datetime, timedelta
import random

import random
from bson import ObjectId
from fastapi import APIRouter, HTTPException


from app.models.data import data_model
from app.models.kpi import kpi_model
from app.settings import database
from app.controllers.kpi_calculator import average_daily_incident_calc, most_incident_building_calc, most_incident_hour_range_calc, presence_rate_calc, days_without_incident_calc, incident_per_day

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Working fine"}

@router.get(
        "/data/{id}",
        response_description="Get a single data from ID",
        response_model=data_model,
        response_model_by_alias=False,
        include_in_schema=False
    )
async def show_data(id: str):
    rawdatacollection = database.mongodb_connect("dev-agreg", "rawdatas")
    if (data := await rawdatacollection.find_one({"_id": ObjectId(id)})) is not None:
        return data

    raise HTTPException(status_code=404, detail=f"Data {id} not found")

@router.get(
        "/kpi/{company_id}",
        response_description="Get the last generated kpi for a given company ID",
        response_model=kpi_model,
        response_model_by_alias=False,
    )
async def show_kpi(company_id: str):
    kpiCollection = database.mongodb_connect("dev-ihm", "kpi")
    if (kpi := await kpiCollection.find_one({"companyID": ObjectId(company_id)}, sort=[("date", -1)])) is not None:
        return kpi

    raise HTTPException(status_code=404, detail=f"kpi for {id} not found")

@router.post(
        "/kpi/{companyid}",
        response_description="post kpi for a company",
        response_model=kpi_model,
        status_code=201,    
        response_model_by_alias=False,
    )
async def create_kpi(companyid: str):
    kpiCollection = database.mongodb_connect("dev-ihm", "kpi")
    now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    roomCollection = database.mongodb_connection("dev-ihm", "rooms")
    query={"companyId":ObjectId(companyid)}
    documents = roomCollection.find(query, {"captors": 1, "building": 1,"_id": 0})
    sensorIDs = []
    buildings_and_sensors = {}
    for document in documents:
        if "captors" in document and len(document["captors"]) > 0:
            sensorIDs.extend(document["captors"])
            for sensor in document["captors"]:
                buildings_and_sensors[sensor] = document["building"]


    incidents = incident_per_day(sensorIDs)
    newkpi = await kpiCollection.insert_one({"avgDailyIncidentNumber": average_daily_incident_calc(incidents),
                "date": now,
                "mostIncidentHourRange": most_incident_hour_range_calc(sensorIDs),
                "presenceRate": presence_rate_calc(sensorIDs),
                "mostIncidentBuilding": most_incident_building_calc(buildings_and_sensors),
                "daysWithoutIncident": days_without_incident_calc(sensorIDs),
                "incidentPerDay": incidents,
                "companyID":ObjectId(companyid)})
    
    if (data := await kpiCollection.find_one({"_id": ObjectId(newkpi.inserted_id)})) is not None:
        return data

    raise HTTPException(status_code=404, detail=f"Data {id} not found")

@router.post(
    "/fake",
    response_description="post fake data for last month",
    status_code=201,    
    response_model_by_alias=False,
    include_in_schema=False
)
async def fake_data():
    kpicollection = database.mongodb_connect("dev-agreg", "rawdatafake")
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

        data = await kpicollection.insert_one({
            "sensorId": 1,
            "date": current_date.strftime("%Y-%m-%dT%H:%M:%S"),
            "co2": co2,
            "presence": presence,
            "heating": heating,
            "incident": True if presence and not heating else False,
            "temperature": temperature,
            "humidity": humidity
            })
        current_date += time_increment
            
    return {"status": True}
    