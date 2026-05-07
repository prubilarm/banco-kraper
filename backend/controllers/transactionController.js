const db = require('../config/db');

const transfer = async (req, res) => {
    const { sender_account_id, receiver_account_number, amount, description } = req.body;
    const userId = req.user.id;

    try {
        // 1. Validar cuenta origen y saldo
        const senderResult = await db.query('SELECT * FROM accounts WHERE id = $1 AND user_id = $2', [sender_account_id, userId]);
        if (senderResult.rows.length === 0) {
            return res.status(403).json({ error: 'Cuenta de origen no válida o no te pertenece.' });
        }

        const senderAccount = senderResult.rows[0];
        if (parseFloat(senderAccount.balance) < parseFloat(amount)) {
            return res.status(400).json({ error: 'Saldo insuficiente.' });
        }

        // 2. Buscar cuenta destino por número de cuenta
        const receiverResult = await db.query('SELECT * FROM accounts WHERE account_number = $1', [receiver_account_number]);
        if (receiverResult.rows.length === 0) {
            return res.status(404).json({ error: 'Cuenta de destino no encontrada.' });
        }

        const receiverAccount = receiverResult.rows[0];

        // 3. Iniciar Transacción SQL
        await db.query('BEGIN');

        // Descontar saldo origen
        await db.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, sender_account_id]);

        // Aumentar saldo destino
        await db.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, receiverAccount.id]);

        // Registrar transacción
        const transactionResult = await db.query(
            'INSERT INTO transactions (sender_account_id, receiver_account_id, type, amount, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [sender_account_id, receiverAccount.id, 'transfer', amount, description]
        );

        await db.query('COMMIT');

        res.json({ message: 'Transferencia realizada con éxito.', transaction: transactionResult.rows[0] });

    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la transferencia.' });
    }
};

const deposit = async (req, res) => {
    const { account_id, amount, description } = req.body;

    try {
        await db.query('BEGIN');
        
        await db.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, account_id]);
        
        const transactionResult = await db.query(
            'INSERT INTO transactions (receiver_account_id, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [account_id, 'deposit', amount, description]
        );

        await db.query('COMMIT');
        res.json({ message: 'Depósito realizado con éxito.', transaction: transactionResult.rows[0] });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'Error al realizar el depósito.' });
    }
};

const getMyTransactions = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query(`
            SELECT t.*, 
                   sa.account_number as sender_number, 
                   ra.account_number as receiver_number
            FROM transactions t
            LEFT JOIN accounts sa ON t.sender_account_id = sa.id
            LEFT JOIN accounts ra ON t.receiver_account_id = ra.id
            WHERE sa.user_id = $1 OR ra.user_id = $1
            ORDER BY t.created_at DESC
        `, [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener transacciones.' });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT t.*, u.full_name as user_name
            FROM transactions t
            LEFT JOIN accounts a ON t.sender_account_id = a.id OR t.receiver_account_id = a.id
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY t.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todas las transacciones.' });
    }
};

module.exports = { transfer, deposit, getMyTransactions, getAllTransactions };
