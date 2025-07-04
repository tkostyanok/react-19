export interface DialogHeaderProps {
  /**
   * Callback function to close Modal component.
   * If defined, a close button will be displayed.
   * @default undefined
   */
  handleClose?: () => void;
  /**
   * Additional text for Modal component.
   * @default undefined
   */
  subtitle?: string;
  /**
   * Title text for Modal component.
   */
  title: string;
}
