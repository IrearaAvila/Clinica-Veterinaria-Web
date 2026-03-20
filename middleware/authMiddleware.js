const supabase = require('../config/supabase');

//IDENTIFICA AL USUARIO
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    console.log("HEADER:", req.headers.authorization);
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    console.log("ERROR:", error);
    console.log("USER:", data?.user);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = data.user;

    next();

  } catch (err) {
    return res.status(500).json({ error: 'Error en autenticación' });
  }
};

module.exports = authMiddleware;