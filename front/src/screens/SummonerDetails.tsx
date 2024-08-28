import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Summoner {
    name: string;
    level: number;
    profileIcon: string;
    rank: string;
    wins: number;
    losses: number;
}

interface Match {
    gameId: string;
    champion: string;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
}

export default function SummonerDetails() {
    const { summonerName } = useParams<{ summonerName: string }>();
    const [summoner, setSummoner] = useState<Summoner | null>(null);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchSummonerData() {
            setLoading(true);
            try {
                // Remplacez cette URL par l'URL réelle de votre API pour obtenir les informations du joueur
                const summonerResponse = await axios.get(`/api/summoner/${summonerName}`);
                const matchesResponse = await axios.get(`/api/matches/${summonerName}`);

                setSummoner(summonerResponse.data);
                setMatches(matchesResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données du joueur:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSummonerData();
    }, [summonerName]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!summoner) {
        return <p>Joueur non trouvé</p>;
    }

    return (
        <div className="summoner-details">
            <div className="summoner-header">
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/12.4.1/img/profileicon/${summoner.profileIcon}.png`}
                    alt={`${summoner.name} icon`}
                    className="profile-icon"
                />
                <h2>{summoner.name}</h2>
                <p>Niveau: {summoner.level}</p>
                <p>Rang: {summoner.rank}</p>
            </div>
            <div className="summoner-stats">
                <p>Victoires: {summoner.wins}</p>
                <p>Défaites: {summoner.losses}</p>
            </div>
            <div className="match-history">
                <h3>Historique des matchs</h3>
                <ul>
                    {matches.map((match) => (
                        <li key={match.gameId} className={match.win ? "win" : "loss"}>
                            <p>Champion: {match.champion}</p>
                            <p>K/D/A: {match.kills}/{match.deaths}/{match.assists}</p>
                            <p>Résultat: {match.win ? "Victoire" : "Défaite"}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
