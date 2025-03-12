import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { emailController } from '../../modules/email';

const router: Router = express.Router();

router.post('/', emailController.sendEmail);
router.get('/', auth(), emailController.getEmails);

export default router;

/**
 * @swagger
 * /email:
 *   post:
 *     summary: Send an email to admins of a company if there is an incident
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sensorId
 *               - co2
 *               - temperature
 *               - date
 *               - presence
 *               - heating
 *               - incident
 *               - humidity
 *             properties:
 *               sensorId:
 *                 type: integer
 *               co2:
 *                 type: string
 *               temperature:
 *                 type: integer
 *               date:
 *                 type: string
 *               presence:
 *                 type: boolean
 *               heating:
 *                 type: boolean
 *               incident:
 *                 type: boolean
 *               humidity:
 *                 type: integer
 *             example:
 *               sensorId: 1
 *               co2: 400
 *               temperature: 20
 *               date: 2021-06-01T12:00:00
 *               presence: false
 *               heating: true
 *               incident: true
 *               humidity: 50
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 code: 200
 *                 message: Email sent
 */

/**
 * @swagger
 * /email:
 *   get:
 *     summary: Retrieve all incidents and email sent to admins of the current company
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emails:
 *                   $ref: '#/components/schemas/Email'
 *       "401":
 *         description: Unauthentified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Please authenticate
 */
