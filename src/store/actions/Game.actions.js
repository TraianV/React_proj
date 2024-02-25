import {db} from "../../lib/firebase";
import {doc, addDoc, getDoc, setDoc, getDocs, collection, query, updateDoc, deleteDoc} from "firebase/firestore";


export const ADD_Game = "ADD_Game";
export const GET_GameS = "GET_GameS";
export const DELETE_Game = "DELETE_Game";
export const UPDATE_Game = "UPDATE_Game";

export const postGame = (newGame) => async (dispatch) => {
    const GameRef = doc(db, "Games", newGame.id+"");
    await setDoc(GameRef, {
        id: newGame.id,
        title: newGame.title,
        owner: newGame.owner,
        genre: newGame.genre,
        publisher: newGame.publisher,
        publication_date: newGame.publication_date,
        imageUrl: newGame.imageUrl,
        status: newGame.status
    })
    dispatch({
        type: ADD_Game,
        payload: newGame
    })
}

export const getGames = () => async (dispatch) => {
    const q = query (collection(db, "Games"));
    const Games = await getDocs(q);
    if(Games.docs.length > 0){
        const GamesArray = [];
        Games.docs.forEach((doc) => {
            GamesArray.push(doc.data());
        })
        dispatch({
            type: GET_GameS,
            payload: GamesArray
        })
    }
}

export const deleteGame = (id) => async (dispatch) => {  
    await deleteDoc(doc(db, "Games", id+""));
    dispatch({
        type: DELETE_Game,
        payload: id
    })
}


export const updateGame = (editedGame) => async(dispatch) => {
    const GameRef = doc(db, "Games", editedGame.id);
    await updateDoc(GameRef, {
        id: editedGame.id,
        title: editedGame.title,
        genre: editedGame.genre,
        publisher: editedGame.publisher,
        imageUrl: editedGame.imageUrl,
        owner: editedGame.owner,
        publication_date: editedGame.publication_date,
        status: editedGame.status
    });
    dispatch({
        type: UPDATE_Game,
        payload: editedGame
    })
}