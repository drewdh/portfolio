import { useEffect, useRef, useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Button from '@cloudscape-design/components/button';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import shuffle from 'lodash/shuffle';

import DhAppLayout from 'common/dh-app-layout';
import useTitle from 'utilities/use-title';
import widgetDetails from 'common/widget-details';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import Card, { CardProps } from './card';
import Outcome, { OutcomeProps } from './outcome';

function getHandValue(cards: ICard[]) {
  let value = 0;
  let aceCount = 0;
  let isSoft = false;

  // Calculate the initial value and count Aces
  cards.forEach((card) => {
    if (card.rank === 'king' || card.rank === 'queen' || card.rank === 'jack') {
      value += 10;
    } else if (card.rank === 'ace') {
      aceCount += 1;
      value += 11; // Assume Ace is 11 for now
    } else {
      value += card.rank;
    }
  });

  // Adjust for Aces if value exceeds 21
  while (value > 21 && aceCount > 0) {
    value -= 10; // Count an Ace as 1 instead of 11
    aceCount -= 1;
  }

  isSoft = aceCount > 0 && value <= 21;

  return { value, isSoft };
}

function getDeck(): ICard[] {
  const deck: ICard[] = [];
  const suits: CardProps.Suit[] = ['clubs', 'hearts', 'diamonds', 'spades'];
  const ranks: CardProps.Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'ace', 'king', 'queen', 'jack'];
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      deck.push({ rank, suit });
    });
  });
  return shuffle(deck);
}

interface ICard {
  rank: CardProps.Rank;
  suit: CardProps.Suit;
}

const defaultBet = 15;

