import "./DecNC.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { fetchData } from "../functions/functions";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const DecNC = ({ data }) => {
    const navigate = useNavigate();
    const [motif, setMotif] = useState("");
    const [quantite, setQuantite] = useState("");
    const saveNonConf = async () => {
        if (quantite && motif) {
            const fetchedData = await fetchData(
                "/mes/savenonconforme/decoupage",
                "POST",
                { quantite, motif }
            );
            if (fetchedData.success) {
                NotificationManager.success("Success");
                navigate("/Page1");
            } else {
                NotificationManager.error("Error");
                console.error(fetchedData.error);
            }
        } else {
            NotificationManager.error("Error");
        }
    };
    return (
        <React.Fragment>
            <NotificationContainer />
            <div className="page2">
                <div className="logo-1 col-2">
                    <img src={homepicrot} alt="logo" className="logo-img" />
                </div>
                <div className="all-div">
                    <Sidebar />
                    <div className="page3-content">
                        <div className="NC-head">Déclaration non conforme</div>
                        <div className="NC-body">
                            <input
                                type="number"
                                min={0}
                                id="Quantité"
                                placeholder="Quantité en Kg"
                                onChange={(e) => {
                                    setQuantite(e.target.value);
                                }}
                            />
                            <select
                                name="pannes"
                                id="pannes"
                                onChange={(e) => {
                                    setMotif(e.target.value);
                                }}
                                defaultValue={""}
                            >
                                <option value="" disabled>
                                    --Choisir une option--
                                </option>
                                <option value="Mauvaise impression">
                                    Mauvaise impression
                                </option>
                                <option value="Décalage d'impression">
                                    Décalage d'impression
                                </option>
                                <option value="Fantome sur impression">
                                    Fantome sur impression
                                </option>
                                <option value="Mauvais alignement">
                                    Mauvais alignement
                                </option>
                                <option value="Manque d'impression">
                                    Manque d'impression
                                </option>
                                <option value="Mauvaise découpe">
                                    Mauvaise découpe
                                </option>
                                <option value="Bulle d'aire">
                                    Bulle d'aire
                                </option>
                                <option value="Nuance couleur">
                                    Nuance couleur
                                </option>
                                <option value="MP non triaté">
                                    MP non triaté
                                </option>
                                <option value="Manque complexage">
                                    Manque complexage
                                </option>
                                <option value="Pli sur impression">
                                    Pli sur impression
                                </option>
                                <option value="Aspect non conforme">
                                    Aspect non conforme
                                </option>
                                <option value="Sens d'impression non conforme">
                                    Sens d'impression non conforme
                                </option>
                                <option value="Poids hors tolérance">
                                    Poids hors tolérance
                                </option>
                                <option value="Dimension non conforme">
                                    Dimension non conforme
                                </option>
                                <option value="Coef de frottement non conforme">
                                    Coef de frottement non conforme
                                </option>
                                <option value="Problème mandrin">
                                    Problème mandrin
                                </option>
                                <option value="Bavure">Bavure</option>
                                <option value="MP non conforme">
                                    MP non conforme
                                </option>
                                <option value="Trace de choc">
                                    Trace de choc
                                </option>
                                <option value="Curling">Curling</option>
                            </select>
                            <button
                                className="valider"
                                onClick={() => {
                                    saveNonConf();
                                }}
                            >
                                Valider
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <Link to="/Page1">
                        <img className="exit" src={leave} alt="exit" />
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DecNC;
