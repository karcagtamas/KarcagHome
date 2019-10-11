import { Router, Request, Response } from 'express';
import db from '../database/connect';
import { MysqlError } from 'mysql';
import Series from '../models/series';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const sql: string = 'CALL getAllSeries()';
  db.query(sql, (err: MysqlError, seriesResult: any) => {
    const series: Series[] = JSON.parse(JSON.stringify(seriesResult[0]));
    series.map(x => {
      x.seasons = [];
      const seriesSql: string = 'CALL getSeasons(?)';
      db.query(
        seriesSql,
        [x.id],
        (err: MysqlError | null, seasonResult: any) => {
          x.seasons = JSON.parse(JSON.stringify(seasonResult[0]));
          x.seasons.map(y => {
            y.episodes = [];
            const episodeSql: string = 'CALL getEpisodes(?)';
            db.query(
              episodeSql,
              [y.id],
              (err: MysqlError | null, episodeResult: any) => {
                y.episodes = episodeResult[0];
                return y;
              }
            );
          });
          return x;
        }
      );
    });
    res.send(JSON.stringify(series));
  });
});

export default router;
