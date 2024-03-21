import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import miraflex from "../assets/miraflex.png";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { fetchData, fetchPHP } from "../functions/functions";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}));

let preData = {
    N_OF: "",
    designation: "-",
    qt_ob: 0,
    qt_ob_unit: "KG",
    Epaisseur: 0,
    Laise: 0,
    vth: 0,
    massev: 0,
    alcool: "-",
    "alcool_%": 0,
    ethoxy: "-",
    "ethoxy_%": 0,
    acetate: "-",
    "acetate_%": 0,
};
for (let i = 1; i <= 8; i++) {
    preData["position_" + i] = "-";
    preData["position_" + i + "_%"] = 0;
}
const Page2 = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(preData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let doit = true;
        for (const key in data) {
            if (!data[key] && (key === "qt_ob" || key === "N_OF")) {
                doit = false;
                break;
            }
        }
        if (doit) {
            let link =
                "/A_ICONS/Operator/Impression/Miraflex/Php_Pages/nouveauOF.php";
            let result = await fetchPHP(link, data);
            if (result === "Success@") {
                NotificationManager.success("OF enregistré");
                navigate("/Page1");
            } else {
                console.error(result);
                NotificationManager.error("Internal error");
            }
        }
    };
    const getArticle = async (value) => {
        if (data.designation) {
            const result = await fetchData(
                "/mes/getarticle/miraflex/" + value,
                "GET"
            );
            console.log(result);
            if (result.success) {
                if (result.data.exists) {
                    console.log(result.data.data);
                    let newData = result.data.data;
                    for (const d in result.data.data) {
                        if (d === "id") {
                            delete newData.id;
                            continue;
                        } else if (d === "vitesse") {
                            newData.vth = newData.vitesse;
                            delete newData.vitesse;
                        } else if (d === "laize") {
                            newData.Laize = newData.laize;
                            delete newData.laize;
                        } else if (d === "masse_volume") {
                            newData.massev = newData.masse_volume;
                            delete newData.masse_volume;
                        } else if (d === "epaisseur") {
                            newData.Epaisseur = newData.epaisseur;
                            delete newData.epaisseur;
                        } else {
                            newData.qt_ob = data.qt_ob;
                            newData.qt_ob_unit = data.qt_ob_unit;
                        }
                    }
                    setData(newData);
                }
            }
        }
    };
    const getOF = async (value) => {
        if (value) {
            const result = await fetchData(
                "/mes/getof/miraflex/" + value,
                "GET"
            );
            if (result.success) {
                if (result.data.exists) {
                    let newData = result.data.data;
                    for (const d in result.data.data) {
                        if (d === "id") {
                            delete newData.id;
                            continue;
                        } else if (d === "enprod") {
                            delete newData.enprod;
                            continue;
                        } else if (d === "vitesse") {
                            newData.vth = newData.vitesse;
                            delete newData.vitesse;
                        } else if (d === "laize") {
                            newData.Laize = newData.laize;
                            delete newData.laize;
                        } else if (d === "masse_volume") {
                            newData.massev = newData.masse_volume;
                            delete newData.masse_volume;
                        } else if (d === "epaisseur") {
                            newData.Epaisseur = newData.epaisseur;
                            delete newData.epaisseur;
                        }
                    }
                    setData(newData);
                }
            } else {
                console.error(result.error);
                NotificationManager.error("Internal error");
            }
        } else {
            setData(preData);
        }
    };
    return (
        <div className="page2">
            <NotificationContainer />
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="all-div">
                <Sidebar />
                <div className="content">
                    <div className="title">
                        <h1>Résultat instantané - Miraflex</h1>
                    </div>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                        className="top-down"
                    >
                        <button className="button_valider">Valider</button>
                        <div className="top">
                            <div>
                                <h2>Ordre de fabrication</h2>
                            </div>
                            <div>
                                <div className="numOF">
                                    <label>Numéro OF</label>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        min={0}
                                        value={data.N_OF}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                N_OF: e.target.value,
                                            });
                                        }}
                                    />
                                    <div
                                        className="button_rechercher"
                                        onClick={() => {
                                            getOF(data.N_OF);
                                        }}
                                    >
                                        Rechercher OF
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="numOF">
                                    <label>Référence article</label>
                                    <input
                                        type="text"
                                        className="nOf"
                                        id="Réference"
                                        value={data.designation}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                designation: e.target.value,
                                            });
                                            getArticle(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <label>Qte Objectif</label>
                                    <input
                                        type="number"
                                        className="qte-obj"
                                        min={1}
                                        value={data.qt_ob}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                qt_ob: e.target.value,
                                            });
                                        }}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="demo-customized-select-native">
                                        Unité
                                    </InputLabel>
                                    <NativeSelect
                                        id="demo-customized-select-native"
                                        value={data.qt_ob_unit}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                qt_ob_unit: e.target.value,
                                            });
                                        }}
                                        input={<BootstrapInput />}
                                    >
                                        <option defaultValue={"METER"}>
                                            m
                                        </option>
                                        <option Value={"KG"}>Kg</option>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </div>
                        <div className="down">
                            <div>
                                <img
                                    className="machine"
                                    src={miraflex}
                                    alt="miraflex"
                                />
                            </div>
                            <div className="affichage">
                                <div className="div-1">
                                    <label>Laize</label>
                                    <input
                                        type={"number"}
                                        value={data.Laize}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                Laize: e.target.value,
                                            });
                                        }}
                                    />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Vitesse théorique</label>
                                    <input
                                        type={"number"}
                                        value={data.vth}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                vth: e.target.value,
                                            });
                                        }}
                                    />
                                    <label>m/min</label>
                                </div>
                                <div className="div-1">
                                    <label>Masse volumique</label>
                                    <input
                                        type={"number"}
                                        value={data.massev}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                massev: e.target.value,
                                            });
                                        }}
                                    />
                                    <label>Kg/cm3</label>
                                </div>
                                <div className="div-1">
                                    <label>Epaisseur</label>
                                    <input
                                        type={"number"}
                                        value={data.Epaisseur}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                Epaisseur: e.target.value,
                                            });
                                        }}
                                    />
                                    <label>um</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" id="valider">
                            Valider
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-2">
                <Link to="/Page1">
                    <img className="exit" src={leave} alt="exit" />
                </Link>
            </div>
        </div>
    );
};

export default Page2;
