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
        motif: data.motif,
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
        if (newData.quantity && newData.motif) {
            const fetchedData = await fetchData(
                "/mes/validernc/complexage/" + data.datte,
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
                    value={newData.motif}
                    onChange={(e) =>
                        setNewData({ ...newData, type: e.target.value })
                    }
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
                    <option value="Mauvaise découpe">Mauvaise découpe</option>
                    <option value="Bulle d'aire">Bulle d'aire</option>
                    <option value="Nuance couleur">Nuance couleur</option>
                    <option value="MP non triaté">MP non triaté</option>
                    <option value="Manque complexage">Manque complexage</option>
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
                    <option value="Problème mandrin">Problème mandrin</option>
                    <option value="Bavure">Bavure</option>
                    <option value="MP non conforme">MP non conforme</option>
                    <option value="Trace de choc">Trace de choc</option>
                    <option value="Curling">Curling</option>
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
