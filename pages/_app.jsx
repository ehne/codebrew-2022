import React from 'react';
import App from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, LightTheme, BaseProvider} from 'baseui';
import {Block} from 'baseui/block';
import {styletron} from '../lib/styletron';
import BottomNav from '../components/BottomNav';
import ScreenContainer from '../components/ScreenContainer';
import { PouchDB } from 'react-pouchdb';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <StyletronProvider value={styletron}>
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