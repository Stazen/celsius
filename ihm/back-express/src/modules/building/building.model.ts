import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IBuildingDoc, IBuildingModel } from './building.interface';

const buildingSchema = new mongoose.Schema<IBuildingDoc, IBuildingModel>({
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
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
  floor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Floor',
    },
  ],
});

buildingSchema.plugin(toJSON);

const Building = mongoose.model('Building', buildingSchema);

export default Building;
