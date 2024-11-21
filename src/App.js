import React, { useState } from 'react';
import { ethers } from 'ethers';
import NavigationBar from './components/NavigationBar';
import ClaimButton from './components/ClaimButton';
import NetworkSetup from './components/NetworkSetup';
import Faucet from './components/Faucet';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);

  const INFURA_URL = `https://bsc-testnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`;
  const infuraProvider = new ethers.providers.JsonRpcProvider(INFURA_URL);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        // Get balance for the connected account
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const userBalance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(userBalance));
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  const getLatestBlock = async () => {
    try {
      const latestBlock = await infuraProvider.getBlockNumber();
      setBlockNumber(latestBlock);
    } catch (error) {
      console.error('Error fetching block number:', error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavigationBar />
      <div className="container mt-4 px-3">
        <h1 className="gold-text text-center">Welcome to the GCC Gimp Game</h1>

        {/* Wallet Connection Section */}
        {account ? (
          <div className="text-center">
            <p>Connected Account: <strong>{account}</strong></p>
            <p>Balance: <strong>{balance}</strong> BNB</p>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect MetaMask
            </button>
          </div>
        )}

        {/* Fetch Block Number Section */}
        <div className="mt-4 text-center">
          <button className="btn btn-secondary" onClick={getLatestBlock}>
            Get Latest Block (Infura)
          </button>
          {blockNumber !== null && (
            <p>Latest Block Number: <strong>{blockNumber}</strong></p>
          )}
        </div>

        {/* Network Setup Section */}
        <div id="network" className="section-frame mt-5">
          <NetworkSetup />
        </div>

        {/* Faucet Section */}
        <div id="faucet" className="section-frame mt-5">
          <Faucet />
        </div>

        {/* Airdrop Section */}
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
