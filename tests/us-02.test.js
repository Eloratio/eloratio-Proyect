const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { analizarDiscurso } = require('../backend/services/feedback.service');
const { crearReportePdf } = require('../backend/services/pdf.service');

// Asegurar que exista la carpeta scratch para el PDF de salida
const scratchDir = path.join(__dirname, '../scratch');
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

console.log('=== INICIANDO PRUEBAS DE US-02 ===\n');

let pruebasTotales = 0;
let pruebasExitosas = 0;

function reportarPrueba(nombre, condicion) {
  pruebasTotales++;
  if (condicion) {
    pruebasExitosas++;
    console.log(`✅ [ÉXITO] - ${nombre}`);
  } else {
    console.error(`❌ [FALLO] - ${nombre}`);
  }
}

// ==========================================
// 1. PRUEBAS DE CLASIFICACIÓN ESTRUCTURAL (CA1)
// ==========================================
console.log('--- 1. Pruebas de Clasificación Estructural ---');

const textoOriginal = "Este es un texto propuesto de prueba para la sesión academica expositiva.";

// Casos Expositiva (Apertura: exponer/presentar/introducción/tema a tratar. Cierre: para finalizar/en conclusión/gracias por su atención)
const casosExpositiva = [
  {
    texto: "Hoy voy a presentar el tema a tratar y al cierre para finalizar daremos las conclusiones.",
    erroresEsperados: 0,
    desc: "Expositiva - Apertura y cierre presentes"
  },
  {
    texto: "Hoy daremos inicio a la sesión, pero para finalizar les daré las gracias por su atención.",
    erroresEsperados: 1, // falta apertura
    desc: "Expositiva - Falta apertura"
  },
  {
    texto: "Me gustaría presentar este tema hoy, muchas gracias.",
    erroresEsperados: 1, // falta cierre
    desc: "Expositiva - Falta cierre"
  },
  {
    texto: "Solo hablaré de cosas aleatorias en este discurso improvisado.",
    erroresEsperados: 2, // faltan ambos
    desc: "Expositiva - Faltan apertura y cierre"
  }
];

// Casos Defensa de Tesis (Apertura: comisión/miembros del jurado/profesores/defensa de mi tesis. Desarrollo: metodología/resultados/hipótesis/investigación. Cierre: conclusiones/sugerencias/quedo a su disposición)
const casosDefensa = [
  {
    texto: "Estimados miembros del jurado, hoy presento la defensa de mi tesis. En cuanto a la metodología y resultados, la investigación arrojó buenas métricas. En conclusiones y sugerencias, quedo a su disposición.",
    erroresEsperados: 0,
    desc: "Defensa Tesis - Todo presente"
  },
  {
    texto: "La metodología y resultados son claros y como conclusiones finales daremos paso a la ronda.",
    erroresEsperados: 1, // falta apertura
    desc: "Defensa Tesis - Falta saludo a jurado/comisión"
  },
  {
    texto: "Señores profesores de la comisión de defensa. Las conclusiones y sugerencias son claras.",
    erroresEsperados: 1, // falta desarrollo (metodología/resultados/etc)
    desc: "Defensa Tesis - Falta desarrollo técnico"
  },
  {
    texto: "Estimada comisión, en la investigación y metodología obtuvimos excelentes datos.",
    erroresEsperados: 1, // falta cierre
    desc: "Defensa Tesis - Falta cierre formal"
  }
];

// Casos Seminario (Apertura: seminario/presentación/tópico. Cierre: preguntas/comentarios/discusión)
const casosSeminario = [
  {
    texto: "Damos inicio a este seminario y presentación del tópico del día. Al final abriremos paso a comentarios y discusión de preguntas.",
    erroresEsperados: 0,
    desc: "Seminario - Apertura y cierre presentes"
  },
  {
    texto: "Presentamos el tema del día, abriremos el debate a preguntas.",
    erroresEsperados: 1, // falta apertura
    desc: "Seminario - Falta apertura"
  },
  {
    texto: "Bienvenidos al seminario del día. Esperamos que sea de su agrado.",
    erroresEsperados: 1, // falta cierre (preguntas/comentarios/discusión)
    desc: "Seminario - Falta cierre"
  }
];

let aciertosEstructura = 0;
const totalCasosEstructura = casosExpositiva.length + casosDefensa.length + casosSeminario.length;

casosExpositiva.forEach(c => {
  const res = analizarDiscurso(textoOriginal, c.texto, 'expositiva');
  const coincide = res.errores.length === c.erroresEsperados;
  if (coincide) aciertosEstructura++;
  reportarPrueba(`${c.desc}: se esperaban ${c.erroresEsperados} errores y se obtuvieron ${res.errores.length}`, coincide);
});

casosDefensa.forEach(c => {
  const res = analizarDiscurso(textoOriginal, c.texto, 'defensa_tesis');
  const coincide = res.errores.length === c.erroresEsperados;
  if (coincide) aciertosEstructura++;
  reportarPrueba(`${c.desc}: se esperaban ${c.erroresEsperados} errores y se obtuvieron ${res.errores.length}`, coincide);
});

casosSeminario.forEach(c => {
  const res = analizarDiscurso(textoOriginal, c.texto, 'seminario');
  const coincide = res.errores.length === c.erroresEsperados;
  if (coincide) aciertosEstructura++;
  reportarPrueba(`${c.desc}: se esperaban ${c.erroresEsperados} errores y se obtuvieron ${res.errores.length}`, coincide);
});

