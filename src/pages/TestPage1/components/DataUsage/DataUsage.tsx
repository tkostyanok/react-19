import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useTestPage1Context } from 'src/context';
import type { TDataUsage } from 'src/interfaces';

/**
 * Switches between local and remote data usage.
 */
export const DataUsage = () => {
  const {
    dataUsage, setDataUsage 
  } = useTestPage1Context();

  const handleChangeDataUsage = (_event: React.MouseEvent<HTMLElement>, newDataUsage: TDataUsage | null) => {
    if (newDataUsage !== null) {
      setDataUsage(newDataUsage);
    }
  };

  return (
    <ToggleButtonGroup
      aria-label='data usage'
      exclusive
      onChange={handleChangeDataUsage}
      value={dataUsage}
    >
      <ToggleButton
        value='local'
        aria-label='local data'
      >
        Local
      </ToggleButton>
      <ToggleButton
        value='remote'
        aria-label='remote data'
      >
        Remote
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
