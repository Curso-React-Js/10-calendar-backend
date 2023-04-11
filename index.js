const express = require('express');

// Crear el servidor de express
const app = express();

// Rutas
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true
  });
});

// Escuchar peticiones
app.listen(4000, () => {
  console.log(`Servidor corriendo en puerto ${ 4000 }`);
});
