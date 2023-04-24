# Wish Genius

Wish Genius es una aplicación para crear listas de regalos a las que los usuarios pueden suscribirse.
Con esta aplicación, los usuarios pueden crear nuevas listas, suscribirse a listas creadas por otros 
usuarios y agregar regalos a sus listas de regalos.

La aplicación se compone de dos partes: una API de backend que maneja la lógica del servidor y una aplicación 
de frontend que se encarga de mostrar la interfaz de usuario.

## Requisitos previos
Antes de usar Wish Genius, necesitarás una cuenta en [Auth0](https://auth0.com/) para manejar la autenticación 
de los usuarios. Deberás agregar las credenciales de Auth0 como variables de entorno o en un archivo `.env`. 
Necesitarás el tenant, la id de tu app en Auth0 y la ruta a la api de Auth0 para todo el proceso de autenticación.

## Tecnologías usadas
Wish Genius está construido utilizando las siguientes tecnologías:

- Node.js y Express para el backend.
- MongoDB y Mongoose para la base de datos.
- React para el frontend.

## Estructura del proyecto
El proyecto se organiza en dos carpetas: `/api` para el backend y `/app` para el frontend.

## Instalación
Para instalar Wish Genius, sigue estos pasos:

1. Clona este repositorio en tu computadora.
2. En la carpeta raíz del proyecto, corre el comando `npm install` para instalar las dependencias de la API y la aplicación de frontend.
3. En la carpeta `/api`, crea un archivo `.env` y agrega las credenciales de Auth0 como variables de entorno.
4. Corre el comando `npm run dev` para iniciar el servidor.
5. Corre el comando `npm run start` para iniciar la aplicación de frontend.

## Contribución
Actualmente no se han establecido pautas para reportar errores o contribuir al proyecto. Si estás interesado en colaborar, 
por favor contáctame para hablar sobre las posibilidades.

## Licencia
Wish Genius está disponible bajo la licencia ISC. Esto significa que puedes usar, copiar, modificar y distribuir el código, 
siempre y cuando incluyas una atribución al autor original en los créditos de tu proyecto.
