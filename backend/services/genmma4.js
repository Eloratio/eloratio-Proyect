
const axios = require("axios");
const urlApiAi = "http://gatuno.serveminecraft.net:57423";


async function consultarAi(consulta, texto){
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


//consultas AI= metric, error, suggestion, filler, pronunciation
async function metricAi(consulta, tipo, texto) {

    try {

        const response = await axios.post(
            `${urlApiAi}/${consulta}`,
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
async function summaryAi(metric, error, suggestion, filler, pronunciation, texto){

    try{

        const response = await axios.post(
            `${urlApiAi}/feedback`,
            {
                metric: metric,
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

module.exports = { consultarAi, metricAi, summaryAi };