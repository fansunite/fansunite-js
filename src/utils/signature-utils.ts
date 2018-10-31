import { Bet } from '../types';
import { constants } from './constants';

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

export async function typedDataSignBet(
  web3: any,
  betMessage: Bet,
  name: string,
  version: string,
  betManagerAddress: string
) : Promise<string> {

  const domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
    { name: 'salt', type: 'bytes32' },
  ];

  const bet = [
    { name: 'backer', type: 'address' },
    { name: 'layer', type: 'address' },
    { name: 'token', type: 'address' },
    { name: 'league', type: 'address' },
    { name: 'resolver', type: 'address' },
    { name: 'backerStake', type: 'uint256' },
    { name: 'fixture', type: 'uint256' },
    { name: 'odds', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
    { name: 'payload', type: 'bytes' }
  ];

  const domainData = {
    name,
    version,
    chainId: await web3.eth.net.getId(),
    verifyingContract: betManagerAddress,
    salt: constants.CONTRACT_SALT
  };

  const data = JSON.stringify({
    types: {
      EIP712Domain: domain,
      Bet: bet
    },
    domain: domainData,
    primaryType: 'Bet',
    message: betMessage
  });

  return signTypedDataV3(web3, betMessage, data);
}

async function signTypedDataV3(web3: any, betMessage, data) {
  const sigResult: any = await new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync(
      {
        method: 'eth_signTypedData_v3',
        params: [betMessage.backer, data],
        from: betMessage.backer
      }, (err, result) => {
        if(err) {
          reject(err);
        }
        const sig = result.result.substring(2);
        const r = Buffer.from(sig.substring(0, 64), 'hex');
        const s = Buffer.from(sig.substring(64, 128), 'hex');
        let vInt = parseInt(sig.substring(128, 130), 16);
        if (vInt < 27) {
          vInt += 27;
        }
        const v = Buffer.from(vInt.toString(16), 'hex');
        const mode = Buffer.from('1', 'hex');

        const signature: string =  '0x' + Buffer.concat([mode, v, r, s]).toString('hex');
        resolve(signature);
      }
    );
  });
  return sigResult;
}
