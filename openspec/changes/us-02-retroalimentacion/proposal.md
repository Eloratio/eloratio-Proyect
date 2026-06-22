# Propuesta: US-02 - Retroalimentación de Presentaciones Académicas

Esta propuesta describe los objetivos, el alcance, las historias de usuario y los criterios de aceptación para la implementación de la retroalimentación estructurada de presentaciones académicas para estudiantes universitarios.

---

## 1. Contexto y Justificación
Para un estudiante universitario, las presentaciones académicas representan hitos importantes en su carrera formativa (exposiciones, seminarios y defensas de tesis). Eloratio busca ofrecer retroalimentación de valor analizando la transcripción de su discurso. Esta propuesta detalla cómo expandir el motor de análisis actual para contemplar tres nuevos contextos académicos, detectar muletillas con sus sugerencias de pronunciación correspondientes, y generar un resumen descargable.

---

## 2. Objetivos
*   **Análisis estructural según el contexto académico:** Validar que el discurso contenga las secciones clave para exposiciones, seminarios y defensas de tesis.
*   **Detección de muletillas (Filler Words):** Identificar palabras repetitivas o vacías (ej: *"eh"*, *"este"*, *"o sea"*, *"bueno"*) y sugerir alternativas o ejercicios de pronunciación/pausa.
*   **Exportación del resumen:** Generar un reporte final estructurado y descargable en PDF para el estudiante.

### Fuera de Alcance (Non-Goals)
*   Integrar APIs externas de conversión de voz a texto (STT) en esta fase (se trabaja con la transcripción provista en formato texto).
*   Implementar autenticación de usuarios (se asume que la sesión ya está iniciada y el `usuario_id` está disponible).

---

## 3. Criterios de Aceptación
*   **CA1: Estructura del Discurso Académico:** Al iniciar una sesión de práctica, el usuario podrá seleccionar el tipo de presentación (`expositiva`, `defensa_tesis`, `seminario`). El sistema identificará errores estructurales propios de este contexto.
*   **CA2: Sugerencias de Claridad y Formalidad:** Al concluir el análisis, el sistema presentará recomendaciones directas para mejorar la claridad (vocabulario) y formalidad según el tipo de presentación.
*   **CA3: Detección de Muletillas y Pronunciación:** El resultado del análisis incluirá la lista y recuento de muletillas detectadas, así como recomendaciones de pronunciación y manejo de pausas asociadas.
*   **CA4: Reporte PDF Descargable:** Se proveerá un endpoint y una opción en interfaz para descargar la evaluación en formato PDF con la puntuación, métricas y recomendaciones.

---

## 4. Criterios de Finalización (Definition of Done)
1.  **Precisión en clasificación de tipo de presentación:** El sistema clasifica correctamente el tipo de presentación en al menos el **85%** de los casos de prueba.
2.  **Tasa de acierto de muletillas:** El sistema identifica correctamente al menos el **80%** de las muletillas definidas.
3.  **Conjunto de pruebas de audio/transcripción:** La detección de muletillas debe probarse usando al menos **5 transcripciones de grabaciones de prueba distintas**.
4.  **Generación de Reporte:** El resumen descargable se genera exitosamente en formato PDF o texto estructurado.
5.  **Revisión de Código:** Flujo completo revisado y aprobado por al menos un integrante del equipo (code review).
6.  **Verificación Manual:** Criterios de aceptación verificados manualmente en un entorno local antes de cerrar el Issue.

---

## 5. Riesgos y Mitigaciones
*   **Riesgo 1: Falsos positivos en muletillas.** Palabras que forman parte legítima de una frase podrían contarse erróneamente como muletillas.
    *   *Mitigación:* Se utilizará un diccionario acotado de muletillas comunes en español chileno/latinoamericano (ej. *"eh"*, *"este"*, *"o sea"*, *"bueno"*, *"entonces"*, *"y nada"*, *"tipo"*) con coincidencia basada en límites de palabra completos (`\b`).
*   **Riesgo 2: Dependencias nativas complejas para PDF en Docker.** Bibliotecas complejas pueden requerir dependencias de fuentes a nivel de sistema operativo.
    *   *Mitigación:* Utilizar `pdfkit` o `pdf-creator-node` que son ligeros, o alternativamente generar un archivo HTML/texto dinámico estructurado que sea fácilmente exportable para asegurar la estabilidad del contenedor.
