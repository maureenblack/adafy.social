import { WalletState } from '../types';

class WalletService {
  private api: any;
  private state: WalletState = {
    connected: false
  };

  async connect(walletName: string): Promise<WalletState> {
    try {
      const cardano = (window as any).cardano;
      if (!cardano?.[walletName]) {
        throw new Error(`${walletName} wallet not installed`);
      }

      this.api = await cardano[walletName].enable();
      const [address] = await this.api.getUsedAddresses();
      const balance = await this.getBalance();
      const network = await this.api.getNetworkId();

      this.state = {
        connected: true,
        address,
        balance,
        network: network === 1 ? 'mainnet' : 'testnet'
      };

      return this.state;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }

  async getBalance(): Promise<number> {
    if (!this.api) throw new Error('Wallet not connected');
    
    try {
      const balance = await this.api.getBalance();
      return parseInt(balance) / 1000000; // Convert lovelace to ADA
    } catch (error) {
      console.error('Balance check error:', error);
      throw error;
    }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.api) throw new Error('Wallet not connected');
    
    try {
      const signature = await this.api.signData(
        this.state.address!,
        Buffer.from(message).toString('hex')
      );
      return signature;
    } catch (error) {
      console.error('Message signing error:', error);
      throw error;
    }
  }

  async sendTip(recipientAddress: string, amount: number): Promise<string> {
    if (!this.api) throw new Error('Wallet not connected');
    
    try {
      const tx = await this.api.buildTx({
        recipients: [{
          address: recipientAddress,
          amount: amount * 1000000 // Convert ADA to lovelace
        }]
      });
      
      const signedTx = await this.api.signTx(tx);
      const txHash = await this.api.submitTx(signedTx);
      return txHash;
    } catch (error) {
      console.error('Tip sending error:', error);
      throw error;
    }
  }

  async stakeForVerification(amount: number = 10): Promise<string> {
    if (!this.api) throw new Error('Wallet not connected');
    
    try {
      // Implementation for staking mechanism
      // This would involve creating a stake transaction
      // and locking ADA in a smart contract
      throw new Error('Staking mechanism not implemented yet');
    } catch (error) {
      console.error('Staking error:', error);
      throw error;
    }
  }

  disconnect(): void {
    this.api = null;
    this.state = {
      connected: false
    };
  }

  getState(): WalletState {
    return this.state;
  }
}

export const walletService = new WalletService();
