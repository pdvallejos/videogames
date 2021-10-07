import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getGenres } from '../../action'
import {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


export default function Create() {
    const dispatch = useDispatch()
    const allPlatforms=['PlayStation','Xbox','Nintendo','SEGA','Android','3DO','Atari','Linux','iOS','Commodore','Apple Macintosh']
    const allGenres= useSelector((state) => state.stateGenres)
    const [form, setForm] = useState({
        name:"",
        description:"",
        released:"",
        genres:[],
        platforms:[],
        img:""
        
    })
   // console.log(allGenres)

    useEffect(() =>{
        dispatch(getGenres())
    },[])

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
            alert("The Game is created")
            setForm({})
            history.push('/home')
        }).catch(e => {
            console.log(e)
        })
    }
 //  console.log(form, "----------- console form")
    return (
        <div>
            <h1>crear juego</h1>
            <Link to={'/home'}>
             <button>Home</button>
            </Link>
            <form >
                <label >Name:</label>
                <input 
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
                        <select onChange={(e) => handlePlatforms(e)} type="checkbox"name="platforms" id="platforms" defaultValue="" required>
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

            <button onClick={e => handleSubmit(e)} type="submit">CREATE!</button>
        </div>
    )
}
