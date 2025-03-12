// Initiate the fake data generation
interface SensorData {
    date: Date;
    sensorId: number;
    temp: number;
    co2: number;
    presence: boolean;
    heating: boolean;
    humidity: number;
    incident: boolean;
}

const sensorData: SensorData[] = [];

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSensorData(cn: number) {
    const unix_time = Math.floor(Date.now() / 1000);
    while (cn--) {

        const random_sensor_id = 3;
        const random_sensor_temp = getRandomInt(18, 23);

        const current_datetime = new Date(unix_time * 1000);
        const current_hour = current_datetime.getHours();
        let random_sensor_co2;
        if (current_hour % 2 === 0 && random_sensor_id === 3) {
            random_sensor_co2 = getRandomInt(800, 3000);
        } else {
            random_sensor_co2 = getRandomInt(400, 1001);
        }

        if (Math.random() < 0.9) {
            sensorData.push({
                date: current_datetime,
                sensorId: random_sensor_id,
                temp: random_sensor_temp,
                co2: random_sensor_co2,
                presence: false,
                heating: false,
                humidity: Math.random() + getRandomInt(60, 70),
                incident: false,
            });
        }

    }

    sensorData.forEach((data, index) => {
        let oldata = sensorData[index - 1];
        if (index == 0) {
            data.presence = false;
            data.heating = false;
            return;
        }
        if (data.co2 >= 1000) {
            data.presence = true;
        } else if (oldata) {
            const variationFlat = data.co2 - oldata.co2;
            const variationRelative = variationFlat / data.co2;
            data.presence = variationRelative >= 0.02;
            data.heating = (data.temp - oldata.temp) > 3;
            if (data.heating && !data.presence) {
                data.incident = true;
            }
        }
    });
    return sensorData;
}



