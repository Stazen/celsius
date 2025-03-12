import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IDataDoc, IDataModel } from './data.interface';

const dataSchema = new mongoose.Schema<IDataDoc, IDataModel>({
  co2: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  sensorId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  heating: {
    type: Boolean,
    required: true,
  },
  presence: {
    type: Boolean,
    required: true,
  },
});

dataSchema.plugin(toJSON);

const myDB = mongoose.connection.useDb('dev-agreg');

const Data = myDB.model('RawDatas', dataSchema);

export default Data;
