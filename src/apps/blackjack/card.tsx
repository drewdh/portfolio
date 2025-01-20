import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';

import styles from './card.module.scss';

export default function Card({ suit, rank, faceDown }: CardProps) {
  const rankLabel = typeof rank === 'string' ? rank.substring(0, 1).toUpperCase() : rank;

  return (
    <Container>
      <div className={styles.wrapper}>
        <Box fontSize="display-l">{faceDown ? '?' : rankLabel}</Box>
        <small>{faceDown ? '' : suit}</small>
      </div>
    </Container>
  );
}

export declare module CardProps {
  type Suit = 'clubs' | 'hearts' | 'spades' | 'diamonds';
  type Rank = 'ace' | 'king' | 'queen' | 'jack' | number;
}
interface CardProps {
  suit: CardProps.Suit;
  rank: CardProps.Rank;
  faceDown?: boolean;
}
