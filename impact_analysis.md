## 1. Cambio solicitado 

Cambio funcional
Se requiere incorporar un motor de analizis de voz con IA que procese audio en tiempo real, con una carga computacional muy superior al resto de la aplicacion y requisitos de actualizacion independientes.

Cambio no funcional
El modelo de analisis fonetico debe poder desplegarse y actualizarse de forma independiente sin afectar la disponibilidad del resto de la aplicacio, y debe escalar horizontalmente segun demanda.

## 2. Nuevas historias de usuario 

### US-11: Sistema facil de mantener.

Como desarrollador quiero actualizar módulos sin comprometer el funcionamiento de la app, para que los usuario puedan seguir aprendiendo durante estas.

Criterios de aceptación: 

- CA1: -no interferir con el aprendizaje de los usuarios.

- CA2: -arreglar errores pequeños rápidamente.

- CA3: -mantener el sistema actualizado.

### Us-12: Multievaluaciones de audios

Como estudiante, quiero que la aplicación haga un análisis de varios audios de forma simultánea para ahorrar tiempo, además, que sea posible subir cuantos audios sea posible para así, no tener que entrar a la aplicación todo el tiempo.

- CA1: -El sistema debe poder recibir varios archivos de audios.

- CA2: -El sistema debe analizar varios audios de forma simultánea.

- CA3: -Retroalimentación inmediata.

### US-13: Disponibilidad del sistema.

Como usuario, quiero que la aplicación siga siendo útil incluso si la inteligencia artificial falla para poder seguir guardando audios o apoyándome con material extra que me pueda proporcionar la aplicación.

-CA1: -Si la inteligencia artificial no responde, que se informe el error sin colapsar.

-CA2: -Perfil, progreso, racha, seguirán operativas.

### US-14: Lista de palabras para una entrevista.

Como postulante en una entrevista, quiero que la aplicación genere un listado de palabras y conceptos a tener en cuenta a la hora de dar atender a una entrevista.

-CA1: -La IA debe generar un listado de palabras a usar segú el área de experticie.

-CA2: -La aplicación debe dar retroalimentación si uso dichas palabras de forma adecuada.

### US-15: Memoria personalizada.

Como usuario, quiero que mi tipo de voz, mi tono y mi acento sea recordado para poder tener una retroalimentación mucho más efectiva.

-CA1: -El sistema entrega feedback personalizado.

-CA2: - El sistema recordará la personalidad y la forma de hablar del usuario.
## 3. Impacto en requisitos extrafuncionales 


Indicar si el cambio altera la prioridad de algún REF o introduce nuevos. 

Trazar cambios de prioridad que motiven cambios en decisiones de arquitectura. 

 

| REF ID | Descripción                    | Prioridad anterior | Prioridad nueva | Cambio / Motivo           | 

|--------|--------------------------------|--------------------|-----------------|---------------------------| 

| REF-01 | [descripción]                  | Alta               | Alta            | Sin cambio                | 

| REF-03 | [descripción]                  | Media              | Alta            | El cambio lo hace crítico | 

| REF-07 | [nuevo REF derivado del cambio]| —                  | Alta            | Nuevo requisito           | 

 

## 4. Impacto en entidades del dominio 

[Nuevas entidades, atributos o relaciones afectadas] + Diagrama actualizado 

 

## 5. Impacto en mockups 

[Mockups afectados y descripción de cambios necesarios] 

 

## 6. Impacto en arquitectura 

 

### 6.1 ¿Cambia el estilo arquitectónico? 

[Sí/No] — Justificación: 

[Si la repriorización de REF obliga a cambiar el estilo, explicar por qué. 

Si el estilo se mantiene, justificar que sigue siendo válido frente al cambio.] 

 

### 6.2 Relación REF (repriorizado) con decisiones de arquitectura 

 

| REF ID | Prioridad nueva | Decisión de arquitectura que lo aborda         | 

|--------|-----------------|------------------------------------------------| 

| REF-03 | Alta            | [cambio o confirmación de decisión existente]  | 

| REF-07 | Alta            | [nueva decisión derivada del cambio]           | 

 

## 7. Impacto en módulos 

 

| Módulo             | Tipo de impacto    | Responsabilidad actualizada        | Ofrece a otros (actualizado)   | 

|--------------------|--------------------|------------------------------------|--------------------------------| 

| [Módulo existente] | modificado         | [descripción actualizada]          | [interfaces actualizadas]      | 

| [Módulo nuevo]     | nuevo              | [responsabilidad]                  | [qué expone]                   | 

| [Módulo eliminado] | eliminado          | —                                  | —                              | 

 

Fundamentación de cambios modulares: 

[Justificar por qué se agregan, modifican o eliminan módulos en función del 

cambio de requerimientos y/o la repriorización de REF.] 

 

## 8. Nuevas decisiones de diseño 

 

### Decisión 1 

- Decisión: [qué se decide] 

- Motivación: [por qué, referenciando REF repriorizado si aplica] 

- Alternativas consideradas: [opciones evaluadas] 

- Impacto: [en qué módulos o REF afecta] 

 

## 9. Trazabilidad actualizada 

 

| Historia | REF relacionado | Módulo     | Mockup  | 

|----------|-----------------|------------|---------| 

| US-XX    | REF-XX          | [módulo]   | [ref]   | 

 

## 10. Justificación global y trade-offs 

[Por qué la solución propuesta es coherente con el sistema. 

Qué trade-offs se asumieron, especialmente ante cambios de prioridad en REF. 

Qué se gana y qué se sacrifica con las decisiones tomadas.] 
