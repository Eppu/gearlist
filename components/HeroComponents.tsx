import React from 'react';
import { Card, Col, Text, styled, Grid, Container, Image } from '@nextui-org/react';

import { levitating, appears } from '../utils/animations';

const StyledContainer = styled('div', {
  dflex: 'center',
  zIndex: '$max',
  '@xsMax': {
    display: 'none',
  },
});

export const Card1 = () => (
  <Card
    css={{
      animation: `${levitating} 15s ease infinite`,
      boxShadow:
        '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
    }}
  >
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        {/* <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          What to watch
        </Text>
        <Text h4 color="white">
          Stream the Acme event
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Image
      // src="https://nextui.org/images/card-example-4.jpeg"
      src="/images/coll1.jpg"
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
  </Card>
);

export const Card2 = () => (
  <Card
    css={{
      w: '100%',
      animation: `${levitating} 10s ease infinite`,
      boxShadow:
        '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
    }}
  >
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        {/* <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Plant a tree
        </Text>
        <Text h4 color="white">
          Contribute to the planet
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Image
      // src="https://nextui.org/images/card-example-3.jpeg"
      src="/images/coll4.jpg"
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />
  </Card>
);
export const Card4 = () => (
  <Card
    css={{
      w: '100%',
      h: '400px',
      animation: `${levitating} 11s ease infinite`,
      boxShadow:
        '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
    }}
  >
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        {/* <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          New
        </Text>
        <Text h3 color="black">
          Acme camera
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        // src="https://nextui.org/images/card-example-6.jpeg"
        src="/images/coll2.jpg"
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
  </Card>
);
export const Card5 = () => (
  <Card
    css={{
      w: '100%',
      h: '400px',
      animation: `${levitating} 17s ease infinite`,
      boxShadow:
        '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
    }}
  >
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        {/* <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
          Your day your way
        </Text>
        <Text h3 color="white">
          Your checklist for better sleep
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        // src="https://nextui.org/images/card-example-5.jpeg"
        src="/images/coll3.jpg"
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
  </Card>
);

const HeroComponents = () => {
  return (
    <Container>
      <Grid.Container
        gap={2}
        justify="center"
        // Uncomment after BG blur asset is figured out
        //  css={{ background: 'url("/images/bgblur.svg") no-repeat center;' }}
      >
        <Grid xs={12} sm={7}>
          <Card1 />
        </Grid>
        <Grid xs={12} sm={5}>
          <Card2 />
        </Grid>
        <Grid xs={12} sm={4}>
          <Card4 />
        </Grid>
        <Grid xs={12} sm={8}>
          <Card5 />
        </Grid>
        {/* <Image
          alt="gradient blue background"
          className="docs__gradient-blue"
          css={{
            display: 'block',
            opacity: 1,
            position: 'fixed',
            zIndex: '-1',
            bottom: '-10%',
            left: '17%',
            right: '-10%',
            animation: `${appears} 1000ms 500ms ease forwards`,
          }}
          src="/images/bgblur.svg"
        /> */}
      </Grid.Container>
    </Container>
  );
};

export default HeroComponents;
