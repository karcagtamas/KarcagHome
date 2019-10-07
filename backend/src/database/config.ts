export interface ConString {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const address = "db";
const user = "karcaghome";
const password = "Abc123456";
const database = "karcaghome";
const port = 3306;

const connectionString: ConString = {
  host: address,
  user,
  password,
  database,
  port
};

export default connectionString;
