## 1. Estilo Arquitectónico 


**Estilo adoptado:** Cliente-Servidor 


Justificación basada en REF priorizados: El modelo seleccionado nos permitirá otorgar una retroalimentación por IA, la cuál deberá estar en un servidor aparte. Además se usará una API de Speech to Text para poder traspasar cualquier palabra pronunciada a texto. El cliente deberá solicitar el tipo de practica decidirá realizar y el servidor las mostrará. Una vez realizada la practica, el servidor enviará una evaluación mediante IA para poder determinar las capacidades de habla del usuario y sugerencias.


**Trade-off:** La arquitectura cliente-servidor permite centralizar el procesamiento y facilitar la integración con inteligencia artificial, pero implica dependencia de conexión a internet, posible latencia en la respuesta debido al procesamiento remoto y dependencia de servicios externos, además de convertir al servidor en un punto crítico que debe garantizar disponibilidad y seguridad.
 

| REF ID | Descripción                              | Prioridad | Cómo lo aborda el estilo      | 
|--------|------------------------------------------|-----------|-------------------------------| 
| REF-01 | Rendimiento y eficacia                   | Alta      | Se deben tener tiempos de respuesta óptimos para que el sistema funcione bien.| 
| REF-02 | Seguridad                                | Alta      | La centralización en el servidor permite controlar el acceso, gestionar autenticación y proteger los datos de los usuarios y sus grabaciones.| 
| REF-03 | Disponibilidad                           | Alta      | El sistema deberá estar disponible en todo momento.| 
| REF-04 | Mantenibilidad                           | Media     | La lógica del sistema se encuentra centralizada en el backend, lo que facilita la actualización, corrección de errores y evolución del sistema sin afectar al cliente.| 
| REF-05 | Portabilidad                             | Alta      | El sistema debe ser portable, pues será desarrollado para dispositivos móviles.| 
| REF-06 | Usabilidad                               | Alta      | El sistema debe ser simple para que el usuario pueda usarlo sin ninguna experiencia previa.| 
| REF-07 | Escalabilidad                            | Media     | El modelo permite escalar el servidor para soportar múltiples usuarios simultáneamente, especialmente en el procesamiento de audio y solicitudes de IA.| 
| REF-08 | Interoperabilidad                        | Alta      | Se debe implementar una API de conversión de voz a texto más un modelo de IA.| 
| REF-09 | Recuperabilidad                          | Media     | Si hay fallos en el sistema, no ocurrirán perdidas graves de datos, sin embargo, lo ideal sería arreglar el sistema lo antes posible para no prolongar la interrupción.| 
| REF-10 | Testabilidad                             | Media     | La separación entre cliente y servidor permite probar de forma independiente cada componente del sistema, facilitando la detección de errores.| 

 
**Explicación textual:** El estilo cliente-servidor es adecuado para el sistema, ya que permite separar la interacción del usuario del procesamiento intensivo de audio e inteligencia artificial, mejorando el rendimiento al delegar estas tareas al servidor (REF-01). Además, facilita la disponibilidad del sistema al estar centralizado (REF-03), mejora la portabilidad al no depender del hardware del dispositivo (REF-05) y optimiza la usabilidad al mantener una aplicación liviana (REF-06). Finalmente, permite una fácil integración con servicios externos de IA (REF-08), lo cual es fundamental para el funcionamiento de la aplicación.


## 2. Diagrama de Arquitectura 

![Diagrama de Arquitectura](./Mockups/Diagrama_de_arq.png) 

 

## 3. Descomposición Modular 

 

**Fundamentación:** Se utiliza una descomposición por capas y funcionalidad, separando la interacción del usuario, la lógica del sistema y el procesamiento de datos. Esto permite mejorar la mantenibilidad, escalabilidad y organización del sistema.

 

### Módulo 1: Cliente móvil

Responsabilidad: Gestionar la interacción con el usuario, incluyendo grabación de audio, visualización de resultados y navegación en la aplicación.

Ofrece a otros módulos: Envío de audios, solicitudes de análisis y recepción de retroalimentación.

Depende de: Backend del sistema.
 

### Módulo 2: Backend

Responsabilidad: Gestionar las solicitudes del cliente, procesar datos, coordinar el análisis de audio y generar respuestas.

Ofrece a otros módulos: Servicios de análisis, gestión de usuarios y entrega de feedback.

Depende de: Módulo de IA y base de datos.

 

### Módulo 3: Módulo de inteligencia artificial

Responsabilidad: Analizar los audios del usuario, evaluando pronunciación, fluidez y otros aspectos del discurso, y generar retroalimentación.

Ofrece a otros módulos: Resultados del análisis y sugerencias de mejora.

Depende de: Servicios externos de IA o modelos integrados.

 

### Módulo 4: Base de datos

Responsabilidad: Almacenar información de usuarios, historial de prácticas y resultados de evaluaciones.

Ofrece a otros módulos: Acceso a datos persistentes.

Depende de: Backend.



### Módulo 5: Contenido y práctica

Responsabilidad: Gestionar textos, ejercicios, trabalenguas y material de apoyo para la práctica del usuario.

Ofrece a otros módulos: Contenido estructurado para ejercicios.

Depende de: Backend.
 

## 4. Decisiones de Diseño 

 

### Decisión 1

Decisión: Utilizar procesamiento de audio en el servidor en lugar de realizarlo en el dispositivo móvil.

Motivación: Permite mejorar el rendimiento (REF-01) y facilita el uso de modelos de inteligencia artificial más complejos sin limitarse por el hardware del usuario.

Alternativas consideradas:

- Procesamiento local en el dispositivo
- Procesamiento híbrido

Impacto: Aumenta la dependencia de conexión a internet, pero mejora la calidad del análisis y la escalabilidad del sistema.

### Decisión 2

Decisión: Separar el sistema en módulos independientes (cliente, backend, IA, base de datos).

Motivación: Mejora la mantenibilidad (REF-04) y facilita la escalabilidad (REF-07).

Alternativas consideradas:

- Arquitectura monolítica
- Sistema con menor separación de responsabilidades

Impacto: Aumenta la organización del sistema y facilita futuras mejoras, aunque requiere mayor coordinación entre módulos.
 
