import { ConnectionOptions } from "typeorm";
import { Team } from "./entity/Team";

export const AppDataSource: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Superstar@64000",
    database: "loloflegend",
    synchronize: true,
    entities: [Team],
    subscribers: [],
    migrations: [],
};
