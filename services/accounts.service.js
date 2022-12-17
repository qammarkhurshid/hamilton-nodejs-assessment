import Web3 from 'web3';
import _ from 'lodash';

import { baycAbi, baycContractAddress, getBaycOwners } from '../contracts/bayc.js';
import { coolAbi, coolContractAddress, getCoolOwners } from '../contracts/cool.js';
import { config } from '../config.js';

const { uniq, intersection } = _;
const providerOptions = {
  keepAlive: true,
};

const provider = new Web3.providers.HttpProvider(`${config.PROVIDER_URL}${config.API_KEY}`, providerOptions);

const web3 = new Web3(provider);

const baycContract = new web3.eth.Contract(baycAbi, baycContractAddress);
const coolContract = new web3.eth.Contract(coolAbi, coolContractAddress);

/* 
  For the purposes of this assessment, let's suppose this array as our cache 
  that would store addresses of accounts containing both BAYC and COOL 
*/
let accounts = [];
export default {
  async getAccountsWithSelectedTokens() {
    const baycTotalSupply = await baycContract.methods.totalSupply().call();
    const coolTotalSupply = await coolContract.methods.totalSupply().call();

    const baycAddresses = await getBaycOwners(baycTotalSupply, baycContract);
    const coolAddresses = await getCoolOwners(coolTotalSupply, coolContract);

    // Create an array to store the accounts that own both tokens
    accounts = uniq(intersection(baycAddresses, coolAddresses));

    return accounts;
  },

  async getBalance() {
    const findBalance = web3.eth.getBalance;
    let allBalances = [];
    if (accounts.length) {
      allBalances = await Promise.all(
        accounts.map(async (account) => {
          const bal = await findBalance(account);
          return {
            [account]: web3.utils.fromWei(bal, 'ether'),
          };
        })
      );
    }
    return allBalances;
  },
};
