import Joi from 'joi';
import { NewRegisteredCompany } from './company.interface';

const createCompanyBody: Record<keyof NewRegisteredCompany, any> = {
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
};

export const createCompany = {
  body: Joi.object().keys(createCompanyBody),
};
