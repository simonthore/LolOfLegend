import React, { useState } from "react";
import magnifyingGlass from "../assets/magnifying.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    function handleChange(event) {
        setSearchInput(event.target.value);
    }

    function handleSearch() {
        if (searchInput) {
            navigate(`/summoner/${searchInput}`);
            console.log('Navigating to:', `/summoner/${searchInput}`);
        }
    }

    return (
        <div className="general">
            <h1>Home</h1>
            <p>Welcome to the LeagueStats</p>
            <div className="search-area">
                <nav>
                    <ul className="menu">
                        <li className="deroulant">
                            <a href="#">Region</a>
                            <ul className="sous">
                                <li><a href="#">Eu West</a></li>
                                <li><a href="#">Eu Est</a></li>
                                <li><a href="#">USA</a></li>
                                <li><a href="#">Asia</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <input
                    type="text"
                    className="main-search"
                    value={searchInput}
                    onChange={handleChange}
                    placeholder="Nom du joueur"
                />
                <div className="button-container" onClick={handleSearch}>
                    <button className="button-search">
                        <img src={magnifyingGlass} alt="magnifyingGlass" />
                    </button>
                </div>
            </div>
        </div>
    );
}
