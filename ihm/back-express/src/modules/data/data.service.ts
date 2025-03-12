import { IDataDoc } from './data.interface';
import Data from './data.model';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);
interface DataItem {
  date: Dayjs;
  incident: boolean;
  isCurrentMonth: boolean;
  isToday: boolean;
}

// import test from './test';
/**
 * Fetch all datas from db
 * @returns {Promise<IDataDoc[]>}
 */
export const getAllData = async (): Promise<IDataDoc[]> => {
  return await Data.find();
};

export const getPartialData = async (limit: number, sensorId: any): Promise<IDataDoc[]> => {
  return (await Data.find({ sensorId }).limit(limit).sort({ date: -1 })).reverse();
};

export function compareDatesWith30MinDifference(dateString1: string, dateString2: string): boolean {
  // Convertir les chaînes de caractères en objets Date
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const diff = Math.abs(date2.getTime() - date1.getTime());

  // Convertir 30 minutes en millisecondes
  const thirtyMinutesInMilliseconds = 30 * 60 * 1000;
  // Vérifier si la différence est exactement de 30 minutes
  return diff <= thirtyMinutesInMilliseconds;
};

export const dateForQuery = (startMonth: Dayjs, endMonth: Dayjs): Dayjs[] => {
  let res_1 = startMonth;
  let res_2 = endMonth;
  if (startMonth.day() != 1) {
    res_1 = startMonth.subtract(startMonth.day() - 1, 'day');
  }
  if (endMonth.day() != 0) {
    res_2 = endMonth.add(7 - endMonth.day(), 'day');
  }
  return [res_1, res_2];
}

export const generateDataDay = (firstDay: Dayjs, lastDay: Dayjs, startMonth: Dayjs): any => {
  let res: DataItem[] = [];
  while (lastDay >= firstDay) {
    res.push({ date: firstDay, incident: false, isCurrentMonth: firstDay.isSame(startMonth, 'month'), isToday: firstDay.isToday() });
    firstDay = firstDay.add(1, 'day');
  }
  return res;
}

export function buildDateMap(dataItems: DataItem[]): Map<string, DataItem> {
  const dateMap = new Map<string, DataItem>();
  dataItems.forEach(item => {
    dateMap.set(item.date.format('DD-MM-YYYY'), item);
  });
  return dateMap;
}


export const getPartialDataCalendar = async (sensorId: string): Promise<any> => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Europe/Paris");
  const startMonth = dayjs().startOf('month').startOf('day');
  const endMonth = dayjs().endOf('month').endOf('day');
  var dateArr: Dayjs[] = dateForQuery(startMonth, endMonth); // Verify day of the week for the start and end of the month
  var result: { date: Dayjs, incident: boolean }[] = [];
  var document: { day: Dayjs, sensors: { sensorId: number, documents: any[] }[] }[] = [];
  if (sensorId == 'all' || sensorId == 'noId') {
    document = await Data.aggregate([
      {
        $match: {
          date: { $gte: dateArr[0]?.toDate(), $lte: dateArr[1]?.toDate() },
          incident: true
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$date" }
              }
            },
            sensorId: "$sensorId"
          },
          documents: { $push: "$$ROOT" }
        }
      },
      {
        $group: {
          _id: "$_id.day",
          sensors: {
            $push: {
              sensorId: "$_id.sensorId",
              documents: "$documents"
            }
          }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          sensors: 1
        }
      }
    ]);
  }
  else if (sensorId != 'all' && sensorId.length > 0) {
    document = await Data.aggregate([
      {
        $match: {
          date: { $gte: dateArr[0]?.toDate(), $lte: dateArr[1]?.toDate() },
          incident: true,
          sensorId: Number(sensorId)
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$date" }
              }
            },
            sensorId: "$sensorId"
          },
          documents: { $push: "$$ROOT" }
        }
      },
      {
        $group: {
          _id: "$_id.day",
          sensors: {
            $push: {
              sensorId: "$_id.sensorId",
              documents: "$documents"
            }
          }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          sensors: 1
        }
      }
    ]);

  }
  document.forEach((doc) => {
    let obj = { date: dayjs(), incident: false };
    obj.date = doc.day;
    doc.sensors.forEach((sensor: any) => {
      let doclength = sensor.documents.length;
      let i = 0;
      while (i < doclength - 10) {
        if (compareDatesWith30MinDifference(sensor.documents[i].date, sensor.documents[i + 3].date)) {
          obj.incident = true;
          obj.date = dayjs(sensor.documents[i].date);
        }
        i++;
      }

    });
    if (obj.incident) {
      result.push(obj);
    }
  });

  if (dateArr[0] && dateArr[1]) {
    let dataToReturn = generateDataDay(dateArr[0], dateArr[1], startMonth);
    const dateMap = buildDateMap(dataToReturn);
    result.forEach(item => {
      if (dateMap.has(item.date.format('DD-MM-YYYY'))) {
        const largeItem = dateMap.get(item.date.format('DD-MM-YYYY'));
        if (largeItem) {
          largeItem.incident = true;
        }
      }
    });
    return dataToReturn;
  }

  return result;

};


