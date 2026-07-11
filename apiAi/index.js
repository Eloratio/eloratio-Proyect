const express = require('express');

const app = express();

app.use(express.json());

// GET API

app.get("", (req,res) => {
  res.json({
    Estado_API: "Funcionando"
  });
});

//POST Palabras claves

app.post('/keywords', async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        error: 'Debe enviar un texto'
      });
    }

    const ollamaResponse = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gemma4',
          prompt: `

Analiza el siguiente discurso y extrae sus palabras clave más importantes.

Primero identifica mentalmente el tema central del discurso y los conceptos principales que permiten comprenderlo. Luego selecciona las palabras clave que representen mejor las ideas fundamentales del texto.

Para cada palabra clave seleccionada, genera una definición breve basada en el contexto específico en el que aparece dentro del discurso. La definición debe explicar qué significa o qué representa esa palabra dentro del discurso analizado, no una definición general de diccionario.

Reglas para las palabras clave:
- Cada palabra clave debe ser una sola palabra.
- No uses frases, expresiones compuestas ni grupos de palabras a menos que sea estrictamente necesario.
- No incluyas artículos, preposiciones o palabras demasiado generales (ejemplo: "el", "la", "cosa", "importante").
- Usa palabras que aparezcan dentro del discurso o que sean términos directamente relacionados con los conceptos principales del discurso.
- Prioriza sustantivos y términos específicos sobre palabras comunes.
- La cantidad de palabras clave debe ser proporcional a la longitud del discurso y no superar la cantidad de 15.
- Las palabras deben ayudar a una persona a entender rápidamente de qué trata el discurso.
- Las definiciones deben estar basadas únicamente en la información proporcionada por el discurso.
- No agregues información externa que no pueda inferirse del texto.

Responde únicamente con JSON válido.

Formato:
{
  "keywords": [
    {
      "word": "palabra1",
      "definition": "Definición de la palabra según el contexto del discurso."
    },
    {
      "word": "palabra2",
      "definition": "Definición de la palabra según el contexto del discurso."
    }
  ]
}

Texto:
${texto}

`,
          format: 'json',
          stream: false
        })
      }
    );

    const data = await ollamaResponse.json();

    res.json(JSON.parse(data.response));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto'
    });
  }
});

//POST Formalidad

app.post('/formality', async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        error: 'Debe enviar un texto'
      });
    }

    const ollamaResponse = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gemma4',
          prompt: `

Analiza el siguiente discurso y evalúa su nivel de formalidad para determinar si es adecuado para un ambiente formal.

Primero identifica mentalmente el contexto general del discurso y el tipo de situación comunicativa en la que podría utilizarse. Luego analiza si el lenguaje empleado es apropiado para una presentación formal, académica, profesional o institucional.

Evalúa los siguientes aspectos:
- Uso de vocabulario formal y técnico.
- Presencia de expresiones coloquiales, informales o poco profesionales.
- Uso adecuado de conectores y estructura de las ideas.
- Tono general del discurso.
- Claridad y precisión del lenguaje utilizado.
- Adecuación del discurso al contexto formal indicado.

Reglas del análisis:
- Basa el análisis únicamente en el texto proporcionado.
- No evalúes la calidad de las ideas ni si el contenido es correcto, solo analiza la forma en que está expresado.
- Identifica ejemplos concretos de expresiones que disminuyen la formalidad cuando existan.
- Si una expresión puede ser aceptable en un contexto informal pero no en uno profesional, explica esa diferencia.
- Las recomendaciones deben estar orientadas a mejorar la formalidad del discurso.
- No inventes errores que no estén presentes en el texto.

Responde únicamente con JSON válido.

Formato:
{
  "formalidad": 0,
  "explicacion": "Razones de la calificacion de formalidaddsa"
}

El valor de "formalidad" debe estar entre 0 y 99, donde:
- 0 representa un discurso completamente informal.
- 99 representa un discurso altamente formal y adecuado para ambientes académicos o profesionales.

Texto:
${texto}
`,
          format: 'json',
          stream: false
        })
      }
    );

    const data = await ollamaResponse.json();

    res.json(JSON.parse(data.response));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto'
    });
  }
});

//POST Recomendaciones

