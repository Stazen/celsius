import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from '../modules/user/user.model';
import Company from '../modules/company/company.model';
import Building from '../modules/building/building.model';
import Floor from '../modules/floor/floor.model';
import Room from '../modules/room/room.model';
import Data from '../modules/data/data.model';
import { generateSensorData } from './fake_data';
let mongoServer: MongoMemoryServer;

export const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
export const prepareUsers = async () => {
  const company = await Company.create({
    name: "test",
    address: "test",
    city: "test",
    postalCode: "test",
    country: "test",
  });
  company.save();
  const user = await User.create({
    name: "adtest",
    email: "pablo@yopmail.com",
    password: "test12345",
    companyId: company._id,
    role: "root",
  });
  user.save();
  const user2 = await User.create({
    name: "adtest",
    email: "doudon_t@etna-alternance.net",
    password: "test12345",
    companyId: company._id,
    role: "admin",
  });
  user2.save();
  const user3 = await User.create({
    name: "adtest",
    email: "lequeu_p@etna-alternance.net",
    password: "test12345",
    companyId: company._id,
    role: "user",
  });
  user3.save();
  return company._id;
};

const insertData = async () => {
  let sensorData = generateSensorData(100);
  sensorData.forEach(async (sensordata: any) => {
    const data = await Data.create({
      date: sensordata.date,
      sensorId: 3,
      temperature: sensordata.temp,
      co2: sensordata.co2,
      presence: sensordata.presence,
      heating: sensordata.heating,
      humidity: sensordata.humidity,
      incident: sensordata.incident,
    });
    data.save();
  });
}

export const prepareData = async () => {
  let companyId = await prepareUsers();
  let company = await Company.findOne({ name: "test" });
  const building = await Building.create({
    name: "test",
    address: "test",
    city: "test",
    postalCode: "test",
    country: "test",
    companyId: companyId,
  });
  building.save();
  company?.building.push(building._id);
  company?.save();
  const floor = await Floor.create({
    number: 1,
    buildingId: building._id,
    companyId: companyId,
  });
  floor.save();
  building.floor.push(floor._id);
  const floor2 = await Floor.create({
    number: 2,
    companyId: companyId,
    buildingId: building._id,
  });
  floor2.save();
  building.floor.push(floor2._id);
  building.save();
  const room = await Room.create({
    name: "test",
    floor: floor._id,
    buildingId: building._id,
    companyId: companyId,
    captors: [3],
  });
  room.save();
  floor.rooms.push(room._id);
  floor.save();
  insertData();
  return companyId;
};