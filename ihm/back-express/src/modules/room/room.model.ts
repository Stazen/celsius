import mongoose from 'mongoose';
import { toJSON } from '../toJSON';
import { IUserDoc } from '../user/user.interfaces';
import { IRoomDoc } from './room.interface';

const roomSchema = new mongoose.Schema<IRoomDoc, IUserDoc>({
  name: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
  },
  captors: [
    {
      type: String,
      required: false,
    },
  ],
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
  },
});

roomSchema.plugin(toJSON);

const Room = mongoose.model('Room', roomSchema);

export default Room;
