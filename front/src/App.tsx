import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Champion from "./screens/Champion";
import Lfl from "./screens/Lfl";
import SummonerProfile from "./screens/Profile";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Champion" element={<Champion />} />
                <Route path="/summoner/:summonerName" element={<SummonerProfile />} />
                <Route path="/Lfl" element={<Lfl />} />
            </Routes>
        </Router>
    );
}

export default App;
