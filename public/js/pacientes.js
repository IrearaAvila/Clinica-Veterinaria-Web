// ==============================
// TOKEN
// ==============================
const token = localStorage.getItem("token");

// ==============================
// ELEMENTOS HTML
// ==============================
const tbody = document.getElementById("pacientes-body");
const btnBuscar = document.getElementById("btn-buscar");
const btnNuevo = document.getElementById("btn-nuevo");
const inputBuscar = document.getElementById("search-id");

// ==============================
// SI NO HAY TOKEN -> LOGIN
// ==============================
if (!token) {
  window.location.href = "/login.html";
}

//=============================
//FUNCION TOAST
// ==============================
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

// ==============================
// CARGAR TODOS LOS PACIENTES
// ==============================
async function cargarPacientes() {
  try {
    const response = await fetch("/api/pacientes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      pintarTabla(data);
    } else {
      alert(data.error);
    }

  } catch (error) {
    console.error(error);
    alert("Error al cargar pacientes");
  }
}

// ==============================
// PINTAR TABLA
// ==============================
function pintarTabla(pacientes) {

  tbody.innerHTML = "";

  if (pacientes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4">No hay pacientes</td>
      </tr>
    `;
    return;
  }

  pacientes.forEach(paciente => {
    tbody.innerHTML += `
      <tr>
        <td>${paciente.nombre}</td>
        <td>${paciente.edad ?? "-"}</td>
        <td>${paciente.observaciones ?? "-"}</td>
        <td>
          <button onclick="editarPaciente('${paciente.id}')">✏️</button>
          <button onclick="eliminarPaciente('${paciente.id}')">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// ==============================
// BUSCAR POR NOMBRE
// ==============================
btnBuscar.addEventListener("click", async () => {
    console.log("LUPA CLICK");

  const nombre = inputBuscar.value.trim();

  if (!nombre) {
    cargarPacientes();
    return;
  }

  try {
    const response = await fetch(
      `/api/pacientes?nombre=${encodeURIComponent(nombre)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    console.log("RESPUESTA:", data);
    console.log("STATUS:", response.status);

    if (response.ok) {
        console.log("PACIENTES ENCONTRADOS:", data);
      pintarTabla(data);
    } else {
      alert("Error al buscar");
    }

  } catch (error) {
    console.error(error);
    alert("Error en búsqueda");
  }

});

// ==============================
// NUEVO PACIENTE
// ==============================
btnNuevo.addEventListener("click", () => {
  window.location.href = "/nuevoPaciente.html";
});

// ==============================
// ELIMINAR
// ==============================
async function eliminarPaciente(id) {

  const resultado = await Swal.fire({
    title: "¿Eliminar paciente?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2bbbad",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (!resultado.isConfirmed) return;

  try {
    const response = await fetch(`/api/pacientes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      showToast("Paciente eliminado correctamente", "#4CAF50");
      cargarPacientes();
    } else {
      showToast("No se pudo eliminar", "#ff4d4d");
    }

  } catch (error) {
    console.error(error);
    showToast("Error del servidor", "#ff4d4d");
  }
}

// ==============================
// EDITAR
// ==============================
function editarPaciente(id) {
  window.location.href = `/editarPaciente.html?id=${id}`;
}

// ==============================
// INICIO
// ==============================
cargarPacientes();