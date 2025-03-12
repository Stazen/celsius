import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/').get((_req, res) => {
  res.send('Service is running !');
});

export default router;

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Service is running !
 */
