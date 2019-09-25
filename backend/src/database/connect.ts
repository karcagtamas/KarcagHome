import mysql from "mysql";
import conString, { ConString } from "./config";

const connectionString: ConString = conString;

const db = mysql.createConnection(connectionString);

db.connect();

export default db;
