import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import miraflex from "../assets/miraflex.png";
import Sidebar from "../components/Sidebar";

import * as React from "react";
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

const Page2 = () => {
    const [unity, setUnity] = React.useState("");
    const handleChange = (event) => {
        setUnity(event.target.value);
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
                        <h1>Résultat instantané - Miraflex</h1>
                    </div>
                    <div className="top-down">
                        <div className="top">
                            <div>
                                <h2>Ordre de fabrication</h2>
                            </div>
                            <div>
                                <form>
                                    <label>Numéro OF</label>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        min={0}
                                    />
                                </form>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <label>Qte Objectif</label>
                                    <input
                                        type="number"
                                        className="qte-obj"
                                        id="Numéro d'OF"
                                        min={0}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="demo-customized-select-native">
                                        Unité
                                    </InputLabel>
                                    <NativeSelect
                                        id="demo-customized-select-native"
                                        value={unity}
                                        onChange={handleChange}
                                        input={<BootstrapInput />}
                                    >
                                        <option value={10}>Kg</option>
                                        <option value={20}>m</option>
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
                                    <input readOnly />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Vitesse théorique</label>
                                    <input readOnly />
                                    <label>m/min</label>
                                </div>
                                <div className="div-1">
                                    <label>Masse volumique</label>
                                    <input readOnly />
                                    <label>Kg/cm3</label>
                                </div>
                                <div className="div-1">
                                    <label>Epaisseur</label>
                                    <input readOnly />
                                    <label>um</label>
                                </div>
                            </div>
                        </div>
                    </div>
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
