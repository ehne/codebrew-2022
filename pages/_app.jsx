import React from 'react';
import App from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, LightTheme, BaseProvider} from 'baseui';
import {Block} from 'baseui/block';
import {styletron} from '../lib/styletron';
import BottomNav from '../components/BottomNav';
import ScreenContainer from '../components/ScreenContainer';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <Block backgroundColor="backgroundPrimary" color="primaryA" minHeight="100vh" >
            <ScreenContainer>
              <Component {...pageProps} />
            </ScreenContainer>
          </Block>
         
          <BottomNav />
        </BaseProvider>
      </StyletronProvider>
    );
  }
}