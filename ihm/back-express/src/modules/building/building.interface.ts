import mongoose, { Document, Model } from 'mongoose';

export interface IBuilding {
  name: string;
  companyId: mongoose.Schema.Types.ObjectId;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  floor: mongoose.Schema.Types.ObjectId[];
}

export interface IBuildingDoc extends IBuilding, Document {}

export interface IBuildingModel extends Model<IBuilding> {}

export type NewRegisteredBuilding = Omit<IBuilding, 'floor' | 'companyId'>;
