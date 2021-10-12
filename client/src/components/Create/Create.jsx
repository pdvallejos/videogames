import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getGenres } from '../../action'
import {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Styles from './Create.module.css'



export default function Create() {
    const dispatch = useDispatch();
    const allPlatforms=['PlayStation', 'Pc','Xbox','Nintendo','SEGA','Android','3DO','Atari','Linux','iOS','Commodore','Apple Macintosh'];
    const allGenres= useSelector((state) => state.stateGenres);
    const [created, setCreated] = useState(false)
    const [form, setForm] = useState({
        name:"",
        description:"",
        released:"",
        genres:[],
        platforms:[],
        img:"",
        rating:""
        
    })
   // console.log(allGenres)

    useEffect(() =>{
        dispatch(getGenres())
    },[]) //corregi y agregue el dispach, error en consola

    const history= useHistory() 
 
    function handleChange(e){
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
            
        })
      
    }
    function handleGenre(e){
        e.preventDefault()
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
    }
    function handlePlatforms(e){
        e.preventDefault()
        setForm({
            ...form,
            platforms: [...form.platforms, e.target.value]
            
        })
      
    }

    function handleSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/videogame', form)
        .then( responese => {

            dispatch(getGames())
            // alert("The Game is created")
            setForm({});
            setCreated(true);
            
        }).catch(e => {
            console.log(e)
        })
    }

    function handleAcept(e){
        e.preventDefault()
        history.push('/home')
    }
 //  console.log(form, "----------- console form")
    return (
        <div className={Styles.caja}>
            {
                !created ?(
                <div className={Styles.caja}> 
                    <h1 className={Styles.titlecre}>CREATE YOUR GAME</h1>
                    <Link to={'/home'}>
                     <button className={Styles.buttonCreate}>Home</button>
                    </Link>
                    <div className={Styles.cuadrado}>
                    <form className={Styles.form}>
                        <label className={Styles.label}>Name:</label>
                        <input className={Styles.input}
                        type="text" 
                        name="name"
                        value={form.name}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea 
                        name="description" 
                        id="" 
                        cols="30" 
                        rows="10"
                        value={form.description}
                        onChange={(e) => handleChange(e)}
                        required
                        ></textarea>
        
                        <label htmlFor="Released date:">Released date:</label>
                        <input 
                        type="date" 
                        name="released"
                        value={form.released}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                        <label >Rating:</label>
                        <select onChange={(e) => handleChange(e)}
                            name="rating" 
                            id="rating" 
                            value={form.rating}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label >Genres:
                            <select onChange={e => handleGenre(e)} name="genres" id="genres" >
                            <option name="genre" value=""> - - - - - - - </option>
                                {
                                    allGenres?.map( g => (
                                        <option value={g.id}>{g.name}</option>
                                        
                                    ))
                                }
                            </select>
                            </label>
                                
                            <label >Platforms:
                                <select onChange={(e) => handlePlatforms(e)} name="platforms" id="platforms"  required>
                                    <option name="platforms" value=""> - - - - - - - </option>
                                    {
                                        allPlatforms.map( p => (
                                            <option value={p}>{p}</option>
                                            
                                            ))
                                        }
                                  
                                </select>
                            </label>
                            <label htmlFor="image">Image:</label>
                            <input 
                            type="text"
                            name="img"
                            id="image"
                            onChange={(e) => handleChange(e)}
                            value={form.img}
                            />
                    </form>
                    </div> 
                    <div className={Styles.preButton}>
                    <button onClick={e => handleSubmit(e)} className={Styles.buttonCreate} type="submit">CREATE</button>
                    </div>                   
                </div>
            ) : (
                <div className={Styles.alert}>
                    <p >
                    Your Video Game has been created succesfull!!!
                    </p>
                    <button onClick={(e) => handleAcept(e)}> Acept</button>
                </div>
            )
            }
        </div>
    )
}
