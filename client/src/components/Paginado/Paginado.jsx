import React from 'react'
import styles from './Paginado.module.css'

export default function Paginado({xPage, result, paginate, next, previus}) {
   const pageNumber = [];
   
   for (let i = 1; i <= Math.ceil(result / xPage); i++){
       pageNumber.push(i)
   }
 //  console.log(pageNumber, '------------console log page number')
    return (
        <nav className={styles.nav} >
            <ul className={styles.p_ul}>
                <button className={styles.loader} onClick={() => paginate(previus)} >Before</button>
                {pageNumber.map(number => 
                <li className={styles.p_li} key={number} >
                    <a className={styles.a_li} href="!#" onClick={() => paginate(number)} >
                        {number}
                    </a>
                </li>
                    )}
                <button className={styles.loader} onClick={() => paginate(next)} > N e x t </button>
            </ul>
        </nav>
    )
}
