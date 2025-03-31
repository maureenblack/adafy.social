import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface WalletInfo {
  name: string;
  icon: string;
  installed: boolean;
}

const WalletButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 320px;
  margin: 0 auto;
`;

export const WalletConnect: React.FC = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check for installed wallets
    const checkWallets = () => {
      const availableWallets: WalletInfo[] = [
        { name: 'Nami', icon: '🦊', installed: !!window?.cardano?.nami },
        { name: 'Eternl', icon: '⚡', installed: !!window?.cardano?.eternl },
        { name: 'Flint', icon: '🔥', installed: !!window?.cardano?.flint }
      ];
      setWallets(availableWallets);
    };

    if (typeof window !== 'undefined') {
      checkWallets();
    }
  }, []);

  const connectWallet = async (walletName: string) => {
    try {
      const wallet = await (window as any).cardano[walletName.toLowerCase()].enable();
      if (wallet) {
        setConnected(true);
        // Add your wallet connection logic here
        console.log(`Connected to ${walletName}`);
      }
    } catch (error) {
      console.error(`Error connecting to ${walletName}:`, error);
    }
  };

  return (
    <WalletContainer>
      {wallets.map((wallet) => (
        <WalletButton
          key={wallet.name}
          onClick={() => connectWallet(wallet.name)}
          disabled={!wallet.installed}
        >
          {wallet.icon} Connect {wallet.name}
        </WalletButton>
      ))}
    </WalletContainer>
  );
};

export default WalletConnect;
