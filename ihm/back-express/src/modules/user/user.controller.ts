import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { userService } from '.';
import { companyService } from '../company';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const adminRoles = ['admin', 'user'];
  const rootRoles = ['root', 'admin', 'user'];

  if (req.user.role === 'admin' && adminRoles.indexOf(req.body.role) === -1) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  if (req.user.role === 'root' && rootRoles.indexOf(req.body.role) === -1) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  // IF A ROOT CREATE A USER, THIS USER CAN BE IN ANY COMPANY
  if (req.user.role === 'root') {
    if (req.body.role === 'admin' || req.body.role === 'user') {
      if (!req.body.companyId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide a company id');
      }
      const newUser = await userService.createUser(req.body);
      await companyService.addUserToCompany({ email: newUser.email, companyId: req.body.companyId });
      newUser.companyId = req.body.companyId;
      newUser.save();
      res.status(httpStatus.CREATED).send({ newUser });
      return;
    }
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide a valid role');
  }

  // IF AN ADMIN CREATE A USER, THIS USER IS IN THE SAME COMPANY AS THE ADMIN
  if (req.user.role === 'admin') {
    req.body.companyId = req.user.companyId;
    const newUser = await userService.createUser(req.body);
    await companyService.addUserToCompany({ email: newUser.email, companyId: req.user.companyId.toString() });
    newUser.companyId = req.user.companyId;
    newUser.save();
    res.status(httpStatus.CREATED).send({ newUser });
    return;
  }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  if (req.user.role === 'admin' && req.params.userId === req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  if (req.params.userId === req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  if (req.user.role === 'admin') {
    let userId = new mongoose.Types.ObjectId(req.params.userId);
    let userDel = await userService.getUserById(userId);
    if (userDel) {
      if (userDel?.companyId.toString() != req.user.companyId.toString()) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
      }
    }
  }
  if (req.params.userId) {
    let userId = new mongoose.Types.ObjectId(req.params.userId);
    await userService.deleteUserById(userId);
    res.status(httpStatus.OK).send();
  }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (req.user.role != 'admin' && req.params.userId != req.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  if (req.user.role === 'admin') {
    let userId = new mongoose.Types.ObjectId(req.params.userId);
    let userDel = await userService.getUserById(userId);
    if (userDel) {
      if (userDel?.companyId.toString() != req.user.companyId.toString()) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
      }
    }
  }
  if (req.params.userId) {
    let userId = new mongoose.Types.ObjectId(req.params.userId);
    await userService.updateUserById(userId, req.body);
    const updatedUser = await userService.getUserById(userId);

    if (!updatedUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "L'utilisateur n'a pas été trouvé après la mise à jour.");
    }

    res.status(httpStatus.OK).send({ success: true, user: updatedUser });
  }
});
