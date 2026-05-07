const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../utils/mailer');

const register = async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Determinar rol (primer usuario es Admin)
        const userCount = await db.query('SELECT COUNT(*) FROM users');
        const role = parseInt(userCount.rows[0].count) === 0 ? 'Admin' : 'User';

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = await db.query(
            'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, role',
            [full_name, email, hashedPassword, role]
        );

        const userId = newUser.rows[0].id;

        // Crear automáticamente dos cuentas
        const generateCardNumber = () => '4532 ' + Math.random().toString().slice(2, 6) + ' ' + Math.random().toString().slice(2, 6) + ' ' + Math.random().toString().slice(2, 6);
        const generateAccountNumber = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

        // Cuenta Corriente
        await db.query(
            'INSERT INTO accounts (user_id, account_type, account_number, card_number, balance) VALUES ($1, $2, $3, $4, $5)',
            [userId, 'Cuenta Corriente', generateAccountNumber(), generateCardNumber(), 0]
        );

        // Cuenta de Ahorro
        await db.query(
            'INSERT INTO accounts (user_id, account_type, account_number, card_number, balance) VALUES ($1, $2, $3, $4, $5)',
            [userId, 'Cuenta de Ahorro', generateAccountNumber(), generateCardNumber(), 0]
        );

        // Enviar correo de bienvenida
        await sendWelcomeEmail(email, full_name);

        res.status(201).json({
            message: 'Usuario registrado exitosamente con sus cuentas bancarias.',
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};

module.exports = { register, login };
