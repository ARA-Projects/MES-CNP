import React from "react";
import "./List.css";
import valider from "../assets/btn-valider.png";
let inputs = [[], [], []];
const showInputs = () => {
    let pos = 1;
    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 8; i++) {
            inputs[j].push(pos++);
        }
    }
};
const alph = ["A", "B", "C"];
showInputs();
const List = ({ display, data, setData }) => {
    return (
        <div className="list" style={{ display: display ? "flex" : "none" }}>
            {inputs.map((j, key) => {
                return (
                    <div key={key}>
                        <h3>Vis {alph[key]}</h3>
                        <div className="spacing">
                            {j.map((i) => {
                                return (
                                    <div key={i}>
                                        <div className="list-row">
                                            <input
                                                type="text"
                                                placeholder="Réference matière première"
                                                value={data["ref" + i]}
                                                onChange={(e) => {
                                                    let newData = { ...data };
                                                    newData["ref" + i] =
                                                        e.target.value;
                                                    setData(newData);
                                                }}
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
