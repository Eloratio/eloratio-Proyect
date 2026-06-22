# Proyecto Eloratio

## Descripción del sistema
**Eloratio** es una aplicación móvil diseñada para mejorar habilidades de oratoria de los usuarios. El objetivo es ayudar a las personas a desarrollar una comunicación clara, segura y efectiva a través de la práctica guiada y retroalimentación inmediata gracias a una inteligencia artificial.

La aplicación permite al usuario grabar audios basados en textos, los cuales pueden ser porporcionados por el mismo usuario o seleccionados de una biblioteca según lo que quiera mejorar el usuario; como la pronunciación de consonantes o el uso adecuado de las vocales, a partir de la grabación el sistema analiza diversos aspectos del discurso como pronunciación, fluidez, ritmo, entonación y claridad.

Se busca entregar una experiencia de aprendizaje interactiva, progresiva, accesible y entretenida, basada en dinámicas de gamificación, convirtiendose en una herramienta para el desarrollo de habilidades comunicativas.

## Historia de usuario implementada
| ID    | Nombre                    | Issue |
|-------|---------------------------|-------|
| US-02 | Retroalimentación de Oratoria para Presentaciones Académicas| #2    |

## Artefactos del proyecto
| Artefacto                          | Ubicación / enlace          |
|------------------------------------|-----------------------------|
| Modelo de dominio                  | [Modelo](./Diagramas/Modelo_de_dominio.png)           |
| Diagrama de casos de uso           | [Diagrama](./Diagramas/Diagrama_de_casos_de_uso.png)|
| Especificación de HU               | ./EspecificacionHU.md       |
| Diagrama de estados                |                             |
| Diagrama de despliegue y comp.     | [enlace o imagen]           |
| Diagrama de componentes            | [enlace o imagen]           |
| Diagrama de secuencia              | [enlace o imagen]           |
| Casos de prueba                    | ./CasosDePrueba.md          |
| Deuda técnica / code smells        | ./DeudaTecnica.md           |



## Decisiones principales

**Arquitectura cliente-servidor**
- Se optó por una arquitectura cliente-servidor, donde la aplicación móvil gestiona la interacción con el usuario y el backend centraliza la lógica del sistema. Esto permite manejar múltiples usuarios, almacenar datos de forma persistente y escalar la aplicación.

**Uso de inteligencia artificial en el backend**
- El análisis de audio y la generación de retroalimentación se realizan en el backend mediante servicios de inteligencia artificial. Esto permite ejecutar procesos complejos sin sobrecargar el dispositivo del usuario.

**Diseño modular del sistema**
- El sistema se organiza en módulos independientes, como gestión de usuarios, análisis de audio, generación de feedback y contenido educativo. Esto facilita el mantenimiento y la escalabilidad.

**Incorporación de gamificación**
- Se integran elementos de gamificación para mejorar la motivación y la constancia del usuario, haciendo el aprendizaje más dinámico.

**Personalización del aprendizaje**
- El sistema adapta ejercicios y retroalimentación según las necesidades del usuario, permitiendo un aprendizaje más efectivo.

## Historias de usuario
|ID    |Nombre                         |Issue|
|------|---------------------------------------|-----|
|US-01 |Selección de palabras                  | #1  |
|US-02 |Entrenamiento de Oratoria              | #2  |
|US-03 |Capacitación corporativa               | #3  |
|US-04 |Preparación profesional                | #4  |
|US-05 |Correción oral para estudiantes        | #5  |
|US-06 |Lista personalizada de palabras        | #6  |
|US-07 |Ordenamiento de ideas para comunicación| #7  |
|US-08 |Mejora de pronunciación                | #8  |
|US-09 |Como cerrar ideas                      | #9  |
|US-010|Buscar trabalenguas                    | #10 |

## Requisitos Extrafuncionales
Ver: [Requisitos Extrafuncionales.md](./ReqExtrafuncionales.md)

## Entidades de Dominio

**Diagrama**:

<img width="961" height="541" alt="Entidades de dominio" src="https://github.com/user-attachments/assets/6e7fe56f-a961-4c42-b88e-b913c0ab0c85" />


**Entidades**: 

**Usuario**: Guardar información sobre el avance de aprendizaje por usuario.

Atributos:
- id_usuario
- nombre_usuario
- contrasena
- tiempo_racha
- sesiones
- tipo_usuario

Métodos:
- ingresar()

**Aprendizaje**: Iniciar las lecciones.

Atributos:
- palabras_repetidas[]
- palabras_sugeridas[]
- velocidad_habla[]
- fonemas_dificiles[]
- voz_grabada

Métodos:
- buscar_repeticiones()
- buscar_sugerencias()
- determinar_velocidad()
- determinar_claridad()
- analizar_grabacion()

**Progreso**: Determinar el progreso del usuario.

Atributos:
- claridad_fonetica[]
- porcentaje_progreso
- feedback_ia
- coincidencia_silabas
- logros

Métodos:
- determinar_porcentaje()
- obtener_feedback_ia()
- comparar_silabas()
- desbloquear_logro()
- activar_racha()
- sumador_sesiones()

**Visor**: Mostrar información relevante a los aministradores.

Atributos:
- colaborador[]
- num_colaborador
- progreso_colaborador[]
- areas_criticas

Métodos:
- extraer_informacion()
- determinar_progreso()
- estado_colaborador()
- contador_colaborador()
- promedio_progreso()
- verificador_areas_criticas()



## Responsabilidades del equipo Entrega 1
|Nombre        |Rol         |Ítems de la rúbrica a cargo     |
|--------------|-------------|-------------------------------|
|Ignacio Geldes|Scrum Master | 1.2, 2.1                      |
|Raúl Arteaga  |Product Owner| 2.4                           |
|Matías Torres |Developer    | 1.1, 2.1                      |
|Tomas Cortes  |Developer    | 2.2, 2.3|

## Responsabilidades del equipo Entrega 2
|Nombre        |Rol         |Ítems de la rúbrica a cargo     |
|--------------|-------------|-------------------------------|
|Ignacio Geldes|Scrum Master | 1.1, 2.1, 3.1                 |
|Raúl Arteaga  |Product Owner| 1.1, 2.1, 3.1                 |
|Matías Torres |Developer    | 1.1, 2.1, 3.1, 4.1            |
|Tomas Cortes  |Developer    | 1.1, 2.1                      |

