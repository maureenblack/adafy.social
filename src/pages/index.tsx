import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Logo';
import WalletConnect from '../components/WalletConnect';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 600px) 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WelcomeSection = styled.section`
  text-align: center;
  margin: 40px 0;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary);
  }

  p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
`;

const HomePage = () => {
  return (
    <Container>
      <Header>
        <Logo variant="full" size={48} />
        <WalletConnect />
      </Header>

      <Main>
        <div></div>
        <WelcomeSection>
          <h1>Welcome to Adafy</h1>
          <p>A decentralized, ad-free social platform built on Cardano</p>
          <p>Connect your wallet to get started</p>
        </WelcomeSection>
        <div></div>
      </Main>
    </Container>
  );
};

export default HomePage;
