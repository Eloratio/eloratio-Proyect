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

module.exports = { analizarDiscurso };
