import * as React from "react";
import { useState } from "react";
import { fetchData } from "../functions/functions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./ActionDechets.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function Action({ display, data }) {
    const [div1, setDiv1] = useState();
    const [div2, setDiv2] = useState();
    const [matricule, setMatricule] = useState("");
    const [newData, setNewData] = useState({
        quantity: data.quantite,
        type: data.type,
    });
    const login = async () => {
        const fetchedData = await fetchData(
            "/mes/checkqualite/" + matricule,
            "GET"
        );
        if (fetchedData.success) {
            if (fetchedData.data.valide) {
                setDiv1({
                    display: "none",
                });
                setDiv2({
                    display: "flex",
                });
            } else {
                NotificationManager.error("Wrong login");
                console.error(fetchedData.error);
            }
        } else {
            NotificationManager.error("Enter your credentials");
        }
    };
    const validerNC = async () => {
        if (newData.quantity && newData.type) {
            const fetchedData = await fetchData(
                "/mes/validerdechet/macchi1/" + data.datte,
                "PUT",
                newData
            );
            if (fetchedData.success) {
            } else {
                NotificationManager.error("Error");
                console.error(fetchedData.error);
            }
        } else {
            NotificationManager.error("Error");
        }
    };
    return (
        <div
            className="alert-container"
            style={{ display: display ? "flex" : "none" }}
        >
            <NotificationContainer />
            <div className="div1" style={div1}>
                {" "}
                <TextField
                    id="outlined-basic"
                    label="Matricule"
                    variant="outlined"
                    type="number"
                    onChange={(e) => {
                        setMatricule(e.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => login()}
                >
                    Valider
                </Button>
            </div>
            <div className="div2" style={div2}>
                <input
                    type="number"
                    value={newData.quantity}
                    onChange={(e) =>
                        setNewData({ ...newData, quantity: e.target.value })
                    }
                />
                <select
                    name="pannes"
                    id="pannes"
                    value={newData.type}
                    onChange={(e) =>
                        setNewData({ ...newData, type: e.target.value })
                    }
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
                    <option value="Nuance couleur">Nuance couleur</option>
                    <option value="Problème mandrin">Problème mandrin</option>
                    <option value="Décalage soufflet">Décalage soufflet</option>
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
                    <option value="Manque traitement">Manque traitement</option>
                    <option value="Manque de serrage">Manque de serrage</option>
                    <option value="Métrage hors tolérance">
                        Métrage hors tolérance
                    </option>
                    <option value="Caisse cassé">Caisse cassé</option>
                    <option value="Collage">Collage</option>
                    <option value="Trace sur film">Trace sur film</option>
                    <option value="Trace de choc">Trace de choc</option>
                    <option value="Longueur hors tolérance">
                        Longueur hors tolérance
                    </option>
                    <option value="Manque impression">Manque impression</option>
                    <option value="Soudure non conforme">
                        Soudure non conforme
                    </option>
                    <option value="Présence des insects">
                        Présence des insects
                    </option>
                    <option value="Infondu">Infondu</option>
                    <option value="Sac déchiré">Sac déchiré</option>
                </select>
                <Button
                    variant="outlined"
                    className="confirmer"
                    onClick={() => validerNC()}
                    endIcon={<SendIcon />}
                >
                    Confirmer
                </Button>
            </div>
        </div>
    );
}
