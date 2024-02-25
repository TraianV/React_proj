import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { auth, storage } from "../lib/firebase";
import { useEffect } from "react";

import { ChakraProvider, Heading, FormControl, FormLabel, Center, Input, Text, Button } from "@chakra-ui/react";

import {postGame} from "../store/actions/Game.actions"

import { incrementCount } from "../store/actions/counter.action";


const AddGameForm = ({handleCancelEdit}) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  const counter = useSelector(state => state.counterReducer.count);
  const dispatch = useDispatch();
  console.log(counter);


  useEffect(() => {
    dispatch(incrementCount());
  }, [dispatch]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleAddGame = async (event) => {
    event.preventDefault();
    if(error === ""){
    try {
      dispatch(incrementCount());
      const newGameId =  counter;
      console.log("COUNTER:" + newGameId);
      let Game = {
        id: newGameId,
        title,
        owner: auth.currentUser.email,
        genre,
        publisher,
        publication_date: formattedDate,
        status: "available"
      }


      dispatch(postGame({id: newGameId, title, genre, publisher, publication_date: formattedDate, owner: auth.currentUser.email, status: "available"}));
      setTitle("");
      setGenre("");
      setPublisher("");
      setImage("");
      console.log("Adding Game...");
    } catch (error) {
      console.error("Error adding Game: ", error);
      setError(error.message);
    }
    handleCancelEdit();
  }
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
        color={"white"}
      >
        <Heading pb="10">Add a new Game</Heading>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            placeholder="Title"
            bg="white"
            type="text"
            onChange={(e) => {setTitle(e.target.value);
            setError("");
            }}
            required
          />
        </FormControl>


        <FormControl mt="5">
          <FormLabel>Genre</FormLabel>
          <Input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => {setGenre(e.target.value);
              setError("");
            }}
            bg="white"
            required
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => {setPublisher(e.target.value)
            setError("");
           }}
            bg="white"
            required
          />
        </FormControl>
        <FormControl mt="5">
          <FormLabel>Image</FormLabel>
          <Input
            type="file" 
            onChange={handleImageChange} 
            required
          />
        </FormControl>

        {error && <Text color="green">{error}</Text>}

        <Button mt="5" onClick={handleAddGame}>
          Add Game
        </Button>
      </Center>
    </Center>
      </ChakraProvider>
      
    </div>
  );
};

export default AddGameForm;