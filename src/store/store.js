import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";

import GameReducer from "./reducers/Game.reducer";
import loanReducer from "./reducers/loan.reducer";
import counterReducer from "./reducers/counter.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    GameReducer: GameReducer,
    loanReducer: loanReducer,
    counterReducer: counterReducer,
  },
});