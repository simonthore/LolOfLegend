import React from "react";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Champion from "./screens/Champion";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Champion" element={<Champion />} />
            </Routes>
        </Router>
    );
}

export default App;
