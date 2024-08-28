import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Summoner {
    name: string;
    level: number;
    puuid: string;
    tagLine: string;
}

export default function SummonerProfile() {
    const { summonerName, region = 'EUW' } = useParams();
    const [summonerData, setSummonerData] = useState<Summoner | null>(null);
    const [error, setError] = useState<string | null>(null);

    const API_BASE_URL = 'http://localhost:4000'; // Base URL for your backend

    useEffect(() => {
        const fetchSummonerData = async () => {
            if (summonerName) {
                const url = `${API_BASE_URL}/api/summoner/${summonerName}/${region}`;
                console.log("URL sent to API:", url);
                try {
                    const response = await axios.get(url);
                    const data = response.data;
                    if (data) {
                        const summoner: Summoner = {
                            name: data.gameName,
                            level: 0, // Vous pouvez ajouter plus de données si disponible
                            puuid: data.puuid,
                            tagLine: data.tagLine,
                        };
                        setSummonerData(summoner);
                        setError(null);
                        console.log("Response from API:", summoner);
                    } else {
                        console.error("Summoner data not found.");
                        setSummonerData(null);
                        setError("Summoner data not found.");
                    }
                } catch (error) {
                    console.error("An error occurred while fetching the summoner data:", error);
                    setError("An error occurred while fetching the summoner data.");
                    setSummonerData(null);
                }
            }
        };

        fetchSummonerData();
    }, [summonerName, region]);

    return (
        <div>
            <h1>Summoner Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summonerData ? (
                <div>
                    <h2>{summonerData.name}</h2>
                    <p>PUUID: {summonerData.puuid}</p>
                    <p>Tag Line: {summonerData.tagLine}</p>
                </div>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    );
}
