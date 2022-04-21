import React from 'react';
import { Block } from 'baseui/block';

const ScreenContainer = ({children, ...props}) => {
  return (
    <Block 
      maxWidth={["100%", "40em"]}
      marginLeft="auto" 
      marginRight="auto" 
      padding="scale500" 
      {...props}
      >
        {children}
    </Block>
  );
}

export default ScreenContainer;
