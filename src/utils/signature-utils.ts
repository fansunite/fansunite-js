import { Bet } from '../types';

export async function signBet(web3: any, bet: Bet, hash: string, sigMode: string) {
  const sig = (await web3.eth.sign(hash, bet.backer)).slice(2);

  const r = Buffer.from(sig.substring(0, 64), 'hex');
  const s = Buffer.from(sig.substring(64, 128), 'hex');
  let vInt = parseInt(sig.substring(128, 130), 16);
  if (vInt < 27) {
    vInt += 27;
  }
  const v = Buffer.from(vInt.toString(16), 'hex');
  const mode = Buffer.from(sigMode, 'hex');

  return '0x' + Buffer.concat([mode, v, r, s]).toString('hex');
}

export async function personalSignBet(web3: any, bet: Bet, hash: string, sigMode: string) {
  const sig = (await web3.eth.personal.sign(hash, bet.backer)).slice(2);

  const r = Buffer.from(sig.substring(0, 64), 'hex');
  const s = Buffer.from(sig.substring(64, 128), 'hex');
  let vInt = parseInt(sig.substring(128, 130), 16);
  if (vInt < 27) {
    vInt += 27;
  }
  const v = Buffer.from(vInt.toString(16), 'hex');
  const mode = Buffer.from(sigMode, 'hex');

  return '0x' + Buffer.concat([mode, v, r, s]).toString('hex');
}
