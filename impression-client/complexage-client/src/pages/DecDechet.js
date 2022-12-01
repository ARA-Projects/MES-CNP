import "./DecDechet.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { fetchData } from "../functions/functions";

const DecDechet = ({ data }) => {
    const [type, setType] = useState("");
    const [quantite, setQuantite] = useState("");
    const saveDechet = async () => {
        const fetchedData = await fetchData(
            "/mes/savedechet/complexage",
            "POST",
            {
                quantite,
                type,
            }
        );
        if (fetchedData.success) {
            window.location.reload();
        } else {
            window.alert("Error");
            console.error(fetchedData.error);
        }
    };
    return (
        <React.Fragment>
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
                                defaultValue={"DEFAULT"}
                            >
                                <option value="DEFAULT" disabled>
                                    --Choisir une option--
                                </option>
                                <option value="Nettoyage">Nettoyage</option>
                                <option value="Démarrage">Démarrage</option>
                                <option value="Changement de série">
                                    Changement de série
                                </option>
                            </select>
                            <button
                                className="valider"
                                onClick={() => saveDechet()}
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
