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

document.getElementById("loginForm").addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // VALIDAR EMAIL

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showToast("Introduce un email válido", "#ff4d4d");
    return;
  }

  if (!password) {
    showToast("Introduce tu contraseña", "#ff4d4d");
    return;
  }

  try {

    const response = await fetch("/api/auth/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ email, password })

    });

    const data = await response.json();

    if (response.ok) {

      showToast("Login correcto", "#4CAF50");

      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 1500);

    } else {

      showToast(data.error || "Email o contraseña incorrectos", "#ff4d4d");

    }

  } catch (error) {

    console.error("Error:", error);
    showToast("Error al conectar con el servidor", "#ff4d4d");

  }

});


// VISUALIZAR CONTRASEÑA

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