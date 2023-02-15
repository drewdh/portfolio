import { Appearance } from './types';

export function setAppearance(appearance: Exclude<Appearance, Appearance.Automatic>) {
  if (appearance === Appearance.Dark) {
    document.body.classList.add('awsui-dark-mode');
  } else if (appearance === Appearance.Light) {
    document.body.classList.remove('awsui-dark-mode');
  }
}
export function handleMatchChange(event: MediaQueryListEvent) {
  const appearance = event.matches ? Appearance.Dark : Appearance.Light;
  setAppearance(appearance);
}
export function getLengthInMinutes(seconds: number): string {
  return String(seconds / 60);
}
