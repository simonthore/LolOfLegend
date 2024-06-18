import { DataSource } from 'typeorm';
import {env, loadEnv} from "./env";
import { Team } from './entity/Team';


loadEnv();
export default new DataSource({
  type: "postgres",
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5432,
  username: "elsimonio",
  password: "Superstar64000",
  database: "LolOfLegend",
  synchronize: true,
  entities: [Team],
  logging: ["error"],
});