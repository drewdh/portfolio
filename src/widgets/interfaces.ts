import { JSXElementConstructor } from 'react';

export enum WidgetId {
  Timer = 'timer',
}
export interface WidgetProps extends Record<string, any> {
  onRemove: () => void;
}
export interface WidgetConfig {
  title: string;
  widget: JSXElementConstructor<WidgetProps>;
}