import { Layout } from '../../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import {
  Container,
  Row,
  Col,
  Text,
  Avatar,
  User,
  Grid,
  Spacer,
  Link,
} from '@nextui-org/react';
import { Gear } from 'phosphor-react';

export interface User {
  id: string;
  username: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
  image?: string | undefined;
}

export default function UserPage({ user, items }: { user: User; items: any }) {
  const router = useRouter();
  const { data: session, status } = useSession();

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
        <Grid.Container gap={2} alignItems="center">
          <Grid justify="center" alignItems="center">
            <Avatar
              src={user.image}
              alt="Profile picture"
              css={{ size: '$20' }}
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
                  {/* <a>Edit profile</a> */}
                </Link>
              </NextLink>
            </Grid>
          )}
        </Grid.Container>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const res = await fetch(
    `http://localhost:3000/api/getUser?username=${username}`
  );
  const user = await res.json();

  if (user.error) {
    return {
      props: {
        user: null,
      },
    };
  }

  //   // If user is found, get the user's items
  //   if (user) {
  //     const res = await fetch(`http://localhost:3000/api/search`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ query: user.id }),
  //     });
  //     const items = await res.json();
  //     console.log('items', items);
  //     return {
  //       props: {
  //         user,
  //         items,
  //       },
  //     };
  //   }
  return {
    props: {
      user,
    },
  };
};
