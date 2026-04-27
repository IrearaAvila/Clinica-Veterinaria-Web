const supabase = require ('../config/supabase');

/*OBTENER TODOS LOS PACIENTES DE LA BASE DE DATOS*/
const getAllPacientesService = async (userId, nombre = null) => {

  let query = supabase
    .from('Pacientes')
    .select('*')
    .eq('user_id', userId);

  if (nombre) {
    query = query.ilike('nombre', `%${nombre}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

/*OBTENER 1 PACIENTE POR SU ID*/
// Ahora recibe id y userId para asegurar que el paciente pertenece al usuario autenticado
const getPacienteByIdService = async (id, userId) => {
    const { data, error } = await supabase
    .from('Pacientes')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .maybeSingle();

    if (error) throw error;
    return data;
};

/*CREAR NUEVO PACIENTE (CREATE)*/
const createPacienteService = async (paciente) => {
    console.log("PACIENTE QUE SE ENVÍA:", paciente);
    const { data, error } = await supabase
    .from('Pacientes')
    .insert(paciente)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/*ACTUALIZAR PACIENTE EXISTENTE*/
// Ahora recibe id, objeto paciente y userId para garantizar permisos de escritura
const updatePacienteService = async (id, paciente, userId) => {
    const { data, error } = await supabase
    .from ('Pacientes')
    .update(paciente)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

    if (error) throw error;
    return data;
};

/*ELIMINAR PACIENTE POR ID*/
const deletePacienteService = async (id, userId) => {
    const { error } = await supabase
    .from('Pacientes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

    if (error) throw error;
    return true;
};

module.exports = {
    getAllPacientesService,
    getPacienteByIdService,
    createPacienteService,
    updatePacienteService,
    deletePacienteService
};
