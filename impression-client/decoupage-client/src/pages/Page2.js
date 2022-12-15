import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import decoupe from "../assets/decoupe.png";
import Sidebar from "../components/Sidebar";
import { fetchData, fetchPHP } from "../functions/functions";
import * as React from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

let preData = {
    N_OF: "",
    designation: "-",
    qt_ob: 0,
    qt_ob_unit: "METER",
    vitesse: 0,
    epaisseur: 0,
    laise: 0,
    masse_volume: 0,
    epaisseur_comp: 0,
    laise_comp: 0,
    masse_volume_comp: 0,
    dechet_droit: 0,
    dechet_gauche: 0,
    nbr_bobine: 0,
};
const Page2 = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(preData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let doit = true;
        for (const key in data) {
            if (!data[key] && (key === "qt_ob" || key === "N_OF")) {
                doit = false;
                break;
            }
        }
        if (doit) {
            let link =
                "/A_ICONS/Operator/Impression/Decoupage/Php_Pages/nouveauOF.php";
            let result = await fetchPHP(link, data);
            if (result === "Success@") {
                NotificationManager.success("OF enregistré");
                navigate("/Page1");
            } else {
                console.error(result);
                NotificationManager.error("Internal error");
            }
        }
    };
    const getArticle = async (value) => {
        if (data.designation) {
            const result = await fetchData(
                "/mes/getarticle/decoupage/" + value,
                "GET"
            );
            if (result.success) {
                if (result.data.exists) {
                    let newData = result.data.data;
                    for (const d in result.data.data) {
                        if (d === "id") {
                            delete newData.id;
                            continue;
                        } else if (d === "largeur_ruban") {
                            newData.dechet_droit =
                                Number(newData.largeur_ruban) / 2;
                            newData.dechet_gauche =
                                Number(newData.largeur_ruban) / 2;
                            delete newData.largeur_ruban;
                        } else {
                            newData.qt_ob = data.qt_ob;
                            newData.qt_ob_unit = data.qt_ob_unit;
                            newData.nbr_bobine = data.nbr_bobine;
                        }
                    }
                    setData(newData);
                }
            }
        }
    };
    const getOF = async (value) => {
        if (value) {
            const result = await fetchData(
                "/mes/getof/decoupage/" + value,
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
                        }
                    }
                    setData(newData);
                }
            } else {
                console.error(result.error);
                NotificationManager.error("Internal error");
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
                        <h1>Résultat instantané - Découpage</h1>
                    </div>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        className="top-middle-down"
                    >
                        <button className="button_valider">Valider</button>
                        <div className="top">
                            <div>
                                <h2>Ordre de fabrication</h2>
                            </div>
                            <div>
                                <div className="numOF">
                                    <label>Numéro OF</label>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        min={0}
                                        value={data.N_OF}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                N_OF: e.target.value,
                                            });
                                        }}
                                    />
                                    <div
                                        className="button_rechercher"
                                        onClick={() => {
                                            getOF(data.N_OF);
                                        }}
                                    >
                                        Rechercher OF
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="numOF">
                                    <label>Référence article</label>
                                    <input
                                        type="text"
                                        className="nOf"
                                        value={data.designation}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                designation: e.target.value,
                                            });
                                            getArticle(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <label>Qte Objectif</label>
                                    <input
                                        type="number"
                                        className="qte-obj"
                                        id="Numéro d'OF"
                                        min={0}
                                        value={data.qt_ob}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                qt_ob: e.target.value,
                                            });
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="down">
                            <div className="affichage">
                                <div className="affichage-impression">
                                    <h3>Bobine mère</h3>
                                    <div className="div-1">
                                        <label>Epaisseur Laize</label>
                                        <input
                                            type={"number"}
                                            value={data.epaisseur}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    epaisseur: e.target.value,
                                                });
                                            }}
                                        />
                                        <label>um</label>
                                    </div>
                                    <div className="div-1">
                                        <label>Largeur Laize</label>
                                        <input
                                            type={"number"}
                                            value={data.laize}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    laize: e.target.value,
                                                });
                                            }}
                                        />
                                        <label>mm</label>
                                    </div>
                                    <div className="div-1">
                                        <label>Masse volumique</label>
                                        <input
                                            type={"number"}
                                            value={data.masse_volume}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    masse_volume:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                        <label>Kg/cm3</label>
                                    </div>
                                    <div className="div-1">
                                        <label>Vitesse théorique</label>
                                        <input
                                            type={"number"}
                                            value={data.vitesse}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    vitesse: e.target.value,
                                                });
                                            }}
                                        />
                                        <label>m/min</label>
                                    </div>
                                </div>
                                <div className="affichage-complexage">
                                    <div className="div-2">
                                        <label>Nbre de pistes</label>
                                        <input
                                            type={"number"}
                                            value={data.nbr_bobine}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    nbr_bobine: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="div-2">
                                        <label>Déchet ruban droit</label>
                                        <input
                                            type={"number"}
                                            value={data.dechet_droit}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    dechet_droit:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                        <label>mm</label>
                                    </div>
                                    <div className="div-2">
                                        <label>Déchet ruban gauche</label>
                                        <input
                                            type={"number"}
                                            value={data.dechet_gauche}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    dechet_gauche:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                        <label>mm</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img
                                    className="machine"
                                    src={decoupe}
                                    alt="decoupe"
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
