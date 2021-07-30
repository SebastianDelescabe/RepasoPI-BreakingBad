import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getNameCharacters } from '../actions';


export default function SearchBar(){
    const dispatch = useDispatch()

    //----Creo estado local----
    const [name,setName] = useState("")


    //----Cargo datos en el estado----
    function handleInputChange(e){ //Guardo lo que tipea el usuario en el estado local !!NAME!!!
        e.preventDefault()
        setName(e.target.value)  //value del input toma el valor del state
        console.log(name) //ver como se modifica el estado
    }
    //----Ejecuto funcion de action para buscar los datos----
    function handleSubmit(e){ 
        e.preventDefault()
        dispatch(getNameCharacters(name))//Ejecuto la busqueda a la funcion de la action con el estado LOCAL ya completo gracias al estado local!!!
        
    }

    return (
        <div>
            <input type = "text" 
            placeholder="Buscar nombre" 
            onChange= {(e)=>handleInputChange(e)}
            />
            <button onClick={(e)=>handleSubmit(e)} type="submit">Buscar</button>
        </div>
    )
}