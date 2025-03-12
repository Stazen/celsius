import { Document, Model } from 'mongoose';

export interface IData {
  co2: number;
  temperature: number;
  sensorId: number;
  date: string;
  heating: boolean;
  presence: boolean;
}

export interface IDataDoc extends IData, Document {}

export interface IDataModel extends Model<IDataDoc> {}
