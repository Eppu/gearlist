import { Layout } from '../components/Layout';
import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme, Spacer, Container, Text, Row, Grid, Card } from '@nextui-org/react';

export default function Features() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <Layout>
      <Card css={{ mt: '$10', pb: '$15' }}>
        <Container>
          <Row css={{ padding: '$15 0' }}>
            <h1>Settings</h1>
          </Row>
          <Row>
            <Grid.Container gap={2}>
              <Grid>
                <Text h4>Currently using {type} mode</Text>
              </Grid>
              <Grid>
                <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
              </Grid>
            </Grid.Container>
          </Row>
          {/* <Container>
        
        <Spacer y={1} />
        
      </Container> */}
        </Container>
      </Card>
    </Layout>
  );
}
