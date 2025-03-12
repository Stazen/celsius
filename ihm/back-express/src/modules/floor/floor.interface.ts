import mongoose, { Document, Model } from 'mongoose';

export interface IFloor {
  number: number;
  companyId: mongoose.Schema.Types.ObjectId;
  buildingId: mongoose.Schema.Types.ObjectId;
  rooms: mongoose.Schema.Types.ObjectId[];
}

export interface IFloorDoc extends IFloor, Document {}

export interface IFloorModel extends Model<IFloorDoc> {}

export type NewCreatedFloor = Omit<IFloor, 'rooms'>;
