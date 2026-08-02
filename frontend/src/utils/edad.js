export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return '—';

  // Se parsea manualmente (sin pasar por Date de la fecha completa) para evitar
  // desfaces de un dia por la zona horaria del navegador.
  const [anio, mes, dia] = fechaNacimiento.slice(0, 10).split('-').map(Number);
  const hoy = new Date();
  let edad = hoy.getFullYear() - anio;
  const mesActual = hoy.getMonth() - (mes - 1);

  if (mesActual < 0 || (mesActual === 0 && hoy.getDate() < dia)) {
    edad--;
  }

  return edad;
}
