const express = require('express');
const router = express.Router();
const { getMyAccounts, getAccountDetails } = require('../controllers/accountController');
const { authMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/accounts/my:
 *   get:
 *     summary: Obtiene las cuentas del usuario autenticado
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas
 */
router.get('/my', authMiddleware, getMyAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   get:
 *     summary: Obtiene detalles de una cuenta específica
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la cuenta
 */
router.get('/:id', authMiddleware, getAccountDetails);

module.exports = router;
