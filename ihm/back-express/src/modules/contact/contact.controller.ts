import { Request, Response } from 'express';
import { contactService } from '.';
import { catchAsync } from '../utils';

export const create = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.create(req.body);

  res.status(201).send(contact);
});
