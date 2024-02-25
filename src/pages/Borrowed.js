import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";
import BorrowedGame from "../components/RetailedGame";
import {getLoans} from "../store/actions/loans-history.actions";
import {getGames} from "../store/actions/Game.actions";
import { ChakraProvider, Heading } from "@chakra-ui/react";

const BorrowedGames = () => { 
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const loans = useSelector((state)=>state.loanReducer)

    useEffect(() => {
        dispatch(getGames());
        dispatch(getLoans());
        
        console.log("in my borrowed Games");
    }, [dispatch]);
    const loans2 = loans.filter(loan => loan.user_id === user.uid);

    const Games = useSelector((state)=>state.GameReducer)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentLoans = loans2.slice(indexOfFirstRecord, indexOfLastRecord);
    const numberOfPages = Math.ceil(loans2.length / recordsPerPage)

    return (
        <div style={{height: '100%'}}>
            <ChakraProvider>
                <Heading textAlign='center' paddingTop='20px'>Borrowed Games</Heading>
            </ChakraProvider>
            <ul className="grid-container">
                {currentLoans.length === 0 ? (
                    <h1>No loans</h1>
                ) : (
                    currentLoans.map((loan, index) => {
                        const GameData = Games.find((Game) => Game.id+'' == loan.Game_id+'');
                        if(GameData){
                        return (
                            <BorrowedGame 
                                loan={loan}
                                Game={GameData}
                            />
                        );
                        }
                    })
                )}
            </ul>

        </div>
    );
};

export default BorrowedGames;