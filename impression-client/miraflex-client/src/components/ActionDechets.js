import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../functions/functions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./ActionDechets.css";

export default function Action({ display, data }) {
    const navigate = useNavigate();
    const [valide, setValide] = useState(0);
    const [div1, setDiv1] = useState();
    const [div2, setDiv2] = useState();
    const [matricule, setMatricule] = useState("");
    const login = async () => {
        const fetchedData = await fetchData("/mes/loginQ/miraflex", "PUT", {
            matricule,
        });
        if (fetchedData.success) {
            if (fetchedData.data.connected) {
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
        const fetchedData = await fetchData(
            "/mes/validerdechet/miraflex/" + data.datte,
            "PUT",
            { valide }
        );
        if (fetchedData.success) {
            setValide(1);
        } else {
            window.alert("Error");
            console.error(fetchedData.error);
        }
    };
    const deleteDechet = async () => {
        const fetchedData = await fetchData(
            "/mes/deletedechet/miraflex/" + data.datte,
            "DELETE"
        );
        if (fetchedData.success) {
            navigate("/DecDechet");
        } else {
            window.alert("Error");
            console.error(fetchedData.error);
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
                <Button
                    variant="outlined"
                    className="confirmer"
                    onClick={() => validerDechet()}
                >
                    Confirmer
                </Button>
                <Button
                    variant="contained"
                    className="modifier"
                    endIcon={<SendIcon />}
                    onClick={() => deleteDechet()}
                >
                    Modifier
                </Button>
            </div>
        </div>
    );
}