export const numAverage = (list: number[]) => {
  const size = list.length
  let total = 0
  list.map((item) => total += item)
  return total / size
}
export const resumeDataPer8Hours = (document: any) => {
  let result: {
    "_id": string,
    "co2": number,
    "temperature": number,
    "date": any,
    "presence": boolean,
    "heating": boolean,
    "incident": boolean,
    "humidity": number,
    "duration": { start: Date, end: Date }
  }[] = [];
  let resultPerHour: {
    "_id": string,
    "co2": number,
    "temperature": number,
    "date": Date,
    "presence": boolean,
    "heating": boolean,
    "incident": boolean,
    "humidity": number,
    "duration": { start: any, end: any }
  }[] = [];

  let hours: number[] = []
  document.forEach((doc: any) => {
    hours.push(doc.hour); // a doc is one hour
    let temp = {
      "date": doc.date,
      "_id": "",
      "sensorId": doc.sensorId,
      "co2": 0,
      "temperature": 0,
      "presence": false,
      "heating": false,
      "incident": false,
      "humidity": 0,
      "duration": { start: null, end: null }
    };
    let averagTemp: {
      temperature: number[],
      co2: number[],
      humidity: number[],
      presence: boolean,
      heating: boolean,
      incident: boolean,
    } = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false }
    let sizeDoc = Math.round(doc.documents.length / 2);
    let nbPres = 0;
    let nbHeat = 0;
    let nbInc = 0;
    doc.documents.forEach((data: { // ca c'est les 10min enfait
      "_id": string,
      "sensorId": number,
      "co2": number,
      "temperature": number,
      "date": string,
      "presence": boolean,
      "heating": boolean,
      "incident": boolean,
      "humidity": number
    }) => {
      averagTemp.temperature.push(data.temperature);
      averagTemp.co2.push(data.co2);
      averagTemp.humidity.push(data.humidity);
      if (data.presence) {
        nbPres += 1;
      }
      if (data.heating) {
        nbHeat += 1;
      }
      if (data.incident) {
        nbInc += 1;
      }
      let dateNorm = dayjs(data.date).add(1, 'hour').startOf('hour');
      temp.date = dateNorm;
    });
    temp.co2 = numAverage(averagTemp.co2);
    temp.humidity = numAverage(averagTemp.humidity);
    temp.temperature = numAverage(averagTemp.temperature);
    if (nbInc >= sizeDoc) {
      temp.incident = true;
    }
    if (nbHeat >= sizeDoc) {
      temp.heating = true;
    }
    if (nbPres >= sizeDoc) {
      temp.presence = true;
    }
    resultPerHour.push(temp);
  });

  let temp: {
    "_id": string,
    "co2": number,
    "temperature": number,
    "date": any,
    "incident": boolean,
    "presence": boolean,
    "heating": boolean,
    "humidity": number,
    "duration": { start: any, end: any }
  } = {
    "_id": "",
    "co2": 0,
    "temperature": 0,
    "date": dayjs(),
    "incident": false,
    "presence": false,
    "heating": false,
    "humidity": 0,
    "duration": { start: null, end: null }
  };
  let averagTemp: {
    temperature: number[],
    co2: number[],
    humidity: number[],
    presence: boolean,
    heating: boolean,
    incident: boolean,
  } = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false };
  let sizeDoc = 0;
  let nbPres = 0;
  let nbHeat = 0;
  resultPerHour.forEach((data: any, index: number) => {
    sizeDoc += 1;
    if (data.date.get('hour') < 8 && data.date.get('hour') >= 1) {
      averagTemp.temperature.push(data.temperature);
      averagTemp.co2.push(data.co2);
      averagTemp.humidity.push(data.humidity);
      if (data.presence) {
        nbPres += 1;
      }
      if (data.heating) {
        nbHeat += 1;
      }
      if (data.incident) {
        temp.incident = true;
        temp.duration.start = new Date(data.date);
        temp.duration.start.setHours(data.date.get('hour'), 0, 0, 0);
        temp.duration.end = new Date(data.date);
        temp.duration.end.setHours(data.date.get('hour') + 1, 0, 0, 0);
      }
    }
    if (data.date.get('hour') == 8) {
      let dada = dayjs(new Date(data.date)).set('hour', 8).minute(0).second(0).millisecond(0);
      temp.date = dada;
      temp.co2 = roundFloat(numAverage(averagTemp.co2), 1);
      temp.humidity = roundFloat(numAverage(averagTemp.humidity), 1);
      temp.temperature = roundFloat(numAverage(averagTemp.temperature), 1);
      if (nbHeat >= sizeDoc / 2) {
        temp.heating = true;
        nbHeat = 0;
      }
      if (nbPres >= sizeDoc / 2) {
        temp.presence = true;
        nbPres = 0;
      }
      averagTemp = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false };
      sizeDoc = 0;
      result.push(temp);
      temp = {
        "_id": "",
        "co2": 0,
        "temperature": 0,
        "date": dayjs(),
        "incident": false,
        "presence": false,
        "heating": false,
        "humidity": 0,
        "duration": { start: null, end: null }
      };
    }
    if (data.date.get('hour') < 16 && data.date.get('hour') > 8) {
      averagTemp.temperature.push(data.temperature);
      averagTemp.co2.push(data.co2);
      averagTemp.humidity.push(data.humidity);
      if (data.presence) {
        nbPres += 1;
      }
      if (data.heating) {
        nbHeat += 1;
      }
      if (data.incident) {
        temp.incident = true;
        temp.duration.start = new Date(data.date);
        temp.duration.start.setHours(data.date.get('hour'), 0, 0, 0);
        temp.duration.end = new Date(data.date);
        temp.duration.end.setHours(data.date.get('hour') + 1, 0, 0, 0);
      }
    }
    if (data.date.get('hour') == 16) {
      let dada = dayjs(new Date(data.date)).set('hour', 16).minute(0).second(0).millisecond(0);
      temp.date = dada;
      temp.co2 = roundFloat(numAverage(averagTemp.co2), 1);
      temp.humidity = roundFloat(numAverage(averagTemp.humidity), 1);
      temp.temperature = roundFloat(numAverage(averagTemp.temperature), 1);
      if (nbHeat >= sizeDoc / 2) {
        temp.heating = true;
        nbHeat = 0;
      }
      if (nbPres >= sizeDoc / 2) {
        temp.presence = true;
        nbPres = 0;
      }
      averagTemp = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false };
      sizeDoc = 0;
      result.push(temp);
      temp = {
        "_id": "",
        // "sensorId": doc.sensorId,
        "co2": 0,
        "temperature": 0,
        "date": dayjs(),
        "incident": false,
        "presence": false,
        "heating": false,
        "humidity": 0,
        "duration": { start: null, end: null }
      };
    }
    if (data.date.get('hour') < 24 && data.date.get('hour') > 16) {
      averagTemp.temperature.push(data.temperature);
      averagTemp.co2.push(data.co2);
      averagTemp.humidity.push(data.humidity);
      if (data.presence) {
        nbPres += 1;
      }
      if (data.heating) {
        nbHeat += 1;
      }
      if (data.incident) {
        temp.incident = true;
        temp.duration.start = new Date(data.date);
        temp.duration.start.setHours(data.date.get('hour'), 0, 0, 0);
        temp.duration.end = new Date(data.date);
        temp.duration.end.setHours(data.date.get('hour') + 1, 0, 0, 0);
      }
    }
    if (data.date.get('hour') == 0) {
      // let dada = dayjs(new Date(data.date)).hour(1).minute(0).second(0).millisecond(0);
      let dada = dayjs(new Date(data.date)).set('hour', 0).minute(0).second(0).millisecond(0);

      temp.date = dada;
      temp.co2 = roundFloat(numAverage(averagTemp.co2), 1);
      temp.humidity = roundFloat(numAverage(averagTemp.humidity), 1);
      temp.temperature = roundFloat(numAverage(averagTemp.temperature), 1);
      if (nbHeat >= sizeDoc / 2) {
        temp.heating = true;
        nbHeat = 0;
      }
      if (nbPres >= sizeDoc / 2) {
        temp.presence = true;
        nbPres = 0;
      }
      averagTemp = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false };
      sizeDoc = 0;
      result.push(temp);
      temp = {
        "_id": "",
        // "sensorId": doc.sensorId,
        "co2": 0,
        "temperature": 0,
        "date": dayjs(),
        "incident": false,
        "presence": false,
        "heating": false,
        "humidity": 0,
        "duration": { start: null, end: null }
      };
    }
    if (index == resultPerHour.length - 1 && data.date.get('hour') % 8 != 0) { // petit trick
      temp.date = data.date;
      temp.co2 = roundFloat(numAverage(averagTemp.co2), 1);
      temp.humidity = roundFloat(numAverage(averagTemp.humidity), 1);
      temp.temperature = roundFloat(numAverage(averagTemp.temperature), 1);
      if (nbHeat >= sizeDoc / 2) {
        temp.heating = true;
        nbHeat = 0;
      }
      if (nbPres >= sizeDoc / 2) {
        temp.presence = true;
        nbPres = 0;
      }
      result.push(temp);
    }
  });
  // return resultPerHour;
  return result;
};
export const getDataFromDate = async (startDate: any, endDate: any, sensorId: any): Promise<any> => {
  var document = await Data.aggregate([
    {
      $addFields: {
        hour: { $hour: "$string" },
        timeBlock: {
          $switch: {
            branches: [
              { case: { $lt: ["$hour", 8] }, then: "00-07" },
              { case: { $lt: ["$hour", 16] }, then: "08-15" },
              { case: { $gte: ["$hour", 16] }, then: "16-23" }
            ],
            default: "Unknown"
          }
        },
        dateWithoutTime: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
      }
    },
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
        sensorId: Number(sensorId)
      }
    },
    {
      $group: {
        _id: {
          dateWithoutTime: "$dateWithoutTime",
          timeBlock: "$timeBlock",
          hour: "$hour"
        },
        documents: { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id.dateWithoutTime",
        timeBlock: "$_id.timeBlock",
        hour: "$_id.hour",
        documents: 1
      }
    },
    {
      $sort: { "date": 1, "timeBlock": 1, "hour": 1 }
    }
  ]);
  return document;
  // return resumeDataPer8Hours(document);
};

