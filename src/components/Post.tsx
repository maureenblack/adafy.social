import React, { useState } from 'react';
import styled from 'styled-components';
import { Post as PostType } from '../types';
import { walletService } from '../services/wallet';

const PostContainer = styled.div`
  background: var(--surface-post);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary-gradient);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Address = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;

  .verified {
    color: var(--primary);
  }
`;

const Timestamp = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 2px;
`;

const Content = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 24px;
  color: var(--text-secondary);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 16px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    color: var(--primary);
    background: rgba(0, 51, 173, 0.1);
  }

  .count {
    font-weight: 600;
  }

  .ada {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

interface PostProps {
  post: PostType;
  onLike?: (postId: string, balance: number) => void;
  onComment?: (postId: string, comment: string) => void;
}

export const Post: React.FC<PostProps> = ({ post, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const balance = await walletService.getBalance();
      setIsLiked(!isLiked);
      onLike?.(post.id, balance);
    } catch (error) {
      console.error('Error getting wallet balance:', error);
    }
  };

  const formatAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  };

  const formatADA = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toFixed(1);
  };

  return (
    <PostContainer>
      <PostHeader>
        <Avatar>
          {post.authorAddress.slice(0, 2).toUpperCase()}
        </Avatar>
        <UserInfo>
          <Address>
            {formatAddress(post.authorAddress)}
            {post.signature && (
              <span className="verified" title="Verified">✓</span>
            )}
          </Address>
          <Timestamp>{formatTimestamp(post.timestamp)}</Timestamp>
        </UserInfo>
      </PostHeader>

      <Content>{post.content}</Content>

      <Actions>
        <ActionButton active={isLiked} onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'} 
          <span className="count">{formatADA(post.likeBalance)}</span>
          <span className="ada">₳</span>
        </ActionButton>
        <ActionButton onClick={() => onComment?.(post.id, '')}>
          💭 <span className="count">{post.comments.length}</span>
        </ActionButton>
        <ActionButton>
          🔗 Share
        </ActionButton>
      </Actions>
    </PostContainer>
  );
};

export default Post;
