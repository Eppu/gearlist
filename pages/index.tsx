import { prisma } from '../lib/prisma';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import LoginButton from '../components/loginButton';
import { useSession, getSession } from 'next-auth/react';
import { Item } from '@prisma/client';
import { GetServerSideProps } from 'next';
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
import { Layout } from '../components/Layout';
import HeroComponents from '../components/HeroComponents';

async function testCreateUser(name: string, email: string) {
  const response = await fetch('/api/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });
  const data = await response.json();
  console.log(data);
}

async function searchItemTemplates() {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: 'leica' }),
  });
  const data = await response.json();
  console.log(data);
}

async function getItemsByUser() {
  const response = await fetch(`/api/test`);
  const data = await response.json();
  console.log(data);
}

export const StyledTitle = styled('h1', {
  display: 'inline',
  fontFamily: 'Manrope',
  fontWeight: 'bold',
  color: '$text',
  lh: '1.2',
  fs: '2.5rem',
  '@sm': {
    fs: '3rem',
  },
  '@lg': {
    fs: '3.5rem',
  },
});

export const StyledGradientTitle = styled(StyledTitle, {
  display: 'inline-block',
  marginTop: '2rem',
  textGradient: '180deg, #FF1CF7 25%, #b249f8 100%',
  '&::selection': {
    WebkitTextFillColor: '$colors$text',
  },
  // This is to line text up properly on high-res wide displays
  paddingRight: '0.5rem',
});

export const StyledSubtitle = styled('p', {
  pl: '$1',
  fs: '$xl',
  fontFamily: 'Manrope',
  width: '100%',
  display: 'inline-flex',
  fontWeight: '$medium',
  color: '$accents7',
});

function Home({ items }: { items: Item[] }) {
  const { data: session, status } = useSession();

  console.log(items);
  return (
    <Layout>
      <Head>
        <title>Gearlist - Camera Database and Collection Library </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        gap={0}
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
    </Layout>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     res.statusCode = 403;
//     return { props: { items: [] } };
//   }
//   const items = await prisma.item.findMany({
//     where: {
//       authorId: session.user.id,
//     },
//   });

//   const cleanedItems = items.map((item) => ({
//     ...item,
//     createdAt: item.createdAt.toISOString(),
//     updatedAt: item.updatedAt.toISOString(),
//   }));

//   console.log(cleanedItems);

//   res.statusCode = 200;
//   return {
//     props: {
//       message: 'hello',
//       items: cleanedItems,
//     },
//   };
// };

export default Home;
