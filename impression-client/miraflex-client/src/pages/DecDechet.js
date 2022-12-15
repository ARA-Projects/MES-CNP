import "./DecDechet.css";
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

const DecDechet = ({ data }) => {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [quantite, setQuantite] = useState("");
    const saveDechet = async () => {
        if (quantite && type) {
            const fetchedData = await fetchData(
                "/mes/savedechet/miraflex",
                "POST",
                {
                    quantite,
                    type,
                }
            );
            if (fetchedData.success) {
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
                        <div className="dechet-head">Déclaration déchet</div>
                        <div className="dechet-body">
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
                                onChange={(e) => setType(e.target.value)}
                                defaultValue={""}
                            >
                                <option value="" disabled>
                                    --Choisir une option--
                                </option>
                                <option value="Dechet reglage BAT">
                                    Dechet réglage BAT
                                </option>
                                <option value="Ruban standard">
                                    Ruban non standard
                                </option>
                                <option value="Fin de bobine">
                                    Fin de bobine
                                </option>
                                <option value="Dechet coupure courant">
                                    Déchet coupure courant
                                </option>
                                <option value="Raccord impression + complexage">
                                    Raccord impression + complexage
                                </option>
                                <option value="Fin de bobine vierge">
                                    Fin de bobine vierge
                                </option>
                                <option value="Dechet probleme matiere">
                                    Déchet problème matière
                                </option>
                                <option value="Dechet Reglage">
                                    Déchet réglage
                                </option>
                                <option value="Dechet echantillion">
                                    Déchet échantillion
                                </option>
                                <option value="Dechet de reperage">
                                    Déchet de repérage
                                </option>
                                <option value="Film non traite">
                                    Film non traité
                                </option>
                            </select>
                            <button
                                className="valider"
                                onClick={() => {
                                    saveDechet();
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

export default DecDechet;
