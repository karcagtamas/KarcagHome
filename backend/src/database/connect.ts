import mysql from 'mysql';
import conString, { ConString } from './config';

// Import connection string from the config
const connectionString: ConString = conString;

// Create database connection
const db = mysql.createConnection(connectionString);

// Connect
db.connect(err => {
  if (err) console.log(err);
});

// Export database
export default db;
