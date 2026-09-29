function mostrarSeccion(opcion) {
  // Ocultar todas las secciones
  document.getElementById('seccion-1ro').classList.remove('active');
  document.getElementById('seccion-2do6to').classList.remove('active');
  
  // Quitar estilo activo de los botones
  document.getElementById('btn-1ro').classList.remove('active');
  document.getElementById('btn-2do6to').classList.remove('active');

  // Activar la opción seleccionada
  if (opcion === '1ro') {
    document.getElementById('seccion-1ro').classList.add('active');
    document.getElementById('btn-1ro').classList.add('active');
  } else if (opcion === '2do6to') {
    document.getElementById('seccion-2do6to').classList.add('active');
    document.getElementById('btn-2do6to').classList.add('active');
  }
}