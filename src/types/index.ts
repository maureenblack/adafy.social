export interface Post {
  id: string;
  content: string;
  ipfsHash: string;
  authorAddress: string;
  timestamp: number;
  likes: number;
  tips: number;
  signature: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorAddress: string;
  timestamp: number;
  signature: string;
}

export interface UserProfile {
  address: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  stakeAmount: number;
  verified: boolean;
  posts: string[]; // Array of post IDs
  followers: string[]; // Array of wallet addresses
  following: string[]; // Array of wallet addresses
}

export interface WalletState {
  connected: boolean;
  address?: string;
  balance?: number;
  network?: string;
}
