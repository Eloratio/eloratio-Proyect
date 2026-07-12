const supabase = require('../services/supabase');
const { analizarDiscurso } = require('../services/feedback.service');
const { crearReportePdf } = require('../services/pdf.service');

// POST /sessions — CA1: crear sesión con texto propuesto con un usuario existente
async function crearSesion(req, res) {
  const { usuario_id, tipo_presentacion, texto_propuesto } = req.body;

  //verifica si falta algun argumento
  if (!usuario_id || !tipo_presentacion || !texto_propuesto)
    return res.status(400).json({ error: 'Faltan campos requeridos: usuario_id, tipo_presentacion, texto_propuesto' });

  //tipos válidos de sesion
  const tiposValidos = ['formal', 'informal', 'academica', 'corporativa', 'expositiva', 'defensa_tesis', 'seminario'];

  //verifica si el tipo de sesion es valido
  if (!tiposValidos.includes(tipo_presentacion))
    return res.status(400).json({ error: `tipo_presentacion debe ser uno de: ${tiposValidos.join(', ')}` });

  //verifica si el texto del usuario cumple con el tamaño minimo
  if (texto_propuesto.trim().length < 20)
    return res.status(400).json({ error: 'El texto propuesto debe tener al menos 20 caracteres' });

  //intenta escribir en la base de datos en supabase
  const { data, error } = await supabase
    .from('sesiones_practica')
    .insert({ usuario_id, tipo_presentacion, texto_propuesto: texto_propuesto.trim() })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  //crea la sesion y almacena sus datos en la variable sesion
  return res.status(201).json({
    mensaje: 'Sesión creada exitosamente',
    sesion: data
  });
}

// POST /sessions/:id/analyze — CA2, CA3, CA4: analizar discurso del usuario
async function analizarSesion(req, res) {
  const { id } = req.params;
  const { texto_usuario, duracion_seg } = req.body;

  if (!texto_usuario || texto_usuario.trim().length < 10)
    return res.status(400).json({ error: 'Se requiere el texto del discurso del usuario (mínimo 10 caracteres)' });

  // Obtener la sesión existente
  const { data: sesion, error: errSesion } = await supabase
    .from('sesiones_practica')
    .select('*')
    .eq('id', id)
    .single();

  if (errSesion || !sesion)
    return res.status(404).json({ error: 'Sesión no encontrada' });

  if (sesion.estado === 'completada')
    return res.status(409).json({ error: 'Esta sesión ya fue analizada' });

  // Ejecutar análisis
  const analisis = await analizarDiscurso(sesion.texto_propuesto, texto_usuario, sesion.tipo_presentacion, duracion_seg);
  console.log('ANALISIS:', JSON.stringify(analisis));

  // Guardar análisis
  const { error: errAnalisis } = await supabase
    .from('analisis_sesion')
    .insert({
      sesion_id: id,
      claridad: analisis.claridad,
      formalidad: analisis.formalidad,
      fluidez: analisis.fluidez,
      ritmo: analisis.ritmo,
      errores_estructura: analisis.errores,
      sugerencias: analisis.sugerencias,
      feedback_ia: analisis.feedback,
      muletillas: analisis.muletillas,
      recomendaciones_pronunciacion: analisis.recomendaciones_pronunciacion
    });

  if (errAnalisis) return res.status(500).json({ error: errAnalisis.message });

  // Marcar sesión como completada
  await supabase
    .from('sesiones_practica')
    .update({ estado: 'completada', completado_en: new Date().toISOString(), duracion_seg: duracion_seg || null })
    .eq('id', id);

  // Actualizar contador de sesiones del usuario
  await supabase.rpc('incrementar_sesiones', { uid: sesion.usuario_id });

  return res.status(200).json({
    mensaje: 'Análisis completado',
    metricas: {
      claridad: analisis.claridad,
      formalidad: analisis.formalidad,
      fluidez: analisis.fluidez,
      ritmo: analisis.ritmo
    },
    errores_estructura: analisis.errores,
    sugerencias: analisis.sugerencias,
    feedback: analisis.feedback,
    muletillas: analisis.muletillas,
    recomendaciones_pronunciacion: analisis.recomendaciones_pronunciacion
  });
}

// GET /sessions/:id/summary — CA5: resumen final de la sesión
async function obtenerResumen(req, res) {
  const { id } = req.params;

  const { data: sesion, error: errSesion } = await supabase
    .from('sesiones_practica')
    .select('*')
    .eq('id', id)
    .single();

  if (errSesion || !sesion)
    return res.status(404).json({ error: 'Sesión no encontrada' });

  if (sesion.estado !== 'completada')
    return res.status(400).json({ error: 'La sesión aún no ha sido analizada' });

  const { data: analisis, error: errAnalisis } = await supabase
    .from('analisis_sesion')
    .select('*')
    .eq('sesion_id', id)
    .single();

  if (errAnalisis || !analisis)
    return res.status(404).json({ error: 'Análisis no encontrado para esta sesión' });

  const puntuacion = Math.round((analisis.claridad + analisis.formalidad + analisis.fluidez + analisis.ritmo) / 4);

  // Guardar resumen si no existe
  await supabase
    .from('resumen_sesion')
    .upsert({
      sesion_id: id,
      puntuacion_total: puntuacion,
      aspectos_mejorar: analisis.sugerencias,
      logros_desbloqueados: puntuacion >= 80 ? [{ id: 'primera_estrella', nombre: 'Primera estrella' }] : []
    }, { onConflict: 'sesion_id' });

  return res.status(200).json({
    sesion_id: id,
    tipo_presentacion: sesion.tipo_presentacion,
    duracion_seg: sesion.duracion_seg,
    completado_en: sesion.completado_en,
    puntuacion_total: puntuacion,
    metricas: {
      claridad: analisis.claridad,
      formalidad: analisis.formalidad,
      fluidez: analisis.fluidez,
      ritmo: analisis.ritmo
    },
    aspectos_principales_a_mejorar: analisis.sugerencias,
    feedback_final: analisis.feedback_ia,
    logros: puntuacion >= 80 ? ['Primera estrella desbloqueada 🌟'] : []
  });
}

// GET /sessions/:id/reporte — Tarea 3.3: descargar reporte PDF
async function descargarReportePdf(req, res) {
  const { id } = req.params;

  try {
    // 1. Obtener la sesión existente
    const { data: sesion, error: errSesion } = await supabase
      .from('sesiones_practica')
      .select('*')
      .eq('id', id)
      .single();

    if (errSesion || !sesion)
      return res.status(404).json({ error: 'Sesión no encontrada' });

    if (sesion.estado !== 'completada')
      return res.status(400).json({ error: 'La sesión aún no ha sido analizada, no se puede generar el reporte' });

    // 2. Obtener el análisis
    const { data: analisis, error: errAnalisis } = await supabase
      .from('analisis_sesion')
      .select('*')
      .eq('sesion_id', id)
      .single();

    if (errAnalisis || !analisis)
      return res.status(404).json({ error: 'Análisis no encontrado para esta sesión' });

    // 3. Generar el reporte PDF
    const doc = crearReportePdf(sesion, analisis);

    // 4. Configurar headers y enviar el PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=reporte-eloratio-${id}.pdf`);
    
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    return res.status(500).json({ error: 'Error interno del servidor al generar el reporte PDF' });
  }
}

module.exports = { crearSesion, analizarSesion, obtenerResumen, descargarReportePdf };