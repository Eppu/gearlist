import { Layout } from '../../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { prisma } from '../../lib/prisma';
import { Container, Row, Col, Text, Avatar, User, Grid, Spacer, Link, Card } from '@nextui-org/react';
import { Gear } from 'phosphor-react';
import { Item, Profile, Category } from '@prisma/client';

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
      <Container sm css={{ padding: '$10 $7' }}>
        <Card css={{ padding: '$5 $10' }}>
          <Row align="center" css={{ padding: '$5 $0' }}>
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
              </Row>
              <Text>{user.profile?.bio}</Text>
              <Row>
                <Text>Cameras: {cameras.length}</Text>
                <Spacer x={0.5} />
                <Text>Lenses: {lenses.length}</Text>
                <Spacer x={0.5} />
                <Text>Others: {others.length}</Text>
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
