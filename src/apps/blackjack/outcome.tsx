import StatusIndicator, {
  StatusIndicatorProps,
} from '@cloudscape-design/components/status-indicator';

const labels: Record<OutcomeProps.Outcome, string> = {
  win: 'Win',
  loss: 'Lose',
  push: 'Push',
};

const statuses: Record<OutcomeProps.Outcome, StatusIndicatorProps.Type> = {
  win: 'success',
  loss: 'error',
  push: 'stopped',
};

export default function Outcome({ outcome }: OutcomeProps) {
  if (!outcome) {
    return <span>-</span>;
  }

  return <StatusIndicator type={statuses[outcome]}>{labels[outcome]}</StatusIndicator>;
}

export declare module OutcomeProps {
  type Outcome = 'win' | 'loss' | 'push';
}

export interface OutcomeProps {
  outcome: OutcomeProps.Outcome | null;
}
