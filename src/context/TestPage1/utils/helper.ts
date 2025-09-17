import type { HeroDataValues } from 'src/interfaces';

export const initFiltersData: Omit<HeroDataValues, 'id'> = {
  nameLabel: [],
  citizenshipLabel: [],
  creatorLabel: [],
  genderLabel: [],
  memberOfLabel: [],
  occupationLabel: [],
  skillsLabel: [],
};