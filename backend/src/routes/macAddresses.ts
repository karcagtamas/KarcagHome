import express, { Router, Request, Response } from "express";
import db from "../database/connect";
import { MysqlError } from "mysql";
import MacAddress from "../models/macAddress";

const router: Router = express.Router();

// Get MAC addresses
router.get("/", (req: Request, res: Response) => {
  const sql: string = "CALL getMacAddresses();";
  db.query(sql, (err: MysqlError, result: any) => {
    if (err) throw err;
    res.send(JSON.stringify(result[0]));
  });
});

// Get MAC address by the given id
router.get("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const sql: string = "CALL getMacAddresses();";
  db.query(sql, (err: MysqlError, result: any) => {
    if (err) throw err;
    res.send(JSON.stringify(result[0].find((x: MacAddress) => x.id === id)));
  });
});

// Add new MAC address
router.post("/", (req: Request, res: Response) => {
  const address: MacAddress = req.body.address;
  const sql: string = "CALL addMacAddress(?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      address.address,
      address.owner,
      address.name,
      address.deviceName,
      address.ip
    ],
    (err: MysqlError | null, result: any) => {
      if (err) throw err;
      address.id = result[0][0].last_inserted_id;
      res.send(JSON.stringify(address));
    }
  );
});

// Delete MAC address
router.delete("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const sql: string = "CALL deleteMacAddress(?)";
  db.query(sql, [id], (err: MysqlError | null) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Update MAC address
router.put("/", (req: Request, res: Response) => {
  const address: MacAddress = req.body.address;
  const sql: string = "CALL updateMacAddress(?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      address.id,
      address.address,
      address.owner,
      address.name,
      address.deviceName,
      address.ip
    ],
    (err: MysqlError | null) => {
      if (err) throw err;
      res.send(JSON.stringify(address));
    }
  );
});

export default router;
