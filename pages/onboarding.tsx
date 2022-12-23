import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import {
  Container,
  Text,
  Spacer,
  Input,
  Button,
  Row,
  Loading,
} from '@nextui-org/react';
import debounce from 'lodash.debounce';
import { useState } from 'react';

export default function Onboarding() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isAvailable, setIsAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkUsernameAvailability = async (username: string) => {
    setUsername(username);
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

  const debouncedCheckUsernameAvailability = debounce(
    checkUsernameAvailability,
    500
  );

  const updateUser = async (username: string) => {
    setIsSubmitting(true);
    const res = await fetch('/api/updateUser', {
      // include id and username in body
      body: JSON.stringify({ username, id: session?.user.id }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    const { user } = await res.json();
    setIsSubmitting(false);
    router.reload();
  };

  if (status === 'loading') {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  if (session.user.username) {
    router.push(`/${session.user.username}`);
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
        <Text h4>
          Before getting started, we&apos;ll need to know what to call you.
        </Text>
      </Container>
      <Spacer y={5} />
      <Container display="flex" justify="center" alignContent="center" sm>
        <Row justify="center" css={{ marginTop: '$20' }}>
          <Input
            readOnly={isSubmitting}
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
              console.log('e', e.target.value);
              e.target.value = e.target.value.toLowerCase();
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
        <Text css={{ marginTop: '$10' }}>
          This is what you will be known as in Gearlist.
        </Text>
        <Row justify="center" css={{ marginTop: '$20' }}>
          <Button
            disabled={!isAvailable || isSubmitting}
            onClick={() => updateUser(username)}
          >
            {isSubmitting ? <Loading color="currentColor" /> : 'Continue'}
          </Button>
        </Row>
      </Container>
    </Layout>
  );
}
