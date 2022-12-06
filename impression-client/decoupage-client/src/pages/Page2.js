import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import decoupe from "../assets/decoupe.png";
import Sidebar from "../components/Sidebar";
import { fetchData, fetchPHP } from "../functions/functions";
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";

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
        // Use the system font instead of the default Roboto font.
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
    qt_ob: 0,
    qt_ob_unit: "METER",
    vitesse: 0,
    epaisseur: 0,
    laise: 0,
    masse_volume: 0,
    epaisseur_comp: 0,
    laise_comp: 0,
    masse_volume_comp: 0,
    dechet_droit: 0,
    dechet_gauche: 0,
    nbr_bobine: 0,
};

const Page2 = () => {
    const [data, setData] = useState(preData);
    const [designation, setDesignation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let link =
            "/A_ICONS/Operator/Impression/Decoupage/Php_Pages/nouveauOF.php";
        let result = await fetchPHP(link, data);
        if (result === "Success@") {
            window.alert("YEAY");
        } else {
            console.error(result);
            window.alert("Internal error");
        }
    };
    const getArticle = async (value) => {
        if (designation) {
            const result = await fetchData(
                "/mes/getarticle/decoupage/" + value,
                "GET"
            );
            if (result.success) {
                if (result.data.exists) {
                    let newData = result.data.data;
                    for (const d in result.data.data) {
                        if (d === "id") {
                            delete newData.id;
                            continue;
                        } else if (d === "largeur_ruban") {
                            newData.dechet_droit =
                                Number(newData.largeur_ruban) / 2;
                            newData.dechet_gauche =
                                Number(newData.largeur_ruban) / 2;
                            delete newData.largeur_ruban;
                        } else {
                            newData.qt_ob = data.qt_ob;
                            newData.qt_ob_unit = data.qt_ob_unit;
                            newData.nbr_bobine = data.nbr_bobine;
                        }
                    }
                    setData(newData);
                } else {
                    setData(preData);
                }
            } else {
                console.error(result.error);
                window.alert("Internal error");
            }
        } else {
            setData(preData);
        }
    };
    const getOF = async (value) => {
        if (value) {
            const result = await fetchData(
                "/mes/getof/decoupage/" + value,
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
                        }
                    }
                    setData(newData);
                }
            } else {
                console.error(result.error);
                window.alert("Internal error");
            }
        } else {
            setData(preData);
        }
    };
    return (
        <div className="page2">
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="all-div">
                <Sidebar />
                <div className="content">
                    <div className="title">
                        <h1>Résultat instantané - Découpage</h1>
                    </div>
                    <button onClick={() => getOF(data.N_OF)}>
                        Rechercher OF
                    </button>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="top-down"
                    >
                        <button>Valider</button>
                        <div className="top">
                            <div>
                                <h2>Ordre de fabrication</h2>
                            </div>
                            <div>
                                <div class="form">
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
                                </div>
                            </div>
                            <div>
                                <div class="form">
                                    <label>Référence article</label>
                                    <input
                                        type="text"
                                        className="nOf"
                                        id="Réference"
                                        value={designation}
                                        onChange={(e) => {
                                            setDesignation(e.target.value);
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
                                        min={0}
                                        value={data.qt_ob}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                qt_ob: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="down">
                            <div>
                                <img
                                    className="machine"
                                    src={decoupe}
                                    alt="decoupage"
                                />
                            </div>
                            <div className="affichage">
                                <div className="div-1">
                                    <label>Vitesse théorique</label>
                                    <input
                                        type={"number"}
                                        value={data.vitesse}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                vitesse: e.target.value,
                                            })
                                        }
                                    />
                                    <label>m/min</label>
                                </div>
                                <div className="div-1">
                                    <label>Laize</label>
                                    <input
                                        type={"number"}
                                        value={data.laize}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                laize: e.target.value,
                                            })
                                        }
                                    />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Masse volumique</label>
                                    <input
                                        type={"number"}
                                        value={data.masse_volume}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                masse_volume: e.target.value,
                                            })
                                        }
                                    />
                                    <label>Kg/cm3</label>
                                </div>
                                <div className="div-1">
                                    <label>Epaisseur</label>
                                    <input
                                        type={"number"}
                                        value={data.epaisseur}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                epaisseur: e.target.value,
                                            })
                                        }
                                    />
                                    <label>um</label>
                                </div>
                                <div className="div-1">
                                    <label>Dechet Droit</label>
                                    <input
                                        type={"number"}
                                        value={data.dechet_droit}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                dechet_droit: e.target.value,
                                            })
                                        }
                                    />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Dechet Gauche</label>
                                    <input
                                        type={"number"}
                                        value={data.dechet_gauche}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                dechet_gauche: e.target.value,
                                            })
                                        }
                                    />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Nombre de bobine</label>
                                    <input
                                        type={"number"}
                                        value={data.nbr_bobine}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                nbr_bobine: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
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
