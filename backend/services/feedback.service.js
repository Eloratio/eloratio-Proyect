const {consultarAi, summaryAi, metricAi} = require('../services/genmma4');

//Hace consultas a la API con IA

async function analizarDiscurso(textoOriginal, textoUsuario, tipoPresentacion, duracion_seg){
  
  //analiza la claridad, formalidad, fluidez y ritmo del discurso
  const metric = await metricAi("metric",tipoPresentacion, textoOriginal);

  //analiza los errores de estructura
  const error = await consultarAi("error", textoOriginal);

  //analiza el discurso en busca de sugerencias y las da
  const suggestion = await consultarAi("suggestion", textoOriginal);

  //analiza y busca muletillas en el discurso
  const filler = await consultarAi("filler", textoOriginal);

  //analiza errores o consejos de pronunciacion
  const pronunciation = await consultarAi("pronunciation", textoOriginal);

  //crea el feedback general
  const feedback = await summaryAi(metric, error, suggestion, filler, pronunciation, textoOriginal);

  //retorna un análisis general del discurso
  return { 
    claridad: metric[0], 
    formalidad: metric[1], 
    fluidez: metric[2], 
    ritmo: metric[3], 
    errores: error, 
    sugerencias: suggestion, 
    feedback: feedback, 
    muletillas: filler,
    recomendaciones_pronunciacion: pronunciation
  };


}



