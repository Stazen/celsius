import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Building from '../building/building.model';
import { ApiError } from '../errors';
import { userService } from '../user';
import { ICompany, ICompanyDoc } from './company.interface';
import Company from './company.model';

/**
 * Create a company
 * @param {ICompany} companyBody
 * @returns {Promise<ICompanyDoc>}
 */
export const createCompany = async (companyBody: ICompany): Promise<ICompanyDoc> => {
  return Company.create(companyBody);
};

/**
 * Add user to a Company
 * @param {{email: string, companyId: string}} body
 * @returns {Promise<ICompanyDoc>}
 */
export const addUserToCompany = async (body: { email: string; companyId: string }): Promise<ICompanyDoc> => {
  const user = await userService.getUserByEmail(body.email);

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const company = await Company.findById(body.companyId);

  if (!company) throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');

  company.user.push(user.id);
  company.save();

  return company;
};

/**
 * Add a building into a company
 * @param {{companyId: mongoose.Schema.Types.ObjectId, buildingId: mongoose.Schema.Types.ObjectId}} companyId buildingId
 * @returns {Promise<ICompanyDoc>}
 */
export const addBuildingToCompany = async (
  companyId: mongoose.Schema.Types.ObjectId,
  buildingId: string,
): Promise<ICompanyDoc> => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  const building = await Building.findById(buildingId);
  if (!building) throw new ApiError(httpStatus.NOT_FOUND, 'Building not found');
  company.building.push(building.id);
  company.save();
  return company;
};

// TODO: TYPE RETURNED VALUE OF POPULATED Company
/**
 * Return a company
 * @param {string} companyId
 * @returns {Promise<ICompanyDoc | any>}
 */
export const getCompany = async (companyId: string): Promise<ICompanyDoc | any> => {
  const company = await Company.find({ _id: companyId })
    .populate({ path: 'building', populate: { path: 'floor', model: 'Floor', populate: { path: 'rooms', model: 'Room' } } })
    .exec();
  return company;
};

// TODO: TYPE RETURNED VALUE OF POPULATED Company
/**
 * Return a company and its buildings
 * @param {string} companyId
 * @returns {Promise<ICompanyDoc | any>}
 */
export const getCompanyBuilding = async (companyId: string): Promise<ICompanyDoc | any> => {
  const company = await Company.find({ _id: companyId })
    .populate({ path: 'building', populate: { path: 'floor', model: 'Floor' } })
    .exec();
  return company;
};

/**
 * Return a company and its users
 * @param {string} companyId
 * @returns {Promise<ICompanyDoc | any>}
 */
export const getCompanyUser = async (companyId: string): Promise<any> => {
  const companyUser = await Company.find({ _id: companyId })
    .populate({
      path: 'user',
      model: 'User',
      options: {
        sort: { role: 1 },
      },
    })
    .exec();
  return companyUser;
};

export const deleteBuildingFromCompany = async (companyId: string, buildingId: string): Promise<ICompanyDoc> => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  company.building = company.building.filter((id) => id.toString() !== buildingId);
  company.save();
  return company;
}

export const deleteUserFromCompany = async (companyId: string, userId: string): Promise<ICompanyDoc> => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  company.user = company.user.filter((id) => id.toString() !== userId);
  company.save();
  return company;
}