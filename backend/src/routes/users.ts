import { Router, Request, Response } from "express";
import db from "../database/connect";
import { MysqlError } from "mysql";
import Token from "../models/token";
import User from "../models/user";
import bcrypt from "bcrypt";
import uuid from "uuid";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  let response = { success: false, token: "", userId: 0 };
  db.query(sql, [username], (err: MysqlError | null, results: User[]) => {
    if (results[0]) {
      const result: User = results[0];
      response.userId = result.id ? result.id : 0;
      comparePassword(
        password,
        result.password ? result.password : "",
        (err: any, match: boolean) => {
          if (err) {
            response.success = false;
            res.send(JSON.stringify(response));
          } else {
            response.success = match;
          }
          if (response.success) {
            response.token = uuid.v4();
            const sql2 = "CALL setToken(?, ?);";
            db.query(
              sql2,
              [response.userId, response.token],
              (err, results) => {
                if (err) throw err;
                res.send(JSON.stringify(response));
              }
            );
          }
        }
      );
    } else {
      res.send(JSON.stringify(response));
    }
  });
});

router.post("/token", (req: Request, res: Response) => {
  const token: string = req.body.token;
  const userId: number = parseInt(req.body.userId);
  const sql = `SELECT * FROM tokens WHERE user = ? AND token = ?`;
  db.query(sql, [userId, token], (err: MysqlError | null, results: Token[]) => {
    if (err) {
      throw err;
    }
    if (results.length > 0) {
      res.send(JSON.stringify({ valid: true }));
    } else {
      res.send(JSON.stringify({ valid: false }));
    }
  });
});

/* router.get("/hash/:pass", (req: Request, res: Response) => {
  const pass = req.params.pass;
  genHash(pass, (err: any, hashV: string) => {
    res.send(hashV);
  });
});
 */
function genHash(password: string, callback: any) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(password, salt, (err, hash) => {
      return callback(err, hash);
    });
  });
}

function comparePassword(plainPass: string, hash: string, callback: any) {
  bcrypt.compare(plainPass, hash, (err, isPasswordMatch) => {
    return err == null ? callback(null, isPasswordMatch) : callback(err);
  });
}

export default router;
