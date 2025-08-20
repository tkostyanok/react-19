import { useState } from 'react';

import { 
  TabPanel,
  TabsNavigation
} from 'src/components/Atoms';
import TestPage1Layout from 'src/components/Layouts';
import { TestPage1Provider } from 'src/context';

import { mockData } from './data/mockData';
import {
  CustomTableTab,
  MuiTableTab,
  TextPageGoal,
  XDataGridTableTab
} from './components';


/**
 * @returns TestPage1 component.
 * 
 * This component serves as a test page for various table implementations.
 * It includes a layout, navigation tabs, and different table components.
 */
// TODO: implement translation
export const TestPage1 = () => {
  const TABS = [ 'X-DataGrid', 'Mui-Table', 'Custom Table' ];
  const TABS_COMPONENTS = [
    <XDataGridTableTab key='X-DataGrid' />,
    <MuiTableTab  key='Mui-Table' />,
    <CustomTableTab key='Custom-Table' />,
  ];

  const [ currentTabIndex, setCurrentTabIndex ] = useState(0);
  
  const handleChangeTab = (event: React.SyntheticEvent, newTabIndex: number) => {
    console.log('handleChangeTab', newTabIndex);
    setCurrentTabIndex(newTabIndex);
  };

  return (
    <TestPage1Provider
      data = { mockData }
    >
      <TestPage1Layout>
        <TextPageGoal />
        <TabsNavigation
          onChange={handleChangeTab}
          tabs={TABS}
          value={currentTabIndex}
        />
        {TABS_COMPONENTS.map((component, index) => (
          <TabPanel
            currentTabIndex={currentTabIndex}
            key={index}
            tabIndex={index}
          >
            {component}
          </TabPanel>
        ))}
      </TestPage1Layout>
    </TestPage1Provider>
  );
};
