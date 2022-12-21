import { Container, Grid, Row, Text, Card } from '@nextui-org/react';
import { Layout } from '../components/Layout';
import { useState, useEffect } from 'react';

export const SignedInView = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/user/items')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Container
        display="flex"
        // gap={0}
        lg={true}
        wrap="nowrap"
        css={{
          pt: '$10',
        }}
      >
        <Text h1>My gear</Text>
      </Container>
      <Grid.Container justify="center">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          data.map((item, i) => (
            <Grid xs={6} sm={3} key={i}>
              <Card isPressable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image src={item.image} objectFit="cover" width="100%" height={140} alt={item.title} />
                </Card.Body>
                <Card.Footer css={{ justifyItems: 'flex-start' }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{item.i}</Text>
                    <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>{item.price}</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))
        )}
      </Grid.Container>
    </Layout>
  );
};
