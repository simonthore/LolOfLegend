import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Summoner {
    name: string;
    level: number;
    puuid: string;
}

export default function SummonerProfile() {
    const { summonerName } = useParams();
    const [summonerData, setSummonerData] = useState<Summoner | null>(null);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = "RGAPI-6ca18b02-eedc-4396-b22c-014cd3a3396d";

    useEffect(() => {
        const fetchSummonerData = async () => {
            if (summonerName) {
                const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/euw?api_key=${API_KEY}`;
                console.log("URL sent to API:", url);
                try {
                    const response = await axios.get(url);
                    const data = response.data;
                    if (data) {
                        const summoner: Summoner = {
                            name: data.gameName,
                            level: data.summonerLevel,
                            puuid: data.puuid,
                        };
                        setSummonerData(summoner);
                        setError(null);
                        console.log("Response from API:", summoner);
                    } else {
                        console.error("Summoner data not found.");
                        setSummonerData(null);
                    }
                } catch (error) {
                    console.error("An error occurred while fetching the summoner data:", error);
                    setError("An error occurred while fetching the summoner data.");
                    setSummonerData(null);
                }
            }
        };

        fetchSummonerData();
    }, [summonerName]);

    return (
        <div>
            <h1>Summoner Profile</h1>
            {error && <p>{error}</p>}
            {summonerData && (
                <div>
                    <h2>{summonerData.name}</h2>
                    <p>Level: {summonerData.level}</p>
                    <p>PUUID: {summonerData.puuid}</p>
                </div>
            )}
        </div>
    );
}
