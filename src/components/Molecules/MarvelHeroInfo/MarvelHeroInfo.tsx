import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { DataField } from './components';

import type { IMarvelHeroesData } from 'src/interfaces';
import type { MarvelHeroInfoProps } from './MarvelHeroInfoProps';
import { isEmptyObject } from 'src/utils';

export const MarvelHeroInfo = ({
  data
}: MarvelHeroInfoProps) => {
  const [ heroDataValues, setHeroDataValues ] = useState<IMarvelHeroesData>({
    nameLabel: null,
    genderLabel: null,
    citizenshipLabel: null,
    skillsLabel: null,
    occupationLabel: null,
    memberOfLabel: null,
    creatorLabel: null
  });

  console.log('MarvelHeroInfo data', data);
  console.log('MarvelHeroInfo heroDataValues', heroDataValues);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      setHeroDataValues((prevValues: IMarvelHeroesData) => ({
        ...prevValues,
        ...data
      }));
    }
  }, [ data ]);

  return (
    <Grid
      container
      spacing={2}
    >
      {/* TODO: Grid can be optimized!! */}
      <Grid size={12}>
        <DataField
          label='Name'
          value={heroDataValues.nameLabel || ''}
        />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <DataField
          label='Gender'
          value={heroDataValues.genderLabel || ''}
        />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <DataField
          label='Citizenship'
          value={heroDataValues.citizenshipLabel || ''}
        />
      </Grid>
      <Grid size={12}>
        <DataField
          label='Skills'
          value={heroDataValues.skillsLabel || ''}
        />
      </Grid>
      <Grid size={12}>
        <DataField
          label='Occupation'
          value={heroDataValues.occupationLabel || ''}
        />
      </Grid>
      <Grid size={12}>
        <DataField
          label='Member of'
          value={heroDataValues.memberOfLabel || ''}
        />
      </Grid>
      <Grid size={12}>
        <DataField
          label='Creator'
          value={heroDataValues.creatorLabel || ''}
        />
      </Grid>
    </Grid>
  );
};
