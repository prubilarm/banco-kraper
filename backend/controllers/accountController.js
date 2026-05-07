const db = require('../config/db');

const getMyAccounts = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query('SELECT * FROM accounts WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las cuentas.' });
    }
};

const getAccountDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM accounts WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cuenta no encontrada.' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener detalles de la cuenta.' });
    }
};

module.exports = { getMyAccounts, getAccountDetails };
