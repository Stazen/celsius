import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { floorService } from '.';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';

export const createFloor = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.UNAUTHORIZED).send({ message: 'You must be in a company' });
  }
  req.body.companyId = req.user.companyId;
  const floor = await floorService.createFloor(req.body);
  res.status(httpStatus.CREATED).send({ message: 'Ok', data: floor });
});

export const getFloor = catchAsync(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
  }
  const floor = await floorService.getFloor(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Ok', data: floor });
});

export const deleteFloor = catchAsync(async (req: Request, res: Response) => {
  if (req.user.role === 'admin' && req.params.userId === req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  if (!req.params.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
  }
  await floorService.deleteFloor(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Ok' });
});

export const updateFloor = catchAsync(async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing id');
  }
  const floor = await floorService.updateFloor(req.params.id, req.body);
  res.status(httpStatus.OK).send({ message: 'Ok', data: floor });
});
