import "./Home.css";
import homepic from "../assets/homepic.png";

import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="container">
            <img className="logo sa" src={homepic} alt="logo" />
            <div className="text sa">Welcome!!</div>
            <div className="button sa">
                <Link className="textButton" to="/Login">
                    Connectez-vous à AICONS
                </Link>
            </div>
        </div>
    );
};

export default Home;
