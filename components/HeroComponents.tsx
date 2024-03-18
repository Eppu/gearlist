import React from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import styled from 'styled-components';

import { levitating, appears } from '../utils/animations';

const StyledContainer = styled.div`
  dflex: 'center',
  zIndex: '$max',
  '@xsMax': {
    display: 'none',
  },
`;

export const Card1 = () => (
  <Card
  // css={{
  //   animation: `${levitating} 15s ease infinite`,
  //   boxShadow:
  //     '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
  // }}
  >
    <CardHeader
    // css={{ position: 'absolute', zIndex: 1, top: 5 }}
    ></CardHeader>
    <Image
      // src="https://nextui.org/images/card-example-4.jpeg"
      src="/images/coll1.jpg"
      className="object-cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
  </Card>
);

export const Card2 = () => (
  <Card
  // css={{
  //   w: '100%',
  //   animation: `${levitating} 10s ease infinite`,
  //   boxShadow:
  //     '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
  // }}
  >
    <CardHeader
    // css={{ position: 'absolute', zIndex: 1, top: 5 }}
    ></CardHeader>
    <Image
      // src="https://nextui.org/images/card-example-3.jpeg"
      src="/images/coll4.jpg"
      width="100%"
      height={340}
      className="object-cover"
      alt="Card image background"
    />
  </Card>
);
export const Card4 = () => (
  <Card
  // css={{
  //   w: '100%',
  //   h: '400px',
  //   animation: `${levitating} 11s ease infinite`,
  //   boxShadow:
  //     '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
  // }}
  >
    <CardHeader
    // css={{ position: 'absolute', zIndex: 1, top: 5 }}
    ></CardHeader>
    <CardBody
    // css={{ p: 0 }}
    >
      <Image
        // src="https://nextui.org/images/card-example-6.jpeg"
        src="/images/coll2.jpg"
        width="100%"
        height="100%"
        className="object-cover"
        alt="Card example background"
      />
    </CardBody>
  </Card>
);
export const Card5 = () => (
  <Card
  // css={{
  //   w: '100%',
  //   h: '400px',
  //   animation: `${levitating} 17s ease infinite`,
  //   boxShadow:
  //     '0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3),inset 0 -2px 6px 0 rgba(10,37,64,.35);',
  // }}
  >
    <CardHeader
    // css={{ position: 'absolute', zIndex: 1, top: 5 }}
    ></CardHeader>
    <CardBody
    // css={{ p: 0 }}
    >
      <Image
        // src="https://nextui.org/images/card-example-5.jpeg"
        src="/images/coll3.jpg"
        className="object-cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </CardBody>
  </Card>
);

const HeroComponents = () => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      <Card1 />
      <Card2 />
      <Card4 />
      <Card5 />
      {/* <Image
          alt="gradient blue background"
          className="docs__gradient-blue"
          css={{
            display: 'block',
            opacity: 1,
            position: 'fixed',
            zIndex: '-1',
            bottom: '-10%',
            left: '17%',
            right: '-10%',
            animation: `${appears} 1000ms 500ms ease forwards`,
          }}
          src="/images/bgblur.svg"
        /> */}
    </div>
  );
};

export default HeroComponents;
