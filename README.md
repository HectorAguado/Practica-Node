# Practica Node.JS NODEPOP

## Para arrancar Mongo DB podemos usar:
`./bin/mongod --dbpath ./data/db --directoryperdb`
### creado un alias
`./start.sh`

## Para inicializar la BBDD nodepop de Mongo DB usaremos el script:
`npm run installDB`

## Para ejecutar el proyecto en modo desarrollo
`npm run dev`

## Despliegue
Copiar `.env.example` y revisar los valores

## Autenticación JSON WEB TOKEN
Preparado para recibir en el BODY los parámetros email y clave
Preparado para recibir el token tanto en el body, como en query como en headers en `x-access-token`