

export function awaitTxMined(web3: any, txHash: string, interval: number) {
  interval = interval ? interval : 500;
  const transactionReceiptAsync = async(tx: string, resolve: any, reject: any) => {
    try {
      const receipt = web3.eth.getTransactionReceipt(txHash);
      if (!receipt) {
        setTimeout( () => {
          transactionReceiptAsync(tx, resolve, reject);
        }, interval);
      } else {
        resolve(receipt);
      }
    } catch(e) {
      reject(e);
    }
  };

  if (Array.isArray(txHash)) {
    const promises: any = [];
    txHash.forEach((oneTxHash) => {
      promises.push(awaitTxMined(web3, oneTxHash, interval));
    });
    return Promise.all(promises);
  } else {
    return new Promise( (resolve, reject) => {
      transactionReceiptAsync(txHash, resolve, reject);
    });
  }
}
