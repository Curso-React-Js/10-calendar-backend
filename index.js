require('dotenv').config();
const express = require('express');

const { dbConnection } = require('./database/config');

// Puerto
const PORT = process.env.PORT;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${ PORT }`);
  console.log(`http://localhost:${ PORT }`);
});
