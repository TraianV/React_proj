import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";
import GameDataGames from "../components/GamesDB";
import styles from "../components/GamesDB.module.css";
import { Link } from "react-router-dom";

import {getGames} from "../store/actions/Game.actions";

const MyGames = () => { 
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const Games = useSelector((state)=>state.GameReducer)

    useEffect(() => {
        dispatch(getGames());
    }, [dispatch]);

    const Games2 = Games.filter(Game => Game.owner === user.email);
  
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentGames = Games2.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(Games2.length / recordsPerPage)
    
    return (
        <div style={{height: 'calc(100%)'}}>
          <h1>My Games</h1>
        <div className={styles.gridcontainer}>
          {
              currentGames.length === 0 ? <p style={{textAlign:'center'}}>No Games</p> :
              currentGames.map((Game, index) => (
                <Link to={`/myGames/${Game.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <GameDataGames
                    {...Game}
                    borrowButton={false}
                  />
                </Link>
              ))

          }
        </div>  
        </div>
    );
};

export default MyGames;