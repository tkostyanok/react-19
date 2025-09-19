import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

import type { ListItemProps } from './ListItemProps';


export const ListItem = ({ taskData }: ListItemProps) => {
  const [ open, setOpen ] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={ handleClick }
      >
        <ListItemIcon
          sx={ {
            marginTop: '0.2rem',
            minWidth: '1rem',
          } }
        >
          {
            taskData.isCompleted
              ? (
                <CircleIcon
                  sx={{
                    fontSize: '0.7rem' 
                  }}
                />
              )
              : (
                <CircleOutlinedIcon
                  sx={{
                    fontSize: '0.7rem' 
                  }}
                />
              )
          }
        </ListItemIcon>
        <ListItemText primary={ taskData.task } />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={ open } timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {
            taskData.subTasks.map((subTask) => {
              return (
                <ListItemButton
                  key={ `${taskData.id} - ${subTask.id}` }
                  sx={{
                    pl: 4 
                  }}
                >
                  <ListItemIcon>
                    {
                      subTask.isCompleted
                        ? (
                          <StarOutlinedIcon
                            sx={{
                              fontSize: '1rem' 
                            }}
                          />
                        )
                        : (
                          <StarBorder
                            sx={{
                              fontSize: '1rem' 
                            }}
                          />
                        )
                    }
                  </ListItemIcon>
                  <ListItemText primary={ subTask.title } />
                </ListItemButton>
              );
            })
          }
        </List>
      </Collapse>
    </>
  );
};
