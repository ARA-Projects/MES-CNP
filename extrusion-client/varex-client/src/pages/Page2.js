import "./Page2.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link } from "react-router-dom";
import varex from "../assets/varex.png";
import { /*useEffect,*/ useState } from "react";
import List from "../components/List";
import Sidebar from "../components/Sidebar";
import { fetchPHP, fetchData } from "../functions/functions";

let preData = {
    N_OF: "",
    debit: 0,
};
for (let i = 1; i <= 24; i++) {
    preData["ref" + i] = "-";
    preData["per" + i] = 0;
    preData["lot" + i] = "-";
}

const Page2 = () => {
    const [data, setData] = useState(preData);
    const [showList, setShowList] = useState(false);
    function display() {
        setShowList(!showList);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let link = "A_ICONS/Operator/Extrusion/Varex/Php_Pages/save_new_of.php";
        let result = await fetchData("/mes/getof/varex/" + data.N_OF, "GET");
        if (result.success) {
            if (result.data.exists) {
                link =
                    "A_ICONS/Operator/Extrusion/Varex/Php_Pages/modify_of.php";
            }
            result = await fetchPHP(link, data);
            if (result === "Success@") {
                //TODO Go to page 1
            } else {
                console.error(result);
                window.alert("Internal error");
            }
        } else {
            console.error(result.error);
            window.alert("Internal error");
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
                        <h1>Résultat instantané - Varex</h1>
                    </div>
                    <form
                        className="top-down"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="top">
                            <div>
                                <h2 className="of-header">
                                    Ordre de fabrication
                                </h2>
                            </div>
                            <div>
                                <div>
                                    <input
                                        type="number"
                                        className="nOf"
                                        id="Numéro d'OF"
                                        placeholder="Numéro d'OF"
                                        min={0}
                                        value={data.N_OF}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                N_OF: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="down">
                            <div>
                                <div>
                                    <label>Débit th</label>
                                    <input
                                        className="nth-child-1"
                                        type="number"
                                        id="Référence article"
                                        placeholder="Débit théorique (kg/h)"
                                        value={data.debit}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                debit: e.target.value,
                                            })
                                        }
                                    />
                                </div>
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
                                <List
                                    display={showList}
                                    data={data}
                                    setData={setData}
                                />
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
