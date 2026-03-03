// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importar rutas
const pacientesRoute = require('./routes/pacientesRoute.js');
// (authRoutes vendrá después)

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Ruta pacientes
app.use('/api/pacientes', pacientesRoute);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Clínica Veterinaria funcionando' });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});