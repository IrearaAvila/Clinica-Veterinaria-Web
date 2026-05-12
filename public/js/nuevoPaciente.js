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

const formulario = document.getElementById("nuevo-paciente-form");

const btnCancelar = document.getElementById("btn-cancelar");

btnCancelar.addEventListener("click", () => {

    window.location.href = "pacientes.html";

});

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("input-nombre").value.trim();

    const edad = document.getElementById("input-edad").value;

    const observaciones = document.getElementById("input-observaciones").value.trim();

    if (!nombre) {
        showToast("El nombre es obligatorio", "#ff4d4d");
        return;
    }

    if (!edad) {
        showToast("La edad es obligatoria", "#ff4d4d");
        return;
    }

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("/api/pacientes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                nombre,
                edad,
                observaciones
            })

        });

        const data = await response.json();

        if (response.ok) {

            showToast("Paciente creado correctamente", "#4CAF50");

            setTimeout(() => {
                window.location.href = "pacientes.html";
            }, 1500);

        } else {

            showToast(data.error || "Error al crear paciente", "#ff4d4d");

        }

    } catch (error) {

        console.error(error);

        showToast("Error al conectar con el servidor", "#ff4d4d");

    }

});