import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { companyController } from '../../modules/company';

const router: Router = express.Router();

router.post('/', auth('manageAdmins'), companyController.createCompany);
router.get('/', auth(), companyController.getCompany);
router.get('/user', auth(), companyController.getCompanyUser);

export default router;

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company routes
 */

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a building
 *     tags: [Company]
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
 *             example:
 *               name: fake building
 *               address: 21 rue fakeaddress
 *               city: fakecity
 *               postalCode: "75000"
 *               country: France
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   $ref: '#/components/schemas/Company'
 *       "401":
 *         description: Unauthentified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Please authenticate
 *
 */

/**
 * @swagger
 * /company:
 *   get:
 *     summary: Get my company users
 *     tags: [Company]
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
 *                   $ref: '#/components/schemas/Company'
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
 * /company/user:
 *   get:
 *     summary: Get my company users
 *     tags: [Company]
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
 *                 company:
 *                   $ref: '#/components/schemas/CompanyUser'
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
