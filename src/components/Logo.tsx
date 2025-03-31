import React from 'react';
import styled from 'styled-components';

interface LogoProps {
  variant?: 'full' | 'symbol';
  size?: number;
}

const LogoContainer = styled.div<LogoProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const LogoSymbol = styled.svg<LogoProps>`
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
`;

const LogoText = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--text-primary, #0033AD);
  letter-spacing: -0.02em;
`;

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 40 }) => {
  return (
    <LogoContainer>
      <LogoSymbol
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        size={size}
      >
        <path
          d="M20 0L24.49 13.51L38 18L24.49 22.49L20 36L15.51 22.49L2 18L15.51 13.51L20 0Z"
          fill="#0033AD"
        />
        <path
          className="node-connections"
          d="M20 8L22 14L28 16L22 18L20 24L18 18L12 16L18 14L20 8Z"
          fill="white"
          opacity="0.9"
        />
      </LogoSymbol>
      {variant === 'full' && <LogoText>Adafy</LogoText>}
    </LogoContainer>
  );
};

export default Logo;
