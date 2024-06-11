import React from "react";

interface ChampionCardProps {
    name: string;
    image: string;
    title: string;
    description: string;
}

// const DEFAULT_IMG =
//     "https://editors.dexerto.fr/wp-content/uploads/sites/2/2021/10/01/lol6.jpg";

const ChampionCard: React.FC<ChampionCardProps> = ({
    name,
    image,
    title,
    description,
}) => {
    return (
        <div className="champion-card">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{title}</p>
            <p>{description}</p>
        </div>
    );
};

export default ChampionCard;
