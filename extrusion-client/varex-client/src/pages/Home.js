import "./Home.css";
import homepic from "../assets/homepic.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchData } from "../functions/functions";
const Home = () => {
    const navigate = useNavigate();
    const checkUser = async () => {
        const fetchedData = await fetchData("/mes/checkuser/varex", "GET");
        if (fetchedData.success) {
            if (fetchedData.data.connected) {
                navigate("/Page1");
            }
        } else {
            console.error(fetchedData.error);
        }
    };
    useEffect(() => {
        checkUser();
        setInterval(() => {
            checkUser();
        }, 60000);
    }, []);
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
