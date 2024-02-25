import {ADD_Game, GET_GameS, DELETE_Game, UPDATE_Game} from "../actions/Game.actions";

const initialState = [];

const GameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_Game:
            return [...state, action.payload];
        case GET_GameS:
            return action.payload;
        case DELETE_Game:
            return state.filter((Game) => Game.id !== action.payload);
        case UPDATE_Game:
            const data = action.payload;
            return state.map((Game) => {
                if (Game.id === data.id) {
                    return{
                        ...Game,
                        title: data.title,
                        genre: data.genre,
                        publisher: data.publisher,
                    };
                    
                } 
                else{
                    return Game;
                }
            });

        default:
            return state;
    }
};

export default GameReducer;