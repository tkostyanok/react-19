import type { IMarvelHeroesDataTable } from 'src/interfaces';

export interface DeleteHeroButtonProps {
  /**
   * Data to be deleted.
   */
  dataToDelete: IMarvelHeroesDataTable;
  /**
   * Callback fire when Delete button clicked.
   */
  onDelete: (dataToDelete: IMarvelHeroesDataTable) => void;
}
