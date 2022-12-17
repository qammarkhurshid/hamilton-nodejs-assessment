import Router from 'express';
import accountsService from '../services/accounts.service.js';
import { errorMessages, responses } from '../constants.js';

const accountsRouter = Router();
/*
 * Returns ethereum accounts containing both
 * BAYC AND COOL tokens
 */
accountsRouter.get('/', async (req, res) => {
  try {
    const response = await accountsService.getAccountsWithSelectedTokens();
    res.status(200).json({ status: responses.SUCCESS_STATUS_STRING, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || errorMessages.GENERIC_ERROR_MESSAGE });
  }
});

/*
 * Returns balance of owner (in eth) who has both
 * BAYC AND COOL tokens
 */
accountsRouter.get('/balances', async (req, res) => {
  try {
    const response = await accountsService.getBalance();
    res.status(200).json({ status: responses.SUCCESS_STATUS_STRING, balance: response });
  } catch (error) {
    res.status(500).json({ error: error?.message || errorMessages.GENERIC_ERROR_MESSAGE });
  }
});

export default accountsRouter;
