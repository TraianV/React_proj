import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/Home.module.css';

const HomePage = () =>{
    return(
          <div style={{height:'100vh'}}>
              <h1 className={styles.title}>BorrowABook</h1>
              <div className={styles.description}>
              </div>
              <div className={styles.buttons}>
                <Link to='/register'  style={{textDecoration: 'none', color:'black'}}><button className={styles.btn}>Get started</button></Link>
                <Link to='/login'  style={{textDecoration: 'none', color:'black'}}><button className={styles.btn}>Login</button></Link>
              </div>
          </div>
    )
}

export default HomePage;