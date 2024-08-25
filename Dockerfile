# Usar una imagen base de Node.js para construir el proyecto
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run  

# Usar una imagen base de NGINX para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/dist/base_mega_peliculas /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