const tasaAciertoEstructura = (aciertosEstructura / totalCasosEstructura) * 100;
console.log(`\nTasa de acierto estructural: ${tasaAciertoEstructura.toFixed(2)}% (Mínimo requerido: 85%)`);
reportarPrueba("Tasa de acierto estructural >= 85%", tasaAciertoEstructura >= 85);

// ==========================================
// 2. PRUEBAS DE DETECCIÓN DE MULETILLAS (CA3)
// ==========================================
console.log('\n--- 2. Pruebas de Detección de Muletillas ---');

const textosMuletillas = [
  {
    texto: "Hola, eh... bueno, este discurso sirve para ver si eh funciona el algoritmo entonces.",
    esperadas: { eh: 2, bueno: 1, este: 1, entonces: 1 },
    total: 5,
    desc: "Muestra 1 - Mix de muletillas"
  },
  {
    texto: "o sea, no creo que tipo la verdad sea tan difícil, ya que ya lo probamos.",
    esperadas: { "o sea": 1, no: 1, tipo: 1, verdad: 1, ya: 2 },
    total: 6,
    desc: "Muestra 2 - Conectores cortos"
  },
  {
    texto: "buenamente no es una muletilla, pero bueno sí lo es.",
    esperadas: { bueno: 1, no: 1 },
    total: 2,
    desc: "Muestra 3 - Evitar coincidencias parciales ('buenamente' vs 'bueno')"
  },
  {
    texto: "En esta presentación formal no deberíamos usar muletillas.",
    esperadas: { no: 1 },
    total: 1,
    desc: "Muestra 4 - Prácticamente sin muletillas"
  },
  {
    texto: "eh eh eh em em ya o sea o sea o sea",
    esperadas: { eh: 3, em: 2, ya: 1, "o sea": 3 },
    total: 9,
    desc: "Muestra 5 - Repetición intensiva"
  }
];

let aciertosMuletillas = 0;
const totalCasosMuletillas = textosMuletillas.length;

textosMuletillas.forEach(c => {
  const res = analizarDiscurso(textoOriginal, c.texto, 'formal');
  let coincideTodo = true;
  
  // Validar conteos esperados
  Object.keys(c.esperadas).forEach(key => {
    if ((res.muletillas[key] || 0) !== c.esperadas[key]) {
      coincideTodo = false;
    }
  });

  // Validar que no haya detectado muletillas extras
  Object.keys(res.muletillas).forEach(key => {
    if (!c.esperadas[key]) {
      coincideTodo = false;
    }
  });

  if (coincideTodo) aciertosMuletillas++;
  reportarPrueba(`${c.desc}: se esperaban ${c.total} muletillas en total`, coincideTodo);
});

const tasaAciertoMuletillas = (aciertosMuletillas / totalCasosMuletillas) * 100;
console.log(`\nTasa de acierto muletillas: ${tasaAciertoMuletillas.toFixed(2)}% (Mínimo requerido: 80%)`);
reportarPrueba("Tasa de acierto muletillas >= 80%", tasaAciertoMuletillas >= 80);

// ==========================================
// 3. PRUEBAS DE REPORTES PDF (CA5)
// ==========================================
console.log('\n--- 3. Pruebas de Generación de PDF ---');

const sesionMock = {
  id: 123,
  tipo_presentacion: 'defensa_tesis',
  completado_en: new Date().toISOString(),
  duracion_seg: 120
};

const analisisMock = {
  claridad: 90,
  formalidad: 85,
  fluidez: 80,
  ritmo: 75,
  feedback_ia: "Tu presentación de defensa de tesis ha sido excelente. El ritmo es el adecuado y la formalidad óptima.",
  errores_estructura: [
    { tipo: 'desarrollo', descripcion: 'Falta mencionar la hipótesis.' }
  ],
  muletillas: { eh: 3, "o sea": 2 },
  recomendaciones_pronunciacion: [
    "Recomendación de pausa silenciosa: cuando sientas la necesidad de vocalizar 'eh', inhala aire y haz una pausa.",
    "Recomendación de conectores: utiliza conectores variados."
  ]
};

try {
  const doc = crearReportePdf(sesionMock, analisisMock);
  const pdfPath = path.join(scratchDir, 'reporte-test-us-02.pdf');
  const writeStream = fs.createWriteStream(pdfPath);
  
  doc.pipe(writeStream);
  doc.end();

  writeStream.on('finish', () => {
    const stats = fs.statSync(pdfPath);
    const pdfGeneradoCorrectamente = stats.size > 0;
    reportarPrueba("El archivo PDF se escribió correctamente en disco y su tamaño es mayor a 0 bytes", pdfGeneradoCorrectamente);
    console.log(`Archivo PDF guardado en: ${pdfPath}`);
    
    // Imprimir resumen final de pruebas
    console.log('\n=== RESUMEN FINAL DE PRUEBAS ===');
    console.log(`Pruebas ejecutadas: ${pruebasTotales}`);
    console.log(`Pruebas exitosas: ${pruebasExitosas}`);
    if (pruebasTotales === pruebasExitosas) {
      console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON CORRECTAMENTE! 🎉');
      process.exit(0);
    } else {
      console.error('\n❌ ALGUNAS PRUEBAS FALLARON ❌');
      process.exit(1);
    }
  });
} catch (err) {
  console.error('Error al ejecutar prueba de PDF:', err);
  reportarPrueba("La generación del PDF arrojó un error", false);
  process.exit(1);
}
