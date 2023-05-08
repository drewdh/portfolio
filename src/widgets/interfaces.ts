import { JSXElementConstructor } from 'react';
import { IconProps } from '@cloudscape-design/components/icon';

export enum WidgetId {
  Timer = 'timer',
  CoffeeCalculator = 'coffeeCalculator',
}
export interface WidgetProps extends Record<string, any> {
  onRemove: () => void;
}
export interface WidgetConfig {
  title: string;
  description: string;
  iconName: IconProps.Name;
  widget: JSXElementConstructor<WidgetProps>;
}