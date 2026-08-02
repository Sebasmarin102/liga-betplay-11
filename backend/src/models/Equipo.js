const pool = require('../config/db');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM equipos ORDER BY nombre');
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [id]);
  return rows[0];
}

async function findJugadoresByEquipo(id) {
  const [rows] = await pool.query('SELECT * FROM jugadores WHERE equipo_id = ? ORDER BY dorsal', [id]);
  return rows;
}

module.exports = { findAll, findById, findJugadoresByEquipo };
