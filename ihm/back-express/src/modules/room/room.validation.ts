import Joi from 'joi';
import { NewCreatedRoom } from './room.interface';

const createRoomBody: Record<keyof NewCreatedRoom, any> = {
  name: Joi.string().required(),
  floor: Joi.string().required(),
  captors: Joi.string().optional(),
  building: Joi.string().required(),
};

export const createRoom = {
  body: Joi.object().keys(createRoomBody),
};

