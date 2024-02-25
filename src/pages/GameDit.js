import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getDoc, doc} from "firebase/firestore";
import { db } from "../lib/firebase";
import GameData from "../components/GameDet";

const GamePage = () => {
  const params = useParams();
  const [GameData, setGameData] = useState("");
  useEffect(() => {
    const getGame = async () => {
      const docRef = doc(db, "Games", params.id.toString());
      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setGameData(docSnap.data());
        } else {
            console.log("Document does not exist")
        }
    
      } catch(error) {
          console.log(error)
      }
    };
    getGame();
  }, [params.id]);

  if (!GameData) {
    return <div>Document doesn't exist</div>;
  }
  return (<div>
    <GameData  
      id={GameData.id}
      title={GameData.title}
      owner={GameData.owner}
      genre={GameData.genre}
      number_of_pages={GameData.number_of_pages}
      publisher={GameData.publisher}
      publication_date={GameData.publication_date}
      imageUrl={GameData.imageUrl}
      status={GameData.status}
      borrowButton={true}
    />
  </div>);
};

export default GamePage;