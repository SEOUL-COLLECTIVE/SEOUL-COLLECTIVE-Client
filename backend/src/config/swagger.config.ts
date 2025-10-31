import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config()

const DEV_HOST = process.env.DEV_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 5000;
const API_VERSION = process.env.API_VERSION || '/api/v1';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Seoul Collective API Documentation',
    version: '1.0.0',
    description: 'Node.js Express 서버를 위한 API 문서.',
  },
  servers: [
    {
      url: `http://${DEV_HOST}:${PORT}`,
      description: '로컬 개발 서버',
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
    schemas: {
    }
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);