import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCharacters, filterCharactersByStatus, filterCreated, filterOrder } from '../actions'; //Funciones de las actions
import { Link } from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {

    const dispatch = useDispatch() //Constante para despues despachar la funcion de las acciones

    //-------------TRAIGO INFO DEL BACK A TRAVES DE LA ACCION Y EL REDUCER---------
    const allCharacters = useSelector((state) => state.characters) //Trae en la constante ("allCharacters"")todo lo que esta en el estado de characters del reducer


    //-------------- ESTADOS LOCALES PAGINADO-----------------
    const [currentPage, setCurrentPage] = useState(1)//PAGINA ACTUAL
    const [charactersPerPage, setCharactersPerPage] = useState(6) //CUANTOS PERSONAJES POR PAGINA
    const indexLastCharacter = currentPage * charactersPerPage //INDICE DEL  ULTIMO PERSONAJE !! 6 !!
    const indexOfFirstCharacter = indexLastCharacter - charactersPerPage //INDICE DEL PRIMER PERSONAJE POR PAGINA 0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexLastCharacter) //DIVIDO LA INFORMACION EN LOS INDICES DEL PRIMER Y ULTIMO PERSONAJE

    const paginado = (pageNumber) => { //NO CACHE QUE HACE
        setCurrentPage(pageNumber)
    }

    //------------- ESTADO LOCAL FILTRADO ASC O DESC----------------
    const [orden, setOrden] = useState("") //Sirve para actualizar la pagina y el render

    useEffect(() => { //Actualizo la pagina
        dispatch(getCharacters())
    }, [dispatch])


    //------------BOTON PARA VOLVER A CARGAR PERSONAJES-------
    function handleClickRestartPj(e) { //le paso un evento
        e.preventDefault();
        dispatch(getCharacters()) //Vuelvo a despachar la accion y su funcion
    }

    //-----------SELECT PARA ELEGIR POR STATUS------------
    function handleFilterStatus(e) { //Uso la accion que definimos en el action (filteredByStatus)
        dispatch(filterCharactersByStatus(e.target.value))//e.target.value es el value del select, me pasa a la funcion el payload de acuerdo a lo que elija el usuario
    }

    //----------SELECT PARA ELEGIR SI ES CREADO O NO EN BD--------------
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    //----------SELECT PARA ELEGIR SI FILTRAR ASC O DESC--------------
    function handleFilterOrder(e) {
        e.preventDefault()
        dispatch(filterOrder(e.target.value))
        setCurrentPage(1); //Cuardo ordeno mostrame la primera pagina
        setOrden(`Ordenado ${e.target.value}`) //Modificar estado local y renderizarce
    }

    return (
        <div>
            <Link to="/character">Crear personaje</Link>
            <h1>BREAKING BAD</h1>
            <button onClick={e => handleClickRestartPj(e)}> {/*Funcion para volver a cargar los personajes que necesito*/}
                Volver a cargar los personajes
            </button>
            <div>
                <select onChange={e => handleFilterOrder(e)} > {/*Ordenar ascendente o descendente*/}
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                <select onChange={e => handleFilterStatus(e)}> {/*Ordenar segun su status Se puede mapear*/}
                    <option value="All">Todos</option>
                    <option value="Alive">Vivo</option>
                    <option value="Deceased">Muerto</option>
                    <option value="Unknown">Desconocido</option>
                    <option value="Presumed dead">Probablemente muerto</option>
                </select>

                <select onChange={e => handleFilterCreated(e)}> {/**Ordenar segun creados en bd o no */}
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                </select>
                <SearchBar/>
                { //----------- RENDERIZO CADA COMPONENTE CARD Y PASO LAS PROPS--------
                    currentCharacters && currentCharacters.map(e =>   //para validar pregunto si existe allCharacters y allCharacters GRACIAS AL USE SELECTOR tiene todos los datos de mi backend, lo mapeo para llevarle a card las props que necesita por eso INVOCO <CARD/>
                        <Card name={e.name} img={e.img} nickName={e.nickname} /> //propiedades que quiero usasr en el componente <Card/>
                    )
                }
                {
                    //---RENDERIZO COMPONENTE PAGINADO Y LE PASO LAS PROPS QUE ENCESITA----
                    <Paginado
                        charactersPerPage={charactersPerPage} //propiedades que quiero usasr en el componente <Paginado/>
                        allCharacters={allCharacters.length} //NECESITO UN NUMERO PARA DESPUES HACER LA DIVISION Y VER CUANTAS PAGINAS NECESITO
                        paginado={paginado}
                    />
                }
            </div>
        </div>
    )
}