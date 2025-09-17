export interface MarvelHeroesFiltersProps {
  /**
   * Callback fire to set the modal open state.
   */
  openModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}