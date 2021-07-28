import React from 'react';

export default function Card({name,image,nickName}){
    return(
        <div>
            <h3>{name}</h3>
            <h5> {nickName} </h5>
            <img src = {image} alt="img not found" width="200px" height="250px" />
        </div>
    )
}