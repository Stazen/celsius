import Joi from 'joi';
import { NewRegisteredBuilding } from './building.interface';

const createBuildingBody: Record<keyof NewRegisteredBuilding, any> = {
  name: Joi.string().required(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  country: Joi.string().optional(),
};

export const createBuilding = {
  body: Joi.object().keys(createBuildingBody),
};

export const updateBuilding = {
  body: Joi.object().keys(createBuildingBody),
};
