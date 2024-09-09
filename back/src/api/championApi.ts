import axios from "axios";

// Assurez-vous que API_URL est défini dans votre fichier .env
const API_URL = process.env.API_URL || "http://localhost:4000";

// Définir un type pour les données du champion si vous avez la structure
interface ChampionInfo {
    name: string;
    title: string;
    lore: string;
    // Ajoutez ici d'autres propriétés selon la structure de votre API
}

export async function getChampionInfo(championName: string): Promise<ChampionInfo> {
    try {
        const response = await axios.get<ChampionInfo>(`${API_URL}/champion/${championName}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des informations du champion:",
            error
        );
        // Vous pouvez lancer une erreur ou retourner un type approprié pour indiquer l'échec
        throw new Error("Erreur lors de la récupération des informations du champion.");
    }
}
