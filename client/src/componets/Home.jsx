import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCharacters } from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';

export default function Home() {

    const dispatch = useDispatch() //despacho las acciones
    const allCharacters = useSelector((state) => state.characters) //Trae en la constante ("allCharacters"")todo lo que esta en el estado de characters del reducer

    useEffect(() => {
        dispatch(getCharacters()) //despacho la funcion de la accion y la ejecuto
    }, [dispatch])

    function handleClick(e) { //le paso un evento
        e.preventDefault();
        dispatch(getCharacters()) //Vuelvo a despachar la accion y su funcion
    }

    return (  //renderizo 
        <div>
            <Link to="/character">Crear personaje</Link>
            <h1>BREAKING BAD</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar los personajes
            </button>
            <div>
                <select> {/*Ordenar ascendente o descendente*/}
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select> {/*Ordenar segun su status Se puede mapear*/}
                    <option value="All">Todos</option>
                    <option value="Alive">Vivo</option>
                    <option value="Deceased">Muerto</option>
                    <option value="Unknown">Desconocido</option>
                    <option value="Presumed dead">Probablemente muerto</option>
                </select>
                <select>
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                </select>
                {
                    allCharacters && allCharacters.map(e =>   //para validar pregunto si existe allCharacters y allCharacters GRACIAS AL USE SELECTOR tiene todos los datos de mi backend, lo mapeo para llevarle a card las props que necesita por eso INVOCO <CARD/>
                        <Card name = {e.name} image={e.img} nickName={e.nickname}/> 
                    )
                }
            </div>
        </div>
    )
}