import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { roomService } from '.';
import { catchAsync } from '../utils';
import { ApiError } from '../errors';


export const createRoom = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'You have to be in a company' });
  }
  req.body.companyId = req.user.companyId;
  const room = await roomService.createRoom(req.body);
  res.status(httpStatus.CREATED).send({ room });
});


export const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  if (req.user.role === 'admin' && req.params.userId === req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing id' });
    return;
  }
  await roomService.deleteRoom(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Ok' });
  return;
});

export const getRoom = catchAsync(async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing id' });
    return;
  }
  const room = await roomService.getRoom(req.params.id);
  res.status(httpStatus.OK).send({ room });
  return;
});

export const updateRoom = catchAsync(async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing id' });
    return;
  }
  const room = await roomService.updateRoom(req.params.id, req.body);
  res.status(httpStatus.OK).send({ room });
  return;
});