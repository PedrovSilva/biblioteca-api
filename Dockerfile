FROM node:20

WORKDIR /app


COPY package*.json ./
RUN npm install

# Copia o restante do código ANTES de rodar seeds
COPY . .


EXPOSE 3000

CMD ["npm", "start"]
