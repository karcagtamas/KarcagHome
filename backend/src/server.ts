import express, { Application, response } from "express";
import cors from "cors";
import bodyparser from "body-parser";

// Routes
import macs from "./routes/macAddresses";
import users from "./routes/users";
import movies from "./routes/movies";

// Init application
const app: Application = express();

// Use body parser
app.use(bodyparser());

// Set header before every requests
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION, GET, PUT, POST, DELETE"
  );
  next();
});

//app.use(cors());

// Routes
app.use("/api/macs", macs);
app.use("/api/users", users);
app.use("/api/movies", movies);

// Port
const PORT: number = 8000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
