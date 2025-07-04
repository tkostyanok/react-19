import type { IMarvelHeroesData } from '../../../interfaces';

export interface MarvelHeroModalProps {
  data: IMarvelHeroesData | null;
  isNewHero?: boolean;
  /**
   * Function to close the modal.
   */
  handleCloseModal: () => void;
  /**
   * Indicates if the modal is open.
   */
  open?: boolean;
}