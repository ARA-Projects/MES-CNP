import React from "react";
import "./List.css";
import valider from "../assets/btn-valider.png";
const List = ({ display, data, setData }) => {
    const showInputs = () => {
        for (let i = 1; i <= 24; i++) {
            return (
                <div>
                    <div className="list-row">
                        <input
                            type="text"
                            placeholder="Réference matière première"
                            value={data["ref" + i]}
                            onChange={(e) => {
                                let newData = data;
                                newData["ref" + i] = e.target.value;
                                setData(newData);
                            }}
                        />
                        <input
                            type="number"
                            placeholder="%"
                            value={data["per" + i]}
                            onChange={(e) => {
                                let newData = data;
                                newData["per" + i] = e.target.value;
                                setData(newData);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="N° lot"
                            value={data["lot" + i]}
                            onChange={(e) => {
                                let newData = data;
                                newData["lot" + i] = e.target.value;
                                setData(newData);
                            }}
                        />
                    </div>
                </div>
            );
        }
    };
    return (
        <div className="list" style={{ display: display ? "flex" : "none" }}>
            <h3>Vis A</h3>
            <div className="spacing">{showInputs()}</div>
            <div className="valider">
                <img src={valider} alt="button" />
            </div>
        </div>
    );
};
export default List;
