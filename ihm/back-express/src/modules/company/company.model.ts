import mongoose from 'mongoose';
import { ICompanyDoc, ICompanyModel } from './company.interface';

const companySchema = new mongoose.Schema<ICompanyDoc, ICompanyModel>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    building: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
      },
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model<ICompanyDoc, ICompanyModel>('Company', companySchema);

export default Company;
