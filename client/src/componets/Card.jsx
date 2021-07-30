import React from 'react';

export default function Card({name,img,nickName}){ //las props las pide el readme las voy a traer desde el componente HOME!!
    return(
        <div>
            <h3>{name}</h3>
            <h5> {nickName} </h5>
            <img src = {img} alt="img not found" width="200px" height="250px" />
        </div>
    )
}