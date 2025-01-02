# Usar a imagem do Node.js versão 20
FROM node:20-alpine3.20

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json
COPY . .

# Instalar as dependências
RUN npm install

RUN npm run build 

RUN npx prisma generate

# Copiar o restante dos arquivos do aplicativo
#COPY . .

# Expor a porta 3333
EXPOSE 3333

# Comando para iniciar o aplicativo
CMD ["npm", "start"]