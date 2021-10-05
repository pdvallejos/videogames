import React from 'react'
import Styles from './CardGame.module.css'

export default function CardGame({name, img, genres}) {
    return (
        <div className={Styles.card}>
            <h3>{name}</h3>
            <img className={Styles.img} src={img} alt="Not Found" />
            { typeof genres[0] === 'object' ? 
             genres.map(g=> <p>  {g.name + " - "}</p>):
             genres.map(g=> <p>{g + " - "}</p>) }
        </div>
    )
}
