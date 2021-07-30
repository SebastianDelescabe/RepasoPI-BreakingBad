const initialState = {
    characters: [],  //estado que se modificara al buscar por stauts
    allCharacters: [], //estado que tiene siempre todos los personajes
    ocupations:[]
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CHARACTERS': //TRAIGO TODOS LOS CHARACTERS
            return {
                ...state,
                characters: action.payload, //LLENA TODO LO QUE TENGA LA ACCION DE Characters AL ESTADO DE CHARACTERS
                allCharacters: action.payload
            }

        case 'FILTER_BY_STATUS':  //FILTRO POR STATUS
            const statusFiltered = action.payload === "All" ? state.allCharacters : state.allCharacters.filter(e => e.status === action.payload) //Si mi payload es "all" no hagas nada porque no lo filtro, si es distinto . filtra los personajes segun el payload que te pasan a la action a traves del value del select.
            return {
                ...state,
                characters: statusFiltered  //modifico este estado segun el payload

            }

        case 'FILTER_CREATED': //FILTRO SI ES O NO CREADO EN DB
            const createdFilter = action.payload === "created" ? state.allCharacters.filter(e => e.createdInDb) : state.allCharacters.filter(e => !e.createdInDb)
            return {
                ...state,
                characters: action.payload === "all" ? state.allCharacters : createdFilter
            }

        case "FILTER_ORDER": //FILTRO POR ASC O DESC
            let sortedArr = action.payload === 'asc' ?
                state.characters.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.characters.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                characters: sortedArr
            }

        case 'GET_NAME_CHARACTER': //TRAIGO CHARACTER SEGUN EL NOMBRE DEL INPUT Y LO GUARDO EN UN ESTADO
            return{
                ...state,
                characters:action.payload
            }

        case "GET_OCUPATIONS": //GUARDO EN UN ESTADO TODAS LAS OCUPACIONES
            return{
                ...state,
                ocupations:action.payload
            }
        case "POST_CHARACTER":  //NO HACE NADA PERO TIENE QUE ESTAR EN EL REDUCER
            return{
                ...state,
            }

        default:
            return state;
    }
}


export default rootReducer;