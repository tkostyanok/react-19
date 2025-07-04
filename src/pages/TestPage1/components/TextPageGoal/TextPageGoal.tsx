import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import { ListItem } from './components';

import { tasksData } from './data/tasksData';

export const TextPageGoal = () => {
  return (
    <Box>
      <Typography>Test page #1 Goals:</Typography>
      <List>
        {tasksData.map((taskData) => (
          <ListItem
            key={`${taskData.id} - ${taskData.task}`}
            taskData={taskData}
          />
        ))
}
      </List>
    </Box>
  );
};
