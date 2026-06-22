const express = require('express');
const router = express.Router();
const { crearSesion, analizarSesion, obtenerResumen, descargarReportePdf } = require('../controllers/session.controller');

router.post('/', crearSesion);
router.post('/:id/analyze', analizarSesion);
router.get('/:id/summary', obtenerResumen);
router.get('/:id/reporte', descargarReportePdf);

module.exports = router;