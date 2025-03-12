import express, { Router } from 'express';
import { contactController, contactValidation } from '../../modules/contact';
import { validate } from '../../modules/validate';

const router: Router = express.Router();

router.post('/', validate(contactValidation.contactValidation), contactController.create);

export default router;
