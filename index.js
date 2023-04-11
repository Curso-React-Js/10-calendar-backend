require('dotenv').config();
const express = require('express');

// Puerto
const PORT = process.env.PORT;

// Crear el servidor de express
const app = express();

// Directorio Público
app.use(express.static('public'));

// Rutas
// app.get('/', (req, res) => {
//   res.status(200).json({
//     ok: true
//   });
// });

// Escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${ PORT }`);
  console.log(`http://localhost:${ PORT }`);
});
