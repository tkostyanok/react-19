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
   * The value of content.
   */
  value?: string | null;
}
