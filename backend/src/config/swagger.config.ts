import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config()

// YAML 파일 경로
const swaggerYamlPath = path.join(__dirname, '../docs/swagger.api.yaml')

// 1. YAML 파일 로드 및 파싱
let swaggerSpec: any

try {
  const fileContents = fs.readFileSync(swaggerYamlPath, 'utf8')
  swaggerSpec = yaml.load(fileContents)
} catch (e) {
  console.error('[ERROR] Failed to load or parse swagger.yaml:', e)
  swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Load Error',
      version: '1.0.0',
      description: 'API documentation failed to load.',
    },
    paths: {},
  };
}

// 2. 서버 정보 동적으로 업데이트
const DEV_HOST = process.env.DEV_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 5000;
const API_VERSION = process.env.API_VERSION || '/api/v1';

if (swaggerSpec.servers) {
    swaggerSpec.servers[0].url = `http://${DEV_HOST}:${PORT}${API_VERSION}`;
    swaggerSpec.servers[0].description = '로컬 개발 서버';
} else {
    swaggerSpec.servers = [{
        url: `http://${DEV_HOST}:${PORT}${API_VERSION}`,
        description: '로컬 개발 서버',
    }];
}

export { swaggerSpec };