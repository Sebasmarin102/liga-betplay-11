const pool = require('../config/db');

const SELECT_BASE = `
  SELECT j.*, e.nombre AS equipo_nombre, e.escudo_url AS equipo_escudo
  FROM jugadores j
  JOIN equipos e ON e.id = j.equipo_id
`;

async function findAll({ posicion_especifica, equipo_id } = {}) {
  const conditions = [];
  const params = [];

  if (posicion_especifica) {
    conditions.push('j.posicion_especifica = ?');
    params.push(posicion_especifica);
  }
  if (equipo_id) {
    conditions.push('j.equipo_id = ?');
    params.push(equipo_id);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(`${SELECT_BASE} ${where} ORDER BY j.nombre_completo`, params);
  return rows;
}

async function findById(id) {
  const [rows] = await pool.query(`${SELECT_BASE} WHERE j.id = ?`, [id]);
  return rows[0];
}

module.exports = { findAll, findById };
