// src/components/Instructions.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Instructions.css'; // Import the CSS file for styling

const Instructions = ({ switchNetwork, getTestBNB, claimAirdrop }) => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3 id="network" className="gold-text">1. Change MetaMask Network</h3>
          <p className="underlined-text">Switch your MetaMask to the Binance Smart Chain Testnet.</p>
          <Button variant="primary" onClick={switchNetwork}>Switch Network</Button>
        </Col>
        <Col>
          <h3 id="faucet" className="gold-text">2. Get Test BNB</h3>
          <p className="underlined-text">Obtain test BNB from the faucet to cover transaction fees.</p>
          <Button variant="primary" onClick={getTestBNB}>Get Test BNB</Button>
        </Col>
        <Col>
          <h3 id="airdrop" className="gold-text">3. Claim Airdrop</h3>
          <p className="underlined-text">Claim your free 100 GCCT tokens.</p>
          <Button variant="primary" onClick={claimAirdrop}>Claim Airdrop</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Instructions;
