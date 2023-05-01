import { Link } from "react-router-dom";
import React from "react";
import "./styles/navbar.css";


function navbar(){
    return(
        <nav>
            <div className="name"> Medicurves</div>
                <ul className="menu">
                    <li>
                        <Link to="#">Team</Link>
                    </li>
                    <li>
                        <Link to="#">Github</Link>
                    </li>
                    <li>
                        <Link to="/SignIn">Logout</Link>
                    </li>
                </ul>
        </nav>
    )
}

export default navbar;