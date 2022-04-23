import React from 'react';
import { Block } from 'baseui/block';
import {Spinner} from 'baseui/spinner';

const LoadingSpinner = () => {
  return (
    <Block display="flex" alignItems="center" justifyContent="center" padding="scale3200">
      <Spinner />
    </Block>
  );
}

export default LoadingSpinner;
