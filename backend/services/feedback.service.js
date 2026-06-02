// Analiza el texto transcrito del usuario vs el texto propuesto
// Retorna métricas, errores de estructura y sugerencias

function analizarDiscurso(textoOriginal, textoUsuario, tipoPresentacion) {
  const palabrasOriginales = textoOriginal.toLowerCase().split(/\s+/);
  const palabrasUsuario = textoUsuario.toLowerCase().split(/\s+/);

  // Coincidencia de palabras clave
  const coincidencias = palabrasUsuario.filter(p => palabrasOriginales.includes(p)).length;
  const claridad = Math.min(99, Math.round((coincidencias / palabrasOriginales.length) * 100));

  // Formalidad según tipo de presentación
  const marcadoresInformales = ['o sea', 'igual', 'como que', 'tipo', 'obvio', 'igual po'];
  const informalismos = marcadoresInformales.filter(m => textoUsuario.toLowerCase().includes(m)).length;
  const formalidad = Math.min(99, Math.max(0, 100 - (informalismos * 15)));

  // Fluidez: penaliza oraciones muy cortas o muy largas
  const oraciones = textoUsuario.split(/[.!?]+/).filter(o => o.trim().length > 0);
  const longitudPromedio = oraciones.reduce((sum, o) => sum + o.trim().split(/\s+/).length, 0) / (oraciones.length || 1);
  const fluidez = longitudPromedio >= 8 && longitudPromedio <= 25 ? 85 : longitudPromedio < 8 ? 55 : 70;

  // Ritmo: basado en variedad de longitud de oraciones
  const longitudes = oraciones.map(o => o.trim().split(/\s+/).length);
  const varianza = longitudes.length > 1
    ? longitudes.reduce((s, l) => s + Math.pow(l - longitudPromedio, 2), 0) / longitudes.length
    : 0;
  const ritmo = Math.min(99, Math.round(50 + varianza));

  // Errores de estructura según tipo de presentación
  const errores = [];
  if (tipoPresentacion === 'formal' || tipoPresentacion === 'academica') {
    if (!textoUsuario.match(/buenos días|buenas tardes|estimados|presentar|objetivo/i))
      errores.push({ tipo: 'apertura', descripcion: 'Falta una introducción formal al inicio del discurso' });
    if (!textoUsuario.match(/concluir|en conclusión|para finalizar|en resumen/i))
      errores.push({ tipo: 'cierre', descripcion: 'No se detectó un cierre o conclusión del discurso' });
  }
  if (informalismos > 0)
    errores.push({ tipo: 'formalidad', descripcion: `Se detectaron ${informalismos} expresión(es) informal(es) no apropiadas` });

  // Sugerencias específicas (CA4)
  const sugerencias = [];
  if (claridad < 60)
    sugerencias.push('Intenta cubrir más los puntos clave del texto propuesto');
  if (formalidad < 70)
    sugerencias.push('Reemplaza expresiones coloquiales por lenguaje más formal');
  if (fluidez < 70)
    sugerencias.push('Varía la extensión de tus oraciones para mejorar el ritmo');
  if (oraciones.length < 3)
    sugerencias.push('Desarrolla más tu discurso, actualmente es demasiado breve');
  if (sugerencias.length === 0)
    sugerencias.push('¡Buen trabajo! Continúa practicando para mantener este nivel');

  // Feedback general de IA
  const puntuacion = Math.round((claridad + formalidad + fluidez + ritmo) / 4);
  const feedback = generarFeedbackTexto(puntuacion, tipoPresentacion, errores.length);

  return { 
  claridad: Math.min(99, claridad), 
  formalidad: Math.min(99, formalidad), 
  fluidez: Math.min(99, fluidez), 
  ritmo: Math.min(99, ritmo), 
  errores, 
  sugerencias, 
  feedback, 
  puntuacion: Math.min(99, puntuacion) 
};
}

function generarFeedbackTexto(puntuacion, tipo, cantErrores) {
  if (puntuacion >= 80)
    return `Excelente presentación ${tipo}. Tu discurso muestra buena estructura y claridad. ${cantErrores === 0 ? 'No se detectaron errores de estructura.' : `Revisa ${cantErrores} aspecto(s) menores.`}`;
  if (puntuacion >= 60)
    return `Tu presentación ${tipo} tiene una base sólida. Hay oportunidades claras de mejora en formalidad y estructura. Revisa las sugerencias específicas.`;
  return `Tu presentación ${tipo} necesita trabajo en varios aspectos. Presta especial atención a la estructura formal y al vocabulario apropiado para el contexto.`;
}

module.exports = { analizarDiscurso };