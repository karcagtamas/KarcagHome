import express, { Application } from "express";
import cors from "cors";
import bodyparser from "body-parser";
import db from "./database/connect";

import macs from "./routes/macAddresses";

const app: Application = express();

app.use(bodyparser());

//app.use(cors());

app.use("/api/macs", macs);

const PORT: number = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
