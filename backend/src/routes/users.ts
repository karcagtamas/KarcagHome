import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.params;
  const response = { success: true, token: 'asdasdfasdjf', userId: 1 };
  res.send(JSON.stringify(response));
});

router.post('/token', (req: Request, res: Response) => {
  const token: string = req.params.token;
  const userId: number = parseInt(req.params.userId);
  const response = { valid: true };
  res.send(JSON.stringify(response));
});

export default router;
