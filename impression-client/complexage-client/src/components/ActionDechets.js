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
    const validerDechet = async () => {
        if (newData.quantity && newData.type) {
            const fetchedData = await fetchData(
                "/mes/validerdechet/complexage/" + data.datte,
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
                    <option value="Dechet reglage BAT">
                        Déchet réglage BAT
                    </option>
                    <option value="Ruban standard">Ruban non standard</option>
                    <option value="Fin de bobine">Fin de bobine</option>
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
                        Déchet probleème matière
                    </option>
                    <option value="Dechet Reglage">Déchet réglage</option>
                    <option value="Dechet echantillion">
                        Déchet échantillion
                    </option>
                    <option value="Dechet de reperage">
                        Déchet de repérage
                    </option>
                    <option value="Film non traite">Film non traité</option>
                </select>
                <Button
                    variant="outlined"
                    className="confirmer"
                    onClick={() => validerDechet()}
                    endIcon={<SendIcon />}
                >
                    Confirmer
                </Button>
            </div>
        </div>
    );
}
