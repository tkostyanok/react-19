import type { SyntheticEvent } from 'react';
import type { IMarvelHeroesData } from 'src/interfaces';

export interface MarvelHeroInfoProps {
  /**
   * Data of the Marvel hero to be displayed or edited in the modal. 
   * If null, the modal is in 'create new hero' mode.
   */
  data: IMarvelHeroesData | null;
  /**
   * Callback to handle changes in the form fields.
   */
  onChange?: (event: SyntheticEvent) => void;
}