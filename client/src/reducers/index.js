

const initialState={
allGames:[],
oneGames: [],
gamesGenres: [],
detail: [],
loading:false
};

function rootReducer(state = initialState, action){
    switch(action.type){

        case 'SET_LOADING':
            return{
                ...state,
                loading:true
            };
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                loading:false,
                allGames: action.payload,
                oneGames: action.payload
              
            };
        case 'GET_BY_NAME':
            return{
                ...state,
                oneGames: action.payload
            }
        default:
            return state
    };
};

export default rootReducer;