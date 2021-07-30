import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postCharacter, getOcupations } from '../actions'
import { useDispatch, useSelector } from 'react-redux';

export default function CharacterForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const ocupations = useSelector((state) => state.ocupations)
    
    
    //---ESTADO PARA GUARDAR DATOS DEL FORMULARIO---
    const [input, setInput] = useState({  //LE PASO COMO OBJETO LO QUE NECESITA EL POST!!
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        img:"",
        ocupation: []  //arreglo para poder meter muchas
    })
    
    
    
    //-------FUNCION PARA CONTROLAR INPUTS, !!! LA CLAVE ES PONER MUCHOS NAME PARA DESPUES MODIFICAR ESE NADA MAS!------
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //EL NAME LO TIENENN TODAS LAS OPCIONES PARA QUE VARIE SEGUN CADA OPCION DE NAME EL E.TARGET.VALUE
        })
        console.log(input)
    }
    
    //-------FUNCION PARA CONTROLAR CHECKBOX-------
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value //es la misma logica que arriba solo que modifico el status
            })
        }
    }
    
    //-------FUNCION PARA CONTROLAR SELECT-------
    function handleSelect(e){
        setInput({
            ...input,
            ocupation:[...input.ocupation,e.target.value] //para guardar las ocupaciones, con el "...input.ocupation" traeme lo que habia y concatenale la nueva ocupacion con el e.target.value
        })
    }
    
    //-------FUNCION PARA CONTROLAR EL BOTON-------
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postCharacter(input))   //EJECUTO LA FUNCION DE LA ACCION QUE CREA EL FORMULARIO!!!!
        alert("Personaje creado!!")
        setInput({   //VUELVO A PONER EL STATUS VACIOOO
            name:" ",
            nickname:" ",
            birthday:" ",
            status:" ",
            img:" ",
            ocupation:[]
        })
        history.push('/home')  //UNA VEZ CARGADO EL PERSONAJE ME REDIRIJE AL HOME
    }
    
    useEffect(() => {
        dispatch(getOcupations());
    }, []);
    
    return (
        <div>
            <Link to= "/home"><button>Volver</button></Link> {/*Link para volver a la home*/}
            <h1>Crear Personaje!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={input.nickname}
                        name="nickname"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Cumpleaños:</label>
                    <input
                        type="text"
                        value={input.birthday}
                        name="birthday"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type="text"
                        value={input.img}
                        name="img"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>   {/**COMO HACER CHECKBOX */}
                    <label>status:</label>
                    <label><input
                        type="checkbox"
                        name="Alive"
                        value="Alive"
                        onChange= {(e) => handleCheck(e)}
                    />Alive</label>
                    <label><input
                        type="checkbox"
                        name="Deceased"
                        value="Deceased"
                        onChange= {(e) => handleCheck(e)}
                    />Deceased</label>
                    <label><input
                        type="checkbox"
                        name="Unknown"
                        value="Unknown"
                        onChange= {(e) => handleCheck(e)}
                    />Unknown</label>
                    <label><input
                        type="checkbox"
                        name="Presumed dead"
                        value="Presumed dead"
                        onChange= {(e) => handleCheck(e)}
                    />Presumed dead</label>
                </div>
                <div>
                    <select onChange = {(e) =>handleSelect(e)}>
                        {ocupations.map((e)=> (  //ES IMPORTANTE QUE EL MAP TENGA AQUI PARENTESIS EN VEZ DE LLAVES
                            <option value = {e.name}> {e.name} </option> //LA VARIABLE OCUPATIONS TIENE TODA LA INFO QUE TRAIGO DEL BACKEND, ACCEDO A ELLA COMO OBJETITO QUE ES
                        ))}
                    </select>
                    <ul><li> {input.ocupation.map(e => e + ",")}  </li></ul>  {/**Sirve para renderizar todo lo que vas seleccionando en el SELECT */}
                    <button  onSubmit = { (e) => handleSubmit(e)} type= "submit">Crear Personaje</button>
                </div>
            </form>
        </div>
    )
}