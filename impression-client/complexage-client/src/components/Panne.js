import React, { useState } from "react";
import { fetchData } from "../functions/functions";
import "./Panne.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Panne = ({ display, data }) => {
    const [cause, setCause] = useState("");
    const saveArret = async () => {
        const fetchedData = await fetchData(
            "/mes/savearret/complexage/" + data.datte,
            "PUT",
            { cause }
        );
        if (fetchedData.success) {
            NotificationManager.success("Success");
        } else {
            NotificationManager.error("Error");
            console.error(fetchedData.error);
        }
    };
    return (
        <div
            className="panne-container"
            style={{ display: display ? "flex" : "none" }}
        >
            <NotificationContainer />
            <select
                name="pannes"
                id="pannes"
                onChange={(e) => setCause(e.target.value)}
            >
                <option value="Panne électrique">Panne électrique</option>
                <option value="Panne mécanique">Panne mécanique</option>
                <option value="Changement de série">
                    Changement d'article
                </option>
                <option value="Réglage">Réglage</option>
                <option value="Nettoyage">Nettoyage</option>
                <option value="Coupure utilité">Coupure utilité</option>
                <option value="Absence programme">Absence programme</option>
                <option value="Rupture MP">Rupture MP</option>
                <option value="Maintenance préventive">
                    Maintenance préventive
                </option>
                <option value="Changement bobine">Changement bobine</option>
                <option value="Passage film">Passage film</option>
                <option value="Changement de colle">Changement de colle</option>
                <option value="Montage bobine enrouleur">
                    Montage bobine enrouleur
                </option>
                <option value="Montage bobine dérouleur">
                    Montage bobine dérouleur
                </option>
                <option value="Changement cylindre">Changement cylindre</option>
            </select>
            <button className="panne-valider" onClick={() => saveArret()}>
                Valider
            </button>
        </div>
    );
};
export default Panne;
