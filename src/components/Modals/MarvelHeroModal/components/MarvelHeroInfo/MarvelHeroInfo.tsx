import Grid from '@mui/material/Grid';

import { DataField } from './components';
import type { MarvelHeroInfoProps } from './MarvelHeroInfoProps';
import type { IMarvelHeroesData } from 'src/interfaces';

export const MarvelHeroInfo = ({
  data,
  onChange
}: MarvelHeroInfoProps) => {
  // console.log('data', data);
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

  return (
    <Grid
      container
      spacing={ 2 }
    >
      <Grid size={ 12 }>
        <DataField
          label={LABELS['nameLabel']}
          name='nameLabel'
          onChange={ onChange }
          value={ data?.nameLabel || '' }
        />
      </Grid>
      {
        (['genderLabel', 'citizenshipLabel'] as const).map((field) => (
          <Grid
            size={ {
              xs: 12,
              md: 6 
            } }
            key={field}
          >
            <DataField
              label={LABELS[field]}
              name={field}
              onChange={ onChange }
              value={ data?.[field] || '' }
            />
          </Grid>
        ))
      }
      {
        (['skillsLabel', 'occupationLabel', 'memberOfLabel', 'creatorLabel'] as const).map((field) => (
          <Grid
            size={ 12 }
            key={field}
          >
            <DataField
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
