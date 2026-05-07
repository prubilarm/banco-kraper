const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Banco Kraper API',
      version: '1.0.0',
      description: 'Documentación interactiva de la API para el sistema bancario Banco Kraper',
      contact: {
        name: 'Soporte Banco Kraper',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de Desarrollo',
      },
      {
        url: 'https://banco-kraper-backend.vercel.app',
        description: 'Servidor de Producción (Vercel)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde están los endpoints para documentar
};

const specs = swaggerJsdoc(options);
module.exports = specs;
