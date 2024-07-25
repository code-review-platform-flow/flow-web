# 기본 이미지 설정
FROM node:20-alpine AS base

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위한 레이어
FROM base as deps
COPY package.json package-lock.json ./
RUN npm ci
RUN npm install -g @storybook/cli

# Storybook CLI 설치
RUN npm install -g @storybook/cli


# 소스 코드 빌드를 위한 레이어
FROM base as builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 프로덕션 이미지 설정
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수를 프로덕션 모드로 설정
ENV NODE_ENV production

# 빌드된 파일들과 필요한 파일들만 복사
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 애플리케이션이 실행될 포트 노출
EXPOSE 3000

# Next.js 애플리케이션 시작 명령어
CMD ["npm", "start"]
