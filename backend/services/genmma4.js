
const axios = require("axios");
const urlApiAi = "http://gatuno.serveminecraft.net:57423";


//consultas AI= clarity, fluency, rhythm, error, suggestion, filler, pronunciation
async function consultarAi(consulta, texto) {

    try {

        const response = await axios.post(
            `${urlApiAi}/${consulta}`,
            {
                texto: texto
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

//consultas AI= formality
async function consultarFormalidad(texto, tipo) {

    try {

        const response = await axios.post(
            `${urlApiAi}/formality`,
            {
                tipo: tipo,
                texto: texto
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

//consulta AI= feedback
async function summaryAi(clarity, formality, fluency, rhythm, error, suggestion, filler, pronunciation, texto){

    try{

        const response = await axios.post(
            `${urlApiAi}/feedback`,
            {
                clarity: clarity,
                formality: formality,
                fluency: fluency,
                rhythm: rhythm,
                error: error,
                suggestion: suggestion,
                filler: filler,
                pronunciation: pronunciation,
                texto: texto
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

module.exports = { consultarAi, consultarFormalidad, summaryAi };