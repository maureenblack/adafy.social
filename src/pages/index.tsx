import React from 'react';
import styled, { keyframes } from 'styled-components';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import WalletConnect from '../components/WalletConnect';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0033AD11 0%, #ffffff 100%);
  padding-top: 70px; // Add space for fixed navigation
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(90deg, #0033AD, #3355FF);
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 51, 173, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: var(--primary);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const CTAButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 10px;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 51, 173, 0.2);
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
            <CTAButton>Connect Wallet</CTAButton>
            <CTAButton style={{ background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)' }}>
              Learn More
            </CTAButton>
          </div>
        </HeroSection>

        <FeatureGrid id="features">
          <FeatureCard>
            <h3>🎯 Own Your Content</h3>
            <p>Your posts are stored on IPFS and ownership is verified on Cardano blockchain. No more platform lock-in.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>💰 Earn Rewards</h3>
            <p>Get tipped in ADA for quality content. Build your reputation and earn from your social presence.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>🛡️ Ad-Free Forever</h3>
            <p>No ads, no tracking, no algorithms. Just pure, unfiltered social interaction.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>🌐 Decentralized</h3>
            <p>Built on Cardano blockchain, ensuring transparency, security, and true ownership.</p>
          </FeatureCard>
        </FeatureGrid>
      </Container>
    </>
  );
};

export default HomePage;
