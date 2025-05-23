# Imagem base
FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta da aplicação (Render usa essa porta automaticamente)
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
