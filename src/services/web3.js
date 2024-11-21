import Onboard from '@web3-onboard/core';
import metamaskModule from '@web3-onboard/metamask';
import { ethers } from 'ethers';

// Initialize Metamask module
const metamask = metamaskModule();

// Initialize Web3-Onboard
const onboard = Onboard({
  wallets: [metamask],
  chains: [
    {
      id: '0x61', // BSC Testnet Chain ID
      token: 'tBNB', // Testnet BNB token
      label: 'Binance Smart Chain Testnet',
      rpcUrl: process.env.REACT_APP_RPC_URL, // Use your .env file for RPC URL
    },
  ],
});

export default onboard;

// Function to connect wallet
export async function connectWallet() {
  const wallets = await onboard.connectWallet();
  if (wallets[0]) {
    const provider = new ethers.providers.Web3Provider(wallets[0].provider);
    const signer = provider.getSigner();
    return { provider, signer, wallet: wallets[0] };
  } else {
    console.log('No wallet connected');
    return null;
  }
}
