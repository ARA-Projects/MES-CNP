import "./Results.css";
import { useState, useEffect } from "react";
import homepicrot from "../assets/homepicrot.png";
import { fetchData } from "../functions/functions";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Page1 = () => {
    const [data, setData] = useState([]);
    const getData = async () => {
        const fetchedData = await fetchData("/mes/historique/decoupage", "GET");
        if (fetchedData.success) {
            setData(fetchedData.data);
        } else {
            console.error(fetchedData.error);
        }
    };
    useEffect(() => {
        setInterval(() => {
            getData();
        }, 1000);
    }, []);
    let i = 0;
    return (
        <div className="page1">
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="all-div">
                <Sidebar />
                <div className="content">
                    <div className="title">
                        <h1>Historique des résultats</h1>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>Qté Prod (Kg)</th>
                                    <th>Qté déchet (Kg)</th>
                                    <th>Qté non conforme (Kg)</th>
                                    <th>TRS (%)</th>
                                    <th>TP (%)</th>
                                    <th>TQ (%)</th>
                                    <th>TD (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row) => {
                                    return (
                                        <tr key={i++}>
                                            <td>{row.date}</td>
                                            <td>{row.heure}</td>
                                            <td>{row.qp.toFixed(2)}</td>
                                            <td>{Math.floor(row.qdech)}</td>
                                            <td>{Math.floor(row.qnc)}</td>
                                            <td>{Math.floor(row.trs)}</td>
                                            <td>{Math.floor(row.tp)}</td>
                                            <td>{Math.floor(row.tq)}</td>
                                            <td>{Math.floor(row.td)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-2">
                <Link to="/Page1">
                    <img className="exit" src={leave} alt="exit" />
                </Link>
            </div>
        </div>
    );
};

export default Page1;
