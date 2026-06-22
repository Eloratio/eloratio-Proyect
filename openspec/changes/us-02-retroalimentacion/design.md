# Diseño Técnico: US-02 - Retroalimentación de Presentaciones Académicas

Este documento detalla la arquitectura, cambios de base de datos, lógica de negocio y endpoints necesarios para implementar los criterios de aceptación de la historia de usuario US-02.

---

## 1. Cambios en Base de Datos (Supabase / PostgreSQL)

Para dar soporte a la detección de muletillas y recomendaciones de pronunciación sin perder la estructura original, proponemos añadir dos columnas en la tabla `analisis_sesion`.

### Migración SQL Propuesta
```sql
-- Agregar columnas para registrar muletillas y recomendaciones de pronunciación
ALTER TABLE analisis_sesion 
ADD COLUMN IF NOT EXISTS muletillas JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS recomendaciones_pronunciacion JSONB DEFAULT '[]'::jsonb;
```

*   `muletillas`: Guardará un mapa con las muletillas detectadas y su cantidad (ej. `{"eh": 4, "o sea": 2}`).
*   `recomendaciones_pronunciacion`: Guardará un arreglo de recomendaciones específicas para mejorar la dicción o el ritmo (ej. `["Intenta pronunciar con mayor claridad la consonante 's' al final de las palabras", "Realiza pausas en lugar de rellenar con la muletilla 'eh'"]`).

---

## 2. Cambios en la Lógica de Negocio (`backend/services/feedback.service.js`)

Se expandirá la lógica del método `analizarDiscurso(textoOriginal, textoUsuario, tipoPresentacion)`.

### A. Nuevos Tipos de Presentación y Validación de Estructura (CA1)
Se incorporan los tipos: `expositiva`, `defensa_tesis` y `seminario`.
Se aplican las siguientes reglas de estructura académica:
*   **`expositiva`**:
    *   *Apertura:* Debe contener palabras como "exponer", "presentar", "introducción", "tema a tratar".
    *   *Cierre:* Debe contener palabras como "para finalizar", "en conclusión", "gracias por su atención".
*   **`defensa_tesis`**:
    *   *Apertura:* Debe contener palabras como "comisión", "miembros del jurado", "profesores", "defensa de mi tesis".
    *   *Desarrollo:* Debe mencionar "metodología", "resultados", "hipótesis", "investigación".
    *   *Cierre:* Debe mencionar "conclusiones", "sugerencias", "quedo a su disposición".
*   **`seminario`**:
    *   *Apertura:* Debe mencionar "seminario", "presentación", "tópico".
    *   *Cierre:* Debe mencionar "preguntas", "comentarios", "discusión".

### B. Algoritmo de Detección de Muletillas (CA3)
Se define una lista de muletillas en español: `['eh', 'em', 'este', 'bueno', 'o sea', 'entonces', 'tipo', 'verdad', 'no', 'ya']`.
*   Se utilizarán expresiones regulares insensibles a mayúsculas con límites de palabra (`\bmuletilla\b`) para evitar coincidencias parciales (ej. evitar que "bueno" coincida en "buenamente").
*   Se calculará el total de muletillas. Si el total representa más del 3% del discurso, se penalizará el puntaje de *fluidez* y *claridad*.

### C. Recomendaciones de Pronunciación (CA3)
*   Si se detecta un exceso de la muletilla `eh` o `em`: *"Recomendación de pausa silenciosa: cuando sientas la necesidad de vocalizar 'eh', inhala aire y haz una pausa de 1 segundo."*
*   Si se detecta la muletilla `entonces` o `o sea` recurrentemente: *"Recomendación de conectores: utiliza conectores lógicos variados como 'por lo tanto', 'en consecuencia' o 'asimismo'."*
*   Si el ritmo es demasiado rápido (más de 160 palabras por minuto): *"Recomendación de dicción: disminuye la velocidad de habla para permitir una articulación fonética más limpia."*

---

## 3. Cambios en Controladores y Rutas

### A. Rutas (`backend/routes/session.routes.js`)
Se añadirá una nueva ruta para la descarga del reporte PDF:
```javascript
router.get('/:id/reporte', descargarReportePdf);
```

### B. Controlador de Sesiones (`backend/controllers/session.controller.js`)
1.  **`crearSesion`**: Actualizar la lista de `tiposValidos` para incluir `['expositiva', 'defensa_tesis', 'seminario']`.
2.  **`analizarSesion`**: Guardar las muletillas y recomendaciones resultantes del análisis en la tabla `analisis_sesion`.
3.  **`descargarReportePdf` (Nuevo método)**:
    *   Recupera los datos de la sesión, las métricas de análisis y el resumen final.
    *   Genera un documento PDF estructurado en tiempo real utilizando la biblioteca `pdfkit`.
    *   Establece las cabeceras `Content-Type: application/pdf` y `Content-Disposition: attachment; filename=reporte-eloratio-[id].pdf` para descarga directa en el navegador.

---

## 4. Generación de PDF (`backend/services/pdf.service.js`)

Se creará un nuevo servicio dedicado a la maquetación del PDF usando `pdfkit`.

### Estructura del PDF:
*   **Encabezado**: Título "Reporte de Evaluación - Eloratio", Fecha de realización, Tipo de presentación.
*   **Sección de Puntajes (Métricas)**: Gráfico simple o barras de texto mostrando Claridad, Formalidad, Fluidez y Ritmo (0-100%).
*   **Errores Estructurales**: Listado detallado de elementos faltantes según el tipo de presentación.
*   **Muletillas Detectadas**: Detalle cuantitativo de muletillas empleadas.
*   **Recomendaciones de Pronunciación**: Guías prácticas para el usuario.
*   **Pie de página**: Marca de agua "Eloratio - Tu entrenador de oratoria personal".
