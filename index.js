require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Puerto
const PORT = process.env.PORT;

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

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
