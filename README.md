# MEGA+ (Hub de Entretenimiento con Angular) - (Sexto Sprint)

Proyecto realizado por: Rubén Almazán De la Torre

## Descripción

MEGA+ es una plataforma de entretenimiento que ofrece un extenso catálogo de películas de diversos géneros. En esta plataforma es posible acceder a un menú principal en el que se tiene acceso al catálogo de contenido, ya sea de manera general o clasificado por género (Animación, Ciencia Ficción, Musical, entre otros). En cada película, es posible ver su descripción con su respectivo avance (tráiler) y permite ser agregada como “favorito” o eliminada de la pantalla principal. Además, esta plataforma permite la creación de cuentas individuales para personalizar la experiencia del usuario. Solo es necesario registrarse en el sistema para acceder a todas las funciones disponibles. También cuenta con una estructura responsiva que permite la compatibilidad con diferentes dispositivos, lo que permite una mejor visualización del contenido. Por último, cuenta con un modo de reconfiguración que permite restablecer el catálogo a su estado inicial; es decir, si se elimina una película, es posible recuperarla fácilmente y hacer que vuelva a aparecer en el catálogo.

A nivel técnico, esta plataforma representa la culminación de nuestro proceso de aprendizaje, en el cual se aprendió a desarrollar un sistema Full Stack desde cero: considerando aspectos como el uso de Angular para el desarrollo del frontend por componentes, la creación, implementación y normalización de una base de datos para almacenar y gestionar el contenido de la plataforma, la incorporación de APIs como backend para conectar la base de datos con el sistema y el uso de Docker y Kubernetes para incorporar este sistema en un entorno de producción. En esta última etapa del desarrollo, se normalizó la base de datos siguiendo las normas de la forma normal (FN) para garantizar la eficiencia en el almacenamiento y la integridad de los datos. Además, se reconfiguró la API del sistema, implementando el modelo de vista-controlador (MVC) y utilizando las herramientas de .NET para mejorar la estructura y la eficiencia del código fuente. También se implementaron Docker y Kubernetes para mejorar la portabilidad y la gestión de los contenedores del sistema y así agilizar su implementación y escalabilidad en diversos entornos reales de producción. Como detalle adicional, se implementaron mejoras en el sistema, incluyendo un rediseño de las pantallas principales y una nueva funcionalidad para la visualización del contenido por géneros. Finalmente, se realizaron pruebas unitarias para garantizar el correcto funcionamiento del sistema y asegurar su estabilidad y confiabilidad.

## Objetivos

--> Implementar un proyecto funcional, utilizando Docker y Kubernetes, para su incorporación a un sistema real de producción. 
--> Normalizar la base de datos para eficientar el almacenamiento y gestión de los registros generados
--> Actualizar la API del sistema utilizando el modelo vista-controlador y las herramientas de .NET para asegurar y agilizar la comunicación entre el frontend y el backend.  
--> Implementar mejoras en el sistema para mejorar la experiencia del usuario y ampliar las funcionalidades disponibles. 

## Visualización del proyecto

IMAGENES

## Visualización del proyecto de forma responsiva

IMAGENES

## Instrucciones para su instalación

- Proyecto de Angular

--> Descargar el proyecto
--> Descomprimir la carpeta en la ubicación requerida
--> Descargar Nodejs
--> Instalar Nodejs en el equipo
--> Acceder a Visual Studio Code
--> Abrir el proyecto en Visual Studio Code
--> Abrir la terminal
--> En la terminal, utilizar el comando npm install -g @angular/cli para instalar Angular
--> Ejecutar ng serve para iniciar el proyecto

¡Listo! El proyecto está disponible.

- API

--> Acceder a Visual Studio Code
---> Abrir una Nueva Terminal
Nota: Abrir una nueva terminal a la par de que se ejecuta el proyecto de Angular
--> Dirígirse a la carpeta base_mega_api
--> Abrir el archivo “appsettings.json”
--> En la seccion de "DefaultConnection", igresar las credenciales necesarioas para acceder a las base de datos.

"DefaultConnection": 
"Serve r= NOMBRE DEL SERVIDOR; 
Database = NOMBRE DE LA BASE DE DATOS; 
User Id = NOMBRE DEL USUARIO; 
Password = CONTRASEÑA DEL USUARIO; 
TrustServerCertificate = True;"

--> Una vez hecho esto, en terminal, ingresar el siguiente comando para ejeuctar la API

