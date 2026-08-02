const { Router } = require('express');
const { getJugadores, getJugadorById } = require('../controllers/jugadoresController');

const router = Router();

// GET /api/jugadores?posicion=POR&equipo_id=3
router.get('/', getJugadores);
router.get('/:id', getJugadorById);

module.exports = router;
