const express = require('express');

const app = express();

app.use(express.json());

// GET API (Muestra que la api está encendida)

app.get("", (req,res) => {
  res.json({
    Estado_API: "Funcionando"
  });
});

//POST Palabras claves >> claridad
//analiza las palabras claves y da un puntaje de claridad

app.post('/clarity', async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        error: 'Debe enviar el discurso, formato: {"texto":"discurso"}'
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

Analiza el siguiente discurso y analiza la claridad del mensaje que entrega.
A partir de este análisis debes puntuar la claridad del discurso con un número que va desde 0 hasta 99, siendo 0 cuando las palabras que usa el discurso no permite entender el mensaje y 99 que el mensaje se entiende a la perfección.
Se recomienda iniciar con 99 puntos y luego ir restando por errores.
Debes restar 3 puntos por términos desconocidos no explicados.
Debes restar 2 puntos por cada falta ortografica o error de coherencia/cohesion.

Responde únicamente con un valor numérico que vaya desde 0 hasta 99.

formato respuesta: 0

0 es el valor numerico que puede variar de 0 a 99

Texto:
${texto}

`,
          stream: false,
          keep_alive: "20m",
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.2
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    res.json(Number(data.response.trim()));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay json valido'
    });
  }
});

//POST Formalidad

app.post('/formality', async (req, res) => {
  try {
    const { tipo, texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        error: 'Debe enviar un texto y su tipo correspondiente, Formato: {"tipo":"tipo de presentacion","texto":"Discurso"}'
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

Analiza el siguiente discurso y evalúa su nivel de formalidad para determinar si es adecuado para el ambiente solicitado.

El valor de "formalidad" debe estar entre 0 y 99, donde:
- 0 representa un discurso completamente fuera del ambiente indicado.
- 99 representa un discurso que encanja perfectamente en el ambiente indicado.

Responde unicamente con un valor numerico desde 0 a 99.

Ambiente:
${tipo}
Texto:
${texto}
`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.2
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    res.json(Number(data.response.trim()));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay json valido'
    });
  }
});

//POST Fluidez

app.post('/fluency', async (req, res) => {
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

Evalúa si la estructura del discurso entregado en la variable texto permite una comunicación natural.
Considera conexión entre ideas, organización de frases y facilidad de seguimiento para la audiencia.
Valor numérico desde 0 hasta 99, donde 0 significa que no hay comunicación natural y 99 significa que si una persona lee el discurso entrega el mensaje fácilmente.

responde unicamente con un valor numérico desde 0 a 99.

Texto:
${texto}

`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.2
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    res.json(Number(data.response.trim()));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});

//POST Ritmo

app.post('/rhythm', async (req, res) => {
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

Evalúa la distribución de ideas dentro del discurso.
Considera si existen partes demasiado extensas, repetitivas o poco desarrolladas y si tienen una entrega de informacion constante durante el discurso.
Valor numérico desde 0 hasta 99, donde 0 significa que el ritmo en la que se da a entender el mensaje no es para nada acorde y 99 que el ritmo en el que se entrega la información es adecuado para el entendimiento del mensaje.

responde unicamente con un valor numérico desde 0 a 99.

Texto:
${texto}

`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.2
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    res.json(Number(data.response.trim()));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});

//POST Errores

app.post('/error', async (req, res) => {
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

Identifica problemas importantes detectados a partir del texto entregado.
No inventes errores que no puedan justificarse con la información entregada.
Los errores deben ser extractos del texto y ser mostrados directamente, no dar una explicacion o una recomendacion.
Formato: debe ser un string que primero especifique el tipo y luego el error en si, siendo todo separado por un ampersand (&):

tipo1&error1&tipo2&error2

Donde tipo debe ser alguno de los siguientes: apertura, desarrollo, cierre, formalidad.
error debe ser un extracto del texto (discurso) y su tipo debe tener sentido.
un tipo siempre tiene que venir acompañado de un ampersand(&)
Un discurso puede no tener errores.
Si quieres usar el caracter: ", reemplazalo con : '

Texto:
${texto}

`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.4
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    const errorString = data.response.trim();
    const errorArray = errorString.split("&");
    const errorObjeto = [];

    for (let i = 0; i < errorArray.length; i+= 2){

      errorObjeto.push({
        tipo: errorArray[i],
        descripcion: errorArray[i+1]
      })
    };

    res.json(errorObjeto);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});

//POST Sugerencias

app.post('/suggestion', async (req, res) => {
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

Genera recomendaciones prácticas para mejorar la presentación del discurso.
Prioriza cambios que tengan un impacto real en la transmisión del mensaje.
Formato: debe ser un string que de las sugerencias separadas por un ampersand(&):

sugerencia1&sugerencia2&sugerencia3

Donde sugerencia es un texto generado a partir del texto describiendo un tip sencillo.
Si quieres usar el caracter: ", reemplazalo con : '

Texto:
${texto}

`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.4
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    const sugerenciaString = data.response.trim();

    res.json(sugerenciaString.split("&"));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});

