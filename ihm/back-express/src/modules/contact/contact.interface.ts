import { Document, Model } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface IContactDoc extends IContact, Document {}

export interface IContactModel extends Model<IContactDoc> {}
