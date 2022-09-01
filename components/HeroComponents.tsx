import React, { useEffect } from 'react';
import {
  Input,
  Card,
  Row,
  Col,
  Loading,
  Text,
  styled,
  Grid,
  Pagination,
  Tooltip,
  Button,
  StyledButton,
  keyframes,
  Container,
} from '@nextui-org/react';

export const levitating = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '30%': {
    transform: 'translateY(-10px)',
  },
  '50%': {
    transform: 'translateY(4px)',
  },
  '70%': {
    transform: 'translateY(-15px)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
});

const StyledContainer = styled('div', {
  dflex: 'center',
  //   position: 'absolute',
  zIndex: '$max',
  '@xsMax': {
    display: 'none',
  },
  //   width: '100%',
});

export const Card1 = () => (
  <Card isHoverable>
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          What to watch
        </Text>
        <Text h4 color="white">
          Stream the Acme event
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-4.jpeg"
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
  </Card>
);

export const Card2 = () => (
  <Card css={{ w: '100%', animation: `${levitating} 10s ease infinite` }}>
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Plant a tree
        </Text>
        <Text h4 color="white">
          Contribute to the planet
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-3.jpeg"
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />
  </Card>
);
export const Card3 = () => (
  <Card css={{ bg: '$black', w: '100%' }}>
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Supercharged
        </Text>
        <Text h4 color="white">
          Creates beauty like a beast
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-2.jpeg"
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />
  </Card>
);
export const Card4 = () => (
  <Card css={{ w: '100%', h: '400px' }}>
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          New
        </Text>
        <Text h3 color="black">
          Acme camera
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://nextui.org/images/card-example-6.jpeg"
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: 'absolute',
        bgBlur: '#ffffff66',
        borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Text color="#000" size={12}>
            Available soon.
          </Text>
          <Text color="#000" size={12}>
            Get notified.
          </Text>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button flat auto rounded color="secondary">
              <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
                Notify Me
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);
export const Card5 = () => (
  <Card css={{ w: '100%', h: '400px' }}>
    <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
          Your day your way
        </Text>
        <Text h3 color="white">
          Your checklist for better sleep
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://nextui.org/images/card-example-5.jpeg"
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: 'absolute',
        bgBlur: '#0f111466',
        borderTop: '$borderWeights$light solid $gray800',
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Row>
            <Col span={3}>
              <Card.Image
                src="https://nextui.org/images/breathing-app-icon.jpeg"
                css={{ bg: 'black', br: '50%' }}
                height={40}
                width={40}
                alt="Breathing app icon"
              />
            </Col>
            <Col>
              <Text color="#d1d1d1" size={12}>
                Breathing App
              </Text>
              <Text color="#d1d1d1" size={12}>
                Get a good nights sleep.
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button flat auto rounded css={{ color: '#94f9f0', bg: '#94f9f026' }}>
              <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
                Get App
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

const HeroComponents = () => {
  //   const isMobile = useIsMobile();

  //   useEffect(() => {
  //     if (isMobile) {
  //       const element = document.getElementById("nextui-tooltip");

  //       if (element) {
  //         element.remove();
  //       }
  //     }
  //   }, [isMobile]);

  return (
    <Container>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={7}>
          <Card1 />
        </Grid>
        <Grid xs={12} sm={5}>
          <Card2 />
        </Grid>
        {/* <Grid xs={12} sm={2}>
          <Card3 />
        </Grid> */}
        <Grid xs={12} sm={4}>
          <Card4 />
        </Grid>
        <Grid xs={12} sm={8}>
          <Card5 />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default HeroComponents;
