import React from 'react';
import { Box } from './Box';
import { Content } from './Content';
import { Navigation } from './Navigation';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <Box
      css={{
        maxW: '100%',
        position: 'relative',
        //   overflow: 'visible scroll',
      }}
    >
      {children}
    </Box>
  </>
);
