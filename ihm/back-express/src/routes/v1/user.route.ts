import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { userController } from '../../modules/user';

const router: Router = express.Router();

router.post('/', auth('manageUsers'), userController.createUser);
router.delete('/:userId', auth('manageUsers'), userController.deleteUser);
router.put('/:userId', auth('manageUsers'), userController.updateUser);

export default router;

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *               - role
 *               - companyId
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               companyId:
 *                 type: string
 *             example:
 *               email: fakeemail@email.com
 *               name: fakename
 *               password: fakepassword
 *               role: user
 *               companyId: 65a93b2dc93113ae13604854 (optional if your role is Admin)
 * 
 */
