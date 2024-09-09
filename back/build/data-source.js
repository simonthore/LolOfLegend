"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const Team_1 = require("./entity/Team");
exports.AppDataSource = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Superstar@64000",
    database: "loloflegend",
    synchronize: true,
    entities: [Team_1.Team],
    subscribers: [],
    migrations: [],
};
