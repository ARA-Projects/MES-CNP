import React, { useState } from "react";
import Action from "../components/ActionNC";
import alert from "../assets/alert.png";
import "./Alert.css";

const AlertNC = ({ data }) => {
    const [showPanne, setShowPanne] = useState(false);
    const displayPanne = () => {
        setShowPanne(!showPanne);
    };
    return (
        <React.Fragment>
            <div className="page1-alert" onClick={() => displayPanne()}>
                <div>
                    <img src={alert} alt="Alert" className="page1-erreur" />
                </div>
                <div className="page1-details">
                    <div className="page1-top">
                        <div className="page1-top-right">Non-conf à :</div>
                        <div className="page1-top-left">{data.datte}</div>
                    </div>
                    <hr />
                    <div className="page1-bottom page1-bottom-red">
                        {data.quantite} Kg {data.type}
                    </div>
                </div>
            </div>
            <div className="under-msg">
                <Action display={showPanne} data={data} />
            </div>
        </React.Fragment>
    );
};
export default AlertNC;
