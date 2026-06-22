# Eloratio - Especificación del Proyecto

**Eloratio** es una aplicación móvil gamificada diseñada para mejorar las habilidades de oratoria de los usuarios en español. Inspirada en las mecánicas de constancia y gamificación de Duolingo, la plataforma ayuda a los usuarios a desarrollar una comunicación clara, segura y efectiva mediante la práctica guiada de discursos, la repetición de palabras, trabalenguas y la obtención de retroalimentación inmediata generada por Inteligencia Artificial.

---

## 1. Arquitectura y Stack Tecnológico Real

El proyecto sigue un estilo arquitectónico **Cliente-Servidor** evolucionando hacia una **Arquitectura de Tres Capas (Presentación, Lógica de Negocio y Datos)** para dar soporte de manera escalable e independiente al motor de análisis de voz con Inteligencia Artificial.

### Stack Tecnológico
*   **Entorno de Ejecución:** Node.js (v18 o superior recomendado)
*   **Framework Web:** Express.js (v5.2.1 en dependencias del proyecto)
*   **Base de Datos Principal:** Supabase / PostgreSQL (utilizado en el directorio `backend/`)
*   **Base de Datos Alternativa / Piloto:** SQLite (`better-sqlite3` utilizado en el piloto `index.js` del directorio raíz)
*   **Documentación de API:** Swagger (`swagger-jsdoc` y `swagger-ui-express` instalados en la raíz)
*   **Gestión de Variables de Entorno:** `dotenv`

---

## 2. Estructura del Repositorio y Convenciones

### Estructura de Directorios Clave
```
C:\dev\eloratio-Proyect\
├── .gitignore
├── README.md               # Documentación general, historias de usuario y diseño conceptual
├── Arquitectura.md         # Decisiones de diseño arquitectónico y descomposición modular
├── ReqExtrafuncionales.md  # Catálogo de Requisitos Extrafuncionales (ISO 25010)
├── impact_analysis.md      # Análisis del impacto de introducir un motor de análisis de voz con IA
├── db.js                   # Configuración de SQLite (Base de datos del demo/piloto de Cursos)
├── index.js                # API Piloto de Cursos en SQLite con Swagger
├── package.json            # Configuración de dependencias generales (Express, SQLite, Swagger)
├── backend/                # Directorio del Backend Real de Eloratio
│   ├── app.js              # Inicialización de la aplicación Express de Eloratio
│   ├── .env.example        # Ejemplo de variables de entorno (Supabase URL, Anon Key, Port)
│   ├── controllers/        # Controladores de la lógica de negocio de sesiones de práctica
│   │   └── session.controller.js
│   ├── routes/             # Definición de rutas Express de Eloratio
│   │   └── session.routes.js
│   └── services/           # Servicios y utilidades (Módulos auxiliares e IA)
│       ├── feedback.service.js   # Motor de análisis de discurso, métricas y sugerencias
│       └── supabase.js           # Inicialización del cliente Supabase
└── openspec/               # Directorio de Especificaciones de OpenSpec
    ├── config.yaml         # Configuración del CLI de OpenSpec
    ├── project.md          # [Este archivo] Especificación central y contexto de desarrollo
    ├── specs/              # Especificaciones detalladas de capacidades del sistema
    └── changes/            # Registro y planificación de cambios (archivos de propuestas/tareas)
```

### Convenciones de Desarrollo
1.  **Módulos de Node.js:** Se utiliza el sistema de módulos CommonJS (`require` y `module.exports`) para asegurar la compatibilidad con el entorno actual del backend.
2.  **Patrón Controlador-Servicio:**
    *   **Rutas (`routes/`):** Definen las rutas URL del sistema y delegan la ejecución a los controladores.
    *   **Controladores (`controllers/`):** Manejan las peticiones HTTP (`req`, `res`), validan los campos requeridos del cuerpo y parámetros de la petición, interactúan con la base de datos (Supabase) y llaman a los servicios correspondientes.
    *   **Servicios (`services/`):** Implementan la lógica de negocio pura (por ejemplo, el cálculo de métricas de claridad, ritmo, fluidez, formalidad y generación de feedback).
