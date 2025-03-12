import express, { Router } from 'express';

import { auth } from '../../modules/auth';
import { floorController, floorValidation } from '../../modules/floor';
import { validate } from '../../modules/validate';

const router: Router = express.Router();

router.post('/', auth('manageUsers'), validate(floorValidation.createFloor), floorController.createFloor);
router.get('/:id', auth(), floorController.getFloor);
router.put('/:id', auth('manageUsers'), validate(floorValidation.createFloor), floorController.updateFloor);
router.delete('/:id', auth('manageUsers'), floorController.deleteFloor);

export default router;

/**
 * @swagger
 * /floor:
 *   post:
 *     summary: Create a floor
 *     tags: [Floor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - buildingId
 *           properties:
 *              number:
 *                type: integer
 *              buildingId:
 *                type: string
 *           example:
 *             number: 2
 *             buildingId: 65a93b2dc93113ae13604854
 *     responses:
 *       "201":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Floor'
 *       "401":
 *         description: Unauthentified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Please authenticate || You must be in a company
 */

/**
 * @swagger
 * /floor/:id:
 *   get:
 *     summary: Get a floor
 *     tags: [Floor]
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
 *                   $ref: '#/components/schemas/Floor'
 *       "401":
 *         description: Unauthentified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Please authenticate || You must be in a company
 *       "400":
 *         description: Missing floor id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: Missing id
 *       "404":
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Floor not found
 */
/**
 * @swagger
 * /floor/:id:
 *   put:
 *     summary: Update a floor
 *     tags: [Floor]
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
 *                   $ref: '#/components/schemas/Floor'
 *       "401":
 *         description: Unauthentified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Please authenticate || You must be in a company
 *       "400":
 *         description: Missing floor id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: Missing id
 *       "404":
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Floor not found
 */
/**
 * @swagger
 * /floor/:id:
 *   delete:
 *     summary: Delete a floor
 *     tags: [Floor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OK'
 *             example:
 *               code: 200
 *               message: Ok 
 *       "401":
 *         description: Unauthentified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Please authenticate || You must be in a company
 *       "400":
 *         description: Missing floor id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: Missing id
 *       "404":
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Floor not found
 */