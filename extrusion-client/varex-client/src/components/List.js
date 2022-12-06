import React, { useState, useEffect } from "react";
import "./List.css";
import valider from "../assets/btn-valider.png";
import { fetchPHP } from "../functions/functions";
let inputs = [[], [], []];
let preLot = [];
const showInputs = () => {
    let pos = 1;
    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 8; i++) {
            inputs[j].push(pos++);
            preLot.push(["-"]);
        }
    }
};
const getLot = async (mat) => {
    if (mat.length) {
        const result = await fetchPHP(
            "/A_ICONS/Operator/Extrusion/Varex/Php_Pages/get_lot.php",
            { ref: mat }
        );
        const results = result.split("@");
        if (results[0] === "Success") {
            return results[1].split("§");
        } else {
            return ["-"];
        }
    } else {
        return ["-"];
    }
};
const alph = ["A", "B", "C"];
showInputs();
const List = ({ display, data, setData }) => {
    const [mats, setMats] = useState([]);
    const [lots, setLots] = useState(preLot);
    const getMats = async () => {
        const result = await fetchPHP(
            "/A_ICONS/Operator/Extrusion/Varex/Php_Pages/get_mats.php"
        );
        const results = result.split("@");
        if (results[0] === "Success") {
            setMats(results[1].split("§"));
        } else {
            return [];
        }
    };
    useEffect(() => {
        getMats();
    }, []);
    return (
        <div className="list" style={{ display: display ? "flex" : "none" }}>
            <datalist id="mats">
                {mats.map((mat, key) => {
                    return (
                        <option key={key} value={mat}>
                            {mat}
                        </option>
                    );
                })}
            </datalist>
            {inputs.map((j, key) => {
                return (
                    <div key={key}>
                        <h3>Vis {alph[key]}</h3>
                        <div className="spacing">
                            {j.map((i) => {
                                return (
                                    <div key={i}>
                                        <datalist id={"lot" + i}>
                                            {lots[i - 1].map((l, key) => {
                                                return (
                                                    <option key={key} value={l}>
                                                        {l}
                                                    </option>
                                                );
                                            })}
                                        </datalist>
                                        <div className="list-row">
                                            <input
                                                type="text"
                                                placeholder="Réference matière première"
                                                value={data["ref" + i]}
                                                onChange={async (e) => {
                                                    let newData = { ...data };
                                                    let newLot = [...lots];
                                                    newData["ref" + i] =
                                                        e.target.value;
                                                    newLot[i - 1] =
                                                        await getLot(
                                                            e.target.value
                                                        );
                                                    console.log(newLot);
                                                    setData(newData);
                                                    setLots(newLot);
                                                }}
                                                list="mats"
                                            />
                                            <input
                                                type="number"
                                                placeholder="%"
                                                value={data["per" + i]}
                                                onChange={(e) => {
                                                    let newData = { ...data };
                                                    newData["per" + i] =
                                                        e.target.value;
                                                    setData(newData);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="N° lot"
                                                value={data["lot" + i]}
                                                onChange={(e) => {
                                                    let newData = { ...data };
                                                    newData["lot" + i] =
                                                        e.target.value;
                                                    setData(newData);
                                                }}
                                                list={"lot" + i}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <button className="valider">
                <img src={valider} alt="button" />
            </button>
        </div>
    );
};
export default List;
