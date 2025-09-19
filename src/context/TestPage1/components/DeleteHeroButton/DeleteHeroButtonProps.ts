import type { IMarvelHeroTableData } from 'src/interfaces';

export interface DeleteHeroButtonProps {
  /**
   * Data to be deleted.
   */
  dataToDelete: IMarvelHeroTableData;
  /**
   * Callback fire when Delete button clicked.
   */
  onDelete: (dataToDelete: IMarvelHeroTableData) => void;
}