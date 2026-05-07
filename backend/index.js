const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Banco Kraper' });
});

app.get('/api/health', async (req, res) => {
  try {
    const db = require('./config/db');
    const result = await db.query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      db: 'connected', 
      time: result.rows[0].now,
      jwt_set: !!process.env.JWT_SECRET
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error', 
      message: err.message, 
      stack: err.stack,
      db_url_set: !!process.env.DATABASE_URL
    });
  }
});

// Importar Rutas
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
  });
}

// Exportar para Vercel (Serverless)
module.exports = app;
