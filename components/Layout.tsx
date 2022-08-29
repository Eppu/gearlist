import React from 'react';
import { Box } from './Box';
import { Content } from './Content';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <Box
    css={{
      maxW: '100%',
      position: 'relative',
      //   overflow: 'visible scroll',
    }}
  >
    {children}
  </Box>
);
