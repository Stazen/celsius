import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { companyService } from '../company';
import { ICompanyDoc } from '../company/company.interface';
import { ApiError } from '../errors';
import Floor from '../floor/floor.model';
import { IBuilding, IBuildingDoc } from './building.interface';
import Building from './building.model';

/**
 * Create a building
 * @param {IBuilding} buildingBody
 * @param {mongoose.Schema.Types.ObjectId} companyId
 * @returns {Promise<ICompanyDoc>}
 */
export const createBuilding = async (
  buildingBody: IBuilding,
  companyId: mongoose.Schema.Types.ObjectId,
): Promise<ICompanyDoc> => {
  buildingBody.companyId = companyId;
  const building = await Building.create(buildingBody);
  const company = await companyService.addBuildingToCompany(companyId, building._id.toString());
  return company;
};

/**
 * Add a floor to a specific building
 * @param {string} floorId
 * @param {string} buildingId
 * @returns {Promise<ICompanyDoc>}
 */
export const addFloor = async (floorId: string, buildingId: string): Promise<IBuildingDoc> => {
  const building: IBuildingDoc | null = await Building.findById(buildingId);
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  const floor = await Floor.findById(floorId);
  if (!floor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Floor does not exist');
  }
  building.floor.push(floor.id);
  building.save;
  return building;
};

// TODO: TYPE RETURNED VALUE OF POPULATED BUILDING
/**
 * Get buildings of the current user company
 * @param {string} companyId
 * @returns {Promise<ICompanyDoc | any>}
 */
export const getUserCompanyBuilding = async (companyId: string): Promise<ICompanyDoc | any> => {
  const building = await Building.find({ companyId: companyId })
    .populate({ path: 'floor', populate: { path: 'rooms', model: 'Room' } })
    .exec();
  if (!building.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  return building;
};

/**
 * Get buildings of the current user company
 * @param {string} buildingId
 * @returns {Promise<void>}
 */
export const deleteBuilding = async (buildingId: string): Promise<void> => {
  const building = await Building.findOneAndDelete({ _id: buildingId });
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  const company = await companyService.deleteBuildingFromCompany(building.companyId.toString(), buildingId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  return;
};

/**
 * Update a specific building
 * @param {string} buildingId
 * @param {IBuilding} buildingBody
 * @returns {Promise<void>}
 */
export const updateBuilding = async (buildingId: string, buildingBody: IBuilding): Promise<void> => {
  const building = await Building.findOneAndUpdate({ _id: buildingId }, buildingBody, { new: true });
  if (!building) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  }
  return;
};
