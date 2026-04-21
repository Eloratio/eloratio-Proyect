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
| REF-01 | Debe estar dispobible el 99% del tiempo                | Alta               | Alta            | Sin cambio                | 
| REF-02 | El sistema debe ser simple de usar                  | Alta             | Alta            | Sin cambio | 
| REF-03 | Debe funcionar con conexión a internet constante| Alta                | Alta            | Sin cambio          | 
| REF-04 | Debe ser portable(solo en dispositivos móviles)                |      Alta          | Alta           | Sin cambio                | 
| REF-05 | El sistema debe soportar más de mil usuarios simultaneos                 | Alta              | Alta            | Sin cambio  | 
| REF-06 | El sistema debe integrarse con una API de Speech to text| Alta                  | Baja            | El speech to text pasa a ser de la API a directamente la IA   |
| REF-07 | Debe funcionar en Android/IOS               | Media               | Media            | Sin cambio                | 
| REF-08 | El equipo debe ser de 3-5 personas                 | Media              | Media            | El cambio lo hace crítico | 
| REF-09 | Solo datos de inicio de sesión| Baja                  | Alta            | La seguridad puede verse afectada ya que los audios son pasados a un tercero           |
| REF-10 | El sistema no tendrá cambios significativos en el futuro | Baja                  | Media            | La inteligencia artificial tiene actualizaciones constantes, esto puede conllevar a problemas dentro de la estructura   |


## 4. Impacto en entidades del dominio 

Entidades se Dominio
Nuevas entidades: 

1) IA: Se ocupa de los reconocimientos y verificación de lenguaje de forma apartada

Atributos: 
-idioma_objetivo
-palabras_analizadas
-probunciacion_fonemas
Métodos:
-sumar_errores()
-porcentaje_exactitud()
-comparar_fonemas()
-fonemas_dificiles()

La entidad de aprendizaje y progreso pierden algunos atributos y métodos, algunas relaciones también.

Final:

Usuario: Guardar información sobre el avance de aprendizaje por usuario.

Atributos:

    id_usuario
    nombre_usuario
    contrasena
    tiempo_racha
    sesiones
    tipo_usuario

Métodos:

    ingresar()

IA: Se ocupa de los reconocimientos y verificación de lenguaje de forma apartada

Atributos: 
-idioma_objetivo
-palabras_analizadas
-pronunciacion_fonemas
-palabras_sugerencias
-voz_grabada
Métodos:
-sumar_errores()
-porcentaje_exactitud()
-comparar_fonemas()
-fonemas_dificiles()
-buscar_recomendaciones()
-analizar_voz()

Aprendizaje: Iniciar las lecciones.

Atributos:
    -cantidad_errores
    -texto
    -tiempo_habla
    -palabras_mejorar
Métodos:

    determinar_velocidad_habla()
    mostrar_sugerencias()
    
   

Progreso: Determinar el progreso del usuario.

Atributos:

    claridad_fonetica[]
    porcentaje_progreso
    feedback
    coincidencia_silabas
    logros

Métodos:

    determinar_porcentaje()
    obtener_feedback_ia()
    comparar_silabas()
    desbloquear_logro()
    activar_racha()
    sumador_sesiones()

Visor: Mostrar información relevante a los aministradores.

Atributos:

    colaborador[]
    num_colaborador
    progreso_colaborador[]
    areas_criticas

Métodos:

    extraer_informacion()
    determinar_progreso()
    estado_colaborador()
    contador_colaborador()
    promedio_progreso()
    verificador_areas_criticas()

<img width="911" height="351" alt="image" src="https://github.com/user-attachments/assets/d94cfc3a-af4e-4548-b498-0c9bc2830104" />




## 5. Impacto en mockups 

El mockup mas afecctado seria el que esta hecho en figma debido a que el sevicio presentado en figma es muy limitado a 
comparacion con el hecho en canvas, el modelo en figma trendria cambios radicales agregando mas servicios a comparacion a su 
primera.

Los cambios cambios necesarios serian agregar mas sevicios debido a que la version de figma esta limitada, se agregarian las 
opciones de Análisis de discurso, Entrevista Laboral, Mis fonemas críticos, Resumen semanal, Mi vocabulario profesional, 
Organizar mis ideas, Cerrar una idea, Trabalenguas.

## 6. Impacto en arquitectura 

### 6.1 ¿Cambia el estilo arquitectónico? 

**Si**, el sistema originalmente estaba basado en cliente-servidor, a partir del cambio solicitado, se evoluciona a modelo de
tres capas, separando explixitamente la presentación, lógica de negocio y datos. La decisión está justificada debido al aumento
de complejidad en el sistema, sobre todo por el nuevo motor de análisis de voz con IA, la arquitectura de tres capas permite la
separación de responsabilidades.
Al aplicar un cambio, los módulos generan una tensión arquitectónica, ya que su independencia con el resto del sistema es un
componente altamente desacoplado dentro de las demás capas

 

### 6.2 Relación REF (repriorizado) con decisiones de arquitectura 

 

| REF ID | Prioridad nueva | Decisión de arquitectura que lo aborda         | 
|--------|-----------------|------------------------------------------------| 
| REF-06 | Baja            | se reemplaza la dependencia de APIS por un módulo propio dentro de la estructura  | 
| REF-09 | Alta            | Se refuerzan mecanismos de seguridad para evitar fugas de datos         | 
| REF-10 | Media           | La nueva estructura permite una mejor adaptación a cambios frecuentes, sobre todo con la IA        |
 

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
