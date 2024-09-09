import React, { useState } from "react";
import axios from "axios";
import ChampionCard from "../components/championCard";

interface Champion {
    name: string;
    image: string;
    title: string;
    description: string;
}

export default function Champion() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Champion | null>(null);

    const handleSearch = async () => {
        const formattedSearchInput = searchInput
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
        const url = `https://ddragon.leagueoflegends.com/cdn/12.4.1/data/fr_FR/champion/${formattedSearchInput}.json`;
        console.log("URL sent to API:", url);
        try {
            const response = await axios.get(url);
            const championData = response.data.data[formattedSearchInput];
            if (championData) {
                const champion: Champion = {
                    name: formattedSearchInput,
                    image: `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${formattedSearchInput}.png`,
                    title: championData.title,
                    description: championData.blurb,
                };
                setSearchResults(champion);
                console.log("Response from API:", champion);
            } else {
                console.error("Champion data not found.");
                setSearchResults(null);
            }
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la recherche :",
                error
            );
            setSearchResults(null);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };


    return (
        <div>
            <h1>LolOfLegend</h1>
            <input
                type="text"
                value={searchInput}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
                placeholder="Rechercher un champion..."
            />
            <button onClick={handleSearch}>Rechercher</button>
            {searchResults && (
                <ChampionCard
                    name={searchResults.name}
                    image={searchResults.image}
                    title={searchResults.title}
                    description={searchResults.description}
                />
            )}
        </div>
    );
}
