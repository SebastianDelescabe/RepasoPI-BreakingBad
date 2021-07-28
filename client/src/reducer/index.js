const initialState = {
    characters: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_CHARACTERS':
            return {
                ...state,
                characters: action.payload //LLENA TODO LO QUE TENGA LA ACCION DE Characters AL ESTADO DE CHARACTERS
            }
        default:
            return state;
    }
}


export default rootReducer;