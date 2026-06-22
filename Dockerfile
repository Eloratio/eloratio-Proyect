FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar el directorio del backend
COPY backend/ ./backend

# Exponer el puerto del backend Express
EXPOSE 3000

# Definir la variable de entorno NODE_ENV
ENV NODE_ENV=production

# Comando para ejecutar la aplicación backend
CMD ["node", "backend/app.js"]
