import React, { useState } from 'react';
import styled from 'styled-components';
import { Post as PostType } from '../types';
import { walletService } from '../services/wallet';

const PostContainer = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-gradient);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Address = styled.div`
  color: var(--text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  .verified {
    color: var(--primary-light);
  }
`;

const Timestamp = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const Content = styled.div`
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Actions = styled.div`
  display: flex;
  gap: 20px;
  color: var(--text-secondary);
`;

const ActionButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? 'var(--primary-light)' : 'var(--text-secondary)'};
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    color: var(--primary-light);
    background: var(--surface-light);
  }
`;

const TipInput = styled.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface-light);
  color: var(--text-primary);
  margin-right: 8px;

  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
`;

interface PostProps {
  post: PostType;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onTip?: (postId: string, amount: number) => void;
}

export const Post: React.FC<PostProps> = ({ post, onLike, onComment, onTip }) => {
  const [tipAmount, setTipAmount] = useState('');
  const [showTipInput, setShowTipInput] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(post.id);
  };

  const handleTip = async () => {
    if (!showTipInput) {
      setShowTipInput(true);
      return;
    }

    const amount = parseFloat(tipAmount);
    if (isNaN(amount) || amount <= 0) return;

    try {
      await walletService.sendTip(post.authorAddress, amount);
      onTip?.(post.id, amount);
      setTipAmount('');
      setShowTipInput(false);
    } catch (error) {
      console.error('Error sending tip:', error);
      // TODO: Show error toast
    }
  };

  const formatAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <PostContainer>
      <PostHeader>
        <Avatar>
          {post.authorAddress.slice(0, 2)}
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
          {isLiked ? '❤️' : '🤍'} {post.likes}
        </ActionButton>
        <ActionButton onClick={() => onComment?.(post.id, '')}>
          💭 {post.comments.length}
        </ActionButton>
        <ActionButton onClick={handleTip}>
          {showTipInput ? (
            <>
              <TipInput
                type="number"
                placeholder="ADA"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                min="0"
                step="0.5"
              />
              Send
            </>
          ) : (
            <>💝 {post.tips} ADA</>
          )}
        </ActionButton>
      </Actions>
    </PostContainer>
  );
};

export default Post;