dotnet run

¡Listo! La API estará en funcionamiento y conectada a la base de datos.

- Docker y Kubernetes para el proyecto de Angular

--> Acceder a Visual Studio Code
---> Abrir una Nueva Terminal
--> Dirigirse a la ruta fuente del proyecto
---> Ingresar el siguiete comando para construir la imagen de Docker

docker build -t base_mega_peliculas .

--> Después de construir la imagen, ejecutamos este contenedor utilizando el siguiente comando:

docker run -d -p 8080:80 base_mega_peliculas:latest
o
docker run -d -p 8080:80 --name base_mega_peliculas_container base_mega_peliculas:latest

--> Luego, para desplegar el contenedor en Kubernetes, ejecutamos el siguiente comando:

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

--> Después, ejecutamos los siguientes comandos para verificar el estado de los pods y servicios 

kubectl get pods
kubectl get services

--> Por último, para acceder a la aplicación en Minikube, ejecutamos el siguiente comando

minikube service base-mega-peliculas-service

¡Listo!. La aplicación base de Angular ya se encontrará en un contenedor y disponible para su uso. 

- Docker y Kubernetes para la API

---> En Visual Studio Code, abrir una Nueva Terminal
--> Dirigirse a la ruta fuente de la API
---> Ingresar el siguiente comando para construirla imagen de Docker de la API

docker build -t base_mega_api:latest .

--> Luego, se ingresa e siguiente comando para iniciar minikube (Versión local de Kubernetes)

minikube start

--> Después, ingresamos lossiguientes comandos para subir la imagen Docker al registro de Minikube

eval $(minikube docker-env)
docker build -t base_mega_api:latest .

--> Luego, para desplegar el contenedor en Kubernetes con su respectiva configuraciòn, ejecutamos los siguientes comandos:

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

--> Luego, ejecutamos el siguiete coamdno para  verificar que el despliegue se haya realizado correctamente s:

kubectl get deployments
kubectl get pods
kubectl get services

--> Por último, ejecutamos el siguiente coamndo para genrar una url que nos permita acceder a la API:

minikube service base-mega-api-service --url

¡Listo!. La API ya se encontrará disponible para su uso. 

- Pruebas unitarias
 
--> ng test: Este se utiliza para ejecutar las pruebas unitarias
--> ng test --code-coverage: Este se utiliza para ver el code coverage de las pruebas unitarias

## Requerimientos técnicos

--> Visual Studio Code
--> Node v20.13.1
--> npm v10.5.2
--> Angular CLI 18.1.0
--> TypeScript v5.5.2
--> SQL Server Management Studio 20
--> .NET 8.0.9
--> Docker 8.0
--> Kubernetes 1.33.1

## Bibliotecas y dependenciasl

--> @angular/common (Versión 18): Este proporciona módulos comunes como directivas, pipes, y servicios utilizados en aplicaciones Angular.
--> @angular/compiler  (Versión 18): Este genera la compilación de plantillas Angular en código ejecutable.
--> @angular/core  (Versión 18): Este contiene los componentes básicos del framework Angular, como la inyección de dependencias y la gestión del ciclo de vida de los componentes.
--> rxjs  (Versión 7.8): Esta es una biblioteca para programación reactiva usando observables en JavaScript para gestionar y combinar eventos y datos de manera declarativa.
--> typescript  (Versión 5.4.2): Este es un lenguaje de programación que extiende JavaScript al añadir tipado estático.
--> @angular/cli  (Versión18.0.6): Esta es una herramienta de línea de comandos para crear, construir y mantener aplicaciones Angular.
--> @angular/compiler-cli  (Versión 18): Este es un soporte del compilador Angular para TypeScript.
--> karma  (Versión6.4): Este es el ejecutor de pruebas para ejecutar tests en diversos navegadores.
--> jasmine-core  (Versión 5.1): Esta es una biblioteca para escribir pruebas unitarias en JavaScript.
--> Swagger (Versión 8.0.8): Esta es una herramienta que facilita la creación, documentación y prueba de APIs.

## Descripción de como se realizó

Para llevar a cabo esta fase del proyecto, se realizaron los siguientes pasos:
La creación de mejoras del proyecto, la normalización de la base de datos, la implemetación de la API en .NET con el modelo vista-controlador y la incorporración de Kubernetes para el despliegue del sistema en un entorno real de producción 

