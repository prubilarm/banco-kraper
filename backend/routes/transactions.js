const express = require('express');
const router = express.Router();
const { transfer, deposit, getMyTransactions, getAllTransactions } = require('../controllers/transactionController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/transactions/transfer:
 *   post:
 *     summary: Realiza una transferencia a una cuenta propia o de terceros
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender_account_id
 *               - receiver_account_number
 *               - amount
 *             properties:
 *               sender_account_id:
 *                 type: string
 *               receiver_account_number:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transferencia exitosa
 */
router.post('/transfer', authMiddleware, transfer);

/**
 * @swagger
 * /api/transactions/deposit:
 *   post:
 *     summary: Realiza un depósito (abono) en una cuenta
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_id
 *               - amount
 *             properties:
 *               account_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Depósito exitoso
 */
router.post('/deposit', authMiddleware, deposit);

/**
 * @swagger
 * /api/transactions/my:
 *   get:
 *     summary: Obtiene el historial de transacciones del usuario
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transacciones
 */
router.get('/my', authMiddleware, getMyTransactions);

/**
 * @swagger
 * /api/transactions/all:
 *   get:
 *     summary: Obtiene todas las transacciones del sistema (Solo Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de transacciones
 */
router.get('/all', authMiddleware, adminMiddleware, getAllTransactions);

module.exports = router;
