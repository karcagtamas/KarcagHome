// Connection String interface for MySql database
export interface ConString {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

// MySql connection parameters
const address: string = 'localhost'; // Address
const user: string = 'root'; // Username
const password: string = 'root'; // Password
const database: string = 'karcaghome'; // Database name
const port: number = 3306; // Port

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
