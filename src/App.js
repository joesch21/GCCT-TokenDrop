import React, { useState, useEffect } from 'react';
import { JsonRpcProvider, BrowserProvider, formatEther } from 'ethers';
import NavigationBar from './components/NavigationBar';
import ClaimButton from './components/ClaimButton';
import NetworkSetup from './components/NetworkSetup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const INFURA_URL = `https://bsc-testnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`;
  const infuraProvider = new JsonRpcProvider(INFURA_URL);

  // Detect if the user is on a mobile device
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  // Function to connect wallet using MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum); // Updated to use BrowserProvider
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);

        const userBalance = await provider.getBalance(accounts[0]);
        setBalance(formatEther(userBalance));
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  // Function to fetch the latest block number using Infura
  const getLatestBlock = async () => {
    try {
      const latestBlock = await infuraProvider.getBlockNumber();
      setBlockNumber(latestBlock);
    } catch (error) {
      console.error('Error fetching block number:', error);
    }
  };

  // Function to open Binance Faucet link in a popup window
  const openFaucet = () => {
    window.open(
      "https://testnet.binance.org/faucet-smart",
      "_blank",
      "width=800,height=600,scrollbars=yes"
    );
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4 px-3">
        <h1 className="gold-text text-center">Welcome to the GCC GIMP Game</h1>

        {/* Wallet Connection Section */}
        <div className="text-center">
          {account ? (
            <div>
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
        </div>

        {/* Mobile/Browser Message */}
        <div className="mt-4 text-center">
          {!isMobile && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: "15px",
                borderRadius: "5px",
                border: "1px solid #f5c6cb",
              }}
            >
              <p>
                For the best experience, please open this app in the{" "}
                <strong>MetaMask Browser</strong> on mobile devices.
              </p>
              <p>
                Download MetaMask{" "}
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </p>
            </div>
          )}
        </div>

        {/* Faucet Section */}
        <div className="mt-4 text-center">
          <h2 className="gold-text">Need Test BNB?</h2>
          <p>Get free Test BNB from the Binance Testnet Faucet.</p>
          <button
            onClick={openFaucet}
            className="btn btn-warning"
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            Get Free BNB from Faucet
          </button>
        </div>

        {/* Latest Block Section */}
        <div className="mt-4 text-center">
          <button className="btn btn-secondary" onClick={getLatestBlock}>
            Get Latest Block (Infura)
          </button>
          {blockNumber !== null && <p>Latest Block Number: <strong>{blockNumber}</strong></p>}
        </div>

        {/* Network Setup Section */}
        <div id="network" className="section-frame mt-5">
          <NetworkSetup />
        </div>

        {/* Claim Tokens Section */}
        <div id="airdrop" className="section-frame mt-5">
          <h2 className="gold-text">Claim Airdrop</h2>
          <p>Once you have Test BNB, claim your GCC tokens to start playing.</p>
          <ClaimButton />
        </div>

        {/* Game Section */}
        <div id="play-game" className="section-frame mt-5">
          <h2 className="gold-text">Play the GIMP Game!</h2>
          <p>Play to win GCC tokens and enjoy the adventure!</p>
          <div className="text-center mt-3">
            <a
              href="https://gccnftgame.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              Play Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