3.  **Gestión de Datos:**
    *   Las transacciones y queries principales se realizan utilizando el cliente oficial de Supabase (`@supabase/supabase-js`).
    *   Se asume la existencia de tablas relacionales como `sesiones_practica`, `analisis_sesion`, `resumen_sesion` y funciones RPC de PostgreSQL como `incrementar_sesiones`.
4.  **Respuestas del Servidor:** Las respuestas HTTP son JSON estructurados, retornando códigos de estado semánticos apropiados:
    *   `200 OK` para consultas y ejecuciones exitosas.
    *   `201 Created` para la creación de nuevos recursos (e.g., creación de sesión de práctica).
    *   `400 Bad Request` para validaciones de datos fallidas.
    *   `404 Not Found` cuando el recurso solicitado (sesión, análisis) no existe.
    *   `409 Conflict` cuando se intenta realizar una operación inválida en el estado actual (e.g., volver a analizar una sesión completada).
    *   `500 Internal Server Error` para errores inesperados en el servidor o la base de datos.

---

## 3. Catálogo de Historias de Usuario (HUs)

### Historias de Usuario Originales (Definidas en `README.md`)
*   **US-01:** Selección de palabras (para ejercicios específicos de pronunciación)
*   **US-02:** Entrenamiento de Oratoria (práctica guiada de discursos con retroalimentación)
*   **US-03:** Capacitación corporativa (rutas de aprendizaje para equipos de trabajo)
*   **US-04:** Preparación profesional (entrenamiento enfocado en discursos formales y presentaciones)
*   **US-05:** Corrección oral para estudiantes (evaluación de entonación y claridad para discursos escolares/universitarios)
*   **US-06:** Lista personalizada de palabras (guardar fonemas o términos con dificultad para repetición posterior)
*   **US-07:** Ordenamiento de ideas para comunicación (ejercicios de estructuración lógica del discurso)
*   **US-08:** Mejora de pronunciación (enfocado en fonemas específicos y claridad articulatoria)
*   **US-09:** Cómo cerrar ideas (desarrollo de conclusiones efectivas)
*   **US-10:** Buscar trabalenguas (ejercicios lúdicos de velocidad de habla y dicción)

### Nuevas Historias de Usuario (Identificadas en `impact_analysis.md`)
*   **US-11:** Sistema fácil de mantener (Mantenibilidad independiente de módulos de IA sin comprometer la app)
*   **US-12:** Multievaluaciones de audios (Análisis simultáneo de múltiples archivos de audio para optimizar tiempo)
*   **US-13:** Disponibilidad del sistema (Operación básica garantizada si el servicio de análisis de IA falla temporalmente)
*   **US-14:** Lista de palabras para una entrevista (Generación de conceptos clave por área de experticia para entrevistas de trabajo)
*   **US-15:** Memoria personalizada (Adaptación del feedback recordando el tipo de voz, tono y acento típico del usuario)

---

## 4. Contexto de Trabajo Seleccionado: US-02 (Entrenamiento de Oratoria)

Para avanzar con el desarrollo estructurado bajo el flujo de OpenSpec, hemos seleccionado **US-02: Entrenamiento de Oratoria** como el contexto principal de trabajo por las siguientes razones:

1.  **Eje Central de Eloratio:** Representa el núcleo funcional de la aplicación: el usuario recibe un texto objetivo, graba su discurso y obtiene métricas sobre cómo lo hizo.
2.  **Base de Código Existente:** El backend de Eloratio ya cuenta con una implementación inicial sumamente robusta para esta funcionalidad dentro de `backend/controllers/session.controller.js` y `backend/services/feedback.service.js`.
3.  **Puntos de Integración Claros:** Permite interactuar con los tres endpoints clave:
    *   `POST /sessions` (crear sesión de práctica basada en un texto propuesto y tipo de presentación).
    *   `POST /sessions/:id/analyze` (procesar la transcripción del usuario y calcular las métricas clave de claridad, formalidad, fluidez y ritmo).
    *   `GET /sessions/:id/summary` (obtener el resumen final de la sesión, puntuación promedio, aspectos a mejorar y logros desbloqueados).
