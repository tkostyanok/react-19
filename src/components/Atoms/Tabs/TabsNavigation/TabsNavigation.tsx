import Tab from '@mui/material/Tab';
import Tabs,  { type TabsProps } from '@mui/material/Tabs';

import {
  INDIGO_900,
  TRANSPARENT,
  WHITE
} from 'src/constants/colors';

import type { TabsNavigationProps } from './TabsNavigationProps';

/**
 * TabsNavigation component renders a set of tabs with custom styles and behavior.
 * It uses MUI's Tabs and Tab components to create a navigational interface.
 * 
 * @param tabs - An array of tab labels to be displayed in the navigation.
 * @param props - Additional properties to pass to the Tabs component.
 * 
 * @returns TabsNavigation component.
 */
export const TabsNavigation = ({
  tabs,
  ...props
}: TabsNavigationProps & TabsProps) => {
  return (
    <Tabs
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: TRANSPARENT, 
        }, 
      }}
      variant='fullWidth'
      {...props}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={tab}
          label={tab}
          sx={{
            ariaControls: `tabpanel-${index}`,
            backgroundColor: index === props?.value ? INDIGO_900 : TRANSPARENT,
            border: `1px solid ${INDIGO_900}`,
            // borderRadius: '4px',
            color: index === props?.value ? WHITE : INDIGO_900,
            textTransform: 'none',
            '&.Mui-selected': {
              color: index === props?.value ? WHITE : INDIGO_900, 
            },
          }}
          id={`$tab-${index}`}
          test-id={tab}
        />
      ))}
    </Tabs>
  );
};
