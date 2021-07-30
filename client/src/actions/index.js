import axios from "axios";

export function getCharacters() {  //TRAIGO DEL BACK TODOS LOS CHARACTERS
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/characters");
        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data
        })
    }
}

export function getNameCharacters(payload) {  //TRAIGO NAME EN payload es lo que escribiran en la barra de bsuqueda
    return async function (dispatch) {
        try {//aca puede fallar entonces le mando el error como try catch
            var json = await axios.get("http://localhost:3001/characters?name=" + payload);
            return dispatch({
                type: "GET_NAME_CHARACTER",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterCharactersByStatus(payload) { //Traigo a la action el status elegido por payload
    return {
        type: "FILTER_BY_STATUS",
        payload,
    }
}

export function filterCreated(payload) { //Traigo a la action el created or no (? elegido por payload
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function filterOrder(payload) { //Traigo a la action el orden elegido por payload
    return {
        type: "FILTER_ORDER",
        payload
    }
}


//ACCION OCUPATION PARA TRAER Y PERMITIR ELEGIR ENTRE LAS OCUPACIONES DE LA BASE DE DATOS
export function getOcupations() {
    return async function (dispatch) {
        var info = await axios.get("http://localhost:3001/ocupation")
        return dispatch({
            type: "GET_OCUPATIONS",
            payload: info.data
        })

    }
}

export function postCharacter(payload) { //TRAIGO LA INFO NECESARIA PARA EL FORMULARIO DESDE EL POST DEL BACK
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/characters", payload)
        console.log(response)
        return response;
    }
}