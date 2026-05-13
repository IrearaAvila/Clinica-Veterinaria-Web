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

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}


// OBTENER ID DESDE URL

const params = new URLSearchParams(window.location.search);

const pacienteId = params.get("id");


// ELEMENTOS HTML

const formulario = document.getElementById("nuevo-paciente-form");

const btnCancelar = document.getElementById("btn-cancelar");

const inputNombre = document.getElementById("input-nombre");

const inputEdad = document.getElementById("input-edad");

const inputObservaciones = document.getElementById("input-observaciones");

// CANCELAR

btnCancelar.addEventListener("click", () => {

    window.location.href = "pacientes.html";

});

// CARGAR PACIENTE

async function cargarPaciente() {

    try {

        const response = await fetch(`/api/pacientes/${pacienteId}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (response.ok) {

            inputNombre.value = data.nombre || "";

            inputEdad.value = data.edad || "";

            inputObservaciones.value = data.observaciones || "";

        } else {

            showToast(data.error || "Paciente no encontrado", "#ff4d4d");

            setTimeout(() => {
                window.location.href = "pacientes.html";
            }, 1500);

        }

    } catch (error) {

        console.error(error);

        showToast("Error al cargar paciente", "#ff4d4d");

    }

}

// ACTUALIZAR PACIENTE

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = inputNombre.value.trim();

    const edad = inputEdad.value;

    const observaciones = inputObservaciones.value.trim();

    // VALIDACIONES
    if (!nombre) {

        showToast("El nombre es obligatorio", "#ff4d4d");

        return;

    }

    if (!edad) {

        showToast("La edad es obligatoria", "#ff4d4d");

        return;

    }

    try {

        const response = await fetch(`/api/pacientes/${pacienteId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                nombre,
                edad,
                observaciones
            })

        });

        const data = await response.json();

        if (response.ok) {

            showToast("Paciente actualizado correctamente", "#4CAF50");

            setTimeout(() => {

                window.location.href = "pacientes.html";

            }, 1500);

        } else {

            showToast(data.error || "Error al actualizar", "#ff4d4d");

        }

    } catch (error) {

        console.error(error);

        showToast("Error al conectar con el servidor", "#ff4d4d");

    }

});

// INICIO
cargarPaciente();