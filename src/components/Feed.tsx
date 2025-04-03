import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';
import PostCreate from './PostCreate';
import { Post as PostType } from '../types';

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--text-secondary);
`;

const LoadMoreButton = styled.button`
  background: var(--surface);
  color: var(--primary-light);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-light);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);

  h3 {
    margin-bottom: 10px;
    color: var(--text-primary);
  }
`;

// Mock data for testing
const MOCK_POSTS: PostType[] = [
  {
    id: 'post-1',
    content: "Just deployed my first Cardano smart contract! 🚀 It's a decentralized voting system that uses stake-weighted voting. Check it out: github.com/cardano-voting",
    ipfsHash: 'QmTest1',
    authorAddress: 'addr1qxck...7v9d',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    likeBalance: 1250000, // 1.25M ADA
    likers: ['addr1...', 'addr2...'],
    comments: [],
    signature: 'sig1'
  },
  {
    id: 'post-2',
    content: "🎨 Excited to announce my new NFT collection 'Cardano Dreams' - each piece represents a milestone in Cardano's journey. Minting starts tomorrow! Early supporters get special access to my upcoming DeFi project.",
    ipfsHash: 'QmTest2',
    authorAddress: 'addr1vxy...8p2q',
    timestamp: Date.now() - 7200000, // 2 hours ago
    likeBalance: 45000, // 45K ADA
    likers: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Love the concept! Count me in 🎉',
        authorAddress: 'addr1abc...xyz',
        timestamp: Date.now() - 3600000
      }
    ],
    signature: 'sig2'
  },
  {
    id: 'post-3',
    content: "💡 Hot Take: Layer 2 solutions aren't just about scalability - they're about specialized execution environments. Imagine running AI models directly on Cardano's L2! Working on a prototype, who's interested?",
    ipfsHash: 'QmTest3',
    authorAddress: 'addr1mnb...9f4g',
    timestamp: Date.now() - 86400000, // 1 day ago
    likeBalance: 780000, // 780K ADA
    likers: [],
    comments: [],
    signature: 'sig3'
  },
  {
    id: 'post-4',
    content: "🌱 Just staked 100K ADA to support sustainable farming initiatives through my stake pool EARTH 🌍 Join us in making Cardano the greenest blockchain! Already offsetting 1000 tons of carbon/month.",
    ipfsHash: 'QmTest4',
    authorAddress: 'addr1klm...5h3j',
    timestamp: Date.now() - 172800000, // 2 days ago
    likeBalance: 325000, // 325K ADA
    likers: [],
    comments: [],
    signature: 'sig4'
  },
  {
    id: 'post-5',
    content: "🎓 Free Plutus course starting next week! Topics: Native tokens, smart contracts, and DeFi primitives. Limited to 50 participants. Stake 500 ADA to reserve your spot (fully refundable). #CardanoEducation",
    ipfsHash: 'QmTest5',
    authorAddress: 'addr1rst...2c8n',
    timestamp: Date.now() - 259200000, // 3 days ago
    likeBalance: 156000, // 156K ADA
    likers: [],
    comments: [],
    signature: 'sig5'
  }
];

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const startIdx = (page - 1) * 5;
      const newPosts = MOCK_POSTS.slice(startIdx, startIdx + 5);
      
      setPosts(prev => [...prev, ...newPosts]);
      setHasMore(startIdx + 5 < MOCK_POSTS.length);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (post: PostType) => {
    setPosts(prev => [post, ...prev]);
  };

  const handleLike = async (postId: string, balance: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              likeBalance: post.likeBalance + balance,
              likers: [...post.likers, 'current-user-addr'] // In real app, use actual wallet address
            }
          : post
      )
    );
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    loadPosts();
  };

  if (loading && posts.length === 0) {
    return (
      <LoadingContainer>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
      </LoadingContainer>
    );
  }

  return (
    <FeedContainer>
      <PostCreate onPostCreated={handleNewPost} />
      
      {posts.length === 0 ? (
        <EmptyState>
          <h3>No Posts Yet</h3>
          <p>Be the first to share something!</p>
        </EmptyState>
      ) : (
        <>
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={(id, comment) => console.log('Comment:', id, comment)}
            />
          ))}
          
          {hasMore && (
            <LoadMoreButton
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </LoadMoreButton>
          )}
        </>
      )}
    </FeedContainer>
  );
};

export default Feed;
