import Grid from '@mui/material/Grid';

import type { IMarvelHeroesData } from 'src/interfaces';

import { BasicInput, BasicSelect } from 'src/components/Atoms';
import type { MarvelHeroInfoProps } from './MarvelHeroInfoProps';

export const MarvelHeroInfo = ({
  data,
  isLoading = false,
  onChange
}: MarvelHeroInfoProps) => {
  // TODO: Optimize with add translation
  const LABELS: {[key in keyof Omit<IMarvelHeroesData, 'id'>]: string} = {
    nameLabel: 'Name',
    genderLabel: 'Gender',
    citizenshipLabel: 'Citizenship',
    skillsLabel: 'Skills',
    occupationLabel: 'Occupation',
    memberOfLabel: 'Member of',
    creatorLabel: 'Creator'
  } as const;

  const GENDER_OPTIONS = [
    { title: 'female', value: 'female'},
    { title: 'male', value: 'male'},
  ];

  return (
    <Grid
      container
      spacing={ 2 }
    >
      <Grid size={ 12 }>
        <BasicInput
          isLoading={ isLoading }
          label={LABELS['nameLabel']}
          name='nameLabel'
          onChange={ onChange }
          value={ data?.nameLabel || '' }
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6 
        }}
      >
        <BasicSelect
          label={LABELS['genderLabel']}
          name='genderLabel'
          onChange={ onChange }
          value={ data?.genderLabel || '' }
          options={GENDER_OPTIONS}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6 
        }}
      >
        <BasicInput
          isLoading={ isLoading }
          label={LABELS['citizenshipLabel']}
          name='citizenshipLabel'
          onChange={ onChange }
          value={ data?.citizenshipLabel || '' }
        />
      </Grid>
      {
        (['skillsLabel', 'occupationLabel', 'memberOfLabel', 'creatorLabel'] as const).map((field) => (
          <Grid
            size={ 12 }
            key={field}
          >
            <BasicInput
              isLoading={ isLoading }
              label={LABELS[field]}
              name={field}
              onChange={ onChange }
              value={ data?.[field] || '' }
            />
          </Grid>
        ))
      }
    </Grid>
  );
};
