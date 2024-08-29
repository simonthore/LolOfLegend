import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Summoner {
    name: string;
    level: number;
    puuid: string;
    tagLine: string;
    profileIconId?: number;
    encryptedSummonerId?: string;  // Nouveau champ pour l'ID chiffré
}

export default function SummonerProfile() {
    const { summonerName, region = 'EUW' } = useParams();
    const [summonerData, setSummonerData] = useState<Summoner | null>(null);
    const [error, setError] = useState<string | null>(null);

    const API_BASE_URL = 'http://localhost:4000'; // Base URL for your backend
    const RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;

    useEffect(() => {
        const fetchSummonerData = async () => {
            if (summonerName) {
                try {
                    // Requête initiale pour récupérer le puuid
                    const initialUrl = `${API_BASE_URL}/api/summoner/${summonerName}/${region}`;
                    const initialResponse = await axios.get(initialUrl);
                    const initialData = initialResponse.data;

                    if (initialData) {
                        const puuid = initialData.puuid;
                        // Nouvelle requête pour récupérer des infos supplémentaires via puuid
                        const summonerUrl = `https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;
                        console.log(RIOT_API_KEY, 'apiKey');
                        
                        const summonerResponse = await axios.get(summonerUrl);
                        const summonerData = summonerResponse.data;

                        const summoner: Summoner = {
                            name: summonerData.name,
                            level: summonerData.summonerLevel,
                            puuid: summonerData.puuid,
                            tagLine: initialData.tagLine, // On garde le tagLine récupéré dans la première requête
                            profileIconId: summonerData.profileIconId,
                            encryptedSummonerId: summonerData.id,  // Récupération de l'ID chiffré
                        };
                        setSummonerData(summoner);
                        setError(null);
                    } else {
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
        <div className="main-profile">
            <h1>Summoner Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summonerData ? (
                <div>
                    <div className="profile_image">
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/12.4.1/img/profileicon/${summonerData.profileIconId}.png`}
                            alt={`${summonerData.name}'s profile`}
                            style={{ width: '100px', height: '100px' }}
                        />
                        <p className="level">{summonerData.level}</p> 
                    </div>
                    <h2>name :{summonerName}</h2>
                    <h3>{summonerData.tagLine}</h3>
                    <p>PUUID: {summonerData.puuid}</p>
                    <p>Encrypted Summoner ID: {summonerData.encryptedSummonerId}</p> {/* Affichage de l'ID chiffré */}
                </div>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    );
}
