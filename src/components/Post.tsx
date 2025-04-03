import React, { useState } from 'react';
import styled from 'styled-components';
import { Post as PostType } from '../types';
import { walletService } from '../services/wallet';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { IoChatbubbleOutline, IoShareSocialOutline, IoHeartOutline, IoHeart } from 'react-icons/io5';

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

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  background: var(--surface);
  border: 2px solid var(--border);
`;

const UserInfo = styled.div`
  flex: 1;
`;

const DisplayName = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.1rem;

  .verified {
    color: #3498db;
    font-size: 18px;
    margin-top: 1px;
  }
`;

const Username = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 1px;
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

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: var(--primary);
    background: var(--hover-overlay);

    svg {
      transform: scale(1.1);
    }
  }

  .count {
    font-weight: 600;
    min-width: 24px;
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
        <Avatar 
          src={post.author.avatarUrl} 
          alt={post.author.displayName}
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.displayName}`;
          }}
        />
        <UserInfo>
          <DisplayName>
            {post.author.displayName}
            {post.author.verified && <IoCheckmarkCircle className="verified" />}
          </DisplayName>
          <Username>@{post.author.username}</Username>
          <Timestamp>{formatTimestamp(post.timestamp)}</Timestamp>
        </UserInfo>
      </PostHeader>

      <Content>{post.content}</Content>

      <Actions>
        <ActionButton active={isLiked} onClick={handleLike}>
          {isLiked ? <IoHeart /> : <IoHeartOutline />} 
          <span className="count">{formatADA(post.likeBalance)}</span>
          <span className="ada">₳</span>
        </ActionButton>
        <ActionButton onClick={() => onComment?.(post.id, '')}>
          <IoChatbubbleOutline /> <span className="count">{post.comments.length}</span>
        </ActionButton>
        <ActionButton>
          <IoShareSocialOutline /> Share
        </ActionButton>
      </Actions>
    </PostContainer>
  );
};

export default Post;
