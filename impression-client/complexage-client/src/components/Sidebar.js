import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentDate, currentTime, fetchData } from "../functions/functions";
import "../pages/Page1.css";
import complexage from "../assets/complexage.png";

const Sidebar = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(currentTime());
    const [date, setDate] = useState(currentDate());
    const [data, setData] = useState({
        of: 0,
        qp: 0,
        operateur: "Personne",
        poste: "-",
    });
    let fetching = false;
    const getData = async () => {
        fetching = true;
        const fetchedData = await fetchData("/mes/navbar/complexage", "GET");
        if (fetchedData.success) {
            setData(fetchedData.data);
        } else {
            console.error(fetchedData.error);
        }
        fetching = false;
    };
    const checkUser = async () => {
        fetching = true;
        const fetchedData = await fetchData("/mes/checkuser/complexage", "GET");
        if (fetchedData.success) {
            if (!fetchedData.data.connected) {
                navigate("/login");
            }
        } else {
            console.error(fetchedData.error);
        }
        fetching = false;
    };
    checkUser();
    useEffect(() => {
        setInterval(() => {
            setTime(currentTime());
            setDate(currentDate());
            checkUser();
        }, 60000);
        setInterval(() => {
            if (!fetching) {
                getData();
            }
        }, 1000);
    }, []);
    return (
        <div className="sidebar">
            <img className="cms-img" src={complexage} alt="cms" />
            <ul className="cms-list">
                <div className="Time">
                    <li className="green">Time</li>
                    <li className="b">
                        <span className="blue">HR </span>
                        <span className="w" id="time">
                            {time}
                        </span>
                    </li>
                    <li className="b">
                        <span className="blue">DT </span>
                        <span className="w" id="date">
                            {date}
                        </span>
                    </li>
                </div>
                <div className="Produit">
                    <li className="green">Produit</li>
                    <li className="b">
                        <span className="blue">OF </span>
                        <span className="w">{data.of}</span>
                    </li>
                    <li className="b">
                        <span className="blue">QP </span>
                        <span className="w">{data.qp} Kg</span>
                    </li>
                </div>
                <div className="RH">
                    <li className="green">RH</li>
                    <li className="b">
                        <span className="blue">OP </span>
                        <span className="w">{data.operateur}</span>
                    </li>
                    <li className="b">
                        <span className="blue">EQ </span>
                        <span className="w">{data.poste}</span>
                    </li>
                </div>
            </ul>
        </div>
    );
};
export default Sidebar;
