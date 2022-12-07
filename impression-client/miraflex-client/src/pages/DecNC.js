import "./DecNC.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { fetchData } from "../functions/functions";

const DecNC = ({ data }) => {
    const navigate = useNavigate();
    const [motif, setMotif] = useState("");
    const [quantite, setQuantite] = useState("");
    const saveNonConf = async () => {
        if (quantite && motif) {
            const fetchedData = await fetchData(
                "/mes/savenonconforme/miraflex",
                "POST",
                { quantite, motif }
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
                                defaultValue={""}
                            >
                                <option value="" disabled>
                                    --Choisir une option--
                                </option>
                                <option value="Sur diamètre">
                                    Sur diamètre
                                </option>
                                <option value="Ovalité">Ovalité</option>
                                <option value="Manque diamètre">
                                    Manque diamètre
                                </option>
                                <option value="Epaisseur max">
                                    Epaisseur max
                                </option>
                                <option value="Epaisseur min">
                                    Epaisseur min
                                </option>
                                <option value="Longueur NC">Longueur NC</option>
                                <option value="Poids/mètre NC">
                                    Poids/mètre NC
                                </option>
                                <option value="Défaut marquage">
                                    Défaut marquage
                                </option>
                            </select>
                            <button
                                className="valider"
                                onClick={() => saveNonConf()}
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
