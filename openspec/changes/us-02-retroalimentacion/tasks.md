# Tareas de Implementación: US-02 - Retroalimentación de Presentaciones Académicas

Este documento contiene el plan de tareas detallado para la implementación de la historia de usuario US-02, alineado con la definición de terminado (DoD).

---

## 📅 Plan de Tareas

### Fase 1: Configuración Inicial e Infraestructura
*   [x] **Tarea 1.1:** Instalar la biblioteca `pdfkit` en el proyecto.
    *   *Duración estimada:* 15 min
*   [x] **Tarea 1.2:** Crear y ejecutar el script de migración SQL para agregar las columnas `muletillas` y `recomendaciones_pronunciacion` a la tabla `analisis_sesion` en Supabase.
    *   *Duración estimada:* 30 min

### Fase 2: Lógica de Negocio y Algoritmos (`backend/services/`)
*   [x] **Tarea 2.1:** Expandir `feedback.service.js` para admitir validación estructural de tipos académicos (`expositiva`, `defensa_tesis`, `seminario`).
    *   *Duración estimada:* 1 hora
*   [x] **Tarea 2.2:** Desarrollar el algoritmo de detección de muletillas basado en expresiones regulares e integrarlo al cálculo de las métricas.
    *   *Duración estimada:* 1 hora
*   [x] **Tarea 2.3:** Implementar el generador de consejos y recomendaciones de pronunciación/pausas basado en las muletillas detectadas.
    *   *Duración estimada:* 45 min
*   [x] **Tarea 2.4:** Crear `pdf.service.js` e implementar la función para estructurar y diseñar el reporte en PDF usando `pdfkit`.
    *   *Duración estimada:* 2 horas

### Fase 3: Rutas y Controladores Express (`backend/controllers/` y `backend/routes/`)
*   [x] **Tarea 3.1:** Actualizar validaciones de `crearSesion` en `session.controller.js` para incluir los nuevos tipos de presentación académica.
    *   *Duración estimada:* 15 min
*   [x] **Tarea 3.2:** Actualizar `analizarSesion` para capturar y guardar los nuevos campos `muletillas` y `recomendaciones_pronunciacion`.
    *   *Duración estimada:* 30 min
*   [x] **Tarea 3.3:** Crear el método `descargarReportePdf` en `session.controller.js` y enlazarlo a la nueva ruta `GET /sessions/:id/reporte` en `session.routes.js`.
    *   *Duración estimada:* 45 min

### Fase 4: Pruebas y Validación (Definition of Done)
*   [x] **Tarea 4.1:** Crear un script de pruebas automatizado `tests/us-02.test.js` que:
    *   Pruebe la clasificación estructural en los 3 contextos académicos garantizando un acierto de al menos el 85%.
    *   Pruebe el conteo exacto de muletillas utilizando 5 textos/grabaciones de muestra distintos, garantizando una tasa de acierto de al menos el 80%.
    *   Compruebe que el PDF generado no esté corrupto y se pueda escribir en disco.
    *   *Duración estimada:* 1.5 horas
*   [x] **Tarea 4.2:** Ejecutar pruebas manuales locales de los endpoints usando Postman o Thunder Client y adjuntar evidencias en el log.
    *   *Duración estimada:* 45 min
*   [x] **Tarea 4.3:** Realizar la revisión de código (Code Review) con un integrante del equipo y completar la verificación final del issue.
    *   *Duración estimada:* 30 min
