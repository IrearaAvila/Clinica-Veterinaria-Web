function showToast(message, color) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
        background: color
    }
  }).showToast();
}

document.getElementById("signupForm").addEventListener("submit" , async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // VALIDAR EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showToast("Introduce un email válido", "#ff4d4d");
        return;
    }

//COMPROBAR CONTRASEÑAS

if (password !== confirmPassword) {
    showToast("Las contraseñas no coinciden", "#ff4d4d");
    return;
}

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

//COMPROBACION DE CARACTERES MINIMOS
if (!passwordRegex.test(password)) {
  showToast("La contraseña debe tener al menos 8 caracteres, una letra y un número.", "#ff4d4d");
  return;
}

//LLAMAMOS A SUPABASE, ENVIAMOS LOS DATOS RECOGIDOS EN EL FORM Y ESPERAMOS RESPUESTA
try {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        showToast("Usuario registrado correctamente", "#4CAF50");
        setTimeout(() => {
            window.location.href = "/login.html";
        }, 1500);
    } else {
        showToast(data.error || "Error al registrar usuario", "#ff4d4d");
    }
} catch (error) {
    console.error("Error:", error);
    showToast("Error al conectar con el servidor", "#ff4d4d");
}
});

//VISUALIZACION DE CONTRASEÑA
const toggles = document.querySelectorAll(".togglePassword");

toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {

    const targetId = toggle.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (input.type === "password") {
      input.type = "text";
      toggle.classList.remove("fa-eye");
      toggle.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      toggle.classList.remove("fa-eye-slash");
      toggle.classList.add("fa-eye");
    }

  });
});