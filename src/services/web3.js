import Onboard from '@web3-onboard/core';
import metamaskModule from '@web3-onboard/metamask';
import walletConnectModule from '@web3-onboard/walletconnect';
import { ethers } from 'ethers';

// Initialize MetaMask module
const metamask = metamaskModule();

// Initialize WalletConnect module
const walletConnect = walletConnectModule({
  connect: {
    rpc: {
      97: process.env.REACT_APP_RPC_URL, // BSC Testnet RPC URL
    },
  },
});

// Initialize Web3-Onboard
const onboard = Onboard({
  wallets: [metamask, walletConnect], // Include WalletConnect
  chains: [
    {
      id: '0x61', // BSC Testnet Chain ID
      token: 'tBNB', // Testnet BNB token
      label: 'Binance Smart Chain Testnet',
      rpcUrl: process.env.REACT_APP_RPC_URL,
    },
  ],
});

export default onboard;

// Function to detect mobile device
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Function to connect wallet with deep linking for MetaMask
export async function connectWallet() {
  if (isMobile()) {
    // Redirect to MetaMask app if mobile
    window.location.href = `https://metamask.app.link/dapp/gcct-token-drop.vercel.app`;
    return;
  }

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
