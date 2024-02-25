import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddGameForm from "../components/AddGameToDb";
import GameDataGames from "../components/GamesDB";
import styles from "../components/GamesDB.module.css";
import { Link } from "react-router-dom";

import {getGames} from "../store/actions/Game.actions";

import { useContext } from "react";
import {ThemeContext} from "../store/ThemeContext";

const GamesPage = () => {
  console.log("GamesPage");
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const {theme, setTheme} = useContext(ThemeContext);
    
    const Games = useSelector((state)=>state.GameReducer)
    useEffect(() => {
      dispatch(getGames());

    }, [dispatch]);
    console.log( {theme});
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentGames = Games.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(Games.length / recordsPerPage)

    const handleEdit = () => {
      setIsEditing(true);
    }
  
    const handleCancelEdit = () => {
      setIsEditing(false);
    }
  
 
    return (

      <div className={styles.back}>{
      
        isEditing ? (<AddGameForm handleCancelEdit={handleCancelEdit}/>) 
        :
        (
          <>
        <h1 className={styles.title}>Games</h1>
        <div className={styles.forbtn}>
        <button className={styles.btn} onClick={handleEdit}>+</button>
        </div>
        <ul className={styles.gridcontainer}>
          {currentGames.map((Game, index) => (
            <Link to={`/Games/${Game.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <GameDataGames
              id={Game.id}
              key={index}
              title={Game.title}
              owner={Game.owner}
              genre={Game.genre}
              publisher={Game.publisher}
              publication_date={Game.publication_date}
              imageUrl={Game.imageUrl}
              status={Game.status}
              borrowButton={false}
            />
            </Link>
            
          ))}
        </ul>

        </>)
      }
      </div>
    );
  };
  
export default GamesPage;