const PDFDocument = require('pdfkit');

/**
 * Crea un documento PDF con el reporte de la sesión y su análisis.
 * @param {Object} sesion Datos de la sesión.
 * @param {Object} analisis Métricas y resultados del análisis.
 * @returns {PDFDocument} Documento PDFKit listo para ser pipeado a la respuesta HTTP.
 */
function crearReportePdf(sesion, analisis) {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  // Colores del tema
  const COLOR_PRIMARIO = '#1E3A8A'; // Azul Oscuro
  const COLOR_SECUNDARIO = '#4B5563'; // Gris Medio
  const COLOR_TEXTO = '#1F2937'; // Gris Oscuro
  const COLOR_ACENTO = '#3B82F6'; // Azul Claro
  const COLOR_FONDO_BARRA = '#E5E7EB'; // Gris Claro
  const COLOR_ERROR = '#DC2626'; // Rojo
  const COLOR_EXITO = '#16A34A'; // Verde

  // --- ENCABEZADO ---
  // Rectángulo decorativo superior
  doc.rect(0, 0, 595.28, 120)
     .fill(COLOR_PRIMARIO);

  // Título principal en blanco
  doc.fillColor('#FFFFFF')
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('Reporte de Evaluación - Eloratio', 50, 40);

  doc.fontSize(10)
     .font('Helvetica')
     .text('Tu entrenador de oratoria personal asistido por IA', 50, 70);

  // Metadatos de la sesión
  const fecha = sesion.completado_en 
    ? new Date(sesion.completado_en).toLocaleString('es-ES', { timeZone: 'UTC' }) 
    : new Date().toLocaleString('es-ES');

  doc.fillColor('#FFFFFF')
     .font('Helvetica-Bold')
     .fontSize(9)
     .text(`Sesión ID: #${sesion.id}`, 400, 35, { align: 'right', width: 145 })
     .text(`Fecha: ${fecha}`, 400, 50, { align: 'right', width: 145 })
     .text(`Tipo: ${sesion.tipo_presentacion.toUpperCase()}`, 350, 65, { align: 'right', width: 195 })
     .text(`Duración: ${sesion.duracion_seg ? sesion.duracion_seg + ' seg' : 'N/D'}`, 400, 80, { align: 'right', width: 145 });

  // Mover cursor debajo del encabezado
  doc.y = 150;

  // --- SECCIÓN 1: PUNTUACIÓN GENERAL Y MÉTRICAS ---
  // Puntuación promedio
  const scoreClaridad = analisis.claridad || 0;
  const scoreFormalidad = analisis.formalidad || 0;
  const scoreFluidez = analisis.fluidez || 0;
  const scoreRitmo = analisis.ritmo || 0;
  const puntuacionTotal = Math.round((scoreClaridad + scoreFormalidad + scoreFluidez + scoreRitmo) / 4);

  // Dibujar panel lateral para la puntuación total
  doc.rect(50, 150, 150, 120)
     .fill('#F3F4F6');

  doc.fillColor(COLOR_PRIMARIO)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('PUNTUACIÓN GENERAL', 60, 165, { width: 130, align: 'center' });

  doc.fontSize(42)
     .fillColor(puntuacionTotal >= 80 ? COLOR_EXITO : puntuacionTotal >= 60 ? COLOR_ACENTO : COLOR_ERROR)
     .text(`${puntuacionTotal}`, 60, 185, { width: 130, align: 'center' });

  doc.fontSize(10)
     .fillColor(COLOR_SECUNDARIO)
     .font('Helvetica')
     .text('sobre 100 puntos', 60, 240, { width: 130, align: 'center' });

  // Dibujar las barras de métricas en el lado derecho
  const xBarras = 230;
  const yStartBarras = 150;
  const widthBarrasMax = 315;
  const metricas = [
    { nombre: 'Claridad', valor: scoreClaridad },
    { nombre: 'Formalidad', valor: scoreFormalidad },
    { nombre: 'Fluidez', valor: scoreFluidez },
    { nombre: 'Ritmo', valor: scoreRitmo }
  ];

  metricas.forEach((m, index) => {
    const yPos = yStartBarras + (index * 30);
    
    // Nombre y valor de la métrica
    doc.fillColor(COLOR_TEXTO)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text(m.nombre, xBarras, yPos);

    doc.fillColor(COLOR_SECUNDARIO)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text(`${m.valor}%`, xBarras + widthBarrasMax - 30, yPos, { align: 'right', width: 30 });

    // Barra de fondo
    doc.rect(xBarras, yPos + 12, widthBarrasMax, 8)
       .fill(COLOR_FONDO_BARRA);

    // Barra de valor
    const widthBarraValor = (m.valor / 100) * widthBarrasMax;
    if (widthBarraValor > 0) {
      doc.rect(xBarras, yPos + 12, widthBarraValor, 8)
         .fill(COLOR_ACENTO);
    }
  });

  // Espaciador
  doc.y = 290;

  // --- SECCIÓN 2: FEEDBACK GENERAL DE IA ---
  doc.fillColor(COLOR_PRIMARIO)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Análisis de Retroalimentación de la IA', 50, doc.y);
  
  doc.moveTo(50, doc.y + 5)
     .lineTo(545, doc.y + 5)
     .stroke(COLOR_FONDO_BARRA);

  doc.y += 15;
  doc.fillColor(COLOR_TEXTO)
     .font('Helvetica-Oblique')
     .fontSize(11)
     .text(`"${analisis.feedback_ia || analisis.feedback || 'Sin feedback disponible.'}"`, 50, doc.y, { width: 495, align: 'justify' });

  // Espaciador
  doc.y += 20;

  // --- SECCIÓN 3: ERRORES ESTRUCTURALES ---
  doc.fillColor(COLOR_PRIMARIO)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Evaluación de Estructura Académica', 50, doc.y);

  doc.moveTo(50, doc.y + 5)
     .lineTo(545, doc.y + 5)
     .stroke(COLOR_FONDO_BARRA);

  doc.y += 15;
  
  const errores = analisis.errores_estructura || analisis.errores || [];
  if (errores.length === 0) {
    doc.fillColor(COLOR_EXITO)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('✓ Estructura Impecable: Cumples con todos los criterios y fases de la presentación académica.', 50, doc.y);
  } else {
    doc.fillColor(COLOR_TEXTO)
       .font('Helvetica')
       .fontSize(10)
       .text('Se han detectado los siguientes aspectos estructurales faltantes u observaciones:', 50, doc.y);
    
    doc.y += 10;
    errores.forEach(err => {
      doc.y += 8;
      // Dibujar viñeta roja
      doc.rect(52, doc.y + 2, 4, 4).fill(COLOR_ERROR);
      doc.fillColor(COLOR_TEXTO)
         .font('Helvetica-Bold')
         .text(`[${err.tipo.toUpperCase()}]`, 65, doc.y, { continued: true })
         .font('Helvetica')
         .text(` - ${err.descripcion}`, 65, doc.y, { width: 480 });
    });
  }

  // Espaciador
  doc.y += 25;

  // --- SECCIÓN 4: DETALLE DE MULETILLAS ---
  doc.fillColor(COLOR_PRIMARIO)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Detección de Muletillas', 50, doc.y);

  doc.moveTo(50, doc.y + 5)
     .lineTo(545, doc.y + 5)
     .stroke(COLOR_FONDO_BARRA);

  doc.y += 15;

  const muletillasObj = analisis.muletillas || {};
  const llavesMuletillas = Object.keys(muletillasObj);

  if (llavesMuletillas.length === 0) {
    doc.fillColor(COLOR_EXITO)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('✓ Excelente fluidez verbal: No se detectó el uso de muletillas de apoyo recurrentes.', 50, doc.y);
  } else {
    doc.fillColor(COLOR_TEXTO)
       .font('Helvetica')
       .fontSize(10)
       .text('Se registraron las siguientes palabras de apoyo/muletillas:', 50, doc.y);
    
    doc.y += 15;
    const itemsMuletillas = llavesMuletillas.map(k => `${k}: ${muletillasObj[k]} ${muletillasObj[k] === 1 ? 'vez' : 'veces'}`);
    
    doc.font('Helvetica-Bold')
       .fontSize(10)
       .text(itemsMuletillas.join('  |  '), 50, doc.y, { width: 495 });
  }

  // Espaciador
  doc.y += 25;

  // --- SECCIÓN 5: RECOMENDACIONES DE PRONUNCIACIÓN ---
  doc.fillColor(COLOR_PRIMARIO)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Recomendaciones de Pronunciación y Ritmo', 50, doc.y);

  doc.moveTo(50, doc.y + 5)
     .lineTo(545, doc.y + 5)
     .stroke(COLOR_FONDO_BARRA);

  doc.y += 15;

  const recomendaciones = analisis.recomendaciones_pronunciacion || [];
  if (recomendaciones.length === 0) {
    doc.fillColor(COLOR_EXITO)
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('✓ Ritmo y dicción adecuados: Sigue manteniendo esta velocidad y control de pausas.', 50, doc.y);
  } else {
    recomendaciones.forEach(rec => {
      doc.y += 8;
      // Dibujar viñeta azul
      doc.rect(52, doc.y + 2, 4, 4).fill(COLOR_ACENTO);
      doc.fillColor(COLOR_TEXTO)
         .font('Helvetica')
         .fontSize(10)
         .text(rec, 65, doc.y, { width: 480 });
    });
  }

  // --- PIE DE PÁGINA ---
  // Dibujar línea fina inferior y marca de agua
  doc.moveTo(50, 770)
     .lineTo(545, 770)
     .stroke(COLOR_FONDO_BARRA);

  doc.fillColor(COLOR_SECUNDARIO)
     .font('Helvetica-Bold')
     .fontSize(8)
     .text('Eloratio', 50, 780)
     .font('Helvetica')
     .text(' - Tu entrenador de oratoria personal', 90, 780);

  return doc;
}

module.exports = { crearReportePdf };
