import { Suspense } from 'react';

import Box from '@mui/material/Box';

import type { TestPage1LayoutProps } from './TestPage1LayoutProps';

export const TestPage1Layout = ({ children }: TestPage1LayoutProps) => {
  return (
    <Suspense 
      fallback={
        <Box 
          sx={{
            backgroundColor: 'transparent' 
          }}
        />
      }
    >
      <Box 
        sx={{
          display: 'flex', 
        }}
      >
        <Box
          id='TestPage1Layout'
          sx={{
            flexGrow: 1,
            overflow: 'auto'
          }}
        >
          { children }
        </Box>
      </Box>
    </Suspense>
  );
};
