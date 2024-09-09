import React, { useState } from "react";
import magnifyingGlass from "../assets/magnifying.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [selectedRegion, setSelectedRegion] = useState("EUW");
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(event.target.value);
    }

    function handleRegionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedRegion(event.target.value);
    }

    function handleSearch() {
        if (searchInput) {
            const regionMapping: { [key: string]: string } = {
                "Eu West": "EUW",
                "Eu Est": "EUN",
                "USA": "NA1",
                "Asia": "KR",
            };
            const region = regionMapping[selectedRegion] || "EUW";
            navigate(`/summoner/${searchInput}/${region}`);
            console.log('Navigating to:', `/summoner/${searchInput}/${region}`);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="general">
            <h1>Home</h1>
            <p>Welcome to the LeagueStats</p>
            <div className="search-area">
                <div className="region-selector">
                    <label>Région</label>
                    <select value={selectedRegion} onChange={handleRegionChange}>
                        <option value="Eu West">Eu West</option>
                        <option value="Eu Est">Eu Est</option>
                        <option value="USA">USA</option>
                        <option value="Asia">Asia</option>
                    </select>
                </div>
                <input
                    type="text"
                    className="main-search"
                    value={searchInput}
                    onChange={handleChange}
                    placeholder="Nom du joueur"
                    onKeyUp={handleKeyPress}
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
