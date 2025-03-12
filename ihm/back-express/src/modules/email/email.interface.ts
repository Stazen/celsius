import mongoose, { Document, Model } from 'mongoose';

export interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface IEmail {
  company: mongoose.Schema.Types.ObjectId;
  captor: string;
  data: object;
  createdAt: string;
  updatedAt: string;
}

export interface IEmailDoc extends IEmail, Document {}

export interface IEmailModel extends Model<IEmailDoc> {}
