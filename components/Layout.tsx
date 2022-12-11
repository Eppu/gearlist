import React from 'react';
import { Box } from './Box';
import { Content } from './Content';
import { Navigation } from './Navigation';
import { Container } from '@nextui-org/react';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    {/* <Box
      css={{
        maxW: '100%',
        position: 'relative',
        //   overflow: 'visible scroll',
      }}
    >
      {children}
    </Box> */}
    <div id="app-container">
      {/* <Header />
      <Navbar hasNotify isHome routes={routes} /> */}
      <Container
        alignContent="space-between"
        as="main"
        className="main-container"
        css={{
          position: 'relative',
          // pt: '$$notifyBannerHeight', // only when the notify banner is visible
          // minHeight: '100vh',
          '@mdMax': {
            overflowX: 'hidden',
          },
          // paddingLeft: '0',
          // paddingRight: '0',
        }}
        display="flex"
        id="main-container"
        lg={true}
      >
        {children}
        {/* <Footer /> */}
      </Container>
    </div>
  </>
);
