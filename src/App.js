import React from 'react';
//import logo from './logo.svg';
// import './App.css';
import Navbar from './Components/Navbar';
import { Routes } from './Routes/Routes';
import Styles from "./Routes/all.module.css"



function App() {
  return (
    <div className={Styles.container}>
      <Navbar/>
      <Routes/>
    </div>
  );
}

export default App;
