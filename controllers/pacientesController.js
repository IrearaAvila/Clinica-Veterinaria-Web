const {
    getAllPacientesService,
    getPacienteByIdService,
    createPacienteService,
    updatePacienteService,
    deletePacienteService
} = require('../services/pacientesService');

/*LISTAR PACIENTES*/
const getPacientes = async (req, res) => {
  try {
    const pacientes = await getAllPacientesService();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* DEVUELVE PACIENTE POR ID */
const getPaciente = async (req, res) => {
  try {
    const paciente = await getPacienteByIdService(req.params.id);

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(paciente);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*CREAR NUEVO PACIENTE*/
const createPaciente = async (req, res) => {
  const { nombre, edad, propietario_id } = req.body;

  // Validaciones
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  if (edad === undefined || isNaN(edad)) {
    return res.status(400).json({ error: 'La edad es obligatoria y debe ser un número' });
  }

  if (!propietario_id) {
    return res.status(400).json({ error: 'El propietario es obligatorio' });
  }

  try {
    const nuevoPaciente = await createPacienteService(req.body);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*ACTUALIZAR PACIENTE*/
const updatePaciente = async (req, res) => {
  const { nombre, edad, propietario_id } = req.body;

  // Validaciones
  if (nombre !== undefined && nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre no puede estar vacío' });
  }

  if (edad !== undefined && isNaN(edad)) {
    return res.status(400).json({ error: 'La edad debe ser un número' });
  }

  if (propietario_id !== undefined && !propietario_id) {
    return res.status(400).json({ error: 'El propietario no puede ser null' });
  }

  try {
    const pacienteActualizado = await updatePacienteService(
      req.params.id,
      req.body
    );
    res.json(pacienteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*ELIMINAR PACIENTE POR ID*/
const deletePaciente = async (req, res) => {
  try {
    await deletePacienteService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente
};