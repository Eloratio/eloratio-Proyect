
const axios = require("axios");
const urlApiAi = "http://gatuno.serveminecraft.net:57423";


//consultas AI= /keywords, /formality, /tips
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

//consulta AI= /summary
async function summaryAi(keywords, formality, tips, texto){

    try{

        const response = await axios.post(
            `${urlApiAi}/summary`,
            {
                keywords: keywords,
                formality: formality,
                tips: tips,
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

module.exports = { consultarAi, summaryAi };