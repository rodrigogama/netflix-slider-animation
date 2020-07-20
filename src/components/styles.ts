import styled, { keyframes, css, Keyframes } from 'styled-components';
import { motion } from 'framer-motion';

type BackgroundContainerProps = {
  background?: string;
  direction?: string;
};

type DirectionProps = { from: string; to: string };

const DEFAULT_OFFSET = 180;

const BackgroundScrollAnimation = (direction = 'left'): Keyframes => {
  const directions: { [index: string]: DirectionProps } = {
    left: { from: '0 0', to: `-${DEFAULT_OFFSET}px 0` },
    right: { from: `-${DEFAULT_OFFSET}px 0`, to: '0 0' },
  };

  const currentDirection = directions[direction];

  return keyframes`
    from {
      background-position: ${currentDirection.from};
    }
    to {
      background-position: ${currentDirection.to};
    }
  `;
};

export const BackgroundContainer = styled(motion.div)<BackgroundContainerProps>`
  height: 100%;
  width: 100%;
  padding: 3.5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: calc(180px + 100%) 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: ${({ background }) => `url(${background})`};
  background-position: center center;
  animation: ${({ direction }) =>
    css`
      ${BackgroundScrollAnimation(direction)} 20s linear 1
    `};
  animation-fill-mode: forwards;
`;

export const Picture = styled(motion.picture)`
  position: relative;
  width: 100%;
  max-width: 40%;
  /* max-height: 106px; */

  & img {
    width: 100%;
    height: auto;
  }
`;
