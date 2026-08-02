const Equipo = require('../models/Equipo');

async function getEquipos(req, res, next) {
  try {
    const equipos = await Equipo.findAll();
    res.json(equipos);
  } catch (err) {
    next(err);
  }
}

async function getEquipoById(req, res, next) {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });

    const jugadores = await Equipo.findJugadoresByEquipo(req.params.id);
    res.json({ ...equipo, jugadores });
  } catch (err) {
    next(err);
  }
}

module.exports = { getEquipos, getEquipoById };
