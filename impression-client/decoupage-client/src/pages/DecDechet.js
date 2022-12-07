import "./DecDechet.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { fetchData } from "../functions/functions";

const DecDechet = ({ data }) => {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [quantite, setQuantite] = useState("");
    const saveDechet = async () => {
        if (quantite && type) {
            const fetchedData = await fetchData(
                "/mes/savedechet/decoupage",
                "POST",
                {
                    quantite,
                    type,
                }
            );
            if (fetchedData.success) {
                navigate("/Page1");
            } else {
                window.alert("Error");
                console.error(fetchedData.error);
            }
        } else {
            window.alert("Error");
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
                                defaultValue={""}
                            >
                                <option value="" disabled>
                                    --Choisir une option--
                                </option>
                                <option value="Dechet reglage BAT">
                                    Dechet reglage BAT
                                </option>
                                <option value="Ruban standard">
                                    Ruban non standard
                                </option>
                                <option value="Fin de bobine">
                                    Fin de bobine
                                </option>
                                <option value="Dechet coupure courant">
                                    Dechet coupure courant
                                </option>
                                <option value="Raccord impression + complexage">
                                    Raccord impression + complexage
                                </option>
                                <option value="Fin de bobine vierge">
                                    Fin de bobine vierge
                                </option>
                                <option value="Dechet probleme matiere">
                                    Dechet probleme matiere
                                </option>
                                <option value="Dechet Reglage">
                                    Dechet Reglage
                                </option>
                                <option value="Dechet echantillion">
                                    Dechet echantillion
                                </option>
                                <option value="Dechet de reperage">
                                    Dechet de reperage
                                </option>
                                <option value="Film non traite">
                                    Film non traite
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
