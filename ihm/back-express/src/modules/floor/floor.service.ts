import httpStatus from 'http-status';
import { IBuildingDoc } from '../building/building.interface';
import Building from '../building/building.model';
import { ApiError } from '../errors';
import { IFloorDoc, NewCreatedFloor } from './floor.interface';
import Floor from './floor.model';

/**
 * Create floor
 * @param {NewCreatedFloor} floorBody
 * @returns {Promise<IFloor>}
 */
export const createFloor = async (floorBody: NewCreatedFloor): Promise<IBuildingDoc | any> => {
  const building = await Building.findById(floorBody.buildingId);
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  const floor = await Floor.create(floorBody);
  building.floor.push(floor.id);
  building.save();
  return building;
};

// TODO: TYPE RETURNED VALUE OF POPULATED Floor
/**
 * Return a floor and its rooms
 * @param {string} id
 * @returns {Promise<IFloorDoc | any>}
 */
export const getFloor = async (id: string): Promise<IFloorDoc | any> => {
  const floor = Floor.findById(id)
    .populate({
      path: 'rooms',
      model: 'Room',
    })
    .exec();
  if (!floor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Floor not found');
  }
  return floor;
};

/**
 * Delete floor
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteFloor = async (id: string): Promise<void> => {
  const floor = await Floor.findByIdAndDelete(id);
  if (!floor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Floor not found');
  }
  return;
};

/**
 * Update floor
 * @param {string} id
 * @param {NewCreatedFloor} floorBody
 * @returns {Promise<IFloorDoc | any>}
 */
export const updateFloor = async (id: string, floorBody: NewCreatedFloor): Promise<IFloorDoc | any> => {
  const floor = await Floor.findByIdAndUpdate(id, floorBody, { new: true });
  if (!floor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Floor not found');
  }
  return floor;
};
