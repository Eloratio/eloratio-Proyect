# Deuda Técnica, Code Smells y Mejoras de Diseño

## 1. Code Smells / Deuda Técnica Identificada

| ID | Ubicación (archivo/módulo) | Descripción del problema | Propuesta de mejora |
|-------|----------------------------|--------------------------|---------------------|
| DT-01 | `backend/services/feedback.service.js` | La función `analizarDiscurso` hace demasiadas cosas a la vez: calcula métricas, detecta muletillas, genera recomendaciones y construye el objeto de respuesta. Esto viola el principio de responsabilidad única (SRP). | Extraer la detección de muletillas a `muletillas.service.js` y las recomendaciones a `recomendaciones.service.js`, dejando `feedback.service.js` como orquestador. |
| DT-02 | `backend/services/feedback.service.js` | La lista de muletillas y los marcadores de informalidad están definidos como literales dentro de la función, lo que dificulta su mantenimiento y extensión sin modificar la lógica. | Moverlas a un archivo de configuración o constantes dedicado (ej. `backend/config/vocabulario.js`), separando datos de lógica. |
| DT-03 | `backend/controllers/session.controller.js` | El array `tiposValidos` de tipos de presentación está duplicado lógicamente: existe la validación en el controlador y la lógica de estructura en el servicio. Si se agrega un nuevo tipo, hay que recordar actualizarlo en dos lugares. | Centralizar los tipos válidos en una constante compartida (ej. `backend/config/tipos.js`) importada tanto por el controlador como por el servicio. |
| DT-04 | `backend/services/pdf.service.js` | Los valores de colores del tema PDF (ej. `COLOR_PRIMARIO = '#1E3A8A'`) están definidos como variables locales dentro de la función `crearReportePdf`, mezclando configuración visual con lógica de generación. | Extraer los colores y constantes de diseño a un objeto de configuración o tema al inicio del archivo o en un módulo separado. |
| DT-05 | `.env` | El archivo `.env` con credenciales reales (usuario, contraseña de base de datos) está presente en el repositorio. Aunque son valores de desarrollo local, es una mala práctica de seguridad. | Agregar `.env` al `.gitignore` (ya existe en `.dockerignore`). Dejar solo `.env.example` en el repositorio. Documentar en el README cómo crear el `.env` local a partir del ejemplo. |
| DT-06 | `backend/services/feedback.service.js` | El cálculo del puntaje de ritmo mezcla dos conceptos distintos: varianza de longitud de oraciones y velocidad de habla (PPM). El resultado puede ser contraintuitivo ya que la varianza se suma directamente al puntaje base. | Definir rangos explícitos para el ritmo (ej. bajo/medio/alto) separando ambos criterios, con pesos ponderados y documentados en el código. |

## 2. Mejoras de Diseño Futuras

- **Autenticación de usuarios:** Actualmente el sistema asume que `usuario_id` es provisto directamente en el cuerpo de la petición sin ninguna verificación de identidad. En una versión productiva debería implementarse autenticación (ej. JWT o sesiones con Supabase Auth) para que el `usuario_id` sea extraído del token verificado, no del body.

- **Integración con Speech-to-Text (STT):** El motor de análisis actualmente opera sobre transcripciones de texto provistas manualmente. La mejora natural es integrar una API de conversión de voz a texto (ej. OpenAI Whisper, Google Speech-to-Text) que procese directamente el audio grabado por el usuario, eliminando la necesidad de transcripción manual.

- **Cobertura de pruebas automatizadas con framework formal:** El archivo `tests/us-02.test.js` usa `assert` nativo de Node.js con una estructura manual. Migrar a un framework de testing como Jest o Mocha permitiría mayor expresividad, cobertura automática de código, mocking de módulos externos (Supabase) y reportes estandarizados.

- **Separación del frontend:** La arquitectura actual solo contempla el backend (API REST). El frontend móvil está fuera del alcance del repositorio actual. A futuro debería integrarse una capa de presentación (ej. React Native o Flutter) conectada a esta API, con el flujo completo documentado en el diagrama de despliegue.
