# Practica Node.JS NODEPOP

## Pactica DEV OPS Desplegada en
* práctica node: node.haguado.com
* página estática: haguado.com

## Para arrancar Mongo DB podemos usar:
`./bin/mongod --dbpath ./data/db --directoryperdb`
### creado un alias
`./start.sh`

## Para inicializar la BBDD nodepop de Mongo DB usaremos el script:
`npm run installDB`

## Para ejecutar el proyecto 
* en modo desarrollo simple process `npm run dev`
* en modo desarrollo con cluster `npm run dev-cluster`
* en normal simple process `npm run start`
* en normal con cluster `npm run dev-cluster`

## Despliegue
Copiar `.env.example` y revisar los valores
Se deberá crear un fichero `.env` con la info particular para nuestra conexión a BBDD y para autenticación por JWT

## Autenticación JSON WEB TOKEN
Preparado para recibir en el BODY los parámetros email y clave
Preparado para recibir el token tanto en el body, como en query como en headers en `x-access-token`
