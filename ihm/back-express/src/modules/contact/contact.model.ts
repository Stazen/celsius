import mongoose from 'mongoose';
import { IDataModel } from '../data/data.interface';
import { IContactDoc } from './contact.interface';

const contactSchema = new mongoose.Schema<IContactDoc, IDataModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
