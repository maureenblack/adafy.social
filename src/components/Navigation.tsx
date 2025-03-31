import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import WalletConnect from './WalletConnect';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 51, 173, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--primary);
    transition: width 0.2s ease;
  }

  &:hover {
    color: var(--primary);
    &:after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }
`;

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Logo variant="full" size={40} />
        
        <NavLinks>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#explore">Explore</NavLink>
          <NavLink href="#docs">Docs</NavLink>
          <NavLink href="#community">Community</NavLink>
          <WalletConnect />
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>

      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink href="#features">Features</MobileNavLink>
        <MobileNavLink href="#explore">Explore</MobileNavLink>
        <MobileNavLink href="#docs">Docs</MobileNavLink>
        <MobileNavLink href="#community">Community</MobileNavLink>
        <div style={{ padding: '1rem' }}>
          <WalletConnect />
        </div>
      </MobileMenu>
    </Nav>
  );
};

export default Navigation;
