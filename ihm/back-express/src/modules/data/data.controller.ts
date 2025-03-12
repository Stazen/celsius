import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { dataService } from '.';
import { catchAsync } from '../utils';

export const getDatas = catchAsync(async (req: Request, res: Response) => {
  if (req.query.sensorId) {
    const data = await dataService.getPartialData(200, req.query.sensorId);
    res.status(httpStatus.OK).send({ data });
    return;
  }
  res.status(httpStatus.NOT_FOUND).send({ error: 'Missing sensorId' });
});

export const getDatasCalendar = catchAsync(async (req: Request, res: Response) => {
  if (req.query.sensorId) {
    const data = await dataService.getPartialDataCalendar(String(req.query.sensorId));
    res.status(httpStatus.OK).send({ data });
    return;
  }
  res.status(httpStatus.NOT_FOUND).send({ error: 'Missing sensorId' });
});

export const getDataPerDay = catchAsync(async (req: Request, res: Response) => {
  if (req.query.sensorId && req.query.interval) {
    const data = await dataService.getDataPerDay(req.query.interval, req.query.sensorId);
    res.status(httpStatus.OK).send({ data });
    return;
  }
  res.status(httpStatus.NOT_FOUND).send({ error: 'Missing sensorId or interval' });
})