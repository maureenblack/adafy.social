import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';
import PostCreate from './PostCreate';
import { Post as PostType } from '../types';
import { ipfsService } from '../services/ipfs';

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
      // TODO: Replace with actual API call to fetch posts
      // This is a mock implementation
      const mockPosts = [
        {
          id: 'post-1',
          content: '🎉 Just deployed my first Cardano smart contract! Building the future of DeFi one line of code at a time. Check out the GitHub repo: github.com/cardano-defi-pioneer',
          ipfsHash: 'QmHash1',
          authorAddress: 'addr1qxck...7v9v',
          timestamp: Date.now() - 1800000, // 30 minutes ago
          likeBalance: 125000,
          likers: ['addr1...', 'addr2...'],
          comments: [],
          signature: 'sig123'
        },
        {
          id: 'post-2',
          content: '💭 Thoughts on Cardano\'s approach to scalability:\n\n1. Hydra is brilliant\n2. Basho phase looking promising\n3. Layer 2 solutions emerging\n\nWhat do you all think about the roadmap? #CardanoCommunity',
          ipfsHash: 'QmHash2',
          authorAddress: 'addr1vxy...8w4m',
          timestamp: Date.now() - 7200000, // 2 hours ago
          likeBalance: 450000,
          likers: ['addr3...', 'addr4...'],
          comments: [{ id: 'c1', content: 'Great analysis!', authorAddress: 'addr5...', timestamp: Date.now() - 3600000 }],
          signature: 'sig456'
        },
        {
          id: 'post-3',
          content: '🌟 Just staked 10k ADA to support decentralization!\n\nProud to be part of securing the network. Remember: your stake = your voice in the ecosystem.\n\nStaking Pool: ADAFY1 🚀',
          ipfsHash: 'QmHash3',
          authorAddress: 'addr1abc...9y7n',
          timestamp: Date.now() - 86400000, // 1 day ago
          likeBalance: 890000,
          likers: ['addr6...', 'addr7...'],
          comments: [],
          signature: 'sig789'
        },
        {
          id: 'post-4',
          content: '📚 New to Cardano? Here\'s your starter pack:\n\n1. Get Nami/Eternl wallet\n2. Buy ADA from reputable exchange\n3. Transfer to your wallet\n4. Stake to a pool\n5. Join Adafy.social! 😉\n\nWelcome to the future of social! #CardanoBeginners',
          ipfsHash: 'QmHash4',
          authorAddress: 'addr1def...2m4k',
          timestamp: Date.now() - 172800000, // 2 days ago
          likeBalance: 235000,
          likers: ['addr8...', 'addr9...'],
          comments: [],
          signature: 'sig101'
        }
      ];
      
      // Randomize timestamps a bit to make it feel more natural
      const newPosts = mockPosts.map(post => ({
        ...post,
        timestamp: Date.now() - Math.random() * 604800000 // Random time within last week
      }));

      setPosts(prev => [...prev, ...mockPosts]);
      setHasMore(page < 5); // Mock limit of 5 pages
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
              likers: [...post.likers, 'current-user-addr']
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
              onComment={() => {}}
            />
          ))}
          
          {hasMore && (
            <LoadMoreButton
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Posts'}
            </LoadMoreButton>
          )}
        </>
      )}
    </FeedContainer>
  );
};

export default Feed;
