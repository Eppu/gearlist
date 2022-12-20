import { prisma } from '../../lib/prisma';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import Head from 'next/head';
import { Container, Grid, Text, Spacer, Link } from '@nextui-org/react';
import { GetStaticPropsResult } from 'next';

type ItemTemplate = {
  id: number;
  brand: string;
  model: string;
  createdAt?: String;
  updatedAt?: String;
  items?: {
    id: string;
    name: string;
    createdAt?: String;
    updatedAt?: String;
  }[];
};

export async function getStaticPaths() {
  const itemTemplates = await prisma.itemTemplate.findMany({});

  // create paths by combining brand and model followed by id for each item template
  const paths = itemTemplates.map((itemTemplate) => ({
    params: {
      slug: `${itemTemplate.brand}-${itemTemplate.model}-${itemTemplate.id}`.replace(/\s+/g, '-').toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: 'blocking', // could be true also
  };
}

export async function getStaticProps(context: any): Promise<GetStaticPropsResult<any>> {
  const itemTemplateId = Number(context.params.slug.split('-').pop());
  const itemTemplate = await prisma.itemTemplate.findUnique({
    where: {
      id: itemTemplateId,
    },
  });

  if (!itemTemplate) {
    return {
      notFound: true,
    };
  }

  // return itemTemplate with createdAt and updatedAt as strings
  const parsedItemTemplate = {
    ...itemTemplate,
    createdAt: itemTemplate.createdAt?.toISOString(),
    updatedAt: itemTemplate.updatedAt?.toISOString(),
  };

  return {
    props: {
      itemTemplate: parsedItemTemplate,
    },
  };
}

export default function ItemTemplatePage({ itemTemplate }: { itemTemplate: ItemTemplate }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.isFallback) {
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

  if (!itemTemplate) {
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
  return (
    <Layout>
      <Head>
        <title>{`Gearlist | ${itemTemplate.brand} ${itemTemplate.model}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm css={{ padding: '$10 $7' }}>
        <Grid.Container gap={2} alignItems="center">
          <Grid justify="center" alignItems="center">
            <h1>
              {itemTemplate.brand} {itemTemplate.model}
            </h1>
          </Grid>
        </Grid.Container>
      </Container>
    </Layout>
  );
}