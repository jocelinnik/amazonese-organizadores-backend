FROM node:18.16-slim

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y openssl

ARG HTTP_PORTA=80

COPY ./.env /app/.env
COPY ./dist/ /app/dist
COPY ./prisma/ /app/prisma
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm ci --omit=dev

EXPOSE ${HTTP_PORTA}

CMD ["npm", "start"]
