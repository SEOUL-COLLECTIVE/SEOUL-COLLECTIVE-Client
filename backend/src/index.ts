import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRouter';

// .env 파일 로드
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

// 미들웨어 설정
app.use(cors()) // CORS 허용
app.use(express.json()) // Request body를 JSON으로 파싱

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
  res.send('Seoul-Collective Backend API - Connected')
})

// API 라우트 마운트
app.use('/api/auth', authRoutes)

// 서버 시작
app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`)
})