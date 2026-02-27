const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Ruta pacientes OK' });
});

module.exports = router;