//POST Muletillas

app.post('/filler', async (req, res) => {
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

Las muletillas deben ser palabras que se repitan a menudo en el texto, por lo general son monosílabos por ejemplo: eh, ah. También pueden ser frases que se repiten demasiado, entorpeciendo el entendimiento del discurso.
Formato: debe ser un string que primero especifique la muletilla y luego la cantidad de la muletilla asociada, siendo todo separado por un ampersand (&):

muletilla1&cantidad1&muletilla2&cantidad2

donde muletilla debe ser la muletilla detectada.
cantidad se refiere a la cantidad que aparece cierta muletilla.
un texto puede no tener muletillas.
Si quieres usar el caracter: ", reemplazalo con : '

Texto:
${texto}

`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.4
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    const muletillaString = data.response.trim();
    const muletillaArray = muletillaString.split("&");
    const muletillaObjeto = {};

    if(muletillaString==""){
      res.json(muletillaObjeto);
    }

    else{
      for (let i = 0; i < muletillaArray.length; i+= 2){

      const muletilla = muletillaArray[i].trim();
      const cantidad = Number(muletillaArray[i + 1]);

      muletillaObjeto[muletilla] = cantidad;
    };

    res.json(muletillaObjeto);
    }

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});

//POST Pronunciacion

app.post('/pronunciation', async (req, res) => {
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

Las recomendaciones de pronunciacion deben ser una recomendacion obtenida a partir del texto donde se intenta dar consejos sobre como pronunciar palabras de forma correcta, por ejemplo palabras extranjeras o también consejos para evitar caer en las muletillas.
Formato: debe ser un string que de las recomendaciones de pronunciacion separadas por un ampersand(&):

recomendacion1&recomendacion2&recomendacion3

Donde recomendacion es un texto generado que describe la recomendación de pronunciacion a partir del texto entregado.
un texto puede no tener recomendaciones de pronunciacion.
Si quieres usar el caracter: ", reemplazalo con : '


Texto:
${texto}

`,
          stream: false,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.4
          }
        })
      }
    );
    const data = await ollamaResponse.json();
    const pronunciacionString = data.response.trim();

    res.json(pronunciacionString.split("&"));

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});

//POST Feedback

app.post('/feedback', async (req, res) => {
  try {
    const { clarity, formality, fluency, rhythm, error, suggestion, filler, pronunciation, texto } = req.body;

    if (!clarity || !formality || !fluency || !rhythm || !error || !suggestion || !filler || !pronunciation || !texto) {
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

Genera un comentario general sobre la calidad del discurso, incluyendo fortalezas y aspectos a mejorar.
Este se debe generar a partir de toda la informacion entregada.
Las variables Claridad, Formalidad, Fluidez y Ritmo son notas que van desde el 0 hasta 99, siendo 0 que no cumple con ese ámbito y 99 que el discurso cumple con eso de manera correcta.
Este debe ser un texto generado no muy extenso (máximo un párrafo).
Si o si debe haber un feedback respecto al discurso.
Si quieres usar el caracter: ", reemplazalo con : '


Texto:
${texto}
Claridad:
${clarity}
Fluidez:
${fluency}
Ritmo:
${rhythm}
Errores de estructura
${error}
Sugerencias
${suggestion}
Muletillas:
${filler}
Recomendaciones de pronunciacion:
${pronunciation}
`,
          stream: false,
          keep_alive: 0,
          options: {
            num_gpu: 99,
            num_thread: 8,
            temperature: 0.5
          }
        })
      }
    );
    const data = await ollamaResponse.json();

    res.json(data.response.trim());

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al procesar el texto o no hay un json valido'
    });
  }
});


app.listen(57423, () => {
  console.log('API corriendo en http://localhost:57423');
});
