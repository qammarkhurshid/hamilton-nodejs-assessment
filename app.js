import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import appRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/api', appRouter);
app.use('/health', (req, res) => {
  res.status(200).send({
    status: 'up',
    time: new Date(),
  });
});

app.use('*', (req, res) => {
  res.send(`
  <html>
    <h1>404</h1>
    <h4>Resource doesn't exist</h4>
  </html>`);
});

export default app;
