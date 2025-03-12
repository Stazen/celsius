import dayjs from 'dayjs';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { emailService } from '.';
import Room from '../room/room.model';
import { catchAsync } from '../utils';
import Email from './email.model';
import { notificationEmail } from './email.template';

export const sendEmail = catchAsync(async (req: Request, res: Response) => {
  const room: any = await Room.find({ captors: { $elemMatch: { $eq: req.body.sensorId } } })
    .populate({ path: 'companyId', populate: { path: 'user', model: 'User' } })
    .exec();

  const subject = 'Notification Capteur';
  const text = `Il semblerait qu\'une erreur ai lieu dans la pièce suivante: ${room[0]?.name}. Retrouvez l'ensemble des détails sur votre compte Celsius.`;
  const html = notificationEmail(room[0]?.name);

  const companyEmails = await Email.find({
    company: room[0].companyId._id.toString(),
    'data.sensorId': 1,
  }).sort({ createdAt: -1 });

  if (companyEmails.length > 0) {
    const lastEmailSent = companyEmails[0];
    const lastEmailDate = dayjs(lastEmailSent?.createdAt);
    const currentDate = dayjs(new Date());
    if (lastEmailDate.format('DD/MM/YYYY') !== currentDate.format('DD/MM/YYYY')) {
      for (let i: number = 0; i < room[0]?.companyId.user.length; i++) {
        const user = room[0]?.companyId.user[i];
        if (user.role === 'admin') {
          await emailService.sendEmail(user.email, subject, text, html);
        }
      }
    }
  }

  if (companyEmails.length === 0) {
    for (let i: number = 0; i < room[0]?.companyId.user.length; i++) {
      const user = room[0]?.companyId.user[i];
      if (user.role === 'admin') {
        await emailService.sendEmail(user.email, subject, text, html);
      }
    }
  }

  await Email.create({
    company: room[0].companyId._id,
    captor: req.body.sensorId,
    data: { ...req.body, room: room[0] },
  });

  res.status(httpStatus.OK).send('email sent');
});

export const getEmails = catchAsync(async (req: Request, res: Response) => {
  const emails = await Email.find({ company: req.user.companyId.toString() })
    .populate({ path: 'data.room.floor', model: 'Floor' })
    .populate({ path: 'data.room.building', model: 'Building' })
    .sort({ createdAt: -1 })
    .exec();
  res.status(httpStatus.OK).send({ emails });
});
