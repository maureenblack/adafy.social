export interface Post {
  id: string;
  content: string;
  ipfsHash: string;
  authorAddress: string;
  timestamp: number;
  likeBalance: number;  // Total ADA balance of wallets that liked the post
  likers: string[];    // Array of wallet addresses that liked the post
  comments: Comment[];
  signature?: string;  // Wallet signature for verification
}

export interface Comment {
  id: string;
  content: string;
  authorAddress: string;
  timestamp: number;
  signature?: string;
}

export interface UserProfile {
  address: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  verified: boolean;
  totalStaked: number;  // Amount of ADA staked
  joinedAt: number;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number | null;
  network: string | null;
}
