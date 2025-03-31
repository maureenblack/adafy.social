import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface WalletInfo {
  name: string;
  icon: string;
  installed: boolean;
  identifier: string;
}

const WalletDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 220px;
  z-index: 1000;
`;

const WalletOption = styled.button<{ installed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border: none;
  background: none;
  color: var(--text-primary);
  cursor: ${props => props.installed ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.installed ? 1 : 0.5};
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.installed ? 'var(--surface)' : 'none'};
  }

  .wallet-icon {
    font-size: 1.2rem;
  }

  .wallet-name {
    flex-grow: 1;
    text-align: left;
    font-weight: 500;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.installed ? 'var(--success)' : 'var(--text-secondary)'};
  }
`;

export const WalletConnect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check for installed wallets
    const checkWallets = () => {
      const availableWallets: WalletInfo[] = [
        { 
          name: 'Nami',
          icon: '🦊',
          installed: !!window?.cardano?.nami,
          identifier: 'nami'
        },
        { 
          name: 'Eternl',
          icon: '⚡',
          installed: !!window?.cardano?.eternl,
          identifier: 'eternl'
        },
        { 
          name: 'Flint',
          icon: '🔥',
          installed: !!window?.cardano?.flint,
          identifier: 'flint'
        },
        { 
          name: 'Yoroi',
          icon: '🔷',
          installed: !!window?.cardano?.yoroi,
          identifier: 'yoroi'
        },
        { 
          name: 'Vespr',
          icon: '🌟',
          installed: !!window?.cardano?.vespr,
          identifier: 'vespr'
        }
      ];
      setWallets(availableWallets);
    };

    if (typeof window !== 'undefined') {
      checkWallets();
    }
  }, []);

  const connectWallet = async (wallet: WalletInfo) => {
    if (!wallet.installed) return;
    
    try {
      const walletApi = await (window as any).cardano[wallet.identifier].enable();
      if (walletApi) {
        setConnected(true);
        setIsOpen(false);
        // Add your wallet connection logic here
        console.log(`Connected to ${wallet.name}`);
      }
    } catch (error) {
      console.error(`Error connecting to ${wallet.name}:`, error);
    }
  };

  return (
    <WalletDropdown>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {connected ? '🔗 Connected' : '👛 Connect Wallet'}
      </DropdownButton>

      <DropdownContent isOpen={isOpen}>
        {wallets.map((wallet) => (
          <WalletOption
            key={wallet.name}
            installed={wallet.installed}
            onClick={() => wallet.installed && connectWallet(wallet)}
          >
            <span className="wallet-icon">{wallet.icon}</span>
            <span className="wallet-name">{wallet.name}</span>
            <span className="status-indicator" />
          </WalletOption>
        ))}
      </DropdownContent>
    </WalletDropdown>
  );
};

export default WalletConnect;
