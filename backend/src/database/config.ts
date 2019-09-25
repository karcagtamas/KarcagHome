export interface ConString {
  host: string;
  user: string;
  password: string;
  database: string;
}

const address = "127.0.0.0";
const user = "karcaghome";
const password = "Abc123456";
const database = "karcaghome";

const connectionString: ConString = { host: address, user, password, database };

export default connectionString;
