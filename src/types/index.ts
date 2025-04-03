export interface Post {
  id: string;
  content: string;
  ipfsHash: string;
  author: UserProfile;   // Full user profile instead of just address
  timestamp: number;
  likeBalance: number;  // Total ADA balance of wallets that liked the post
  likers: UserProfile[];// Array of user profiles that liked the post
  comments: Comment[];
  signature?: string;   // Wallet signature for verification
}

export interface Comment {
  id: string;
  content: string;
  author: UserProfile;   // Full user profile instead of just address
  timestamp: number;
  likeBalance?: number; // Optional ADA balance for comment likes
  likers?: UserProfile[];// Optional array of users who liked the comment
  signature?: string;
}

export interface UserProfile {
  address: string;
  username: string;      // Unique username (e.g., 'cardano_lover')
  displayName: string;   // Display name (e.g., 'Alice')
  bio?: string;
  avatarUrl: string;     // URL to user's avatar image
  verified: boolean;
  totalStaked: number;   // Amount of ADA staked
  joinedAt: number;
  karma: number;         // Reputation points
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number | null;
  network: string | null;
}
