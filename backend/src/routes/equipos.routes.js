const { Router } = require('express');
const { getEquipos, getEquipoById } = require('../controllers/equiposController');

const router = Router();

router.get('/', getEquipos);
router.get('/:id', getEquipoById);

module.exports = router;
