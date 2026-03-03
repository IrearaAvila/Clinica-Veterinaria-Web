const express = require('express');
const router = express.Router();

const {
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente
} = require('../controllers/pacientesController');

router.get('/', getPacientes);
router.get('/:id', getPaciente);
router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

/*Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Ruta pacientes OK' });
});*/

module.exports = router;