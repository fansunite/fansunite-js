import { Bet } from '../types';

export async function signBet(web3: any, bet: Bet, hash: string) {
  const sig = (await web3.eth.sign(hash, bet.backer)).slice(2);

  const r = Buffer.from(sig.substring(0, 64), 'hex');
  const s = Buffer.from(sig.substring(64, 128), 'hex');
  const v = Buffer.from((parseInt(sig.substring(128, 130), 16) + 27).toString(16), 'hex');
  const mode = Buffer.from('01', 'hex');

  return '0x' + Buffer.concat([mode, v, r, s]).toString('hex');
}
