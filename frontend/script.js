const urlApi = "http://localhost:3000";
const boton = document.getElementById("analizarDiscurso");

//funciones
//agendar sesion

async function agendarAnalisis(idUsuario, tipoDiscurso, discursoString){
    try {
    
            const response = await axios.post(
                `${urlApi}/sessions`,
                {
                    usuario_id: idUsuario,
                    tipo_presentacion: tipoDiscurso,
                    texto_propuesto: discursoString
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            return response.data;
    
        }   catch(error){
    
            console.error(
                "Error de procesamiento sin especificar", 
                error.response?.data || error.message
            );
    
            throw error;
    }
}

//analizar sesion
    
async function iniciarAnalisis(idSesion, discursoString){
    try {
    
            const response = await axios.post(
                `${urlApi}/sessions/${idSesion}/analyze`,
                {
                    texto_usuario: discursoString
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            return response.data;
    
        }   catch(error){
    
            console.error(
                "Error de procesamiento sin especificar", 
                error.response?.data || error.message
            );
    
            throw error;
    }
}

//cerrar analisis

async function terminarAnalisis(idSesion){
    try {
    
            const response = await axios.get(
                `${urlApi}/sessions/${idSesion}/summary`,
                {
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
    
            return response.data;
    
        }   catch(error){
    
            console.error(
                "Error de procesamiento sin especificar", 
                error.response?.data || error.message
            );
    
            throw error;
    }
}

boton.addEventListener("click", async function(){

    //debe suceder despues de apretar el boton 
    const idUsuario = document.getElementById("idUsuario").value;
    const tipoDiscurso = document.getElementById("tipoDiscurso").value;
    const discursoString = document.getElementById("discursoIngresado").value;

    const respuestaAgenda = await agendarAnalisis(idUsuario, tipoDiscurso, discursoString);
    const idSesion = respuestaAgenda.sesion.id;
    
    const respuestaAnalisis = await iniciarAnalisis(idSesion, discursoString);

    //marcar la sesion como terminada en la bd
    const cerrarAnalisis = await terminarAnalisis(idSesion);

    document.getElementById("discursoResultado").value=`
Retroalimentación:
${respuestaAnalisis.feedback}


Métricas:
- Claridad: ${respuestaAnalisis.metricas.claridad}
- Formalidad: ${respuestaAnalisis.metricas.formalidad}
- Fluidez: ${respuestaAnalisis.metricas.fluidez}
- Ritmo: ${respuestaAnalisis.metricas.ritmo}


Errores de estructura:
${respuestaAnalisis.errores_estructura.map(error =>
    `- ${error.tipo}: ${error.descripcion}`
).join("\n")}


Muletillas detectadas:
${Object.entries(respuestaAnalisis.muletillas)
    .map(([palabra, cantidad]) => `- ${palabra}: ${cantidad}`)
    .join("\n")}


Recomendaciones de pronunciación:
${respuestaAnalisis.recomendaciones_pronunciacion.length > 0
    ? respuestaAnalisis.recomendaciones_pronunciacion.join("\n")
    : "No se detectaron problemas"}


Sugerencias:
${respuestaAnalisis.sugerencias
    .map(sugerencia => `- ${sugerencia}`)
    .join("\n")}
`;
});


