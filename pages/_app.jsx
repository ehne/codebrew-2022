import React from 'react';
import App from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {Block} from 'baseui/block';
import {styletron} from '../lib/styletron';

const Container = ({children}) => (
<Block 
  maxWidth={["100%", "40em"]}
  marginLeft="auto" 
  marginRight="auto" 
  paddingLeft="scale500" 
  paddingRight="scale500">
    {children}
</Block>
);

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <StyletronProvider value={styletron}>
        <BaseProvider theme={LightTheme}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </BaseProvider>
      </StyletronProvider>
    );
  }
}