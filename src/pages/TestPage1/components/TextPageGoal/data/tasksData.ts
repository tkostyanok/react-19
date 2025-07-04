import type { ITestTask1 } from 'src/interfaces';

export const tasksData: ITestTask1[] = [
  {
    id: 1,
    isCompleted: false,
    linkToMUI: 'https://mui.com/x/react-data-grid/',
    task: 'Test MUI: Data Grid',
    subTasks: [
      {
        id: 1,
        isCompleted: true,
        title: 'Create Data Table component with data',
      },
      {
        id: 2,
        isCompleted: true,
        title: 'Test default sorting functionality',
      },
      {
        id: 3,
        isCompleted: false,
        title: 'Create own filtering functionality',
      },
      {
        id: 4,
        isCompleted: false,
        title: 'Allow filters by multiple columns -> REQUIRED commercial version',
        note: 'Can be used from `box` in commercial version',
      },
      {
        id: 5,
        isCompleted: false,
        title: 'Allow filters by multiple columns -> OWN implementation',
      },
      {
        id: 6,
        isCompleted: false,
        title: 'Show current filter(s) in "chip(s)"',
      },
      {
        id: 7,
        isCompleted: false,
        title: 'Allow remove filter `chip`',
      },
      {
        id: 8,
        isCompleted: false,
        title: 'Allow remove all filter `chips`',
      },
      {
        id: 9,
        isCompleted: false,
        title: 'Add toggle which allow switch between cell editing and Modal editing',
      }
    ]
  },
  {
    id: 2,
    isCompleted: false,
    linkToMUI: '?? add link ??',
    task: 'Test MUI: `own` data table based on MUI components',
    subTasks: [
      {
        id: 1,
        isCompleted: false,
        title: 'Create Data Table component with data',
      },
      {
        id: 2,
        isCompleted: false,
        title: 'Test default sorting functionality',
      },
      {
        id: 3,
        isCompleted: false,
        title: 'Create own filtering functionality',
      },
      {
        id: 4,
        isCompleted: false,
        title: 'Allow filters by multiple columns -> REQUIRED commercial version',
        note: 'Can be used from `box` in commercial version',
      },
      {
        id: 5,
        isCompleted: false,
        title: 'Allow filters by multiple columns -> OWN implementation',
      },
      {
        id: 6,
        isCompleted: false,
        title: 'Show current filter(s) in "chip(s)"',
      },
      {
        id: 7,
        isCompleted: false,
        title: 'Allow remove filter `chip`',
      },
      {
        id: 8,
        isCompleted: false,
        title: 'Allow remove all filter `chips`',
      },
      {
        id: 9,
        isCompleted: false,
        title: 'Add toggle which allow switch between cell editing and Modal editing',
      }
    ]
  },
  {
    id: 3,
    isCompleted: false,
    linkToMUI: '?? link to Mui ??',
    task: 'Test MUI: Modals',
    subTasks: [
      {
        id: 1,
        isCompleted: false,
        title: 'Add new data using Modal',
      },
      {
        id: 2,
        isCompleted: false,
        title: 'Allow edit data using Modal (by clicking on row or `edit` button in table row)',
      }
    ],
  }
];