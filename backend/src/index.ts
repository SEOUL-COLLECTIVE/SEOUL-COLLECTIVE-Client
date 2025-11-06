import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import authRoutes from './routes/authRouter';

// .env 파일 로드
dotenv.config()

const app: Express = express()

const DEV_HOST = process.env.DEV_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 5000;
const API_VERSION = process.env.API_VERSION || '/api/v1';
const FRONTEND_DEV_PORT = process.env.FRONTEND_DEV_PORT || 3000;

const allowedOrigins = [
  `http://localhost:${FRONTEND_DEV_PORT}`,
  `http://172.30.1.3:${FRONTEND_DEV_PORT}`,
];

// 미들웨어 설정
app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true 
})) // CORS 허용

app.use(express.json()) // Request body를 JSON으로 파싱

// 디버그
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    console.log(`[CORS DEBUG] Request from allowed origin: ${origin}`);
  } else if (origin) {
    console.error(`[CORS DEBUG] Request blocked from UNKNOWN origin: ${origin}`);
  }
  next();
});

// Swagger 문서 경로
app.use(
  `${API_VERSION}/docs`, 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec)
);

// API 라우트 마운트
app.use(`${API_VERSION}/auth`, authRoutes)

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
  res.send('Seoul-Collective Backend API - Connected')
})

// 서버 시작
app.listen(PORT, DEV_HOST, () => {
  console.log(`[SERVER]: Server is running at http://${DEV_HOST}:${PORT}`)
  console.log(`[SERVER]: Swagger Docs available at http://${DEV_HOST}:${PORT}${API_VERSION}/docs`);
})