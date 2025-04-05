export default function useHeaderCounter({
  isOpenEnd,
  loading,
  selectedCount,
  totalCount,
}: UseHeaderCounterOptions): string {
  if (loading || !totalCount) {
    return '';
  }
  return `(${selectedCount ? `${selectedCount}/` : ''}${totalCount}${isOpenEnd ? '+' : ''})`;
}

export interface UseHeaderCounterOptions {
  loading?: boolean;
  isOpenEnd?: boolean;
  selectedCount?: number;
  totalCount?: number;
}
