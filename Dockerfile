FROM node:20

WORKDIR /app


COPY package*.json ./
RUN npm install

# Copia o restante do código ANTES de rodar seeds
COPY . .

# Executa o script após os arquivos estarem disponíveis
RUN node seeds/generos.js

EXPOSE 3000

CMD ["npm", "start"]
