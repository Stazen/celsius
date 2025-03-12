import mongoose from 'mongoose';
// import { toJSON } from '../toJSON';
import { IEmailDoc, IEmailModel } from './email.interface';

const emailSchema = new mongoose.Schema<IEmailDoc, IEmailModel>(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    captor: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// emailSchema.plugin(toJSON);

const Email = mongoose.model<IEmailDoc, IEmailModel>('Email', emailSchema);

export default Email;