En primer lugar, el desarrollo de mejoras del sistema fue relativamente sencillo, ya que se contaba con una idea clara de lo que se requería hacer para optimizar el sistema. 
En este caso, se optó por crear funciones que ayudaran a mejorar la experiencia del usuario y asegurar una interfaz intuitiva y atractiva. De esta manera, se mejoró el entorno visual del sistema (pantalla principal, botones, barra de navegación, entre otros), se actualizaron aspectos de responsividad y se incorporó una función para visualizar el contenido de las plataforma por generos. 
Con esto, se logró mejorar la interfaz grafica del sisitema y se icoorapron uevas nfucoanlidaes que mejoran la experiencia del unsario en esta plataforma 

Luego, se normalizó la base de datos. Esta tarea resultó relativamente sencilla, ya que se aplicaron los conocimientos adquiridos para asegurar una estructura optimizada desde el principio, mejorando la funcionalidad y el acceso a los registros del sistema.
En este caso, se corrigeron detalles minimos en la base de datos, se añadió una nueva tabla de "género" para categorizar el contenido según su tipo, y se aplicó la normalización correspondiente a esta nueva estructura. 
Con estas modificaciones, se mejoró la organización y el rendimiento del sistema, facilitando la gestión y consulta de los datos.

A continuación, se actualizó la API del sistema para que funcionara en ASP.NET Core utilizando el modelo Vista-Controlador (MVC). Este proceso representó un desafío, ya que no estaba familiarizado con la herramienta .NET y tenía cierta dificultad para comprender el funcionamiento del modelo MVC. Sin embargo, gracias a los contenidos de la plataforma Liderly y a las sesiones impartidas, adquirí el conocimiento necesario para desarrollar una API funcional que permitiera una integración más estructurada entre el backend y el frontend.
En este caso, se crearon los modelos correspondientes a las tablas de la base de datos, se estableció el controlador adecuado, se utilizó Swagger para agilizar el desarrollo de cada función, se realizó la conexión de la API con la base de datos se realizó mediante el archivo appsettings.json y se llevaron a cabo pruebas con Swagger para verificar el correcto funcionamiento de las funciones implementadas. Por último, se desarrolló un servicio en Angular para conectar la API con el frontend, permitiendo así el consumo de la API y el acceso a los registros de la base de datos.
De esta manera, se logró crear una API funcional que integra la base de datos con la plataforma de entretenimiento, aprovechando las nuevas herramientas de .NET y el modelo MVC.

Por último, se incorporó el sistema a un entorno real de producción mediante Docker y Kubernetes. Este proceso representó un desafío, ya que no estaba familiarizado con el uso de estas herramientas y mi equipo enfrentó diversas dificultades al ejecutar ciertos comandos.
No obstante, después de instalar y configurar correctamente Docker y Kubernetes, y tras analizar diversos recursos en línea, adquirí el conocimiento necesario para realizar un despliegue eficiente y confiable del sistema en un entorno real de producción.
En este caso, se creó el Dockerfile con su respectiva configuración, se construyó la imagen y se ejecutó el contenedor. Posteriormente, se elaboró un archivo de configuración para Kubernetes para definir el despliegue de la aplicación, se creó un servicio para exponer la aplicación a través de la red y se ejecutó el comando para desplegar la aplicación correctamente.
De esta manera, se logró utilizar estas herramientas para desplegar la aplicación de manera efectiva, permitiendo gestionar y escalar la aplicación con éxito en el entorno de producción.

## Reporte de Code Coverage y Reporte de testing

IMAGEN 1
IMAGEN 2

## Diagrama Entidad Relación

IMAGEN 1

## Mejoras futuras

--> Incorporación de un Modo Administrador para la gestión de usuarios y contenidos de la plataforma de manera gráfica. 
--> Creación de un Sistema de Encriptamiento de Contraseñas para proteger la privacidad de los usuarios y mejorar la seguridad general de la plataforma.
--> Modo Buscador para Buscar Películas por Nombre para facilitar el acceso a contenidos específicos de manera rápida y eficiente.
--> Integración de Recomendaciones Personalizadas, basado en el historial de visualización y preferencias del usuario, para ofrecer contenido personalizado y mejorar la experiencia del usuario.
--> Introducir un sistema de notificaciones y alertas para informar a los usuarios sobre nuevos contenidos, actualizaciones importantes o recordatorios relacionados con su cuenta.

## Documentación de la API

