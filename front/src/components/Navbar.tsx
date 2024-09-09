import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="container">
        {/* recherche stats joueurs : besoin champs recherche qui mène au stats personnel  */}
            <Link to="/">Accueil</Link> 
        {/* ici on aura une recherche de chaque champion avec image, lore, et surtout le winrate actuel du champion avec les builds qui lui sont associé et ses counter matchup */}
            <Link to="/Champion">Champion</Link>
        {/* une page avec les stats de la lfl du split en cours : match à venir, match passé avec resultat et bouton no spoil qui masque les resultats  */}
        <Link to="/Lfl">LFL</Link>
        <Link to="/profile">Profile</Link>
        
        </div>
    );
};

export default Navbar;
