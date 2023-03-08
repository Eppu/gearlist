import { Layout } from '../../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { prisma } from '../../lib/prisma';
import { Container, Row, Col, Text, Avatar, User, Grid, Spacer, Link, Card } from '@nextui-org/react';
import { Gear } from 'phosphor-react';
import { Item, Profile, Category } from '@prisma/client';
import Head from 'next/head';

export interface User {
  id: string;
  username: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  emailVerified?: Date | null;
  image?: string | undefined;
  profile?: Profile | undefined;
  items?: Item[];
}

export default function UserPage({ user, items }: { user: User; items: any }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const cameras = items.items.filter((item: any) => item.template?.category === Category.CAMERA);
  const lenses = items.items.filter((item: any) => item.template?.category === Category.LENS);
  const others = items.items.filter(
    (item: any) => item.template?.category === Category.ACCESSORY || item.template?.category === Category.BAG,
  );

  if (!user) {
    return (
      <Container
        fluid
        justify="center"
        alignContent="center"
        align-items="center"
        sm
        display="flex"
        css={{
          flexDirection: 'column',
          height: 'calc(84vh - 76px)',
        }}
      >
        <Text h1>User not found</Text>
        <Spacer y={3}></Spacer>
        <Text h3>
          Go to <Link href="/">the home page</Link> instead?
        </Text>
      </Container>
    );
  }
  return (
    <Layout>
      <Head>
        <title>@{user.username} – Gearlist</title>
      </Head>
      <Container
        sm
        display="flex"
        css={{
          padding: '$10 $7',
        }}
      >
        <Card css={{ padding: '$5 $10' }}>
          <Row
            align="center"
            css={{
              padding: '$5 $0 $10 $0',

              '@smMax': {
                flexDirection: 'column',
              },
            }}
          >
            <div>
              <Avatar
                src={user.image}
                alt="Profile picture"
                css={{
                  size: '$20',
                }}
                color="primary"
              />
            </div>

            <Spacer x={2} />

            <Col>
              <Row align="center">
                <Text h1>@{user.username}</Text>
                {session && session.user.id === user.id && (
                  <>
                    <Spacer x={0.5} />

                    <NextLink href="/settings">
                      <Link color="inherit">
                        <Gear size={28} weight="light" />
                      </Link>
                    </NextLink>
                  </>
                )}
                <Container display="flex">
                  <Row>
                    <Text>Cameras: {cameras.length}</Text>
                    <Spacer x={0.5} />
                    <Text>Lenses: {lenses.length}</Text>
                    <Spacer x={0.5} />
                    <Text>Others: {others.length}</Text>
                  </Row>
                </Container>
              </Row>
              <Row>
                <Text>{user.profile?.bio}</Text>
              </Row>
            </Col>
          </Row>
          {/* REMOVE WHEN DONE WITH REFACTOR  */}
          {/* </Grid.Container> */}
          {/* <Grid.Container gap={2} alignItems="center">
            <Grid justify="center" alignItems="center" css={{ height: '100%' }}>
              <Avatar
                src={user.image}
                alt="Profile picture"
                css={{
                  size: '$20',
                }}
                color="primary"
              />
            </Grid>
            <Grid justify="center">
              <Text h1>@{user.username}</Text>
            </Grid>
            {session && session.user.id === user.id && (
              <Grid justify="center" alignItems="center" alignContent="center">
                <NextLink href="/settings">
                  <Link color="inherit">
                    <Gear size={28} weight="light" />
                  </Link>
                </NextLink>
              </Grid>
            )}
            <Grid sm={12}>
              <Text>{user.profile?.bio}</Text>
            </Grid>
          </Grid.Container> */}
          {/* REMOVE WHEN DONE WITH REFACTOR  */}
          <Spacer y={2} />
          {items.items.length > 0 ? (
            <Grid.Container gap={2}>
              {/* For each item, create a card */}

              {items.items.map((item: any) => (
                <Grid xs={4} sm={3} md={3} lg={3} xl={3} key={item.id}>
                  <Card
                    isPressable
                    isHoverable
                    // TODO: replace with real link once item page is done
                    onClick={() => console.log('clicked', item)}
                  >
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={item.image ? item.image : 'https://via.placeholder.com/200'}
                        objectFit="cover"
                        width="100%"
                        height={140}
                        alt={`@${user.username}'s ${item.template?.brand} ${item.template?.model}`}
                      />
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: 'flex-start' }}>
                      <Row wrap="wrap" justify="space-between" align="center">
                        <Text b>
                          {item.template.brand} {item.template.model}
                        </Text>
                        <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>{item.title}</Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
                // <Grid xs={12} sm={6} md={4} lg={3} key={item.id}>
                //   <Card
                //     css={{
                //       padding: '$5 $10',
                //       cursor: 'pointer',
                //       '&:hover': {
                //         boxShadow: '0 0 0 1px $colors$primary',
                //       },
                //     }}
                //     onClick={() => router.push(`/item/${item.id}`)}
                //   >
                //     <Row align="center">
                //       <Avatar
                //         src={item.image}
                //         alt="Profile picture"
                //         css={{
                //           size: '$20',
                //         }}
                //         color="primary"
                //       />
                //       <Spacer x={2} />
                //       <Col>
                //         <Row align="center">
                //           <Text h3>{item.name}</Text>
                //           <Spacer x={0.5} />
                //           <Text>{item.template?.name}</Text>
                //         </Row>
                //         <Row>
                //           <Text>{item.template?.category}</Text>
                //         </Row>
                //       </Col>
                //     </Row>
                //   </Card>
                // </Grid>
              ))}
            </Grid.Container>
          ) : (
            <Text>No items yet</Text>
          )}
        </Card>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const user = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
    include: {
      items: {
        include: {
          template: true,
        },
      },
      profile: true,
    },
  });

  if (!user) {
    return {
      props: {
        user: null,
      },
    };
  }

  const { createdAt, email, ...userData } = user;

  const items = {
    items: user.items,
  };

  return {
    props: {
      user: userData,
      items,
    },
  };
};
