import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, addDoc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { auth, storage } from "../lib/firebase";
import { db } from "../lib/firebase";
import {updateGame} from "../store/actions/Game.actions"


import { ChakraProvider, Heading, FormControl, FormLabel, Center, Input, Text, Button } from "@chakra-ui/react";

const EditGameForm = ({GameData, handleCancelEdit}) => {
  const [title, setTitle] = useState(GameData.title);
  const [genre, setGenre] = useState(GameData.genre);
  const [publisher, setPublisher] = useState(GameData.publisher);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditGame = async (event) => {
    event.preventDefault();
    try {
    

      const editedGame ={
        id: GameData.id + "",
        title,
        genre,
        publisher,
        owner: GameData.owner,
        publication_date: GameData.publication_date,
        status: GameData.status
      };


      dispatch(updateGame(editedGame));
      setTitle(GameData.title);
      setGenre(GameData.genre);
      setPublisher(GameData.publisher);

      
      
      navigate(`/myGames/${GameData.id}`);
    } 
    catch (error) {
      console.error("Error: ", error);
    }
    handleCancelEdit();

  }

  return (
    <div>
        <ChakraProvider>
        <Center flexDirection="column" height="80%">
      <Center
        flexDirection="column"
        p="20"
        bg="orange.100"
        boxShadow="2"
        borderRadius="lg"
      >
        <Heading pb="10">Edit Game</Heading>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            placeholder="Title"
            bg="white"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
        </FormControl>

        <FormControl mt="5">
          <FormLabel>Genre</FormLabel>
          <Input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            bg="white"
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            bg="white"
          />
        </FormControl>

        

        <Button mt="5" onClick={handleEditGame}>
          Edit Game
        </Button>
      </Center>
    </Center>
      </ChakraProvider>  
    </div>
  );
};

export default EditGameForm;