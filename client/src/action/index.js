import axios from 'axios'


//acciones a realizar:
//loadig
//get por Games
//filtro por genero
//orden alfabetico
//buscar por rating
//get por nombre
//get al detalle de el juego clickeado
//get de genres
//post de game
//get game creado

export function setLoadig(){
    return{
        type: "SET_LOADING"
    }
};

export function getGames(){
    return async function(dispatch){
        dispatch(setLoadig())
        var result= await axios.get('http://localhost:3001/videogames', [])

        return dispatch({
            type:  'GET_VIDEOGAMES',
            payload: result.data
        })
    }
}

export function getByName(name){
    return async function(dispatch){
       try{
            var result = await axios.get(`http://localhost:3001/videogames?name=${name}`);

            return dispatch({
                type: 'GET_BY_NAME',
                payload: result.data
            })
        } catch(e) {
            alert("Videogame not exist")
        }
    }
}