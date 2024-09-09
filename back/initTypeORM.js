"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const data_source_1 = require("./src/data-source");
(0, typeorm_1.createConnection)(data_source_1.AppDataSource).then(connection => {
    console.log("Base de données connectée et synchronisée !");
    process.exit(0);
}).catch(error => {
    console.log(error);
    process.exit(1);
});
