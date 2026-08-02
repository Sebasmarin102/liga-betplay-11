const Jugador = require('../models/Jugador');

const POSICIONES_VALIDAS = ['POR', 'DFC', 'LD', 'LI', 'MCD', 'MC', 'MCO', 'ED', 'EI', 'DC'];

async function getJugadores(req, res, next) {
  try {
    const { posicion, equipo_id } = req.query;

    if (posicion && !POSICIONES_VALIDAS.includes(posicion)) {
      return res.status(400).json({ error: `posicion invalida. Usa una de: ${POSICIONES_VALIDAS.join(', ')}` });
    }

    const jugadores = await Jugador.findAll({ posicion_especifica: posicion, equipo_id });
    res.json(jugadores);
  } catch (err) {
    next(err);
  }
}

async function getJugadorById(req, res, next) {
  try {
    const jugador = await Jugador.findById(req.params.id);
    if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
    res.json(jugador);
  } catch (err) {
    next(err);
  }
}

module.exports = { getJugadores, getJugadorById };
