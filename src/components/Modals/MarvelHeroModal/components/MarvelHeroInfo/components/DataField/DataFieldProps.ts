import type { SyntheticEvent } from 'react';

export interface DataFieldProps {
  /**
   * If `true` -> allow to modify.
   * If `false` => show current field value.
   * @default true
   */
  isEditable?: boolean;
  /**
   * Indicate is data loading or not.
   * For some components: show or hide Skeleton.
   * @default undefined | false
   */
  isLoading?: boolean;
  /**
   * The label content.
   */
  label: string;
  /**
   * The name of the input field.
   */
  name?: string;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: (event: SyntheticEvent) => void;
  /**
   * The value of content.
   */
  value?: string | null;
}
