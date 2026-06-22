const express = require('express');

const app = express();

app.use(express.json());

// GET API

app.get("", (req,res) => {
  res.json({
    Estado_API: "Funcionando"
  });
});

//POST Mandar discurso

app.post('/discurso', async (req, res) => {
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
Extrae las palabras clave más importantes del siguiente texto.

Responde únicamente con JSON válido.

Formato:
{
  "keywords": ["palabra1", "palabra2"]
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