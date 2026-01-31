# 1단계: 베이스 이미지 설정
FROM node:18-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

# 2단계: 모노레포 구조 최적화 (prune)
FROM base AS pruner
COPY . .
# frontend-server 앱과 관련된 의존성만 추출합니다.
RUN turbo prune frontend-server --docker

# 3단계: 실제 빌드
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=pruner /app/out/full/ .
# GitHub Actions에서 생성한 .env를 빌드 과정에 포함
COPY apps/web/.env ./apps/web/.env
RUN turbo run build --filter=frontend-server

# 4단계: Nginx 실행
FROM nginx:stable-alpine AS runner
# Next.js export 결과물 경로 (apps/web/out)를 복사
COPY --from=builder /app/apps/web/out /usr/share/nginx/html
# 위에서 만든 nginx.conf 적용
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]