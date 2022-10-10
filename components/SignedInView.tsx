import { Container, Grid } from '@nextui-org/react';

export const SignedInView = () => {
  return (
    <>
      <Container
        alignItems="center"
        //   css={{
        //     position: 'relative',
        //     height: 'calc(84vh - 76px)',
        //     '@xsMax': {
        //       height: 'calc(100vh - 64px)',
        //     },
        //   }}
        display="flex"
        gap={0}
        justify="center"
        lg={true}
        wrap="nowrap"
      >
        <h1>Text</h1>
      </Container>
      <Grid.Container justify="center">
        <Grid xs={12} md={6} justify="center">
          <h2>Grid 1</h2>
        </Grid>
        <Grid xs={12} md={6} justify="center">
          <h2>Grid 2</h2>
        </Grid>
      </Grid.Container>
    </>
  );
};
