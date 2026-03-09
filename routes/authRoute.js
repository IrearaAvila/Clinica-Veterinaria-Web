const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase")

// ruta para registrar usuario
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Usuario registrado correctamente",
      user: data.user
    });

  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;