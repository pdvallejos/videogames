import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { getGames, getDetail, selectData, sort_AZ_ZA, sort_by_Rating, filterGenre, getGenres} from '../../action';
import CardGame from '../CardGame/CardGame';
import Loading from '../Loading/Loading'
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import Styles from './Home.module.css'






export default function Home() {
    const dispatch = useDispatch()
    const loading = useSelector( state => state.loading)
    const allG = useSelector((state) => state.oneGames)
    const data = useSelector((state) => state.data)
    const[currentPage, setCurrentPage] = useState(1)
    const toGenres = useSelector((state) => state.stateGenres)
    

  //  console.log(toGenres, '----------algenres')
    
    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
    }, [dispatch])

    // selecciona por creados, no creados y all
    let result = allG
    if(data === "Created"){
        result = allG.filter( e => typeof(e.id) === "string")
       
    } else if ( data === "Other"){
        result = allG.filter( e => typeof(e.id) === "number")
       
    } 

    //--------------- paginado ------------------\\
    
    
  //  console.log(currentPage, ' ---------- current page')
    const[xPage] = useState(15)                  //---------------cantidad de games x pagina
  //  console.log(xPage, '----------------- xpage')
    const indexLast = currentPage * xPage
 //   console.log(indexLast, '--------------index last')
    const indexFirst = indexLast - xPage
 //   console.log(indexFirst, '------------ index first')

    var currentGame = result.slice(indexFirst, indexLast)
    const paginate = (pageNumber) =>{setCurrentPage(pageNumber)}
    
    const allpages = Math.ceil(result.length / xPage)
    var next = currentPage;
    var previus = currentPage;
    if(currentPage < allpages){
        next = currentPage + 1
    }
    if(currentPage > 1){
        previus = currentPage - 1
    }

//    console.log(allpages, '------------- console log allpages')
function handleHome(e){
    e.preventDefault()
    dispatch(getGames(e.target.value))
}
// -------------------- filtrados ----------------------------\\
function handleFilterGenre(e){
    e.preventDefault()
    dispatch(filterGenre(e.target.value))
  //  console.log(e.target.value, '------------value en home')
  setCurrentPage(1)
}

function handleFilterCreate(e){
    e.preventDefault()
    dispatch(selectData(e.target.value))
  //  console.log(e.target.value, '------------- target value')
//   dispatch(getGames())
}

function handleSort(e){
    e.preventDefault()
    dispatch(sort_AZ_ZA(e.target.value))
    
}

function handleRating(e){
    e.preventDefault()
    dispatch(sort_by_Rating(e.target.value))
}

// ---------------- fin del paginado ---------------------------\\

    return (
        <div className={Styles.responsive}>
          {loading? (<Loading/>) : (
              <div className={Styles.background}>
                <div className={Styles.divNav} >
                    <nav className={Styles.nav} >

                    <SearchBar/> 

                <div className={Styles.filtros}>
                    
                    <select className={Styles.select} onChange={(e) => handleFilterCreate(e)} name="filtercreate" id="filtercreate">
                        <option value="All">All</option>
                        <option value="Created">Created</option>
                        <option value="Other">Other</option>
                    </select>
                    <select className={Styles.select} onChange={e=> handleSort(e)} name="sort" id="sort">
                                <option value='az'>Ascendent A-Z</option>
                                <option value='za'>Descendent Z-A</option>
                    </select>
                    <select className={Styles.select} onChange={e => handleRating(e)}name="" id="">
                        <option value="best">Rating Up</option>
                        <option value="worst">Rating Down</option>
                    </select>
                    <select className={Styles.select} onChange={ (e) => handleFilterGenre(e)} name="" id="">
                            <option value="All">Genres</option>
                                 {toGenres?.map(e => 
                             <option value={e.name}>{e.name}</option>
                             )}
                    </select>
                  </div>
                    <Link to='/videogames'><button className={Styles.create}>Create</button></Link>

                    </nav>
                    </div>
                    <button className={Styles.Hgame} onClick={(e) => handleHome(e)}>H-GAME</button>   
                    <div className={Styles.separator} ></div>  
                    <Paginado 
                        xPage={xPage} 
                        result={result.length} 
                        paginate={paginate}
                        previus={previus}
                        next={next}
                    />
                <div className={Styles.grid}>
                
                    {

                        currentGame?.map( (e, idx) => {
                        return <div key={idx}>  
                              <Link onClick={() =>dispatch(getDetail(e.id))} to={`/videogame/${e.id}`}>
                                <CardGame name={e.name} img={e.img} genres={e.genres}/>
                              </Link>
                               </div>
                        })
                    }
                </div>
                
                    
                    
                   
            </div>
          )}
      </div>
        
    )
}
