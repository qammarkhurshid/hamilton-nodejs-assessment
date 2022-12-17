import { Router } from 'express';
import accountsRouter from './accounts.routes.js';

const appRouter = Router();

appRouter.use('/accounts', accountsRouter);
export default appRouter;
