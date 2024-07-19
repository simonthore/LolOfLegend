import { createConnection } from "typeorm";
import { AppDataSource } from "./src/data-source";

createConnection(AppDataSource).then(connection => {
    console.log("Base de données connectée et synchronisée !");
    process.exit(0);
}).catch(error => {
    console.log(error);
    process.exit(1);
});