app.post('/tips', async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        error: 'Debe enviar un texto'
      });
    }

    const ollamaResponse = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gemma4',
          prompt: `

Analiza el siguiente discurso y genera sugerencias para mejorar la transmisión del mensaje que se desea comunicar.

Primero identifica mentalmente cuál es la idea principal del discurso, sus objetivos comunicativos y los conceptos más importantes que intenta transmitir. Luego analiza si las palabras utilizadas expresan esos conceptos de la manera más clara, precisa y efectiva posible.

Busca oportunidades de mejora relacionadas con:
- Uso de palabras más precisas para representar conceptos complejos.
- Reemplazo de explicaciones largas por términos específicos cuando exista una palabra adecuada.
- Simplificación de palabras demasiado complejas cuando dificulten la comprensión del mensaje.
- Mejora de la claridad de las ideas.
- Uso de vocabulario más adecuado para transmitir emociones, conceptos o situaciones específicas.
- Selección de palabras que generen un mayor impacto comunicativo en la audiencia.

Reglas del análisis:
- No cambies el significado original del discurso.
- No reemplaces palabras solamente por ser más técnicas o complejas; la nueva palabra debe mejorar la precisión del mensaje.
- Prioriza palabras que permitan expresar una idea completa de manera más clara.
- Considera el contexto completo del discurso antes de sugerir cambios.
- Las sugerencias deben estar justificadas explicando por qué la modificación mejora la transmisión del mensaje.
- Si el discurso ya utiliza palabras adecuadas, indícalo y no inventes mejoras innecesarias.
- Un discurso puede no tener sugerencias.

Responde únicamente con JSON válido.

la cantidad de sugerencias puede ser desde 0 hasta 10 como máximo. en caso de no haber sugerencias indicar que la sugerencia1 = "No hay sugerencias"

Formato:
{
  "sugerencias": [
          "sugerencia1",
          "sugerencia2"
  ],
  }

Texto:
${texto}

`,
          format: 'json',
          stream: false
        })
      }
    );

    const data = await ollamaResponse.json();

    res.json(JSON.parse(data.response));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto'
    });
  }
});

//POST Analisis

