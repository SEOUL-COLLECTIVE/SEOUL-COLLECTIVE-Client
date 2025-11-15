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
const PORT = Number(process.env.PORT) || 4000;
const API_VERSION = process.env.API_VERSION || '/api/v1';
const FRONTEND_DEV_PORT = Number(process.env.FRONTEND_DEV_PORT) || 3000;

const allowedOrigins = [
  `http://localhost:${FRONTEND_DEV_PORT}`,
  `http://127.0.0.1:${FRONTEND_DEV_PORT}`,
  `http://172.30.1.3:${FRONTEND_DEV_PORT}`,
  `http://localhost:${PORT}`, 
  `http://127.0.0.1:${PORT}`,
];

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
  res.send('Seoul-Collective Backend API - Connected')
})

// ⭐️ 파비콘 요청 처리 (CORS 미들웨어보다 앞에 위치해야 함)
app.get('/favicon.ico', (req: Request, res: Response) => res.status(204).end());

// 미들웨어 설정
app.use(cors({
  origin: (origin, callback) => {
    // 1. Origin 헤더가 없는 요청 (브라우저에서 서버 URL로 직접 접근)은 무조건 허용
    if (!origin) return callback(null, true);
    
    // 2. Origin 헤더가 있는 경우, allowedOrigins 목록에서 확인
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // 3. 목록에 없는 오리진은 차단 (Forbidden)
      callback(new Error('Not allowed by CORS'), false); 
    }
  },
  credentials: true 
}));

app.use(express.json()) // Request body를 JSON으로 파싱

// Swagger 문서 경로
app.use(
  `${API_VERSION}/docs`, 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec)
);

// API 라우트 마운트
app.use(`${API_VERSION}/auth`, authRoutes)

// 서버 시작
app.listen(PORT, DEV_HOST, () => {
  const displayHost = DEV_HOST === '0.0.0.0' ? 'localhost' : DEV_HOST;

  console.log(`[SERVER]: Server is running at http://${displayHost}:${PORT}`)
  console.log(`[SERVER]: Swagger Docs available at http://${displayHost}:${PORT}${API_VERSION}/docs`);
})