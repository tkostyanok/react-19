import type { ReactElement } from 'react';

export interface DataViewProps {
  /**
   * Indicate that data is loading.
   * Show or hide skeleton.
   * @default: false
   */
  isLoading?: boolean;
  /**
   * The label content.
   */
  label: string;
  /**
   * The value content.
   */
  value: number | string | ReactElement;
}