import React, { useState } from "react";
import { fetchData } from "../functions/functions";
import "./Panne.css";

const Panne = ({ display, data }) => {
    const [cause, setCause] = useState("");
    const saveArret = async () => {
        const fetchedData = await fetchData(
            "/mes/savearret/varex/" + data.datte,
            "PUT",
            { cause }
        );
        if (fetchedData.success) {
            window.alert("Success");
        } else {
            window.alert("Error");
            console.error(fetchedData.error);
        }
    };
    return (
        <div
            className="panne-container"
            style={{ display: display ? "flex" : "none" }}
        >
            <select
                name="pannes"
                id="pannes"
                onChange={(e) => setCause(e.target.value)}
            >
                <option value="Panne électrique">Panne électrique</option>
                <option value="Panne mécanique">Panne mécanique</option>
                <option value="Changement de série">Changement de série</option>
                <option value="Réglage">Réglage</option>
                <option value="Nettoyage">Nettoyage</option>
                <option value="Coupure utilité">Coupure utilité</option>
                <option value="Absence programme">Absence programme</option>
                <option value="Rupture MP">Rupture MP</option>
                <option value="Maintenance préventive">
                    Maintenance préventive
                </option>
            </select>
            <button className="panne-valider" onClick={() => saveArret()}>
                Valider
            </button>
        </div>
    );
};
export default Panne;
