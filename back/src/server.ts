import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/champion/:championName", (req, res) => {
    const championName = req.params.championName;
    console.log("Champion name:", championName);
    const championInfo = {
        name: championName,
        image: `https://ddragon.leagueoflegends.com/cdn/12.4.1/img/champion/${championName}.png`,
    };
    console.log(typeof championInfo);
    res.json(championInfo);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
