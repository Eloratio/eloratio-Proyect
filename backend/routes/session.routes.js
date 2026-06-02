const express = require('express');
const router = express.Router();
const { crearSesion, analizarSesion, obtenerResumen } = require('../controllers/session.controller');

router.post('/', crearSesion);
router.post('/:id/analyze', analizarSesion);
router.get('/:id/summary', obtenerResumen);

module.exports = router;