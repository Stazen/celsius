import datetime
from fastapi import APIRouter
from matplotlib import pyplot as plt
from app.controllers.fake_controller import fake_publisher
from app.settings import database


router = APIRouter()

@router.post(
        "/fake/{sensorId}/{days}",
        response_description="post fake data for given days and sensorID",
        status_code=201,    
        response_model_by_alias=False,
        include_in_schema=False
    )
async def fake_data(sensorId:int, days:int):
    await fake_publisher(sensorId=sensorId, date_range=days)
    return {"status": True}


@router.get("/graph/{sensorId}/{duration}", include_in_schema=False)
async def graph_data(sensorId: int, duration: int = 7): # Duration in days, default is 7 days
    # Calculate the start date based on the duration

    current_datetime = datetime.now()
    start_date = current_datetime - datetime.timedelta(days=duration)
    start_date_iso = start_date.strftime("%Y-%m-%dT%H:%M:%S")

    
    # Query the MongoDB collection for data within the specified duration and sensorId
    rawdatacollection = database.mongodb_connect("dev-agreg", "rawdatafake")
    cursor = rawdatacollection.find({
        "sensorId": sensorId,
        "date": {"$gte": start_date_iso}
    }).sort("date", 1)  # Sort by date in ascending order

    
    dates = []
    temperatures = []
    co2_levels = []
    incidents = [] # Store True/False for incidents
    for document in await cursor.to_list(length=1000):  # You can adjust the length according to your dataset size
        dates.append(document["date"])
        temperatures.append(document["temperature"])
        co2_levels.append(document["co2"])
        incidents.append(document["incident"])

    # Plot the temperature data
    plt.figure(figsize=(10, 5))
    plt.plot(dates, temperatures, label="Temperature (°C)")
    plt.xlabel("Date")
    plt.ylabel("Temperature (°C)")
    plt.title(f"Sensor {sensorId} Temperature Data")
    plt.xticks(rotation=45)
    plt.tight_layout()
    # Highlight incidents where incident is True
    for i, incident in enumerate(incidents):
        if incident:
            plt.axvline(x=dates[i], color='r', linestyle='--')  # Draw a vertical dashed red line indicating an incident

    # Save the temperature plot to a file
    temperature_plot_filename = f"sensor_{sensorId}_temperature_data.png"
    plt.savefig(temperature_plot_filename)
    plt.close()  # Close the current figure to avoid overlapping plots

    # Plot the CO2 data
    plt.figure(figsize=(10, 5))
    plt.plot(dates, co2_levels, label="CO2 (ppm)", color='g')
    plt.xlabel("Date")
    plt.ylabel("CO2 (ppm)")
    plt.title(f"Sensor {sensorId} CO2 Data")
    plt.xticks(rotation=45)
    plt.tight_layout()
    # Highlight incidents where incident is True
    for i, incident in enumerate(incidents):
        if incident:
            plt.axvline(x=dates[i], color='r', linestyle='--')  # Draw a vertical dashed red line indicating an incident

    # Save the CO2 plot to a file
    co2_plot_filename = f"sensor_{sensorId}_co2_data.png"
    plt.savefig(co2_plot_filename)

    return {
        "message": "Graphs generated",
        "temperature_plot_filename": temperature_plot_filename,
        "co2_plot_filename": co2_plot_filename
    }
    