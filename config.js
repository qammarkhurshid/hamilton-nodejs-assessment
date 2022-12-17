/* following sensitive vars are written here for the sake of convinience 
  and only for the purpose of this assessment and should never be exposed 
  or pushed to repo in real scenario*/
export const config = {
  API_KEY: process.env.API_KEY || '69a978fad6ce45f8b3c0fd577fdd2940',
  PROVIDER_URL: process.env.PROVIDER_URL || 'https://mainnet.infura.io/v3/',
};
