import React, { useState } from 'react';
import styled from 'styled-components';
import { ipfsService } from '../services/ipfs';
import { walletService } from '../services/wallet';

const PostContainer = styled.div`
  background: var(--surface);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  background: var(--surface-light);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  resize: none;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-light);
    box-shadow: 0 0 0 2px rgba(51, 85, 255, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CharCount = styled.span<{ isNearLimit: boolean }>`
  color: ${props => props.isNearLimit ? 'var(--error)' : 'var(--text-secondary)'};
  font-size: 0.9rem;
`;

const PostButton = styled.button`
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(51, 85, 255, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    animation: ${props => props.disabled ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

interface PostCreateProps {
  onPostCreated?: (post: any) => void;
}

export const PostCreate: React.FC<PostCreateProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const MAX_LENGTH = 280;

  const handlePost = async () => {
    if (!content.trim() || isPosting) return;

    try {
      setIsPosting(true);

      // Upload content to IPFS
      const ipfsHash = await ipfsService.uploadContent(content);

      // Sign the content with wallet
      const message = JSON.stringify({
        content,
        ipfsHash,
        timestamp: Date.now()
      });
      const signature = await walletService.signMessage(message);

      // Create post object
      const post = {
        content,
        ipfsHash,
        authorAddress: walletService.getState().address,
        timestamp: Date.now(),
        signature,
        likes: 0,
        tips: 0,
        comments: []
      };

      // Call the callback with the new post
      onPostCreated?.(post);

      // Clear the input
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      // TODO: Show error toast
    } finally {
      setIsPosting(false);
    }
  };

  const isNearLimit = content.length > MAX_LENGTH * 0.8;
  const isOverLimit = content.length > MAX_LENGTH;

  return (
    <PostContainer>
      <TextArea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={MAX_LENGTH}
      />
      <ActionBar>
        <CharCount isNearLimit={isNearLimit}>
          {content.length}/{MAX_LENGTH}
        </CharCount>
        <PostButton
          onClick={handlePost}
          disabled={isPosting || !content.trim() || isOverLimit}
        >
          {isPosting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
              Posting...
            </>
          ) : (
            'Post'
          )}
        </PostButton>
      </ActionBar>
    </PostContainer>
  );
};

export default PostCreate;
