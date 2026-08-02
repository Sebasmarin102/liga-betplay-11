const { Router } = require('express');
const equiposRoutes = require('./equipos.routes');
const jugadoresRoutes = require('./jugadores.routes');

const router = Router();

router.use('/equipos', equiposRoutes);
router.use('/jugadores', jugadoresRoutes);

module.exports = router;