export const roundFloat = (nombre: number, decimales: number) => {
  let facteur = Math.pow(10, decimales);
  return Math.round(nombre * facteur) / facteur;
}

export const getDataPerDay = async (interval: any, sensorId: any): Promise<any> => {
  if (interval == 0) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Europe/Paris");
    // const endOfDay = dayjs.tz().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    // const startOfDay = dayjs().subtract(24, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const endOfDay = dayjs('2024-08-30').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const startOfDay = dayjs('2024-08-30').subtract(24, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    var document = await Data.aggregate([
      {
        $match: {
          date: { $lte: endOfDay, $gte: startOfDay },
          sensorId: Number(sensorId)
        }
      },
      {
        $addFields: {
          date: {
            $toDate: "$date" // Convert date field to Date object
          }
        }
      },
      {
        $group: {
          _id: {
            day: { $dayOfYear: "$date" },
            hour: { $hour: "$date" }
          },
          documents: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the final output
          day: "$_id.day",
          hour: "$_id.hour",
          documents: 1
        }
      },
      { $sort: { "day": 1, "hour": 1 } } // Sort by day and hour
    ]);
    // var document = Data.find({ sensorId: 1 })  // Filtrer par sensorId
    let result: {
      "_id": string,
      "sensorId": number,
      "co2": number,
      "temperature": number,
      "date": any,
      "presence": boolean,
      "heating": boolean,
      "incident": boolean,
      "humidity": number
    }[] = [];
    let hours: number[] = []
    document.forEach((doc) => {
      hours.push(doc.hour);
      let temp = {
        "_id": "",
        "sensorId": doc.sensorId,
        "co2": 0,
        "temperature": 0,
        "date": dayjs(),
        "presence": false,
        "heating": false,
        "incident": false,
        "humidity": 0
      };
      let averagTemp: { temperature: number[], co2: number[], humidity: number[], presence: boolean, heating: boolean, incident: boolean } = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false }
      let sizeDoc = Math.round(doc.documents.length / 2);
      // console.log('docgetDataPerDay');
      // console.log(doc);
      // console.log('docgetDataPerDay');
      let nbPres = 0;
      let nbHeat = 0;
      let nbInc = 0;
      doc.documents.forEach((data: {
        "_id": string,
        "sensorId": number,
        "co2": number,
        "temperature": number,
        "date": string,
        "presence": boolean,
        "heating": boolean,
        "incident": boolean,
        "humidity": number
      }) => {
        averagTemp.temperature.push(data.temperature);
        averagTemp.co2.push(data.co2);
        averagTemp.humidity.push(data.humidity);
        if (data.presence) {
          nbPres += 1;
        }
        if (data.heating) {
          nbHeat += 1;
        }
        if (data.incident) {
          nbInc += 1;
        }
        let dateNorm = dayjs(new Date(data.date)).add(2, 'hour').startOf('hour');
        // dateNorm.setHours(doc.hour + 1, 0, 0, 0);
        temp.date = dateNorm;
      })
      temp.co2 = roundFloat(numAverage(averagTemp.co2), 1);
      temp.humidity = roundFloat(numAverage(averagTemp.humidity), 1);
      temp.temperature = roundFloat(numAverage(averagTemp.temperature), 1);
      if (nbInc >= sizeDoc) {
        temp.incident = true;
      }
      if (nbHeat >= sizeDoc) {
        temp.heating = true;
      }
      if (nbPres >= sizeDoc) {
        temp.presence = true;
      }
      result.push(temp);
    });
    // return document;
    return result;
  }
  if (interval == 1) {
    let date = new Date()
    // dat.setHours(0, 0, 0, 0);
    // console.log(dat)
    const today = new Date(date);
    // code pour la date actuelle et 24 heures avant à utiliser lorsque nous aurons de la data dans rawdata
    // const startOfDay = new Date();
    // const endOfDay = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    date.setDate(date.getDate() - 7);
    const startOfWeek = new Date(date);
    return getDataFromDate(startOfWeek, today, sensorId);
  }
  if (interval == 2) {
    let date = new Date()
    // dat.setHours(0, 0, 0, 0);
    // console.log(dat)
    const today = new Date(date);
    // code pour la date actuelle et 24 heures avant à utiliser lorsque nous aurons de la data dans rawdata
    // const startOfDay = new Date();
    // const endOfDay = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    date.setDate(date.getDate() - 14);
    const startOfMonth = new Date(date);
    return getDataFromDate(startOfMonth, today, sensorId);
  };
  if (interval == 3) {
    let date = new Date()
    // dat.setHours(0, 0, 0, 0);
    // console.log(dat)
    const today = new Date(date);
    // code pour la date actuelle et 24 heures avant à utiliser lorsque nous aurons de la data dans rawdata
    // const startOfDay = new Date();
    // const endOfDay = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    date.setDate(date.getDate() - 21);
    const startOfMonth = new Date(date);
    return getDataFromDate(startOfMonth, today, sensorId);
  };
};

