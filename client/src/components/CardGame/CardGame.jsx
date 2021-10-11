import React from 'react'
import './CardGame.css'

export default function CardGame({name, img, genres}) {
    return (
      <div class="fondo">
        <div class="outer circle">
                <span></span>
                <span></span>
          <div>
            <h3 class="h3">{name}</h3>
            <img class="img"  src={img} alt="Not Found" />
            <arguments>
            { typeof genres[0] === 'object' ? 
             genres.map(g=> <p>  {g.name + " - "}</p>):
             genres.map(g=> <p>{g + " - "}</p>) }
             </arguments>
             </div>
        </div>
        </div>
    )
}
{/*className={Styles.card}*/}
{/*className={Styles.img}*/}