Swagger es una herramienta que proporciona una interfaz visual donde los desarrolladores pueden ver los endpoints disponibles, probar las llamadas a la API y ver las respuestas sin necesidad de escribir código adicional. Esto hace que sea más fácil entender cómo funciona una API y probarla de manera interactiva.

Para su instalación, simplemente ejecutamos el siguiente comando en una terminal de Visual Studio Code.

dotnet add package Swashbuckle.AspNetCore

Luego, en el archivo “Program.cs”, se agrega la siguiente configuración para utilizar Swagger dentro de la API 

// Agregar servicios de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuración de middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Habilitar Swagger
    app.UseSwaggerUI(); // Habilitar la interfaz de usuario de Swagger
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Manejador de errores para producción
}

Una vez hecho esto, ingresamos el siguiente comando para activar esta funcionalidad 

dotnet run

Con esto, ya es posible utilizar Swagger en nuestra API. De esta manera, para acceder de forma gráfica a los componentes creados en nuestra API, en un navegador ingresamos la siguiente URL:

http://localhost:5277/swagger/index.html

En este caso, la API base_mega_api se desarrolló utilizando cinco modelos MVC, integrando todas las tablas disponibles en la base de datos, con el objetivo de garantizar un funcionamiento óptimo del sistema en esta versión y en versiones futuras.

Esta API está estructurada de la siguiente manera:

Modelo Contenido

/api/Contenido: Muestra todo el catálogo de películas disponibles.
/api/Contenido/buscar_contenido: Muestra una película por su ID.
/api/Contenido/Insertar_contenido: Inserta una nueva película en la tabla Contenido.
/api/Contenido/actualizar_contenido: Actualiza algún campo del registro de una película.
/api/Contenido/eliminar_contenido: Elimina una película por su ID.
/api/Contenido/buscar_conjunto_contenido: Muestra una película por su ID y clave.
/api/Contenido/buscar_contenido_genero: Muestra un conjunto de películas por género.

Modelo Eliminado

/api/Eliminado: Muestra todas las películas marcadas como No gustado o Eliminado.
/api/Eliminado/buscar_eliminado: Muestra una lista de películas eliminadas correspondientes al ID de un usuario.
/api/Eliminado/insertar_eliminado: Inserta una película No gustada por un usuario.
/api/Eliminado/eliminar_eliminado: Elimina una película No gustada de la tabla.

Modelo Favorito

/api/Favorito: Muestra todas las películas marcadas como Favorito.
/api/Favorito/buscar_favorito: Muestra una lista de películas catalogadas como favoritas por un usuario.
/api/Favorito/insertar_favorito: Inserta una película favorita por el usuario.
/api/Favorito/eliminar_favorito: Elimina una película favorita de la tabla.

Modelo Genero

/api/Genero: Muestra todos los géneros disponibles.
/api/Genero/busca_genero: Muestra un género por su ID.
/api/Genero/insertar_genero: Inserta un nuevo género en la tabla.
/api/Genero/actualizar_genero: Actualiza algún campo específico del género.
/api/Genero/eliminar_genero: Elimina un género de la tabla.
/api/Genero/buscar_conjunto_genero: Muestra un género por su ID y nombre.

Modelo Usuario

/api/Usuario: Muestra todos los usuarios disponibles.
/api/Usuario/buscar_usuario: Muestra un usuario por su ID.
/api/Usuario/insertar_usuario: Inserta un nuevo usuario en la tabla.
/api/Usuario/eliminar_usuario: Elimina un usuario por su ID.
/api/Usuario/actualizar: Actualiza alguno de los campos de un usuario.
/api/Usuario/buscar_conjunto_usuario: Muestra un usuario por su ID y nombre.

## Archivo de Configuración de Ambientes de Docker y Kubernetes

- Proyecto en Angular 

Archivo DockerFile

En este archivo, se usa una imagen base de Node.js para construir el proyecto y se usa una imagen base de NGINX para servir la aplicación

FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run  

FROM nginx:alpine
COPY --from=build /app/dist/base_mega_peliculas /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

Hecho esto, en este archivo, se define el despliegue de la aplicación en Kubernetes, se crean dos réplicas de la aplicación "base-mega-peliculas" usando su imagen màs reciente y se expone el puerto 80 en cada contenedor.

apiversion: apps/v1
kind: Deployment
metadata:  
  name: base-mega-peliculas
