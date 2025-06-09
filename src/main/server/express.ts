import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { GET_USER_API } from '@/constants';
import type { User } from '../model/user.model';

const app = express();
const PORT = 3000;

app.use(cors());
app.get(GET_USER_API, (req: Request, res: Response<User>) => {
  res.json({ name: 'Han', role: 'Creater'});
});

export function startServer(): void {
  app.listen(PORT, () => {
    console.log(`✅ Express server listening at http://localhost:${PORT}`);
  });
}