/*

// Analiza el texto transcrito del usuario vs el texto propuesto
// Retorna métricas, errores de estructura y sugerencias


//summary (analizar todo lo otro)
function analizarDiscurso(textoOriginal, textoUsuario, tipoPresentacion, duracionSeg) {
  const palabrasOriginales = textoOriginal.toLowerCase().split(/\s+/);
  const palabrasUsuario = textoUsuario.toLowerCase().split(/\s+/);

  // Coincidencia de palabras clave >> palabras clave
  const coincidencias = palabrasUsuario.filter(p => palabrasOriginales.includes(p)).length;
  let claridad = Math.min(99, Math.round((coincidencias / palabrasOriginales.length) * 100));

  // Formalidad según tipo de presentación >> formalidad
  const marcadoresInformales = ['o sea', 'igual', 'como que', 'tipo', 'obvio', 'igual po'];
  const informalismos = marcadoresInformales.filter(m => textoUsuario.toLowerCase().includes(m)).length;
  let formalidad = Math.min(99, Math.max(0, 100 - (informalismos * 15)));

  // Fluidez: penaliza oraciones muy cortas o muy largas >> x
  const oraciones = textoUsuario.split(/[.!?]+/).filter(o => o.trim().length > 0);
  const longitudPromedio = oraciones.reduce((sum, o) => sum + o.trim().split(/\s+/).length, 0) / (oraciones.length || 1);
  let fluidez = longitudPromedio >= 8 && longitudPromedio <= 25 ? 85 : longitudPromedio < 8 ? 55 : 70;

  // Ritmo: basado en variedad de longitud de oraciones >> x
  const longitudes = oraciones.map(o => o.trim().split(/\s+/).length);
  const varianza = longitudes.length > 1
    ? longitudes.reduce((s, l) => s + Math.pow(l - longitudPromedio, 2), 0) / longitudes.length
    : 0;
  const ritmo = Math.min(99, Math.round(50 + varianza));

  // Tarea 2.2: Algoritmo de detección de muletillas
  const listaMuletillas = ['eh', 'em', 'este', 'bueno', 'o sea', 'entonces', 'tipo', 'verdad', 'no', 'ya'];
  const muletillasDetectadas = {};
  let totalMuletillas = 0;

  listaMuletillas.forEach(m => {
    const regex = new RegExp(`\\b${m}\\b`, 'gi');
    const coincidenciasMuletilla = (textoUsuario.match(regex) || []).length;
    if (coincidenciasMuletilla > 0) {
      muletillasDetectadas[m] = coincidenciasMuletilla;
      totalMuletillas += coincidenciasMuletilla;
    }
  });

  // Penalización por muletillas (si representan más del 3% de las palabras del discurso)
  const totalPalabras = palabrasUsuario.length || 1;
  const porcentajeMuletillas = (totalMuletillas / totalPalabras) * 100;
  if (porcentajeMuletillas > 3) {
    claridad = Math.max(0, claridad - 20);
    fluidez = Math.max(0, fluidez - 20);
  }

  // Tarea 2.1: Errores de estructura según tipo de presentación (incluyendo tipos académicos)
  const errores = [];
  if (tipoPresentacion === 'formal' || tipoPresentacion === 'academica') {
    if (!textoUsuario.match(/buenos días|buenas tardes|estimados|presentar|objetivo/i))
      errores.push({ tipo: 'apertura', descripcion: 'Falta una introducción formal al inicio del discurso' });
    if (!textoUsuario.match(/concluir|en conclusión|para finalizar|en resumen/i))
      errores.push({ tipo: 'cierre', descripcion: 'No se detectó un cierre o conclusión del discurso' });
  } else if (tipoPresentacion === 'expositiva') {
    if (!textoUsuario.match(/exponer|presentar|introducción|tema a tratar/i))
      errores.push({ tipo: 'apertura', descripcion: 'Falta una introducción adecuada (ej. "exponer", "presentar", "introducción" o "tema a tratar")' });
    if (!textoUsuario.match(/para finalizar|en conclusión|gracias por su atención/i))
      errores.push({ tipo: 'cierre', descripcion: 'Falta un cierre formal (ej. "para finalizar", "en conclusión" o "gracias por su atención")' });
  } else if (tipoPresentacion === 'defensa_tesis') {
    if (!textoUsuario.match(/comisión|miembros del jurado|profesores|defensa de mi tesis/i))
      errores.push({ tipo: 'apertura', descripcion: 'Falta un saludo a la comisión o miembros del jurado al inicio' });
    if (!textoUsuario.match(/metodología|resultados|hipótesis|investigación/i))
      errores.push({ tipo: 'desarrollo', descripcion: 'Falta mencionar la metodología o investigación (ej. "metodología", "resultados", "hipótesis" o "investigación")' });
    if (!textoUsuario.match(/conclusiones|sugerencias|quedo a su disposición/i))
      errores.push({ tipo: 'cierre', descripcion: 'Falta un cierre formal de la defensa (ej. "conclusiones", "sugerencias" o "quedo a su disposición")' });
  } else if (tipoPresentacion === 'seminario') {
    if (!textoUsuario.match(/seminario|presentación|tópico/i))
      errores.push({ tipo: 'apertura', descripcion: 'Falta una apertura que mencione el seminario, presentación o tópico' });
    if (!textoUsuario.match(/preguntas|comentarios|discusión/i))
      errores.push({ tipo: 'cierre', descripcion: 'Falta un cierre que abra el seminario a preguntas, comentarios o discusión' });
  }

  if (informalismos > 0)
    errores.push({ tipo: 'formalidad', descripcion: `Se detectaron ${informalismos} expresión(es) informal(es) no apropiadas` });

  // Tarea 2.3: Generador de recomendaciones de pronunciación/pausas
  const recomendacionesPronunciacion = [];
  const conteoEhEm = (muletillasDetectadas['eh'] || 0) + (muletillasDetectadas['em'] || 0);
  if (conteoEhEm > 0) {
    recomendacionesPronunciacion.push("Recomendación de pausa silenciosa: cuando sientas la necesidad de vocalizar 'eh', inhala aire y haz una pausa de 1 segundo.");
  }

  const conteoConectores = (muletillasDetectadas['entonces'] || 0) + (muletillasDetectadas['o sea'] || 0);
  if (conteoConectores > 0) {
    recomendacionesPronunciacion.push("Recomendación de conectores: utiliza conectores lógicos variados como 'por lo tanto', 'en consecuencia' o 'asimismo'.");
  }

  if (duracionSeg && duracionSeg > 0) {
    const ppm = (palabrasUsuario.length / duracionSeg) * 60;
    if (ppm > 160) {
      recomendacionesPronunciacion.push("Recomendación de dicción: disminuye la velocidad de habla para permitir una articulación fonética más limpia.");
    }
  }

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
  if (porcentajeMuletillas > 3)
    sugerencias.push('Intenta reducir el uso de muletillas de apoyo (eh, bueno, o sea, etc.)');
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
    puntuacion: Math.min(99, puntuacion),
    muletillas: muletillasDetectadas,
    recomendaciones_pronunciacion: recomendacionesPronunciacion
  };
}

function generarFeedbackTexto(puntuacion, tipo, cantErrores) {
  if (puntuacion >= 80)
    return `Excelente presentación ${tipo}. Tu discurso muestra buena estructura y claridad. ${cantErrores === 0 ? 'No se detectaron errores de estructura.' : `Revisa ${cantErrores} aspecto(s) menores.`}`;
  if (puntuacion >= 60)
    return `Tu presentación ${tipo} tiene una base sólida. Hay oportunidades claras de mejora en formalidad y estructura. Revisa las sugerencias específicas.`;
  return `Tu presentación ${tipo} necesita trabajo en varios aspectos. Presta especial atención a la estructura formal y al vocabulario apropiado para el contexto.`;
}

*/



module.exports = { analizarDiscurso };
