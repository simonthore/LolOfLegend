import React from "react";

export default function Home() {
    // const [searchInput, setSearchInput] = useState("");
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the LeagueStats</p>
            <input
                type="text"
                // value={searchInput}
                // onChange={handleChange}
                placeholder="Nom du joueur"
            />
        </div>
    );
}