app.post('/summary', async (req, res) => {
  try {
    const { 
      keywords, formality, tips, texto
    } = req.body;

    if (!keywords || !formality || !tips || !texto) {
      return res.status(400).json({
        error: 'Falta(n) algún(os) componente(s)'
      });
    }

    const ollamaResponse = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gemma4',
          prompt: `

Analiza las siguientes variables en formato JSON: keyword (palabras clave), formality (formalidad), tips (sugerencias), texto (discurso).

El objetivo es generar una evaluación final del discurso considerando:
- El contenido principal identificado mediante las palabras clave.
- El nivel de formalidad detectado.
- Las sugerencias de mejora encontradas.
- El texto original del discurso.

Debes combinar estos análisis para generar una evaluación coherente y objetiva del desempeño comunicativo del discurso.

Evalúa los siguientes aspectos:

1. Claridad:
Determina qué tan fácil es comprender el mensaje principal del discurso.
Considera si las ideas están bien expresadas, si existe precisión en el vocabulario y si las palabras utilizadas permiten transmitir correctamente el mensaje.
Valor numérico desde 0 hasta 99, donde 0 significa que no se entiende el mensaje y 99 que el mensaje se entiende perfectamente.

2. Formalidad:
Utiliza el análisis de formalidad entregado como referencia principal.
Determina si el discurso es adecuado para un contexto formal, académico o profesional.
Valor numérico desde 0 hasta 99, donde 0 significa que el discurso no está en un ambiente culto y 99 que el discurso es apto para ser presentado en lugares importantes ya sea una presentacion en la universidad o en el trabajo.

3. Fluidez:
Evalúa si la estructura del discurso permite una comunicación natural.
Considera conexión entre ideas, organización de frases y facilidad de seguimiento para la audiencia.
Valor numérico desde 0 hasta 99, donde 0 significa que no hay comunicación natural y 99 significa que si una persona lee el discurso entrega el mensaje fácilmente.

4. Ritmo:
Evalúa la distribución de ideas dentro del discurso.
Considera si existen partes demasiado extensas, repetitivas o poco desarrolladas.
Valor numérico desde 0 hasta 99, donde 0 significa que el ritmo en la que se da a entender el mensaje no es para nada acorde y 99 que el ritmo en el que se entrega la información es adecuado para el entendimiento del mensaje.

5. Errores:
Identifica problemas importantes detectados a partir de los análisis previos.
No inventes errores que no puedan justificarse con la información entregada.
Formato: debe ser un jsonb con la siguiente estructura: 
[
  {
    "tipo": "tipo",
    "descripcion": "Descripción correspondiente1"
  },
  {
    "tipo": "tipo",
    "descripcion": "Descripción correspondiente2"
  }
]

Donde tipo debe ser alguno de los siguientes: apertura, desarrollo, cierre, formalidad.
Descripcion debe ser un texto generado y debe ser acorde al tipo.
Un discurso puede no tener sugerencias.

6. Sugerencias:
Genera recomendaciones prácticas para mejorar la presentación del discurso.
Se debe tener en cuenta la variable de tips (Sugerencias).
Prioriza cambios que tengan un impacto real en la transmisión del mensaje.
Formato: debe ser un jsonb con la siguiente estructura:
[
          "sugerencia1",
          "sugerencia2"
]

Donde sugerencia es un texto generado a partir de la variable tips.

7. Feedback:
Genera un comentario general sobre la calidad del discurso, incluyendo fortalezas y aspectos a mejorar.
Este se debe generar una vez se hayan analizado todos los pasos anteriores.
Este debe ser un texto.
La puntuacion debe ser determinada a partir de los puntajes de claridad, formalidad, fluidez y ritmo, siendo un promedio de estos 4 valores, siendo también un valor entre 0 a 99 donde 0 significa que es un mal discurso en general y 99 que es un discurso que se da a entender por completo.
Las muletillas deben ser palabras que se repitan a menudo en el texto, por lo general son monosílabos por ejemplo: eh, ah. También pueden ser frases que se repiten demasiado.
formato de las muletillas: debe ser un jsonb con la siguiente estructura:

{
          "muletilla1": cantidadCorrespondiente1,
          "muletilla2": cantidadCorrespondiente2
}

donde muletilla debe ser la muletilla detectada.
un texto puede no tener muletillas.
cantidadCorrespontiende se refiere a la cantidad que aparece cierta muletilla.

Las recomendaciones de pronunciacion deben ser una recomendacion obtenida a partir del texto donde se intenta dar consejos sobre como pronunciar palabras de forma correcta, por ejemplo palabras extranjeras o también consejos para evitar caer en las muletillas.
un texto puede no tener recomendaciones de pronunciacion.
formato de las recomendaciones de pronunciacion:

[
          "recomendacion1",
          "recomendacion2"
]

donde recomendación es un texto que describe la recomendación.

Reglas:
- Basa tus conclusiones en la información proporcionada por los análisis previos y el texto original.
- No contradigas los análisis entregados a menos que exista una inconsistencia evidente.
- Si dos análisis entregan información diferente, analiza cuál tiene mayor relación con el contexto del discurso.
- Los valores numéricos deben estar entre 0 y 99 excepto el de las muletillas.
- No agregues información externa al discurso.
- Responde únicamente con JSON válido.


Formato de respuesta:

{
  "claridad": 0,
  "formalidad": 0,
  "fluidez": 0,
  "ritmo": 0,

  "errores": [
    {
      "tipo": "apertura | desarrollo | cierre | formalidad",
      "descripcion": "Descripción del problema detectado."
    }
  ],

  "sugerencias": [
    "Sugerencia de mejora."
  ],

  "feedback": "Comentario general del análisis.",

  "puntuacion": 0,

  "muletillas": {
    "ejemplo": 0
  },

  "recomendaciones_pronunciacion": [
    "Recomendación relacionada con pausas, velocidad o pronunciación."
  ]
}



Palabras clave:
${keywords}

Formalidad:
${formality}

Sugerencia:
${tips}

Texto:
${texto}

`,
          format: 'json',
          stream: false
        })
      }
    );

    const data = await ollamaResponse.json();

    res.json(JSON.parse(data.response));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto'
    });
  }
});


app.listen(57423, () => {
  console.log('API corriendo en http://localhost:57423');
});



/*
// GET /cursos
app.get('/cursos', (req, res) => {
  const cursos = db.prepare('SELECT * FROM cursos').all();
  res.json(cursos);
});

// POST /cursos
app.post('/cursos', (req, res) => {
  const { nombre, instructor, creditos } = req.body;
  const result = db.prepare(
    'INSERT INTO cursos (nombre, instructor, creditos) VALUES (?, ?, ?)'
  ).run(nombre, instructor, creditos);
  res.status(201).json({ id: result.lastInsertRowid, nombre, instructor, creditos });
});

// PUT /cursos/:id
app.put('/cursos/:id', (req, res) => {
  const { nombre, instructor, creditos } = req.body;
  const info = db.prepare(
    'UPDATE cursos SET nombre=?, instructor=?, creditos=? WHERE id=?'
  ).run(nombre, instructor, creditos, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Curso no encontrado' });
  res.json({ mensaje: 'Curso actualizado' });
});

// DELETE /cursos/:id
app.delete('/cursos/:id', (req, res) => {
  const info = db.prepare('DELETE FROM cursos WHERE id=?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Curso no encontrado' });
  res.json({ mensaje: 'Curso eliminado' });
});

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000/cursos');
});

*/