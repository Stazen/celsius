import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { buildingController, buildingValidation } from '../../modules/building';
import { validate } from '../../modules/validate';

const router: Router = express.Router();

router.post('/', auth('manageUsers'), validate(buildingValidation.createBuilding), buildingController.createBuilding);
router.get('/', auth(), buildingController.getUserCompanyBuilding);
router.delete('/:buildingId', auth('manageUsers'), buildingController.deleteBuilding);
router.put(
  '/:buildingId',
  auth('manageUsers'),
  validate(buildingValidation.updateBuilding),
  buildingController.updateBuilding,
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Building
 *   description: Building routes
 */

/**
 * @swagger
 * /building:
 *   post:
 *     summary: Create a building
 *     tags: [Building]
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
 *               - address
 *               - city
 *               - postalCode
 *               - country
 *               - companyId
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               companyId:
 *                 type: string
 *             example:
 *               name: fake building
 *               address: 21 rue fakeaddress
 *               city: fakecity
 *               postalCode: "75000"
 *               country: France
 *               companyId: 5e9f3e3e1c9d440000d7b3a9
 *     responses:
 *       "201":
 *         description: Created
 *       "404":
 *         description: Company not found
 *         content:
 *           application/json:
 *             example:
 *               code: 404
 *               message: Company not found
 *       "401":
 *         description: Your are not admin of the company or not logged in
 *         content:
 *             application/json:
 *               example:
 *                 code: 401
 *                 message: Unauthorized
 *
 */

/**
 * @swagger
 * /building:
 *   get:
 *     summary: Get a building
 *     tags: [Building]
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
 *                 building:
 *                   $ref: '#/components/schemas/Building'
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
