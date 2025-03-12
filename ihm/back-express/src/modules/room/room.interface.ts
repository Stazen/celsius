import mongoose, { Document } from 'mongoose';

export interface IRoom {
  name: string;
  companyId: mongoose.Schema.Types.ObjectId;
  floor: mongoose.Schema.Types.ObjectId;
  captors: number;
  building: mongoose.Schema.Types.ObjectId;
}

export interface IRoomDoc extends IRoom, Document {}
export interface IRoomModel extends mongoose.Model<IRoomDoc> {}
export type NewCreatedRoom = Omit<IRoom, 'companyId'>;
