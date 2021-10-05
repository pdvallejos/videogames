import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import { getByName } from "../../action";


export default function SearchBar() {
    const dispatch= useDispatch()
    const [name, setName]= useState("") 

    function handleInput(e) {
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getByName(name))
        setName("")
    }

    return(
        <div>
            <input 
            type="text" 
            placeholder="Search Game" 
            onChange = {(e) => handleInput(e)}
            />
            <button type="Submit" onClick={(e) => handleSubmit(e)} >Search</button>
        </div>
    )
}