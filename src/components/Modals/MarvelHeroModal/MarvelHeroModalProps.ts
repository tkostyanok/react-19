import type { IMarvelHeroesData } from '../../../interfaces';

export interface MarvelHeroModalProps {
  /**
   * Data of the Marvel hero to be displayed or edited in the modal. 
   * If null, the modal is in 'create new hero' mode.
   */
  data: IMarvelHeroesData | null;
  /**
   * Indicates if the modal is for creating a new hero.
   */
  isNewHero?: boolean;
  /**
   * Function to close the modal.
   */
  onClose: () => void;
  /**
   * Function to save the hero data.
   * @param valuesToSave - Partial data of the Marvel hero to be saved.
   * @returns Promise that resolves when the save operation is complete.
   */
  onSave: ( valuesToSave: Partial<IMarvelHeroesData> ) => Promise<void>;
  /**
   * Indicates if the modal is open.
   */
  open: boolean;
}