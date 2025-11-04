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

// 미들웨어 설정
app.use(cors({ origin: '*' })) // CORS 허용
app.use(express.json()) // Request body를 JSON으로 파싱

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