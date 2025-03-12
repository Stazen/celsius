import httpStatus from 'http-status';
import { Request, Response } from 'express';
import * as dataController from '../../modules/data/data.controller';
import * as dataService from '../../modules/data';

jest.mock('../../modules/data', () => ({
  dataService: {
    getPartialData: jest.fn(),
    getPartialDataCalendar: jest.fn(),
    getDataPerDay: jest.fn(),
  },
}));

describe('Data Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseData: any;
  let responseStatus: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockImplementation((status) => {
        responseStatus = status;
        return mockResponse;
      }),
      send: jest.fn().mockImplementation((data) => {
        responseData = data;
      }),
    };
  });

  describe('getDatas', () => {
    it('should return data when sensorId is provided', async () => {
      mockRequest.query = { sensorId: '123' };
      await dataController.getDatas(mockRequest as Request, mockResponse as Response, jest.fn());
      expect(dataService.dataService.getPartialData).toHaveBeenCalledWith(200, '123');
      expect(responseStatus).toBe(httpStatus.OK);
    });

    it('should return error when sensorId is missing', async () => {
      mockRequest.query = {};
      await dataController.getDatas(mockRequest as Request, mockResponse as Response, jest.fn());
      expect(responseStatus).toBe(httpStatus.NOT_FOUND);
      expect(responseData).toEqual({ error: 'Missing sensorId' });
    });
  });

  describe('getDatasCalendar', () => {
    it('should return data when sensorId is provided', async () => {
      mockRequest.query = { sensorId: '123' };
      await dataController.getDatasCalendar(mockRequest as Request, mockResponse as Response, jest.fn());
      expect(dataService.dataService.getPartialDataCalendar).toHaveBeenCalledWith('123');
      expect(responseStatus).toBe(httpStatus.OK);
    });

    it('should return error when sensorId is missing', async () => {
      mockRequest.query = {};
      await dataController.getDatasCalendar(mockRequest as Request, mockResponse as Response, jest.fn());
      expect(responseStatus).toBe(httpStatus.NOT_FOUND);
      expect(responseData).toEqual({ error: 'Missing sensorId' });
    });
  });

  describe('getDataPerDay', () => {
    it('should return data when sensorId and interval are provided', async () => {
      mockRequest.query = { sensorId: '123', interval: '1d' };
      await dataController.getDataPerDay(mockRequest as Request, mockResponse as Response, jest.fn());
      expect(dataService.dataService.getDataPerDay).toHaveBeenCalledWith('1d', '123');
      expect(responseStatus).toBe(httpStatus.OK);
    });

    it('should return error when sensorId or interval is missing', async () => {
      mockRequest.query = { sensorId: '123' }; // Missing interval
      await dataController.getDataPerDay(mockRequest as Request, mockResponse as Response, jest.fn());
      expect(responseStatus).toBe(httpStatus.NOT_FOUND);
      expect(responseData).toEqual({ error: 'Missing sensorId or interval' });
    });
  });
});
