import { resumeDataPer8Hours, numAverage, /*getPartialDataCalendar,*/ roundFloat } from '../../modules/data/data.service';
// import dayjs, { Dayjs } from 'dayjs';


const averageData = (data: any) => {
    let averagTemp: {
        temperature: number[],
        co2: number[],
        humidity: number[],
        presence: boolean,
        heating: boolean,
        incident: boolean,
    } = { temperature: [], co2: [], humidity: [], presence: false, heating: false, incident: false };
    data[0].documents.forEach((indocs: {
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
        averagTemp.temperature.push(indocs.temperature);
        averagTemp.co2.push(indocs.co2);
        averagTemp.humidity.push(indocs.humidity);
    });
    return [roundFloat(numAverage(averagTemp.co2), 1), roundFloat(numAverage(averagTemp.humidity), 1), roundFloat(numAverage(averagTemp.temperature), 1)]
};

describe('resumeDataPer8Hours', () => {
    it('should correctly summarize data for a single 8-hour period with no incidents, heating, or presence', () => {
        const doc = [{
            date: "2024-05-28",
            timeBlock: "00-07",
            hour: null,
            documents: [

                {
                    _id: "6617c7ee140b1eda7b7e26eb",
                    sensorId: 1,
                    co2: 549,
                    temperature: 20.520858764648438,
                    date: "2024-05-28T11:22:21.000Z",
                    presence: false,
                    heating: false,
                    incident: false,
                    humidity: 60.25848388671875,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },
                {
                    _id: "6617ca44140b1eda7b7e26ed",
                    sensorId: 1,
                    co2: 600,
                    temperature: 20.7318115234375,
                    date: "2024-05-28T11:32:20.000Z",
                    presence: true,
                    heating: false,
                    incident: false,
                    humidity: 59.88922119140625,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },
                {
                    _id: "6617cc9a140b1eda7b7e26ef",
                    sensorId: 1,
                    co2: 629,
                    temperature: 20.681076049804688,
                    date: "2024-05-28T11:42:18.000Z",
                    presence: true,
                    heating: false,
                    incident: false,
                    humidity: 60.33172607421875,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },
                {
                    _id: "6617cef0140b1eda7b7e26f1",
                    sensorId: 1,
                    co2: 639,
                    temperature: 20.694427490234375,
                    date: "2024-05-28T11:52:16.000Z",
                    presence: false,
                    heating: false,
                    incident: false,
                    humidity: 60.39581298828125,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },
                {
                    _id: "6617d146140b1eda7b7e26f3",
                    sensorId: 1,
                    co2: 642,
                    temperature: 20.71044921875,
                    date: "2024-05-28T12:02:14.000Z",
                    presence: false,
                    heating: false,
                    incident: false,
                    humidity: 60.73455810546875,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },
                {
                    _id: "6617d39d140b1eda7b7e26f5",
                    sensorId: 1,
                    co2: 602,
                    temperature: 20.670394897460938,
                    date: "2024-05-28T12:12:13.000Z",
                    presence: false,
                    heating: false,
                    incident: false,
                    humidity: 60.49957275390625,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },
                {
                    _id: "6617d5f3140b1eda7b7e26f7",
                    sensorId: 1,
                    co2: 537,
                    temperature: 20.5181884765625,
                    date: "2024-05-28T12:22:11.000Z",
                    presence: false,
                    heating: false,
                    incident: false,
                    humidity: 60.906982421875,
                    hour: null,
                    timeBlock: "00-07",
                    dateWithoutTime: "2024-05-28"
                },]
        },
        ];

        const result = doc && doc.length > 0 ? resumeDataPer8Hours(doc) : [];
        const expected = averageData(doc);
        expect(result.length).toBe(1);
        expect(result[0]?.co2).toBe(expected[0]);
        expect(result[0]?.temperature).toBe(expected[2]);
        expect(result[0]?.humidity).toBe(expected[1]);
        expect(result[0]?.presence).toBe(false);
        expect(result[0]?.heating).toBe(false);
        expect(result[0]?.incident).toBe(false);

    });

    // Add more tests here to cover different scenarios, such as:
    // - Multiple periods within the same day
    // - Data with incidents, presence, and heating
    // - Edge cases, such as empty input or invalid data types
});


// function getDates(startDate: Dayjs, stopDate: Dayjs) {
//     var dateArray = new Array();
//     var currentDate = startDate;
//     while (currentDate <= stopDate) {
//         dateArray.push({
//             date: currentDate,
//             incident: false,
//             isCurrentMonth: true,
//             isToday: false
//         });
//         currentDate = currentDate.add(1, 'day');
//     }
//     return dateArray;
// }


// describe('partialDataCalendar', () => {
//     it('should return even if no data', () => {
//         dayjs.extend(utc);
//         dayjs.extend(timezone);
//         dayjs.tz.setDefault("Europe/Paris");
//         let startDate = dayjs();
//         const startMonth = dayjs().startOf('month').startOf('day');

//         let result = generateDataDay()
//     })
// });