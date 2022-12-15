import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import macchi1 from "../assets/macchi.png";
import { useState } from "react";
import List from "../components/List";
import Sidebar from "../components/Sidebar";
import { fetchPHP, fetchData } from "../functions/functions";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

let preData = {
    N_OF: "",
    debit: 0,
};
for (let i = 1; i <= 24; i++) {
    preData["ref" + i] = "-";
    preData["per" + i] = 0;
    preData["lot" + i] = "-";
}

const Page2 = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(preData);
    const [showList, setShowList] = useState(false);
    function display() {
        setShowList(!showList);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let doit = true;
        for (const key in data) {
            if (!data[key] && (key === "debit" || key === "N_OF")) {
                doit = false;
                break;
            }
        }
        if (doit) {
            let link =
                "/A_ICONS/Operator/Extrusion/macchi1/Php_Pages/save_new_of.php";
            let result = await fetchData(
                "/mes/getof/macchi1/" + data.N_OF,
                "GET"
            );
            if (result.success) {
                if (result.data.exists) {
                    link =
                        "/A_ICONS/Operator/Extrusion/macchi1/Php_Pages/modify_of.php";
                }
                result = await fetchPHP(link, data);
                if (result === "Success@") {
                    NotificationManager.success("OF enregistré");
                    navigate("/Page1");
                } else {
                    console.error(result);
                    NotificationManager.error("Internal error");
                }
            } else {
                console.error(result.error);
                NotificationManager.error("Internal error");
            }
        } else {
            NotificationManager.error("Error");
        }
    };
    const getOF = async (value) => {
        if (value) {
            const result = await fetchData(
                "/mes/getof/macchi1/" + value,
                "GET"
            );
            if (result.success) {
                if (result.data.exists) {
                    let newData = result.data.data;
                    for (const d in result.data.data) {
                        if (d === "id") {
                            delete newData.id;
                            continue;
                        } else if (d === "enprod") {
                            delete newData.enprod;
                            continue;
                        } else if (d === "pause") {
                            delete newData.pause;
                            continue;
                        } else if (d.substring(0, 4) === "comp") {
                            newData[d.replace("comp", "ref")] = newData[d];
                            delete newData[d];
                        } else if (d.substring(0, 6) === "p_comp") {
                            newData[d.replace("p_comp", "per")] = newData[d];
                            delete newData[d];
                        }
                    }
                    setData(newData);
                }
            } else {
                console.error(result.error);
                NotificationContainer.error("Internal error");
            }
        } else {
            setData(preData);
        }
    };
    return (
        <div className="page2">
            <NotificationContainer />
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="all-div">
                <Sidebar />
                <div className="content">
                    <div className="title">
                        <h1>Résultat instantané - Macchi1</h1>
                    </div>
                    <form
                        className="top-down"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="top">
                            <div>
                                <h2 className="of-header">
                                    Ordre de fabrication
                                </h2>
                            </div>
                            <div>
                                <div>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        placeholder="Numéro d'OF"
                                        min={0}
                                        value={data.N_OF}
                                        onChange={(e) => {
                                            getOF(e.target.value);
                                            setData({
                                                ...data,
                                                N_OF: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="down">
                            <div>
                                <div>
                                    <label className="dt">Débit th</label>
                                    <input
                                        className="nth-child-1"
                                        type="number"
                                        id="Référence article"
                                        placeholder="Débit théorique (kg/h)"
                                        value={data.debit}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                debit: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <img
                                    className="machine"
                                    src={macchi1}
                                    alt="macchi1"
                                />
                            </div>
                            <div className="dropdown-list">
                                <div>
                                    <p
                                        className="dropdown"
                                        onClick={() => display()}
                                    >
                                        Recette
                                    </p>
                                </div>
                                <List
                                    display={showList}
                                    data={data}
                                    setData={setData}
                                />
                            </div>
                        </div>
                    </form>
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

export default Page2;
