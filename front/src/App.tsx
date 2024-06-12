import React from "react";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Champion from "./screens/Champion";
import "./App.css";
function App() {
    return (
        <Router>
            <Navbar />
            {/* test */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Champion" element={<Champion />} />
            </Routes>
        </Router>
    );
}

export default App;