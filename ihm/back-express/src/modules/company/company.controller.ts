import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { companyService } from '.';
import { catchAsync } from '../utils';

export const createCompany = catchAsync(async (req: Request, res: Response) => {
  const company = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).send({ company });
});

export const getCompany = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.UNAUTHORIZED).send({ message: 'You have to be in a company' });
  }
  const company = await companyService.getCompany(req.user.companyId.toString());
  res.status(httpStatus.OK).send({ company });
});

export const getCompanyUser = catchAsync(async (req: Request, res: Response) => {
  if (!req.user.companyId) {
    res.status(httpStatus.UNAUTHORIZED).send({ message: 'You have to be in a company' });
  }
  const companyUser = await companyService.getCompanyUser(req.user.companyId.toString());
  res.status(httpStatus.OK).send({ companyUser });
});
