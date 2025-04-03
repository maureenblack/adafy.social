import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';
import PostCreate from './PostCreate';
import { Post as PostType, UserProfile } from '../types';
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

  // Mock users with avatars and usernames
  const mockUsers: UserProfile[] = [
    {
      address: 'addr1qxck...7v9v',
      username: 'lilbag',
      displayName: 'LilBag',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LilBag&backgroundColor=b6e3f4',
      bio: 'Professional ADA maximalist & meme connoisseur 🎭',
      verified: true,
      totalStaked: 125000,
      joinedAt: Date.now() - 7776000000,
      karma: 1250
    },
    {
      address: 'addr1vxy...8w4m',
      username: 'maureen_black',
      displayName: 'Maureen',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maureen&backgroundColor=ffdfbf',
      bio: 'Building dApps & dropping truth bombs 💅',
      verified: true,
      totalStaked: 450000,
      joinedAt: Date.now() - 15552000000,
      karma: 3200
    },
    {
      address: 'addr1abc...9y7n',
      username: 'mermoz',
      displayName: 'Mermoz',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mermoz&backgroundColor=d1d4f9',
      bio: 'African philosophy meets blockchain tech 🌍',
      verified: true,
      totalStaked: 890000,
      joinedAt: Date.now() - 31536000000,
      karma: 8900
    },
    {
      address: 'addr1def...2m4k',
      username: 'hosky_vibes',
      displayName: 'Hosky',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hosky&backgroundColor=c0aede',
      bio: 'Worst token, best community 🐕',
      verified: true,
      totalStaked: 235000,
      joinedAt: Date.now() - 5184000000,
      karma: 2100
    },
    {
      address: 'addr1ghi...5n3p',
      username: 'oomfiefurry',
      displayName: 'OomfieFurry',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OomfieFurry&backgroundColor=ffd5e5',
      bio: 'NFT artist & pixel pusher 🎨',
      verified: true,
      totalStaked: 567000,
      joinedAt: Date.now() - 2592000000,
      karma: 3400
    },
    {
      address: 'addr1jkl...6m4q',
      username: 'cardano_noodz',
      displayName: 'Cardano Noodz',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CardanoNoodz&backgroundColor=bde0fe',
      bio: 'Serving hot takes & fresh noodz 🍜',
      verified: true,
      totalStaked: 345000,
      joinedAt: Date.now() - 10368000000,
      karma: 4200
    },
    {
      address: 'addr1klm...7r5s',
      username: 'weedstakepool',
      displayName: 'WeedStakePool',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WeedStakePool&backgroundColor=98FB98',
      bio: '420k ADA pledged | Blazing fast blocks 🌿',
      verified: true,
      totalStaked: 420000,
      joinedAt: Date.now() - 8640000000,
      karma: 4200
    },
    {
      address: 'addr1nop...8t6u',
      username: 'epochsend',
      displayName: 'Epochsend',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epochsend&backgroundColor=FFB6C1',
      bio: 'Counting down epochs, building up gains 📈',
      verified: true,
      totalStaked: 555000,
      joinedAt: Date.now() - 12960000000,
      karma: 5500
    },
    {
      address: 'addr1qrs...9v7w',
      username: 'adafrog',
      displayName: 'AdaFrog',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdaFrog&backgroundColor=90EE90',
      bio: 'Hopping through the ecosystem 🐸',
      verified: true,
      totalStaked: 234000,
      joinedAt: Date.now() - 4320000000,
      karma: 2340
    },
    {
      address: 'addr1tuv...0x8y',
      username: 'crex_cardano',
      displayName: 'Crex',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Crex&backgroundColor=E6E6FA',
      bio: 'DeFi degen & proud of it 🦖',
      verified: true,
      totalStaked: 678000,
      joinedAt: Date.now() - 6480000000,
      karma: 6780
    }
  ];

  const loadPosts = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call to fetch posts
      // This is a mock implementation

      const mockPosts = [
        {
          id: '1',
          author: mockUsers[1], // Maureen
          content: "Y'all really out here thinking your L1 is better than Cardano? Let me drop some knowledge: our peer-reviewed research isn't just for show, it's your safety net. But hey, keep YOLOing into those other chains if you want! 💅✨ #CardanoGang",
          timestamp: Date.now() - 3600000,
          likeBalance: 45000,
          ipfsHash: 'QmHash1',
          signature: 'sig1',
          likers: [mockUsers[3], mockUsers[6], mockUsers[7]],
          comments: [
            { id: '1.1', author: mockUsers[3], content: "Preach! 🙌 They'll learn eventually!", timestamp: Date.now() - 3000000, likeBalance: 1200, likers: [mockUsers[1]], signature: 'sig1.1' },
            { id: '1.2', author: mockUsers[6], content: "Fresh noodz coming to celebrate this truth bomb 🍜", timestamp: Date.now() - 2400000, likeBalance: 890, likers: [mockUsers[0]], signature: 'sig1.2' },
            { id: '1.3', author: mockUsers[7], content: "Staking some more ADA while reading this 🌿", timestamp: Date.now() - 1800000, likeBalance: 750, likers: [mockUsers[2]], signature: 'sig1.3' }
          ]
        },
        {
          id: '2',
          author: mockUsers[2], // Mermoz
          content: "Ubuntu in blockchain: 'I am because we are.' African philosophy teaches us that true decentralization isn't just about technology—it's about community, shared prosperity, and collective growth. Cardano understands this. That's why we're building more than just a blockchain; we're building a future where everyone has a voice. 🌍 #CardanoAfrica",
          timestamp: Date.now() - 7200000,
          likeBalance: 89000,
          ipfsHash: 'QmHash2',
          signature: 'sig2',
          likers: [mockUsers[0], mockUsers[1], mockUsers[4], mockUsers[5]],
          comments: [
            { id: '2.1', author: mockUsers[0], content: "This is the kind of deep thinking we need! 🚀", timestamp: Date.now() - 6000000, likeBalance: 2300, likers: [mockUsers[2]], signature: 'sig2.1' },
            { id: '2.2', author: mockUsers[4], content: "Mind = blown 🎨 Time to make some art inspired by this!", timestamp: Date.now() - 5400000, likeBalance: 1800, likers: [mockUsers[3]], signature: 'sig2.2' }
          ]
        },
        {
          id: '3',
          author: mockUsers[0], // LilBag
          content: "Just watched another 'Cardano killer' chain face-plant into obsolescence. Meanwhile, we're out here building actual solutions. Imagine my shock! 😏 Remember folks: slow and steady wins the race, but in our case, we're not even slow anymore - we're just thorough. Deal with it! 🕶️ #CardanoStyle",
          timestamp: Date.now() - 10800000,
          likeBalance: 67000,
          ipfsHash: 'QmHash3',
          signature: 'sig3',
          likers: [mockUsers[8], mockUsers[9], mockUsers[10]],
          comments: [
            { id: '3.1', author: mockUsers[8], content: "Another epoch, another victory 📈", timestamp: Date.now() - 9000000, likeBalance: 1500, likers: [mockUsers[0]], signature: 'sig3.1' },
            { id: '3.2', author: mockUsers[9], content: "*happy frog noises* 🐸", timestamp: Date.now() - 8400000, likeBalance: 920, likers: [mockUsers[1]], signature: 'sig3.2' },
            { id: '3.3', author: mockUsers[10], content: "Based take as always! 🦖", timestamp: Date.now() - 7800000, likeBalance: 1100, likers: [mockUsers[2]], signature: 'sig3.3' }
          ]
        },
        {
          id: 'post-1',
          content: '🎉 Just deployed my first Cardano smart contract! Building the future of DeFi one line of code at a time. Check out the GitHub repo: github.com/cardano-defi-pioneer',
          ipfsHash: 'QmHash1',
          author: mockUsers[0],
          timestamp: Date.now() - 1800000, // 30 minutes ago
          likeBalance: 125000,
          likers: [mockUsers[1], mockUsers[2]],
          comments: [],
          signature: 'sig123'
        },
        {
          id: 'post-2',
          content: '💭 Thoughts on Cardano\'s approach to scalability:\n\n1. Hydra is brilliant\n2. Basho phase looking promising\n3. Layer 2 solutions emerging\n\nWhat do you all think about the roadmap? #CardanoCommunity',
          ipfsHash: 'QmHash2',
          author: mockUsers[1],
          timestamp: Date.now() - 7200000, // 2 hours ago
          likeBalance: 450000,
          likers: [mockUsers[0], mockUsers[3]],
          comments: [{
            id: 'c1',
            content: 'Great analysis! Especially excited about Hydra.',
            author: mockUsers[2],
            timestamp: Date.now() - 3600000,
            likeBalance: 50000,
            likers: [mockUsers[0]]
          }],
          signature: 'sig456'
        },
        {
          id: 'post-3',
          content: '🌟 Just staked 10k ADA to support decentralization!\n\nProud to be part of securing the network. Remember: your stake = your voice in the ecosystem.\n\nStaking Pool: ADAFY1 🚀',
          ipfsHash: 'QmHash3',
          author: mockUsers[2],
          timestamp: Date.now() - 86400000, // 1 day ago
          likeBalance: 890000,
          likers: [mockUsers[1], mockUsers[3]],
          comments: [],
          signature: 'sig789'
        },
        {
          id: 'post-4',
          content: '📚 New to Cardano? Here\'s your starter pack:\n\n1. Get Nami/Eternl wallet\n2. Buy ADA from reputable exchange\n3. Transfer to your wallet\n4. Stake to a pool\n5. Join Adafy.social! 😉\n\nWelcome to the future of social! #CardanoBeginners',
          ipfsHash: 'QmHash4',
          author: mockUsers[3],
          timestamp: Date.now() - 172800000, // 2 days ago
          likeBalance: 235000,
          likers: [mockUsers[0], mockUsers[2]],
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
              likers: [...post.likers, mockUsers[0]] // Using first mock user as current user
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
