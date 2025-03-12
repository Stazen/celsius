import { IDataDoc } from '../data/data.interface';
import Contact from './contact.model';

export const create = async (body: IDataDoc) => {
  const contactForm = await Contact.create(body);

  return contactForm;
};
