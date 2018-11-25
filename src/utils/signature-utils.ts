import { Bet } from '../types';

export async function typedDataSignBet(
  web3: any,
  bet: Bet,
  betManagerAddress: string
) : Promise<string> {

  const name = 'FansUnite Protocol';

  const eip712Domain = [
    { name: 'name', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
  ];

  const eip712Bet = [
    { name: 'backer', type: 'address' },
    { name: 'layer', type: 'address' },
    { name: 'token', type: 'address' },
    { name: 'league', type: 'address' },
    { name: 'resolver', type: 'address' },
    { name: 'backerStake', type: 'uint256' },
    { name: 'fixture', type: 'uint256' },
    { name: 'odds', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'payload', type: 'bytes' }
  ];

  const domainData = {
    name,
    chainId: await web3.eth.net.getId(),
    verifyingContract: betManagerAddress
  };

  const message = {
    backer: bet.backer,
    layer: bet.layer,
    token: bet.token,
    league: bet.league,
    resolver: bet.resolver,
    backerStake: bet.backerStake.toString(),
    fixture: bet.fixture.toString(),
    odds: bet.odds.toString(),
    expiration: bet.expiration.toString(),
    nonce: bet.nonce.toString(),
    payload: bet.payload
  };

  const data = JSON.stringify({
    types: {
      EIP712Domain: eip712Domain,
      Bet: eip712Bet
    },
    domain: domainData,
    primaryType: 'Bet',
    message
  });

  return signTypedDataV3(web3, bet, data);
}

async function signTypedDataV3(web3: any, bet, data) {
  const sigResult: any = await new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        method: 'eth_signTypedData_v3',
        params: [bet.backer, data],
        from: bet.backer
      }, (err, result) => {
        if(err) {
          reject(err);
        }

        if (!result.result) {
          return reject(result);
        }

        const sig = result.result.substring(2);
        const r = Buffer.from(sig.substring(0, 64), 'hex');
        const s = Buffer.from(sig.substring(64, 128), 'hex');
        let vInt = parseInt(sig.substring(128, 130), 16);
        if (vInt < 27) {
          vInt += 27;
        }
        const v = Buffer.from(vInt.toString(16), 'hex');
        const mode = Buffer.from('00', 'hex');

        const signature: string =  '0x' + Buffer.concat([mode, v, r, s]).toString('hex');

        resolve(signature);
      }
    );
  });
  return sigResult;
}
