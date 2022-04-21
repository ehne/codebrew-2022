import React from 'react';
import { Block } from 'baseui/block';
import { styled, withStyle } from 'baseui';
import { ParagraphMedium } from 'baseui/typography';

const ContainerBox = styled(Block, ({$theme}) => ({
  backgroundColor: $theme.colors.backgroundTertiary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  padding: $theme.sizing.scale1000,
  paddingLeft: $theme.sizing.scale1400,
  paddingRight: $theme.sizing.scale1400,
}))

const NonIdealState = ({Icon, text, action}) => {
  return (
    <ContainerBox>
      <Icon size={64} color="contentTertiary"/>
      <ParagraphMedium marginBottom="scale600">
        {text}
      </ParagraphMedium>
      {action}
    </ContainerBox>
  );
}

export default NonIdealState;
