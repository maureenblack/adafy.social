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
      const mockPosts = Array.from({ length: 10 }, (_, i) => ({
        id: `post-${page}-${i}`,
        content: `This is a test post ${page}-${i}`,
        ipfsHash: 'QmTest...',
        authorAddress: '0x123...',
        timestamp: Date.now() - i * 60000,
        likes: Math.floor(Math.random() * 100),
        tips: Math.floor(Math.random() * 10),
        signature: 'sig...',
        comments: []
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

  const handleLike = async (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleTip = async (postId: string, amount: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, tips: post.tips + amount }
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
              onTip={handleTip}
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
