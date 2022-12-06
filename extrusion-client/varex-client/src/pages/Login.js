import "./Login.css";
import homepicrot from "../assets/homepicrot.png";
import leave from "../assets/leave.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../functions/functions";

const Login = () => {
    const navigate = useNavigate();
    const [matricule, setMatricule] = useState("");
    const [pword, setPword] = useState("");
    const login = async () => {
        const fetchedData = await fetchData("/mes/login/varex", "PUT", {
            matricule,
            password: pword,
        });
        if (fetchedData.success) {
            if (fetchedData.data.connected) {
                navigate("/Page1");
            } else {
                window.alert("Wrong login");
                console.error(fetchedData.error);
            }
        } else {
            window.alert("Enter your credentials");
        }
    };
    const checkUser = async () => {
        const fetchedData = await fetchData("/mes/checkuser/varex", "GET");
        if (fetchedData.success) {
            if (fetchedData.data.connected) {
                navigate("/Page1");
            }
        } else {
            console.error(fetchedData.error);
        }
    };
    useEffect(() => {
        checkUser();
        setInterval(() => {
            checkUser();
        }, 60000);
    }, []);
    return (
        <div className="login-container">
            <div className="logo-1 col-2">
                <img src={homepicrot} alt="logo" className="logo-img" />
            </div>
            <div className="form col-8">
                <h2 className="connect">Connectez-vous à votre compte</h2>
                <form
                    className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <input
                        id="fname"
                        name="fname"
                        placeholder="Matricule"
                        type="number"
                        onChange={(e) => {
                            setMatricule(e.target.value);
                        }}
                        required
                    />
                    <input
                        id="lname"
                        name="lname"
                        placeholder="Mot de passe"
                        type="password"
                        onChange={(e) => setPword(e.target.value)}
                        required
                    />
                    <button className="button-33" onClick={() => login()}>
                        Valider
                    </button>
                </form>
            </div>
            <div className="col-2">
                <Link to="/Home">
                    <img className="exit" src={leave} alt="exit" />
                </Link>
            </div>
        </div>
    );
};
export default Login;
