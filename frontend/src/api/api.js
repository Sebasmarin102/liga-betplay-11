const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function getJugadoresPorPosicion(posicion) {
  const res = await fetch(`${BASE_URL}/jugadores?posicion=${posicion}`);
  if (!res.ok) throw new Error('Error al obtener jugadores');
  return res.json();
}
