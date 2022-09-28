import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { Container, Text, Spacer, Grid, Input, Button, Row, Col } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import { useState } from 'react';

export default function Onboarding() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isAvailable, setIsAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //   const [username, setUsername] = useState('');

  const checkUsernameAvailability = async (username: string) => {
    // setUsername(username);
    if (username.length === 0) {
      setIsAvailable(false);
      setErrorMessage('');
      return;
    }
    const res = await fetch(`/api/check-username?username=${username}`);
    const { available, message } = await res.json();

    if (message) {
      setErrorMessage(message);
      setIsAvailable(false);
      return;
    }
    setErrorMessage(available ? '' : 'Username already taken.');
    setIsAvailable(available);
    return available;
  };

  const debouncedCheckUsernameAvailability = debounce(checkUsernameAvailability, 500);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  if (session.user.username) {
    router.push('/');
    return null;
  }

  return (
    <Layout>
      <Container
        display="flex"
        justify="center"
        alignContent="center"
        alignItems="center"
        css={{ flexDirection: 'column' }}
        sm
      >
        <Text h1>Welcome to Gearlist!</Text>
        <Text h4>Before getting started, we&apos;ll need to know what to call you.</Text>
      </Container>
      <Spacer y={5} />
      <Container display="flex" justify="center" alignContent="center" sm>
        <Row justify="center" css={{ marginTop: '$20' }}>
          <Input
            clearable
            color="success"
            labelLeft="@"
            type={'text'}
            label="Username"
            placeholder="Enter your username"
            size="lg"
            width="$80"
            helperText={errorMessage}
            helperColor={isAvailable ? 'default' : 'error'}
            required
            status={isAvailable ? 'success' : 'default'}
            onChange={(e) => {
              debouncedCheckUsernameAvailability(e.target.value);
            }}
            css={{
              padding: '$2 0',
              '.nextui-input-helper-text': {
                fontSize: '$sm',
              },
            }}
          />
        </Row>
        <Text css={{ marginTop: '$10' }}>This is what you will be known as in Gearlist.</Text>
        <Row justify="center" css={{ marginTop: '$20' }}>
          <Button disabled={!isAvailable}>Continue</Button>
        </Row>
      </Container>
    </Layout>
  );
}
