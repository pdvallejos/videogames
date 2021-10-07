import React from 'react'
import { useSelector } from 'react-redux';


export default function Details() {
    
    

  
    
    let resp = useSelector(state => state.detail) 

    // console.log(resp, '---------------este es el console de resp')
    // console.log(props, '------------------ console log de props')

        return (
            <div>{
            
                    resp ? (
                        <div>
                        <h2>Name : {resp.name}</h2>
                    <div>
                        <img src={resp.img} alt="Not found Img" />
                    </div>
                    <div>
                        <p>Rating: {resp.rating}</p>
                        <p>Genre: {resp.genres.length > 0 ?resp.genres.map(g => g.name + (" - ")): "Empty"}</p>
                        <p>Description:{resp.description}</p>
                        <p>Released:{resp.released}</p>
                        <p>Platforms{resp.platforms.length > 0?resp.platforms.map(p => p.name + (" - ")): "empty"}</p>
                    </div>
                    </div>
                    ) : <h1>cargando....</h1>
            
                
            }</div>
        )



}
