// Connection String interface for MySql database
export interface ConString {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const address = "localhost";
const user = "root";
const password = "root";
const database = "karcaghome";
const port = 3306;

// Create connection string
const connectionString: ConString = {
  host: address,
  user,
  password,
  database,
  port
};

// Export connection string
export default connectionString;
