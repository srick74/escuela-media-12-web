const ARCHIVO_HORARIOS = "../horarios-publicos.json";

const cursoSelect = document.getElementById("cursoSelect");
const horariosBody = document.getElementById("horariosBody");
const infoCurso = document.getElementById("infoCurso");

cargarHorarios();

async function cargarHorarios() {
  try {
    const respuesta = await fetch(ARCHIVO_HORARIOS);
    if (!respuesta.ok) {
      throw new Error("No se encontraron los horarios públicos.");
    }

    const cursos = await respuesta.json();
    if (!Array.isArray(cursos) || cursos.length === 0) {
      throw new Error("No hay horarios disponibles.");
    }

    cursos.forEach((curso, indice) => {
      const opcion = document.createElement("option");
      opcion.value = String(indice);
      opcion.textContent = curso.course;
      cursoSelect.appendChild(opcion);
    });

    cursoSelect.addEventListener("change", () => {
      mostrarHorario(cursos[Number(cursoSelect.value)]);
    });

    mostrarHorario(cursos[0]);
  } catch (error) {
    console.error(error);
    const mensaje = document.createElement("strong");
    mensaje.textContent = "No se pudieron cargar los horarios.";
    infoCurso.replaceChildren(mensaje);
  }
}

function mostrarHorario(curso) {
  if (!curso) {
    return;
  }

  const titulo = document.createElement("strong");
  titulo.textContent = curso.course;
  infoCurso.replaceChildren(titulo);
  horariosBody.replaceChildren();

  curso.schedule.forEach((bloque) => {
    const fila = document.createElement("tr");
    const celdaHora = document.createElement("td");
    celdaHora.className = "hora";
    celdaHora.textContent = bloque.time;
    fila.appendChild(celdaHora);

    bloque.days.forEach((asignatura) => {
      const celda = document.createElement("td");
      const contenido = document.createElement("span");
      contenido.className = asignatura ? "materia" : "vacio";
      contenido.textContent = asignatura || "—";
      celda.appendChild(contenido);
      fila.appendChild(celda);
    });

    horariosBody.appendChild(fila);
  });
}
