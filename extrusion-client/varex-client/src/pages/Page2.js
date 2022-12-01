import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import varex from "../assets/varex.png";
import { /*useEffect,*/ useState } from "react";
import List from "../components/List";
import Sidebar from "../components/Sidebar";

const Page2 = () => {
    /*let preData = {
        N_OF: "",
        debit: 0,
    };
    const [data, setData] = useState(preData);
    
    useEffect(() => {
        for (let i = 1; i <= 24; i++) {
            preData["per" + i] = 0;
            preData["lot" + i] = "-";
            preData["ref" + i] = "-";
            setData(preData);
        }
    }, []);
    const finOf = async () => {};*/
    const [showList, setShowList] = useState(false);
    function display() {
        setShowList(!showList);
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
                        <h1>Résultat instantané - Varex</h1>
                    </div>
                    <div className="top-down">
                        <div className="top">
                            <div>
                                <h2 className="of-header">
                                    Ordre de fabrication
                                </h2>
                            </div>
                            <div>
                                <form>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        placeholder="Numéro d'OF"
                                        min={0}
                                    />
                                </form>
                            </div>
                            <div>
                                <form>
                                    <input
                                        type="text"
                                        id="Référence article"
                                        placeholder="Référence article"
                                    />
                                </form>
                            </div>
                        </div>
                        <div className="down">
                            <div>
                                <form>
                                    <input
                                        className="nth-child-1"
                                        type="text"
                                        id="Référence article"
                                        placeholder="Débit théorique (kg/h)"
                                    />
                                </form>
                            </div>
                            <div>
                                <img
                                    className="machine"
                                    src={varex}
                                    alt="varex"
                                />
                            </div>
                            <div className="dropdown-list">
                                <div>
                                    <p
                                        className="dropdown"
                                        onClick={() => display()}
                                    >
                                        Recette
                                    </p>
                                </div>
                                <List display={showList} />
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
