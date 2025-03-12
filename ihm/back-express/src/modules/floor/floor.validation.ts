import Joi from 'joi';
import { NewCreatedFloor } from './floor.interface';

const createFloorBody: Record<keyof NewCreatedFloor, any> = {
  number: Joi.number().required(),
  companyId: Joi.string().optional(),
  buildingId: Joi.string().optional(),
};

export const createFloor = {
  body: Joi.object().keys(createFloorBody),
};