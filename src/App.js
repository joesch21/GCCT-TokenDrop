// src/App.js
import React, { useState } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import NavigationBar from './components/NavigationBar';
import ClaimButton from './components/ClaimButton';
import NetworkSetup from './components/NetworkSetup';
import Faucet from './components/Faucet';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const provider = new BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(formatEther(balance));
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4 px-3">
        <h1 className="gold-text text-center">Welcome to the GCC Gimp Game</h1>
        {account ? (
          <div className="text-center">
            <p>Connected Account: {account}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect MetaMask
            </button>
          </div>
        )}

        <div id="network" className="section-frame mt-5">
          <NetworkSetup />
        </div>

        <div id="faucet" className="section-frame mt-5">
          <Faucet />
        </div>

        <div id="airdrop" className="section-frame mt-5">
          <h2 className="gold-text">3. Claim Airdrop</h2>
          <p>Once you have Test BNB, claim your GCC tokens to start playing.</p>
          <ClaimButton />
        </div>
      </div>
    </div>
  );
}

export default App;
