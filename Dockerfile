# Etapa de construcción

# FROM node
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build --prod

# Etapa de producción
# FROM nginx:alpine
# COPY --from=build-stage /app/dist/base_mega_peliculas /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Usar una imagen base de Node.js para construir el proyecto
FROM node:16-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Compilar la aplicación Angular
RUN npm run build 

# Usar una imagen base de NGINX para servir la aplicación
FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/dist/base_mega_peliculas /usr/share/nginx/html

# Exponer el puerto 80 para que NGINX pueda servir la aplicación
EXPOSE 80

# Comando por defecto para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
