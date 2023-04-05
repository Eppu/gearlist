import { prisma } from '../../../lib/prisma';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout';
import Head from 'next/head';
import { Container, Grid, Text, Spacer, Link, Row, Card, Col, Image, Tooltip } from '@nextui-org/react';
import { GetStaticPropsResult } from 'next';
import NextLink from 'next/link';
import { PlusCircle } from 'phosphor-react';
import { Item } from '@prisma/client';
import { useState } from 'react';

type ItemTemplate = {
  id: number;
  brand: string;
  model: string;
  imageUrl?: string;
  category?: string;
  createdAt?: String;
  updatedAt?: String;
  items?: Item[];
};

export async function getStaticPaths() {
  const itemTemplates = await prisma.itemTemplate.findMany({});

  // create paths by combining brand and model followed by id for each item template
  const paths = itemTemplates.map((itemTemplate) => ({
    params: {
      slug: `${itemTemplate.brand}-${itemTemplate.model}`.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase(),
      id: itemTemplate.id.toString(),
    },
  }));
  return {
    paths,
    fallback: 'blocking', // could be true also
  };
}

export async function getStaticProps(context: any): Promise<GetStaticPropsResult<any>> {
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
  const [isAdditionConfirmationVisible, setIsAdditionConfirmationVisible] = useState(false);
  const [isItemAdditionSuccess, setIsItemAdditionSuccess] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.isFallback) {
    renderFallbackTemplate();
  }

  if (!itemTemplate) {
    renderNoItemTemplate();
  }

  const handleItemAddition = async () => {
    setIsAdditionConfirmationVisible(false);
    console.log("Adding item to user's collection");
    // TODO: Create item in users collection with defaults

    setIsAdditionConfirmationVisible(true);
    setIsItemAdditionSuccess(true);

    setTimeout(() => {
      setIsAdditionConfirmationVisible(false);
    }, 3000);
  };

  return (
    <Layout>
      <Head>
        <title>{`${itemTemplate.brand} ${itemTemplate.model} – Gearlist`}</title>
      </Head>
      <Container fluid>
        <Row css={{ padding: '$15 0', display: 'flex', alignItems: 'center' }}>
          <Text h1 css={{ mr: '$10' }}>
            {itemTemplate.brand} {itemTemplate.model}
          </Text>
          <Tooltip
            placement="right"
            color={isItemAdditionSuccess && isAdditionConfirmationVisible ? 'success' : 'primary'}
            content={
              // TODO: Add link to created item
              isItemAdditionSuccess && isAdditionConfirmationVisible ? 'Added to your collection' : 'Add to collection'
            }
            visible={isAdditionConfirmationVisible}
            shadow={true}
            trigger={isAdditionConfirmationVisible ? 'click' : 'hover'}
          >
            {/* <NextLink href="/item/new"> */}
            <Link color="inherit" title="Add item to collection" onClick={handleItemAddition}>
              <PlusCircle size={28} weight="light" />
            </Link>
            {/* </NextLink> */}
          </Tooltip>
        </Row>
        <Card>
          <Row gap={1} css={{ padding: '$15 0' }}>
            <Col>
              <Image
                width={350}
                height={250}
                alt={`A(n) ${itemTemplate.brand} ${itemTemplate.model}`}
                src={itemTemplate.imageUrl || 'https://via.placeholder.com/350x250'}
                style={{ borderRadius: '10px' }}
              />
            </Col>
            <Col>
              <Container>
                <Text>Item description goes here</Text>
                {/* {JSON.stringify(itemTemplate)} */}
              </Container>
            </Col>
          </Row>
          {/* </Card.Body> */}
        </Card>
        <Grid.Container gap={2} justify="center">
          {itemTemplate.items?.map((item) => (
            <Grid key={item.id} sm={3} xs={6}>
              <Card variant="bordered">
                <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                  <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                      {itemTemplate.brand} {itemTemplate.model}
                    </Text>
                    <Text h4 color="white">
                      {item.title}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image src={item.image as string} objectFit="cover" width="100%" height="auto" />
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
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
