import { Router, Request, Response } from 'express';
import db from '../database/connect';
import { MysqlError } from 'mysql';
import Movie from '../models/movie';

const router: Router = Router();

// Get all movie
router.get('/', (req: Request, res: Response) => {
  const sql: string = 'CALL getAllMovies()';
  db.query(sql, (err: MysqlError, results: any) => {
    if (err) throw err;
    res.send(JSON.stringify(results[0]));
  });
});

// Get movies for a user
router.get('/:user', (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.user);
  const sql: string = 'CALL getMovies(?)';
  db.query(sql, [userId], (err: MysqlError | null, results: any) => {
    if (err) throw err;
    res.send(JSON.stringify(results[0]));
  });
});

// Add new movie
router.post('/', (req: Request, res: Response) => {
  const movie: Movie = req.body.movie;
  const sql: string = 'CALL addMovie(?, ?)';
  db.query(
    sql,
    [movie.createrId, movie.name],
    (err: MysqlError | null, results: any) => {
      if (err) throw err;
      res.send(JSON.stringify(results[0][0]));
    }
  );
});

// Update movie
router.put('/', (req: Request, res: Response) => {
  const movie: Movie = req.body.movie;
  const sql: string = 'CALL updateMovie(?, ?, ?)';
  db.query(
    sql,
    [movie.id, movie.lastModifierId, movie.name],
    (err: MysqlError | null) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Delete movie
router.delete('/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const sql: string = 'CALL deleteMovie(?)';
  db.query(sql, [id], (err: MysqlError | null, results: any) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Pick movie
router.post('/:id/pick', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userId: number = req.body.userId;
  const sql: string = 'CALL pickMovie(?, ?)';
  db.query(sql, [id, userId], (err: MysqlError | null, results: any) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Unpick movie
router.post('/:id/unpick', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userId: number = req.body.userId;
  const sql: string = 'CALL unPickMovie(?, ?)';
  db.query(sql, [id, userId], (err: MysqlError | null, results: any) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// See movie
router.post('/:id/seen', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const userId: number = req.body.userId;
  const seen: boolean = req.body.seen;
  const sql: string = 'CALL seeMovie(?, ?, ?)';
  db.query(sql, [id, userId, seen], (err: MysqlError | null, results: any) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

export default router;
