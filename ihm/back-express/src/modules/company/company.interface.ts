import mongoose, { Document, Model } from 'mongoose';

export interface ICompany {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  building: mongoose.Schema.Types.ObjectId[];
  user: mongoose.Schema.Types.ObjectId[];
}

export interface ICompanyDoc extends ICompany, Document {}

export interface ICompanyModel extends Model<ICompanyDoc> {}

export type NewRegisteredCompany = Omit<ICompany, 'building' | 'user'>;
