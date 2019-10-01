export interface ConString {
  host: string;
  user: string;
  password: string;
  database: string;
}

const address = "localhost";
const user = "root";
const password = "root";
const database = "";

const connectionString: ConString = { host: address, user, password, database };

export default connectionString;
