import httpStatus from 'http-status';
import Building from '../building/building.model';
import { ApiError } from '../errors';
import Floor from '../floor/floor.model';
import { IRoom, IRoomDoc } from './room.interface';
import Room from './room.model';
// import Floor from '../floor/floor.model';

/**
 * Create a room
 * @param {IRoom} roomBody
 * @returns {Promise<IRoomDoc>}
 */
export const createRoom = async (roomBody: IRoom): Promise<any> => {
  const building = await Building.findById(roomBody.building);
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  const floor = await Floor.findById(roomBody.floor);
  if (!floor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Floor not found');
  }

  try {
    const room = await Room.create(roomBody);
    floor.rooms.push(room.id);
    floor.save();
    return room;
  } catch (e: any) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e?.message);
  }
};

/**
 * Create a room
 * @param {id} roomId
 * @returns {Promise<void>}
 */
export const deleteRoom = async (id: string): Promise<void> => {
  const room = await Room.findByIdAndDelete(id);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  return;
};

/**
 * Get a room
 * @param {id} roomId
 * @returns {Promise<IRoomDoc>}
 */
export const getRoom = async (id: string): Promise<IRoomDoc> => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  return room;
};

/**
 * Update a room
 * @param {id} roomId
 * @param {IRoom} roomBody
 * @returns {Promise<IRoomDoc>}
 */
export const updateRoom = async (id: string, roomBody: IRoom): Promise<IRoomDoc> => {
  const room = await Room.findByIdAndUpdate(id, roomBody, { new: true });
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  return room;
};
