// src/components/NetworkSetup.js
import React from 'react';

const addBSCNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x61', // Chain ID for BSC Testnet
          chainName: 'Binance Smart Chain Testnet',
          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'tBNB',
            decimals: 18,
          },
          blockExplorerUrls: ['https://testnet.bscscan.com'],
        }],
      });
      alert('BSC Testnet added to MetaMask!');
    } catch (error) {
      console.error('Error adding BSC Testnet:', error);
      alert('Failed to add BSC Testnet.');
    }
  } else {
    alert('MetaMask is not installed. Please install it to use this feature.');
  }
};

const NetworkSetup = () => (
  <div>
    <h2>1. Network Setup</h2>
    <p>To play the GCC Gimp Game, please connect to the Binance Smart Chain Testnet.</p>
    <button onClick={addBSCNetwork}>Add BSC Testnet to MetaMask</button>
  </div>
);

export default NetworkSetup;
