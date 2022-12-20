import { prisma } from '../../../lib/prisma';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout';
import Head from 'next/head';
import { Container, Grid, Text, Spacer, Link, Row } from '@nextui-org/react';
import { GetStaticPropsResult } from 'next';
import { Item } from '@prisma/client';

type ItemTemplate = {
  id: number;
  brand: string;
  model: string;
  createdAt?: String;
  updatedAt?: String;
  items?: Item[];
};

export async function getStaticPaths() {
  const itemTemplates = await prisma.itemTemplate.findMany({});

  // create paths by combining brand and model followed by id for each item template
  const paths = itemTemplates.map((itemTemplate) => ({
    params: {
      slug: `${itemTemplate.brand}-${itemTemplate.model}`.replace(/\s+/g, '-').toLowerCase(),
      id: itemTemplate.id.toString(),
    },
  }));
  return {
    paths,
    fallback: 'blocking', // could be true also
  };
}

export async function getStaticProps(context: any): Promise<GetStaticPropsResult<any>> {
  // const itemTemplateId = Number(context.params.slug.split('-').pop());
  const itemTemplateId = Number(context.params.id);
  const itemTemplate = await prisma.itemTemplate.findUnique({
    where: {
      id: itemTemplateId,
    },
    include: {
      items: true,
    },
  });

  if (!itemTemplate) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      itemTemplate,
    },
  };
}

export default function ItemTemplatePage({ itemTemplate }: { itemTemplate: ItemTemplate }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.isFallback) {
    renderFallbackTemplate();
  }

  if (!itemTemplate) {
    renderNoItemTemplate();
  }

  return (
    <Layout>
      <Head>
        <title>{`Gearlist | ${itemTemplate.brand} ${itemTemplate.model}`}</title>
      </Head>
      {/* <Container xl css={{ padding: '$10 $7' }}> */}
      <Row css={{ padding: '$15 0' }}>
        <h1>
          {itemTemplate.brand} {itemTemplate.model}
        </h1>
      </Row>
      <Grid.Container gap={2} justify="center">
        {itemTemplate.items?.map((item) => (
          <Grid key={item.id}>
            <Text h3>{JSON.stringify(item)}</Text>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
}

function renderNoItemTemplate() {
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
      <Text h1>Item template not found</Text>
      <Spacer y={3}></Spacer>
      <Text h3>
        Go to <Link href="/">the home page</Link> instead?
      </Text>
    </Container>
  );
}

function renderFallbackTemplate() {
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
      <Text h1>Loading...</Text>
    </Container>
  );
}