/** TODO: Implement splitting */
export default function BlackjackPage() {
  useTitle(widgetDetails.blackjack.title);
  const [bet, setBet] = useState<number>(defaultBet);
  const [outcome, setOutcome] = useState<OutcomeProps.Outcome | null>(null);
  const deckRef = useRef<ICard[]>(getDeck());
  const [playerFinished, setPlayerFinished] = useState<boolean>(true);
  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const playerHandValue = getHandValue(playerHand).value;
  const dealerHandValue = getHandValue(dealerHand).value;
  const [winnings, setWinnings] = useState<number>(0);
  const [lowWaterMark, setLowWaterMark] = useState<number>(0);
  const [highWaterMark, setHighWaterMark] = useState<number>(0);
  const [playerWins, setPlayerWins] = useState<number>(0);
  const [houseWins, setHouseWins] = useState<number>(0);

  useEffect(() => {
    setLowWaterMark((prev) => Math.min(prev, winnings));
    setHighWaterMark((prev) => Math.max(prev, winnings));
  }, [winnings]);

  function takeCard() {
    // TODO: Make sure we always have a card
    return deckRef.current.pop()!;
  }

  function doubleDown() {
    setBet((prev) => prev * 2);
    const newPlayerHandValue = playerHit();
    completeHand(newPlayerHandValue);
  }

  function completeHand(newPlayerHandValue: number = playerHandValue) {
    setPlayerFinished(true);

    const nextDealerHand = [...dealerHand];
    const { value, isSoft } = getHandValue(nextDealerHand);
    let isSoft17 = value === 17 && isSoft;
    let shouldHit = value < 17 || isSoft17;
    while (shouldHit) {
      nextDealerHand.push(takeCard());
      const { value, isSoft } = getHandValue(nextDealerHand);
      isSoft17 = value === 17 && isSoft;
      shouldHit = value < 17 || isSoft17;
    }

    // calculate winner
    const handValue = getHandValue(nextDealerHand).value;
    if (handValue > 21 || newPlayerHandValue > handValue) {
      setPlayerWins((prev) => prev + 1);
      setWinnings((prev) => prev + bet);
      setOutcome('win');
    } else if (newPlayerHandValue < handValue) {
      setHouseWins((prev) => prev + 1);
      setWinnings((prev) => prev - bet);
      setOutcome('loss');
    } else {
      setOutcome('push');
    }

    setDealerHand(nextDealerHand);
  }

  function deal() {
    deckRef.current = [
      ...getDeck(),
      ...getDeck(),
      ...getDeck(),
      ...getDeck(),
      ...getDeck(),
      ...getDeck(),
    ];
    setPlayerFinished(false);
    setOutcome(null);
    setBet(defaultBet);
    const newPlayerHand = [takeCard(), takeCard()];
    const newDealerHand = [takeCard(), takeCard()];
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);

    // TODO: Ask for insurance

    // Handle blackjacks
    const dealerBlackjack = getHandValue(newDealerHand).value === 21;
    const playerBlackJack = getHandValue(newPlayerHand).value === 21;
    if (dealerBlackjack || playerBlackJack) {
      setPlayerFinished(true);
    }
    if (dealerBlackjack && playerBlackJack) {
      setOutcome('push');
    } else if (dealerBlackjack) {
      setHouseWins((prev) => prev + 1);
      setWinnings((prev) => prev - bet);
      setOutcome('loss');
    } else if (playerBlackJack) {
      setPlayerWins((prev) => prev + 1);
      setWinnings((prev) => prev + bet * (6 / 5));
      setOutcome('win');
    }
  }

  function playerHit() {
    const nextHand = [...playerHand, takeCard()];
    const handValue = getHandValue(nextHand).value;
    setPlayerHand(nextHand);
    if (handValue === 21) {
      completeHand(handValue);
    } else if (handValue > 21) {
      setPlayerFinished(true);
      setHouseWins((prev) => prev + 1);
      setWinnings((prev) => prev - bet);
      setOutcome('loss');
    }
    return handValue;
  }

  function surrender() {
    setPlayerFinished(true);
    setWinnings((prev) => prev - bet / 2);
    setOutcome(null);
  }

  return (
    <DhAppLayout
      breadcrumbs={
        <DhBreadcrumbs
          items={[{ text: widgetDetails.blackjack.title, href: Pathname.Blackjack }]}
        />
      }
      toolsHide
      content={
        <SpaceBetween size="m" direction="vertical">
          <Header
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button onClick={surrender} disabled={playerHand.length !== 2 || playerFinished}>
                  Surrender
                </Button>
                <Button onClick={doubleDown} disabled={playerHand.length !== 2 || playerFinished}>
                  Double
                </Button>
                <Button onClick={() => completeHand()} disabled={playerFinished}>
                  Stand
                </Button>
                <Button onClick={() => (playerFinished ? deal() : playerHit())}>
                  {playerFinished ? 'Deal' : 'Hit'}
                </Button>
              </SpaceBetween>
            }
            variant="h1"
            description={widgetDetails.blackjack.description}
          >
            {widgetDetails.blackjack.title}
          </Header>
          <SpaceBetween size="l" direction="vertical">
            <ExpandableSection variant="container" headerText="Stats" defaultExpanded>
              <KeyValuePairs
                columns={5}
                items={[
                  {
                    label: 'Outcome',
                    value: <Outcome outcome={outcome} />,
                  },
                  {
                    label: 'Winnings',
                    value: winnings.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    }),
                  },
                  {
                    label: 'Low water mark',
                    value: lowWaterMark.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    }),
                  },
                  {
                    label: 'High water mark',
                    value: highWaterMark.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    }),
                  },
                  {
                    label: 'Win rate',
                    value: (playerWins / (houseWins + playerWins) || 0).toLocaleString(undefined, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                    }),
                  },
                  {
                    label: 'Hands played',
                    value: (houseWins + playerWins).toLocaleString(),
                  },
                  {
                    label: 'Bet',
                    value: bet.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    }),
                  },
                ]}
              />
            </ExpandableSection>
            <SpaceBetween size="m">
              <Header
                counter={
                  playerFinished
                    ? `(${dealerHandValue})`
                    : `(${getHandValue([dealerHand[1]]).value})`
                }
              >
                Dealer
              </Header>
              <ColumnLayout columns={5}>
                {dealerHand.map((card, index) => {
                  const faceDown = index === 0 && !playerFinished;
                  return (
                    <Card
                      key={JSON.stringify({ ...card, faceDown })}
                      suit={card.suit}
                      rank={card.rank}
                      faceDown={faceDown}
                    />
                  );
                })}
              </ColumnLayout>
            </SpaceBetween>
            <SpaceBetween size="m">
              <Header
                counter={`(${getHandValue(playerHand).isSoft && playerHandValue !== 21 ? 'Soft ' : ''}${playerHandValue})`}
              >
                Player
              </Header>
              <ColumnLayout columns={5}>
                {playerHand.map((card, index) => {
                  return <Card suit={card.suit} rank={card.rank} />;
                })}
              </ColumnLayout>
            </SpaceBetween>
          </SpaceBetween>
        </SpaceBetween>
      }
    />
  );
}
