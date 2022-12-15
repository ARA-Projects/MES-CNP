import React, { useState } from "react";
import Panne from "../components/Panne";
import error from "../assets/error.png";
import "./Massages.css";

const Messages = ({ data }) => {
    const [showPanne, setShowPanne] = useState(false);
    function displayPanne() {
        setShowPanne(!showPanne);
    }
    return (
        <React.Fragment>
            <div className="page1-msg" onClick={() => displayPanne()}>
                <div>
                    <img src={error} alt="Error" className="page1-erreur" />
                </div>
                <div className="page1-details">
                    <div className="page1-top">
                        <div className="page1-top-right">Arrêt à :</div>
                        <div className="page1-top-left">{data.datte}</div>
                    </div>
                    <hr />
                    <div className="page1-bottom">
                        <div className="page1-bottom-right">
                            Durée d'arrêt :
                        </div>
                        <div className="page1-bottom-left">{data.duree}</div>
                    </div>
                </div>
            </div>
            <div className="under-msg">
                <Panne display={showPanne} data={data} />
            </div>
        </React.Fragment>
    );
};
export default Messages;
