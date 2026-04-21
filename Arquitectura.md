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

 

Fundamentación: [Criterio de descomposición: por dominio, capa, funcionalidad, etc.] 

 

### Módulo 1: [Nombre] 

- Responsabilidad: [qué hace este módulo] 

- Ofrece a otros módulos: [interfaces o datos que expone] 

- Depende de: [módulos de los que consume servicios] 

 

### Módulo 2: [Nombre] 

- Responsabilidad: [qué hace este módulo] 

- Ofrece a otros módulos: [interfaces o datos que expone] 

- Depende de: [módulos de los que consume servicios] 

 

### Módulo N: [Nombre] 

- Responsabilidad: ... 

- Ofrece a otros módulos: ... 

- Depende de: ... 

 

## 4. Decisiones de Diseño 

 

### Decisión 1 

- Decisión: [qué se decide] 

- Motivación: [por qué, referenciando REF si aplica] 

- Alternativas consideradas: [qué otras opciones se evaluaron] 

- Impacto: [en qué módulos o REF afecta] 

--- 

 
