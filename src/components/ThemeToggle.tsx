import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-on-dark);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--surface-elevated);
  box-shadow: var(--card-shadow);
  z-index: 1000;

  &:hover {
    transform: scale(1.1);
    background: var(--primary);
  }
`;

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <ToggleButton onClick={onToggle} title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      {isDark ? '🌞' : '🌙'}
    </ToggleButton>
  );
};

export default ThemeToggle;
