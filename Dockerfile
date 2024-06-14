# syntax=docker/dockerfile:1.3-labs

FROM node:20-alpine

WORKDIR /nextjs

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json ./

# 必要なビルドツールをインストール
RUN apk add --no-cache make gcc g++ python3


RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

CMD ["npm", "start"]
