import React from 'react'
import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getGames } from '../../action';
import CardGame from '../CardGame/CardGame';
import Loading from '../Loading/Loading'
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import Styles from './Home.module.css'




export default function Home() {
    const dispatch = useDispatch()
    const loading = useSelector( state => state.loading)
    const allG = useSelector((state) => state.oneGames)
    
    useEffect(() => {
        dispatch(getGames())
    }, [dispatch])
    
    //--------------- paginado ------------------\\
    
    const[currentPage, setCurrentPage] = useState(1)
  //  console.log(currentPage, ' ---------- current page')
    const[xPage] = useState(9)
  //  console.log(xPage, '----------------- xpage')
    const indexLast = currentPage * xPage
 //   console.log(indexLast, '--------------index last')
    const indexFirst = indexLast - xPage
 //   console.log(indexFirst, '------------ index first')

    var currentGame = allG.slice(indexFirst, indexLast)
    const paginate = (pageNumber) =>{setCurrentPage(pageNumber)}
    
    const allpages = Math.ceil(allG.length / xPage)
    var next = currentPage;
    var previus = currentPage;
    if(currentPage < allpages){
        next = currentPage + 1
    }
    if(currentPage > 1){
        previus = currentPage - 1
    }
//    console.log(currentGame, '------------- console log currengame')
//    console.log(allpages, '------------- console log allpages')

// ---------------- fin del paginado ---------------------------\\

    return (
      <div>
          {loading? (<Loading/>) : (
            <div>
                <div>
                    <SearchBar/>
                </div>
              
                <div className={Styles.grid}>
                
                    {

                        currentGame?.map( (e, idx) => {
                        return <div key={idx}>  
                              <Link to={`/videogame/${e.id}`}>
                                <CardGame name={e.name} img={e.img} genres={e.genres}/>
                              </Link>
                               </div>
                        })
                    }
                </div>
                
                    
                    <Paginado 
                        xPage={xPage} 
                        allG={allG.length} 
                        paginate={paginate}
                        previus={previus}
                        next={next}
                    />
                    
            </div>
          )}
      </div>
        
    )
}
