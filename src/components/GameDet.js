import React from "react";
import { useState } from "react";
import styles from "./GameDet.module.css";
import { Button } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {addLoan} from "../store/actions/loans-history.actions";
import { auth } from "../lib/firebase";
import {useDispatch} from "react-redux";


const GameData = ({ id, title, owner, genre, publisher, publication_date, imageUrl, status:initialStatus, borrowButton }) => {
  const [status, setStatus] = useState(initialStatus);
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  const handleBorrow = async (id) => {
    const GameRef = doc(db, "Games", id+"");
    await updateDoc(GameRef, {
        status: "borrowed"
    })
    console.log("Borrowed" + id);
    setStatus("borrowed");
    const loan = {
      Game_id: id,
      user_id: auth.currentUser.uid,
      owner: owner,
      borrow_date: formattedDate,
      return_date: ""
    }
    try{
      dispatch(addLoan(loan));
    }
    catch(error){
      console.log(error);
    }
  }  
  
  return (
      <div className={styles.card}>
        <div className={styles.data}>

        <p ><b>Title: {title}</b></p>
        <p>Id: {id}</p>
        
        <p>Owner: {owner}</p>
        <p>Genre: {genre}</p>
        <p>Publisher: {publisher}</p>
        <p>Publication date: {publication_date}</p>
        <p>Status: {status}</p>
        {status=="available" && user && borrowButton && <Button colorScheme="pink" size="2sm" variant="outline" onClick={() => handleBorrow(id)}>Borrow</Button>}
        </div>
      </div>
    );
  };

export default GameData;