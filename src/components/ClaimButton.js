import React from 'react';
import { BrowserProvider, Contract } from 'ethers';
import contractABI from '../contractABI.json'; // Adjust the path as necessary

const contractAddress = '0xb4a96eba881c1e06a80b68c3bf22bc6c934dfc6a'; // Replace with your contract's address

const ClaimButton = () => {
  const claimTokens = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create an ethers provider
        const provider = new BrowserProvider(window.ethereum);

        // Get the signer
        const signer = await provider.getSigner();

        // Create contract instance
        const contract = new Contract(contractAddress, contractABI, signer);

        // Call the claimTokens function from your contract
        const tx = await contract.claimTokens();
        await tx.wait(); // Wait for the transaction to be mined

        alert('Tokens claimed successfully!');
      } catch (error) {
        console.error('Error claiming tokens:', error);
        alert('Failed to claim tokens.');
      }
    } else {
      alert('Please install MetaMask to interact with this feature.');
    }
  };

  return <button onClick={claimTokens}>Claim 100 GCCT Tokens</button>;
};

export default ClaimButton;
