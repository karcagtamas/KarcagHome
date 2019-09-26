import express, { Router, Request, Response } from "express";
import db from "../database/connect";
import { MysqlError } from "mysql";
import MacAddress from "../models/macAddress";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  db.query("SELECT * FROM macs", (err: MysqlError, result: MacAddress[]) => {
    res.send(JSON.stringify(result));
  });
});

export default router;
