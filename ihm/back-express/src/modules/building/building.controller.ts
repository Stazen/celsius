import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { buildingService } from '.';
import { catchAsync } from '../utils';
import { ApiError } from '../errors';

export const createBuilding = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'You do not have no company' });
  }

  await buildingService.createBuilding(req.body, req.user.companyId);
  res.status(httpStatus.CREATED).send({ message: 'Building added' });
});

export const getUserCompanyBuilding = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'You do not have no company' });
    return;
  }
  const building = await buildingService.getUserCompanyBuilding(req.user.companyId.toString());
  res.status(httpStatus.OK).send({ building });
  return;
});

export const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  if (req.user.role === 'admin' && req.params.userId === req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  if (!req.user.companyId) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'You do not have no company' });
    return;
  }
  if (req.params.buildingId) {
    await buildingService.deleteBuilding(req.params.buildingId);
    res.status(httpStatus.OK).send({ message: 'Building deleted' });
    return;
  }
});

export const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'You do not have no company' });
    return;
  }
  if (req.params.buildingId) {
    await buildingService.updateBuilding(req.params.buildingId, req.body);
    res.status(httpStatus.OK).send({ message: 'Building updated' });
    return;
  }
});
