import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Results from "./pages/Results";
import DecNC from "./pages/DecNC";
import DecDechet from "./pages/DecDechet";
import "./App.module.css";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Page1" element={<Page1 />} />
                    <Route path="/Page2" element={<Page2 />} />
                    <Route path="/Results" element={<Results />} />
                    <Route path="/DecNC" element={<DecNC />} />
                    <Route path="/DecDechet" element={<DecDechet />} />
                </Routes>
            </Router>
        </div>
    );
};
export default App;
