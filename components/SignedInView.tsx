import { Container, Grid, Row, Text, Card } from '@nextui-org/react';
import { useState, useEffect } from 'react';

export const SignedInView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/user/items')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log('data: ', data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container
        // alignItems="center"
        // css={{
        //   position: 'relative',
        //   height: 'calc(84vh - 76px)',
        //   '@xsMax': {
        //     height: 'calc(100vh - 64px)',
        //   },
        // }}
        display="flex"
        gap={0}
        // justify="center"
        lg={true}
        wrap="nowrap"
        css={{
          // set top padding
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
            // <Grid key={i} xs={12} md={6} justify="center">
            //   <Text>{item.title}</Text>
            //   <Text>{item.template.brand}</Text>
            //   <Text>{item.template.model}</Text>
            // </Grid>
          ))
        )}

        {/* <Grid xs={12} md={6} justify="center">
          <h2>Grid 1</h2>
        </Grid>
        <Grid xs={12} md={6} justify="center">
          <h2>Grid 2</h2>
        </Grid> */}
      </Grid.Container>
    </>
  );
};
