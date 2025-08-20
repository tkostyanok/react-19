import { type ReactNode } from 'react';

export interface TabPanelProps {
  /**
   * The content of the component.
   */
  children?: ReactNode;
  /**
   * The value of the currently selected `Tab`.
   */
  currentTabIndex: number;
  /**
   * The value of the current `Tab`.
   */
  tabIndex: number;
}
