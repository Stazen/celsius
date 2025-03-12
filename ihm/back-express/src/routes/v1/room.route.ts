import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { roomController, roomValidation } from '../../modules/room';
import { validate } from '../../modules/validate';

const router: Router = express.Router();

router.post('/', auth('manageUsers'), validate(roomValidation.createRoom), roomController.createRoom);
router.delete('/:id', auth('manageUsers'), roomController.deleteRoom);
router.get('/:id', auth(), roomController.getRoom);
router.put('/:id', auth('manageUsers'), validate(roomValidation.createRoom), roomController.updateRoom);

export default router;

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Create a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - floor
 *               - building
 *             properties:
 *               name:
 *                 type: string
 *               floor:
 *                 type: string
 *               building:
 *                 type: string
 *             example:
 *               name: fake room
 *               floor: 65a93b2dc93113ae13604854
 *               building: 65a93b2dc93113ae13604854
 *               captors: integer(optional)
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Room'
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
 * /room/:id:
 *   get:
 *     summary: Get a room
 *     tags: [Room]
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
 *                   $ref: '#/components/schemas/Room'
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
 *         description: Missing room id
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
 *               message: Room not found
 */
/**
 * @swagger
 * /room/:id:
 *   put:
 *     summary: Get a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - floor
 *               - building
 *             properties:
 *               name:
 *                 type: string
 *               floor:
 *                 type: string
 *               building:
 *                 type: string
 *             example:
 *               name: fake room
 *               floor: 65a93b2dc93113ae13604854
 *               building: 65a93b2dc93113ae13604854
 *               captors: integer(optional)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Room'
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
 *         description: Missing room id
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
 *               message: Room not found
 */
/**
 * @swagger
 * /room/:id:
 *   delete:
 *     summary: Get a room
 *     tags: [Room]
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
 *         description: Missing room id
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