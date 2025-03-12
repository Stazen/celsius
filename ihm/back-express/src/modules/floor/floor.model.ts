import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IFloorDoc, IFloorModel } from './floor.interface';

const floorSchema = new mongoose.Schema<IFloorDoc, IFloorModel>({
  number: {
    type: Number,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  buildingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  ],
});

floorSchema.plugin(toJSON);

const Floor = mongoose.model('Floor', floorSchema);

export default Floor;
