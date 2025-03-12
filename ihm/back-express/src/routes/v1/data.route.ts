import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { dataController } from '../../modules/data';
const router: Router = express.Router();

router.get('/', auth(), dataController.getDatas);
router.get('/calendar', auth(), dataController.getDatasCalendar);
router.get('/details', auth(), dataController.getDataPerDay);

export default router;

/**
 * @swagger
 * /data?sensorId={sensorId}:
 *   get:
 *     summary: Get datas
 *     tags: [Data]
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
 *                 data:
 *                   $ref: '#/components/schemas/Data'
 *       "404":
 *         description: Missing sensorId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Missing sensorId
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
/**
 * @swagger
 * /calendar?sensorId={sensorId}:
 *   get:
 *     summary: Get calendar datas since a date for captors of your company
 *     tags: [Data]
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
 *                 data:
 *                   $ref: '#/components/schemas/DataCalendar'
 *       "404":
 *         description: Missing sensorId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Missing sensorId
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
/**
 * @swagger
 * /data?sensorId={sensorId}:
 *   get:
 *     summary: Get datas
 *     tags: [Data]
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
 *                 data:
 *                   $ref: '#/components/schemas/Data'
 *       "404":
 *         description: Missing sensorId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Missing sensorId
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

/**
 * @swagger
 * /data/details?sensorId={sensorId}&interval={interval}:
 *   get:
 *     summary: Get datas for a specific captor and a specific interval
 *     tags: [Data]
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
 *                 data:
 *                   $ref: '#/components/schemas/Data'
 *       "404":
 *         description: Missing sensorId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Missing sensorId
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