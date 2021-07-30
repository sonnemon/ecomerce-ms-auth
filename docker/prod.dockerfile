FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY build build

CMD ["npm", "start"]