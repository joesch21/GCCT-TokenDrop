// src/components/Faucet.js
import React from 'react';
import './Faucet.css'; // Import the CSS file for styling

const Faucet = () => (
  <div className="faucet-container">
    <h2>2. Get Test BNB</h2>
    <p>
      You'll need test BNB (tBNB) to play the GCC Gimp Game. You can get some from the official Binance Smart Chain Testnet Faucet.
    </p>
    <a
      className="faucet-link"
      href="https://testnet.binance.org/faucet-smart"
      target="_blank"
      rel="noopener noreferrer"
    >
      Go to BSC Testnet Faucet
    </a>
  </div>
);

export default Faucet;
