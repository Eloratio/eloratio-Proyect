const express = require('express');
const OpenAI = require('openai');

const app = express();

app.use(express.json());

const client = new OpenAI({
  apiKey: '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'
});

app.post('/discurso', async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        error: 'Debe enviar un texto'
      });
    }

    const response = await client.responses.create({
      model: 'gpt-5',
      input: `
Extrae las palabras clave más importantes del siguiente texto.
Responde únicamente con un arreglo JSON.

Texto:
${texto}
`
    });

    res.json({
      palabrasClave: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al procesar el texto'
    });
  }
});

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
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