spec:  
  replicas: 2  
  selector:    
    matchLabels:      
      app: base-mega-peliculas  
  template:    
    metadata:      
      labels:        
        app: base-mega-peliculas    
    spec:      
      containers:      
        - name: base-mega-peliculas        
          image: base_mega_peliculas:latest      
          imagePullPolicy: ifNotPresent    
          ports:        
          - containerPort: 80

Por último, en este archivo, se define un servicio en Kubernetes que expone la aplicación "base-mega-peliculas" en el puerto 80 y asigna un puerto externo NodePort 30000 para acceder a ella desde fuera del clúster.

apiversion: v1
kind: Service
metadata:  
  name: base-mega-peliculas-service
spec: 
  type: NodePort
  selector:    
    app: base_mega_peliculas  
  ports:    
    - protocol: TCP      
      port: 80      
      targetPort: 80  
      nodePort: 30000

- API

En este archivo, se configura un entorno mínimo y ligero de ASP.NET Core utilizando la imagen base oficial de Microsoft para ejecutar la aplicación, se prepara el contenedor para recibir los archivos de la aplicación y exponer los puertos necesarios. Después, se utiliza una imagen del SDK de .NET para el desarrollo de la API en el contenedor, se restauran las dependencias del proyecto (base_mega_api.csproj) y luego se compila el código fuente. Luego, se realiza una publicación que genera una versión optimizada de la aplicación para su ejecución en un entorno de producción y los archivos de salida se almacenan en una carpeta de destino. Por último, se utiliza la imagen de ASP.NET Core para crear el contenedor final que ejecutará la aplicación y se define un punto de entrada (ENTRYPOINT) que especifica cómo se debe iniciar la aplicación dentro del contenedor. 

FROM mrc.microsoft.com/dotnet/aspnet:8.0 as base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mrc.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /src
COPY ["./base_mega_api.csproj", "./"]
RUN dotnet restore "./base_mega_api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./base_mega_api.csproj" -c Release -o /app/build

FROM build as publish 
RUN dotnet publish "./base_mega_api.csproj" -c Release -o /app/build

FROM base as final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "base_mega_api.dll" ]

Por otro alado, en este archivo, se define el despliegue en Kubernetes de la API. Esat crea dos réplicas de la aplicación "base-mega-api" usando su imagen más reciente y se garantiza su disponibilidad en el puerto 80.

apiversion: apps/v1
kind: Deployment
metadata:  
  name: base-mega-api
spec:  
  replicas: 2  
  selector:    
    matchLabels:      
      app: base-mega-api  
  template:    
    metadata:      
      labels:        
        app: base-mega-api    
    spec:      
      containers:      
        - name: base-mega-api        
          image: base_mega_api:latest    
          imagePullPolicy: ifNotPresent    
          ports:        
          - containerPort: 80

Por último, en ste archivo, se define un servicio en Kubernetes que expone la aplicación "base-mega-api" en el puerto 80 dentro del clúster y asigna el puerto externo NodePort 30007 para acceder a la aplicación desde fuera del clúster.

apiversion: v1
kind: Service
metadata:  
  name: base-mega-api-service
spec: 
  type: NodePort
  selector:    
    app: base_mega_api 
  ports:    
    - protocol: TCP      
      port: 80      
      targetPort: 80  
      NodePort: 30007

## Problemas conocidos

--> Re-estructuración de la API utilizando el modelo vista-controlador
--> Despliegue dela aplicación utilizando Kubernetes 
--> Entender la sintaxis de ASP.NET Y C#  para programar correctamente la API 

## Retrospectiva

¿Qué hice bien?
Implementar los conocimientos adquiridos en sprints anteriores y aprender nuevas habilidades a través de la documentación necesaria, para entender lo que se requería para ejecutar las tareas correspondientes y así, lograr crear un sistema funcional y eficiente que cumpla con los objetivos del proyecto.

¿Qué no salio bien?
Gestión de tiempo y tardar demasiado en comprender la lógica del modelo vista-controlador para ejecutarla en la API del sistema. 

¿Qué puedo hacer diferente?
Aprender a detalle sobre el funcionamiento del modelo vista-controlador para la ejecución de APIs, implementar funciones avanzadas para mejorar el funcionamiento del sistema y eficientar la experiencia del usuario., aprende sobre la correcta instalación y configuración de herramientas de despliegue y conocer sobre diferentes funciones que se puedan realizar con las herramientas aprendidas como: ASP.NET, C#  Docker y kubernetes

## Especiicaciones detalladas de descarga de proyecto en Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
