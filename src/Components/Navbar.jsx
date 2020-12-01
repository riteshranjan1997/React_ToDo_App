import React from "react"
import { Link } from "react-router-dom"
import Styles from "../Routes/all.module.css"


function Navbar() {
    return (
        <>
            <div id={Styles.nav}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tasks">Tasks</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Navbar