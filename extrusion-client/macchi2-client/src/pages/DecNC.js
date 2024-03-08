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

const DecNC = () => {
    const navigate = useNavigate();
    const [motif, setMotif] = useState("");
    const [quantite, setQuantite] = useState("");
    const saveNonConf = async () => {
        if (quantite && motif) {
            const fetchedData = await fetchData(
                "/mes/savenonconforme/macchi2",
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
                                onChange={(e) => setQuantite(e.target.value)}
                            />
                            <select
                                name="pannes"
                                id="pannes"
                                onChange={(e) => setMotif(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    --Choisir une option--
                                </option>
                                <option value="Poids hors tolérance">
                                    Poids hors tolérance
                                </option>
                                <option value="Mauvais alignements">
                                    Mauvais alignements
                                </option>
                                <option value="Nuance couleur">
                                    Nuance couleur
                                </option>
                                <option value="Problème mandrin">
                                    Problème mandrin
                                </option>
                                <option value="Décalage soufflet">
                                    Décalage soufflet
                                </option>
                                <option value="Aspect non conforme">
                                    Aspect non conforme
                                </option>
                                <option value="Epaisseur non conforme">
                                    Epaisseur non conforme
                                </option>
                                <option value="Tache noire">Tache noire</option>
                                <option value="Largeur hors tolérance">
                                    Largeur hors tolérance
                                </option>
                                <option value="Manque traitement">
                                    Manque traitement
                                </option>
                                <option value="Manque de serrage">
                                    Manque de serrage
                                </option>
                                <option value="Métrage hors tolérance">
                                    Métrage hors tolérance
                                </option>
                                <option value="Caisse cassé">
                                    Caisse cassé
                                </option>
                                <option value="Collage">Collage</option>
                                <option value="Trace sur film">
                                    Trace sur film
                                </option>
                                <option value="Trace de choc">
                                    Trace de choc
                                </option>
                                <option value="Longueur hors tolérance">
                                    Longueur hors tolérance
                                </option>
                                <option value="Manque impression">
                                    Manque impression
                                </option>
                                <option value="Soudure non conforme">
                                    Soudure non conforme
                                </option>
                                <option value="Présence des insects">
                                    Présence des insects
                                </option>
                                <option value="Infondu">Infondu</option>
                                <option value="Sac déchiré">Sac déchiré</option>
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
