import React from 'react';
import Head from 'next/head';
import Header from './Header';
import { Container } from 'semantic-ui-react';

export default (props) => {
  // Hack to move link tag to head of all documents embedding the link tag inside Head.
  // Along with link and script tag other tag acan also be added to head tag, eg: meta tags
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};