import { Container, Grid, Row, Col, Text, Card, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { PlusCircle } from 'phosphor-react';
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
        alignItems="center"
      >
        <Text h1 css={{ mr: '$10' }}>
          My gear
        </Text>
        <NextLink href="/item/new">
          <Link color="inherit" title="Add new item">
            <PlusCircle size={28} weight="light" />
          </Link>
        </NextLink>
      </Container>
      <Container>
        <Grid.Container justify="center" gap={3}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            data.map((item, i) => (
              <Grid xs={6} sm={3} key={i}>
                <Card isPressable css={{ w: '100%', h: '300px' }}>
                  <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                    <Col>
                      <Text h3 color="black">
                        {item.title}
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={item.image}
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
                    <Col>
                      <Text color="#000" size={16}>
                        {item.template.brand}
                      </Text>
                      <Text color="#000" size={16}>
                        {item.template.model}
                      </Text>
                    </Col>
                  </Card.Footer>
                </Card>
              </Grid>
            ))
          )}
        </Grid.Container>
      </Container>
    </Layout>
  );
};
