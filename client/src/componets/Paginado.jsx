import React from "react"
import estilos from "./Paginado.module.css"


export default function Paginado({ charactersPerPage, allCharacters, paginado }) { //las props las voy a traer desde el componente HOME!!
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(allCharacters / charactersPerPage); i++) {   //DIVIDO LA CANTIDAD DE PERSONAJES(TRAIDOS EN NUMERO) POR LA CANTIDAD QUE QUIERO POR PAGINA Y VOY PUSEHEANDO LAS PAGINAS QUE NECESITO
        pageNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul className={estilos.paginado}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li className={estilos.number} key={number}>
                            <a onClick={() => paginado(number)}>{number}</a> {/**No se bien que hace esta funcion */}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}