import React from 'react'
import styles from './Paginado.module.css'

export default function Paginado({xPage, allG, paginate, next, previus}) {
   const pageNumber = [];
   
   for (let i = 1; i <= Math.ceil(allG / xPage); i++){
       pageNumber.push(i)
   }
   console.log(pageNumber, '------------console log page number')
    return (
        <nav className={styles.nav} >
            <ul className={styles.p_ul}>
                <button onClick={() => paginate(previus)} >Previus</button>
                {pageNumber.map(number => 
                <li className={styles.p_li} key={number} >
                    <a className={styles.a_li} onClick={() => paginate(number)}>
                        {number}
                    </a>
                </li>
                    )}
                <button onClick={() => paginate(next)} >Next</button>
            </ul>
        </nav>
    )
}
