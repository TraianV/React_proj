import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <>
    <div className={styles.nav}>
      <div className={styles.logo}>
        BorrowAGame
      </div>
    </div>
    <Outlet />
    </>
  )
}

export default Navbar;