import React from 'react';
import App from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, LightTheme, BaseProvider} from 'baseui';
import {Block} from 'baseui/block';
import {styletron} from '../lib/styletron';
import BottomNav from '../components/BottomNav';
import ScreenContainer from '../components/ScreenContainer';
import { PouchDB } from 'react-pouchdb';
import Head from 'next/head';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <StyletronProvider value={styletron}>
        <Head>
          <title>BestBefore</title> 
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          />
        </Head>
        <BaseProvider theme={LightTheme}>
          <PouchDB name="local">
            <Block backgroundColor="backgroundPrimary" color="primaryA" minHeight="calc(100vh + 70px)" >
              <ScreenContainer>
                <Component {...pageProps} />
              </ScreenContainer>
            </Block>
          </PouchDB>
          <BottomNav />
        </BaseProvider>
      </StyletronProvider>
    );
  }
}