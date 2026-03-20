const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente
} = require('../controllers/pacientesController');

router.get('/', authMiddleware, getPacientes);
router.get('/:id', authMiddleware, getPaciente);
router.post('/', authMiddleware, createPaciente);
router.put('/:id', authMiddleware, updatePaciente);
router.delete('/:id', authMiddleware, deletePaciente);

/*Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Ruta pacientes OK' });
});*/

module.exports = router;