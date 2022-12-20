import "./Page1.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../functions/functions";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import nonSelec from "../assets/pizza.png";
import ofSelec from "../assets/odf.png";
import results from "../assets/results.png";
import nonConforme from "../assets/nonConforme.png";
import dechets from "../assets/dechets.png";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import Alert from "../components/Alert";
import AlertNC from "../components/AlertNC";
var ok = 0;

const Page1 = () => {
    const navigate = useNavigate();
    const [pizza, setPizza] = useState(nonSelec);
    const [data, setData] = useState({
        debit: 0,
        qp: 0,
        tf: "00:00:00",
        ta: "00:00:00",
        trs: 0,
        tq: 0,
        td: 0,
        tp: 0,
        arret: [],
        dechets: [],
        non_conf: [],
    });
    let fetching = false;

    const getData = async () => {
        fetching = true;
        const fetchedData = await fetchData("/mes/resultat/decoupage", "GET");
        if (fetchedData.success) {
            setData(fetchedData.data);
        } else {
            console.error(fetchedData.error);
        }
        fetching = false;
    };

    const logout = async () => {
        const fetchedData = await fetchData("/mes/logout/decoupage", "PUT");
        if (fetchedData.success) {
            navigate("/Home");
        } else {
            console.error(fetchedData.error);
        }
    };

    useEffect(() => {
        setInterval(() => {
            if (!fetching) getData();
        }, 1000);
    }, []);
    return (
        <div className="page1">
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="all-div">
                <Sidebar />
                <div className="content">
                    <div className="title">
                        <h1>Résultat instantané - Découpage</h1>
                    </div>
                    <div className="left-right">
                        <div className="left">
                            <img
                                className="default-img"
                                src={pizza}
                                useMap="#image-map"
                                alt="pizza"
                            />
                            <map name="image-map">
                                <area
                                    className="ok"
                                    target=""
                                    alt="ok"
                                    title="ok"
                                    href=""
                                    coords="219,351,175,306,175,224,225,179,284,174,333,202,356,239,353,294,338,323,314,345,271,361"
                                    shape="poly"
                                    onClick={() => {
                                        switch (ok) {
                                            case 1:
                                                navigate("/Page2");
                                                break;
                                            case 2:
                                                navigate("/Results");
                                                break;
                                            case 3:
                                                navigate("/DecNC");
                                                break;
                                            case 4:
                                                navigate("/DecDechet");
                                                break;
                                            default:
                                                console.log("error");
                                        }
                                    }}
                                />
                                <area
                                    className="odf"
                                    alt="odf"
                                    title="odf"
                                    coords="374,66,347,118,307,178,285,171,261,167,236,170,211,179,190,143,169,102,151,68,187,50,228,39,289,40,332,50"
                                    shape="poly"
                                    onClick={() => {
                                        setPizza(ofSelec);
                                        ok = 1;
                                    }}
                                />
                                <area
                                    className="resultat"
                                    target=""
                                    alt="resultat"
                                    title="resultat"
                                    coords="203,182,174,137,131,77,107,98,77,134,61,160,40,207,34,253,99,262,160,262,175,218"
                                    shape="poly"
                                    onClick={() => {
                                        setPizza(results);
                                        ok = 2;
                                    }}
                                />
                                <area
                                    className="nonConforme"
                                    target=""
                                    alt="nonConforme"
                                    title="nonConforme"
                                    coords="161,272,94,274,35,277,44,340,67,389,104,434,132,459,163,416,205,351,168,323"
                                    shape="poly"
                                    onClick={() => {
                                        setPizza(nonConforme);
                                        ok = 3;
                                    }}
                                />
                                <area
                                    className="dechet"
                                    target=""
                                    alt="dechet"
                                    title="dechet"
                                    coords="212,355,184,407,151,469,192,488,259,500,317,490,373,470,349,424,311,356,264,372"
                                    shape="poly"
                                    onClick={() => {
                                        setPizza(dechets);
                                        ok = 4;
                                    }}
                                />
                            </map>
                        </div>
                        <div className="righ">
                            <div className="cards">
                                <div className="first-row">
                                    <div className="qpc">
                                        <p>Débit réel</p>
                                        <hr />
                                        <h4>{data.debit} kg/h</h4>
                                    </div>
                                    <div className="qpc">
                                        <p>Qte Prod Conforme</p>
                                        <hr />
                                        <h4>{Math.floor(data.qp)} kg</h4>
                                    </div>
                                    <div className="qpc">
                                        <p>Temps de Fct</p>
                                        <hr />
                                        <h3 className="gt">{data.tf}</h3>
                                        <h3 className="rt">{data.ta}</h3>
                                    </div>
                                </div>
                                <div className="second-row">
                                    <div className="trs">
                                        <p>TRS</p>
                                        <hr />
                                        <h4>{Math.floor(data.trs)}%</h4>
                                    </div>
                                    <div className="trs">
                                        <p>TD</p>
                                        <hr />
                                        <h4>{Math.floor(data.td)}%</h4>
                                    </div>
                                    <div className="trs">
                                        <p>TP</p>
                                        <hr />
                                        <h4>{Math.floor(data.tp)}%</h4>
                                    </div>
                                    <div className="trs">
                                        <p>TQ</p>
                                        <hr />
                                        <h4>{Math.floor(data.tq)}%</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="scrolling">
                                <div className="msgs">
                                    {data.arret.map((arret, i) => {
                                        return (
                                            <Messages key={i} data={arret} />
                                        );
                                    })}
                                    {data.dechets.map((dechets, i) => {
                                        return <Alert key={i} data={dechets} />;
                                    })}
                                    {data.non_conf.map((non_conf, i) => {
                                        return (
                                            <AlertNC key={i} data={non_conf} />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2">
                <img
                    className="exit"
                    src={leave}
                    alt="exit"
                    onClick={() => logout()}
                />
            </div>
        </div>
    );
};

export default Page1;
