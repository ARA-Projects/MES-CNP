import "./Page2.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import List from "../components/List";
import Sidebar from "../components/Sidebar";
import { fetchPHP, fetchData } from "../functions/functions";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import homepicrot from "../assets/homepicrot.png";
import macchi1 from "../assets/macchi.png";
import leave from "../assets/leave.png";

const Page2 = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        N_OF: "",
        debit: 0,
        ref: Array(24).fill("-"),
        per: Array(24).fill(0),
        lot: Array(24).fill("-"),
    });
    const [showList, setShowList] = useState(false);

    const display = useCallback(() => {
        setShowList((prevState) => !prevState);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(data).some((value) => !value);
        if (isEmpty) {
            NotificationManager.error("Error");
            return;
        }

        const link = `/A_ICONS/Operator/Extrusion/macchi2/Php_Pages/${
            data.N_OF ? "modify_of.php" : "save_new_of.php"
        }`;

        const result = await fetchData(
            `/mes/getof/macchi2/${data.N_OF}`,
            "GET"
        );

        if (result.success && result.data.exists) {
            const modifiedData = { ...data };
            delete modifiedData.id;
            delete modifiedData.enprod;
            delete modifiedData.pause;

            for (let i = 1; i <= 24; i++) {
                modifiedData[`ref${i}`] = modifiedData[`comp${i}`];
                modifiedData[`per${i}`] = modifiedData[`p_comp${i}`];
                delete modifiedData[`comp${i}`];
                delete modifiedData[`p_comp${i}`];
            }

            const saveResult = await fetchPHP(link, modifiedData);

            if (saveResult === "Success@") {
                NotificationManager.success("OF enregistré");
                navigate("/Page1");
            } else {
                console.error(saveResult);
                NotificationManager.error("Internal error");
            }
        } else {
            console.error(result.error);
            NotificationManager.error("Internal error");
        }
    };

    const getOF = async (value) => {
        if (value) {
            const result = await fetchData(
                `/mes/getof/macchi2/${value}`,
                "GET"
            );
            if (result.success && result.data.exists) {
                const { id, enprod, pause, ...newData } = result.data.data;

                for (let i = 1; i <= 24; i++) {
                    newData[`ref${i}`] = newData[`comp${i}`];
                    newData[`per${i}`] = newData[`p_comp${i}`];
                    delete newData[`comp${i}`];
                    delete newData[`p_comp${i}`];
                }

                setData(newData);
            }
        } else {
            setData({
                N_OF: "",
                debit: 0,
                ref: Array(24).fill("-"),
                per: Array(24).fill(0),
                lot: Array(24).fill("-"),
            });
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
                        <h1>Résultat instantané - Macchi2</h1>
                    </div>
                    <form className="top-down" onSubmit={handleSubmit}>
                        <div className="top">
                            <div>
                                <h2 className="of-header">
                                    Ordre de fabrication
                                </h2>
                            </div>
                            <div id="upperInputs">
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
                                            setData((prevData) => ({
                                                ...prevData,
                                                N_OF: e.target.value,
                                            }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        placeholder="Quantité Objectif"
                                        min={0}
                                        required
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
                                            setData((prevData) => ({
                                                ...prevData,
                                                debit: e.target.value,
                                            }))
                                        }
                                        required
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
                                    <p className="dropdown" onClick={display}>
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
