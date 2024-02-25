//doar cand sunt in myGamepage vreau sa pot sterge o carte
//sa nu sterg cartea altcuiva

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getDoc, doc, onSnapshot} from "firebase/firestore";
import { db } from "../lib/firebase";
import GameData from "../components/GameDet";


import { useDispatch } from "react-redux";
import {deleteGame} from "../store/actions/Game.actions";

import EditGameForm from "../components/EditGame";


const MyGamePage = () =>{
  const params = useParams();
  const [GameData, setGameData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getGame = async () => {
      const docRef = doc(db, "Games", params.id.toString());
      try {
        const unsubscribe = onSnapshot(docRef, (doc) => {

        if(doc.exists()) {
            setGameData(doc.data());
        } else {
            console.log("Document does not exist")
        }
        return () => unsubscribe();
      })} catch(error) {
          console.log(error)
      }
    };
    getGame();
  }, [params.id]);

  if (!GameData) {
    return <div>Document doesn't exist</div>;
  }

  const handleDelete = async () => {
      dispatch(deleteGame(GameData.id));
      navigate("/myGames");
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
  }

  
  return (
  <div>
      {
          isEditing ? (<EditGameForm GameData={GameData} handleCancelEdit={handleCancelEdit}/>) 
          :
      (
      <>
        <GameData  
          id={GameData.id}
          title={GameData.title}
          owner={GameData.owner}
          genre={GameData.genre}
          publisher={GameData.publisher}
          publication_date={GameData.publication_date}
          status={GameData.status}
          borrowButton={false}
        />
        <div style={{display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px', 
          marginBottom: '30px'}}
        >
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </>
      )
      }
  </div>
  );
}

export default MyGamePage;