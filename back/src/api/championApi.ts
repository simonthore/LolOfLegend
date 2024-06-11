import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000";

export async function getChampionInfo(championName: string) {
    try {
        const response = await axios.get(`${API_URL}/champion/${championName}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des informations du champion:",
            error
        );
        throw error;
    }
}
