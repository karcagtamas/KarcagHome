import { Router, Request, Response } from "express";
import db from "../database/connect";
import { MysqlError } from "mysql";
import Series from "../models/series";
import Season from "../models/season";
import Episode from "../models/episode";

const router: Router = Router();

// Get series
router.get("/", (req: Request, res: Response) => {
  console.log("start");
  getSeries()
    .then(result => {
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Add series
router.post("/", (req: Request, res: Response) => {
  const sql: string = "CALL addSeries(?, ?);";
  const name: string = req.body.name;
  const creater: number = parseInt(req.body.creater);
  db.query(sql, [name, creater], (err: MysqlError | null, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(JSON.stringify(result[0][0]));
    }
  });
});

// Update series
router.put("/:id", (req: Request, res: Response) => {
  const sql: string = "CALL updateSeries(?, ?, ?);";
  const id: number = parseInt(req.params.id);
  const name: string = req.body.name;
  const updater: number = parseInt(req.body.updater);
  db.query(sql, [id, name, updater], (err: MysqlError | null) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

// Delete series
router.delete("/:id", (req: Request, res: Response) => {
  const sql: string = "CALL deleteSeries(?);";
  const id: number = parseInt(req.params.id);
  db.query(sql, [id], (err: MysqlError | null) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

// Add season with episodes
router.post("/seasons", (req: Request, res: Response) => {
  const sql: string = "CALL addSeason(?, ?, ?);";
  const series: number = parseInt(req.body.series);
  const number: number = parseInt(req.body.number);
  const episodes: number = parseInt(req.body.episodes);
  db.query(
    sql,
    [series, number, episodes],
    (err: MysqlError | null, results: any) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.send(JSON.stringify(results[0][0]));
    }
  );
});

// Delete season
router.delete("/seasons/:id", (req: Request, res: Response) => {
  const sql: string = "CALL deleteSeason(?);";
  const id: number = parseInt(req.params.id);
  db.query(sql, [id], (err: MysqlError | null) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

// Add episode
router.post("/episodes", (req: Request, res: Response) => {
  const sql: string = "CALL addEpisode(?, ?);";
  const season: number = parseInt(req.body.season);
  const number: number = parseInt(req.body.number);
  db.query(sql, [season, number], (err: MysqlError | null, results: any) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(JSON.stringify(results[0][0]));
  });
});

// Delete episode
router.delete("/episodes/:id", (req: Request, res: Response) => {
  const sql: string = "CALL deleteEpisode(?);";
  const id: number = parseInt(req.params.id);
  db.query(sql, [id], (err: MysqlError | null) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

// Get series helper
function getSeries(): Promise<Series[]> {
  return new Promise((resolve, reject) => {
    const seriesSql: string = "CALL getAllSeries()";
    db.query(seriesSql, (err: MysqlError, seriesResult: any) => {
      if (err) {
        reject(err);
      }
      const series: Series[] = seriesResult[0];
      series.map(async (x: Series, index: number) => {
        x.seasons = [];
        await getSeasons(x.id || 0)
          .then(res => {
            x.seasons = res;
            return x;
          })
          .catch(err => {
            reject(err);
          });
        console.log(index);
        if (index === series.length - 1) {
          console.log("resolve", "length", x);
          resolve(series);
        }
      });
      if (series.length === 0) {
        console.log("resolve", "length-0");
        resolve([]);
      }
    });
  });
}

// Get seasons helper
function getSeasons(series: number): Promise<Season[]> {
  return new Promise((resolve, reject) => {
    const seasonSql: string = "CALL getSeasons(?)";
    db.query(
      seasonSql,
      [series],
      async (err: MysqlError | null, seasonsResult: any) => {
        if (err) {
          reject(err);
        }
        const seasons: Season[] = seasonsResult[0];
        await Promise.all(
          seasons.map(async (x: Season, index: number) => {
            x.episodes = [];
            await getEpisodes(x.id || 0)
              .then(res => {
                x.episodes = res;
                return x;
              })
              .catch(err => {
                reject(err);
              });
            if (index === seasons.length - 1) {
              resolve(seasons);
            }
          })
        );
        if (seasons.length === 0) {
          resolve([]);
        }
      }
    );
  });
}

// Get episodes helper
function getEpisodes(season: number): Promise<Episode[]> {
  return new Promise((resolve, reject) => {
    const episodeSql: string = "CALL getEpisodes(?)";
    db.query(
      episodeSql,
      [season],
      (err: MysqlError | null, episodesResult: any) => {
        if (err) {
          reject(err);
        }
        resolve(episodesResult[0]);
      }
    );
  });
}

export default router;
