import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

import {getLoans} from "../store/actions/loans-history.actions";


import { Card, Box, CardBody, CardFooter, Heading, Stack, Text, Button, ChakraProvider } from '@chakra-ui/react';

const BorrowedGame = ({loan, Game}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [GameUpdated, setGameUpdated] = useState(Game);

    const dispatch = useDispatch();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    const handleReturn = async (id, loan) => {
        const GameRef = doc(db, "Games", id+"");
        await updateDoc(GameRef, {
            status: "available"
        })
        console.log("Returned" + id);
        setIsVisible(false);
        console.log(loan);


        if (loan && loan.id) {
            const loanRef = doc(db, "loans-history", loan.id+"");
            await updateDoc(loanRef, {
                return_date: formattedDate
            })
            dispatch(getLoans());
            setGameUpdated(prevGame => ({ ...prevGame, status: "available" }));

        } else {
            console.error('Invalid loan:', loan);
        }

    }
    useEffect(() => {
        dispatch(getLoans());
      }, [dispatch]);


    return (
    <ChakraProvider>
    <Box display="flex" flexDirection="row"  justifyContent="center" alignItems="center" >
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    position={{ base: 'relative', sm: 'relative' }}

    marginTop='20px'
    marginBottom="30px"
    height='400px'
    width='700px'
    zIndex="0" 

    >


  <Stack>
    <CardBody paddingLeft='80px'>
      <Heading size='md'>{Game.title}</Heading>
      <Text py='2'>
        By: {Game.publisher}
      </Text>
      <Text py='2'>
        Status: {GameUpdated.status}
      </Text>
      <Text py='2'>
        Borrow date: {loan.borrow_date}
      </Text>
      <Text py='2'>
        Return date: {loan.return_date}
      </Text>
    </CardBody>

    <CardFooter paddingLeft='80px'>
        {Game.status=="borrowed" && isVisible &&
      <Button variant='solid' colorScheme='blue' onClick={()=>handleReturn(Game.id, loan)}>
        Return Game
      </Button>
}
    </CardFooter>
  </Stack>
  
</Card>
</Box>
</ChakraProvider>
        
    )
}

export default BorrowedGame;