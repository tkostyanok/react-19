import { TestPage1Provider, useTestPage1Context } from '../../context';
import { TestPageData, TextPageGoal } from './components';


import { mockData } from './data/mockData';

// TODO: implement translation
export const TestPage1 = () => {
  const { initData  } = useTestPage1Context();
  console.log('TestPage1 initData', initData);

  return (
    <TestPage1Provider
      data = {mockData}
    >
      <TextPageGoal />
      <TestPageData />
    </TestPage1Provider>
  );
};
