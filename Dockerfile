# 1. 빌드 환경 설정 (Node.js 22 사용)
FROM node:22-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

# 2. 프로젝트 구조 최적화 (prune)
FROM base AS pruner
COPY . .
# frontend-server와 관련된 패키지만 추출
RUN turbo prune frontend-server --docker

# 3. 실제 빌드 단계
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=pruner /app/out/full/ .
# GitHub Actions에서 생성된 .env 파일 복사
COPY apps/web/.env ./apps/web/.env
RUN turbo run build --filter=frontend-server

# 4. 실행 단계 (Node.js 서버 직접 실행)
FROM node:22-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm turbo

# 빌드 결과물 전체 복사
COPY --from=builder /app .

# 컨테이너 포트 3000번 개방
EXPOSE 3000

# Next.js 서버 실행 (SSR 지원)
CMD ["pnpm", "turbo", "run", "start", "--filter=frontend-server"]