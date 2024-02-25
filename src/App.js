import logo from './logo.svg';
import './App.css';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import GamesPage from './pages/GameDB';
import MyGames from './pages/MyGames';
import GamePage from './pages/GameDit';
import MyGamePage from './pages/MyGame';
import BorrowedGames from './pages/Borrowed';
import {Routes, Route, BrowserRouter, useRoutes, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { logout, setIsAuthenticated, setLoading } from "./store/auth.reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { ThemeContext } from "./store/ThemeContext";
import Navbar from "./components/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Navbar />}>
        <Route path = "/" element = { <HomePage></HomePage> }></Route>
        <Route path = "/home" element = { <HomePage></HomePage> }></Route>
        <Route path = "/Games" element = { <GamesPage></GamesPage> }></Route>
        <Route path = "*" element={<PageNotFound></PageNotFound>} ></Route>
        <Route path = "/login" index element = { <LoginPage></LoginPage> }></Route>
        <Route path = "/register" element = { <RegisterPage></RegisterPage> } ></Route>
        <Route path = "/Games/:id" element = { <GamePage></GamePage> }></Route>
      </Route>
        <Route element={<ProtectedRoute redirectTo="/login"/> }>
          <Route element={<Navbar />}>
            <Route path = "/profile" element = { <ProfilePage></ProfilePage> }></Route>
            <Route path = "/myGames" element = { <MyGames></MyGames> }></Route>
            <Route path = "/myGames/:id" element = { <MyGamePage></MyGamePage> }></Route>
            <Route path = "/borrowedGames" element = { <BorrowedGames></BorrowedGames> }></Route>
          </Route>
        </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();
  const { theme, switchTheme } = useContext(ThemeContext);
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log('Dispatching setIsAuthenticated action');
        dispatch(setIsAuthenticated());
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  console.log( {theme});
  return <div className={theme}><RouterProvider router={router} /></div>;
}

export default App;