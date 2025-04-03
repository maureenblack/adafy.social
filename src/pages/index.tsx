import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navigation from '../components/Navigation';
import Feed from '../components/Feed';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--background) 0%, var(--background-light) 100%);
  padding-top: 70px;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(180deg, 
    rgba(0, 18, 51, 0.8) 0%,
    rgba(0, 18, 51, 0) 100%
  );
  border-radius: 0 0 30px 30px;

  h1 {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(90deg, #3355FF, #0033AD);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    animation: ${gradientAnimation} 6s ease infinite;
    background-size: 200% 200%;
  }

  p.lead {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CTAButton = styled.button`
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(51, 85, 255, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
  }
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, 
      var(--background) 0%,
      transparent 100%
    );
    z-index: -1;
  }
`;

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Container>
        <HeroSection>
          <h1>The Future of Social is Here</h1>
          <p className="lead">
            Experience true ownership of your content, ad-free social networking, and earn rewards
            for your contributions - all powered by Cardano blockchain.
          </p>
          <div>
            <CTAButton className="connect-wallet-btn">Connect Wallet</CTAButton>
            <CTAButton style={{ 
              background: 'transparent',
              border: '2px solid var(--primary-light)',
              color: 'var(--text-primary)'
            }}>
              Learn More
            </CTAButton>
          </div>
        </HeroSection>

        <MainContent>
          <Feed />
        </MainContent>
      </Container>
    </>
  );
};

export default HomePage;
