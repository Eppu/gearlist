import { StyledTitle, StyledGradientTitle, StyledSubtitle } from '../utils/styled';
import HeroComponents from './HeroComponents';
import {
  Container,
  Text,
  Navbar,
  Button,
  Link,
  Card,
  Avatar,
  Dropdown,
  Col,
  Row,
  Spacer,
  Grid,
  styled,
} from '@nextui-org/react';

export const SignedOutView = () => {
  return (
    <Container
      alignItems="center"
      as="section"
      className="hero__container"
      css={{
        position: 'relative',
        height: 'calc(84vh - 76px)',
        '@xsMax': {
          height: 'calc(100vh - 64px)',
        },
      }}
      display="flex"
      // gap={0}
      justify="space-between"
      lg={true}
      wrap="nowrap"
    >
      <Row
        align="center"
        className="hero__content"
        css={{
          zIndex: '$1',
          '@mdMax': {
            mt: '80px',
            p: '0 8px',
          },
          '@mdMin': {
            mt: '120px',
            p: '0 8px',
          },
          '@xsMax': {
            mt: '0px',
          },
        }}
        wrap="wrap"
        gap={1}
      >
        <Col
          className="hero__left-container"
          css={{
            position: 'relative',
            zIndex: '$2',
            '@md': {
              width: '50%',
            },
            '@mdMax': {
              width: '100%',
            },
          }}
        >
          <StyledTitle
          //  h1 size={60} css={{ mb: 0 }}
          >
            Gearheads rejoice.
          </StyledTitle>
          <StyledGradientTitle
          // h1
          // size={60}
          // css={{
          //   textGradient: '45deg, $purple600 -20%, $pink600 100%',
          // }}
          // weight="bold"
          >
            Keep track of your gear and share your collection.
          </StyledGradientTitle>
          <Spacer y={2} />
          <Text
            h2
            size={20}
            css={{
              mt: '$2',
              color: '$accents7',
              '@mdMax': {
                mt: '$3',
              },

              fontFamily: 'Manrope',
            }}
          >
            Get access to the best camera database on the web today.
          </Text>

          <Spacer y={1.5} />
          <Grid.Container
            alignItems="center"
            css={{
              '@md': {
                mt: '$lg',
              },
            }}
            gap={0}
          >
            <Grid sm={3} xs={12}>
              <Button
                auto
                rounded
                className="hero__get-started-button"
                css={{
                  maxHeight: '$space$14',
                  '@xsMax': {
                    width: '100%',
                    marginBottom: '$8',
                  },
                }}
                size="lg"
                // onClick={}
              >
                Get Started
              </Button>
            </Grid>
            <Grid sm={9} xs={12}></Grid>
          </Grid.Container>
        </Col>
        <Col
          className="hero__right-container"
          css={{
            position: 'relative',
            height: '100%',
            '@mdMax': {
              display: 'none',
            },
          }}
          span={6}
        >
          {/* pix/something goes here */}
          <HeroComponents />
        </Col>
      </Row>
    </Container>
  );
};
