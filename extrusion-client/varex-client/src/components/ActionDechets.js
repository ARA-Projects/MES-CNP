import * as React from "react";
import { useState } from "react";
import { fetchData } from "../functions/functions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./ActionDechets.css";

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
                window.alert("Wrong login");
                console.error(fetchedData.error);
            }
        } else {
            window.alert("Enter your credentials");
        }
    };
    const validerDechet = async () => {
        if (newData.quantity && newData.type) {
            const fetchedData = await fetchData(
                "/mes/validerdechet/varex/" + data.datte,
                "PUT",
                newData
            );
            if (fetchedData.success) {
            } else {
                window.alert("Error");
                console.error(fetchedData.error);
            }
        } else {
            window.alert("Error");
        }
    };
    return (
        <div
            className="alert-container"
            style={{ display: display ? "flex" : "none" }}
        >
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
                    <option value="Dechet de changement">
                        Déchet de changement
                    </option>
                    <option value="Dechet echantillion">
                        Déchet échantillion
                    </option>
                    <option value="Dechet panne machine">
                        Déchet panne machine
                    </option>
                    <option value="Dechet coupure courant">
                        Déchet coupure courant
                    </option>
                    <option value="Dechet Probleme MP">
                        Déchet Problème MP
                    </option>
                    <option value="Dechet Purge">Déchet Purge</option>
                    <option value="Dechet Ruban">Déchet Ruban</option>
                    <option value="Dechet Reglage">Déchet Reglage</option>
                    <option value="Dechet Demarrage">Déchet Démarrage</option>
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
