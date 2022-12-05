import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import complexage from "../assets/complexage.png";
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
    colle: 0
}

const Page2 = () => {
    const [data, setData] = useState(preData)
    const [designation, setDesignation] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        let link = "A_ICONS/Operator/Impression/Complexage/Php_Pages/nouveauOF.php"
        let result = await fetchData("/mes/getof/complexage/"+data.N_OF, "GET")
        if(result.success){
            if(result.data.exists){
                link = "A_ICONS/Operator/Impression/Complexage/Php_Pages/modify.php"
            }
            result = await fetchPHP(link, data)
            if(result == "Success@")
            {
                //TODO Go to page 1
            }
            else{
                console.error(result)
                window.alert("Internal error")
            }
        }
        else{
            console.error(result.error)
            window.alert("Internal error")
        }
    }
    const getArticle = async (value) => {
        if(designation){
            const result = await fetchData("/mes/getarticle/complexage/"+value, "GET")
            if(result.success){
                if(result.data.exists){
                    let newData = result.data.data
                    for(const d in result.data.data){
                        if(d == "id"){
                            delete newData.id
                            continue
                        }
                        newData.qt_ob = data.qt_ob
                        newData.qt_ob_unit = data.qt_ob_unit
                        setData(newData)
                    }
                }
                else{
                    setData(preData)
                }
            }
            else{
                console.error(result.error)
                window.alert("Internal error")
            }
        }
        else{
            setData(preData)
        }
    }
    const getOF = async (value) => {
        if(designation){
            const result = await fetchData("/mes/getof/miraflex/"+value, "GET")
            if(result.success){
                if(result.data.exists){
                    let newData = result.data.data
                    for(const d in result.data.data){
                        if(d == "id"){
                            delete newData.id
                            continue
                        }
                        else if(d == "enprod"){
                            delete newData.enprod
                            continue
                        }
                        setData(newData)
                    }
                }
                else{
                    setData(preData)
                }
            }
            else{
                console.error(result.error)
                window.alert("Internal error")
            }
        }
        else{
            setData(preData)
        }
    }
    return (
        <div className="page2">
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="all-div">
                <Sidebar />
                <div className="content">
                    <div className="title">
                        <h1>Résultat instantané - Complexage</h1>
                    </div>
                    <form onSubmit={() => handleSubmit()} className="top-down">
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
                                            setData({...data, N_OF: e.target.value})
                                            getOF(e.target.value)
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
                                        onChange={(e) => {setDesignation(e.target.value);getArticle(e.target.value)}}
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
                                        onChange={(e) => setData({...data, qt_ob: e.target.value})}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel htmlFor="demo-customized-select-native">
                                        Unité
                                    </InputLabel>
                                    <NativeSelect
                                        id="demo-customized-select-native"
                                        value={data.qt_ob_unit}
                                        onChange={(e) => setData({...data, qt_ob_unit: e.target.value})}
                                        input={<BootstrapInput />}
                                    >
                                        <option value={"KG"}>Kg</option>
                                        <option value={"METER"}>m</option>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </div>
                        <div className="down">
                            <div>
                                <img
                                    className="machine"
                                    src={complexage}
                                    alt="complexage"
                                />
                            </div>
                            <div className="affichage">
                                <div className="div-1">
                                    <label>Vitesse théorique</label>
                                    <input type={"number"}
                                        value={data.vitesse}
                                        onChange={(e) => setData({...data, vitesse: e.target.value})}
                                        />
                                    <label>m/min</label>
                                </div>
                                <div className="div-1">
                                    <label>Laize</label>
                                    <input type={"number"}
                                        value={data.laize}
                                        onChange={(e) => setData({...data, laize: e.target.value})}
                                        />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Masse volumique</label>
                                    <input type={"number"}
                                        value={data.masse_volume}
                                        onChange={(e) => setData({...data, masse_volume: e.target.value})}
                                        />
                                    <label>Kg/cm3</label>
                                </div>
                                <div className="div-1">
                                    <label>Epaisseur</label>
                                    <input type={"number"}
                                        value={data.epaisseur}
                                        onChange={(e) => setData({...data, epaisseur: e.target.value})}
                                        />
                                    <label>um</label>
                                </div>
                                <div className="div-1">
                                    <label>Laize Complexage</label>
                                    <input type={"number"}
                                        value={data.laize_comp}
                                        onChange={(e) => setData({...data, laize_comp: e.target.value})}
                                        />
                                    <label>mm</label>
                                </div>
                                <div className="div-1">
                                    <label>Masse volumique Complexage</label>
                                    <input type={"number"}
                                        value={data.masse_volume_comp}
                                        onChange={(e) => setData({...data, masse_volume_comp: e.target.value})}
                                        />
                                    <label>Kg/cm3</label>
                                </div>
                                <div className="div-1">
                                    <label>Epaisseur Complexage</label>
                                    <input type={"number"}
                                        value={data.epaisseur_comp}
                                        onChange={(e) => setData({...data, epaisseur_comp: e.target.value})}
                                        />
                                    <label>um</label>
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
