import React from 'react';
import { Block } from 'baseui/block';
import { styled, withStyle } from 'baseui';
import { ParagraphMedium } from 'baseui/typography';

const ContainerBox = styled(Block, ({$theme}) => ({
  backgroundColor: $theme.colors.backgroundTertiary,
  color: $theme.colors.primaryA,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  padding: $theme.sizing.scale1000,
  paddingLeft: $theme.sizing.scale1400,
  paddingRight: $theme.sizing.scale1400,
}))

const kinds = {
  positive: {
    bg: 'backgroundLightPositive',
    icon: 'positive'
  },
  warning: {
    bg: 'backgroundLightWarning',
    icon: 'warning'
  },
  negative: {
    bg: 'backgroundLightNegative',
    icon: 'negative'
  },
  firstTime: {
    bg: 'backgroundTertiary',
    icon: 'contentTertiary'
  }
}

const EmptyState = ({Icon, text, action, kind="firstTime"}) => {
  return (
    <ContainerBox backgroundColor={kinds[kind].bg} >
      <Icon size={64} color={kinds[kind].icon}/>
      <ParagraphMedium marginBottom="scale600">
        {text}
      </ParagraphMedium>
      {action}
    </ContainerBox>
  );
}

export default EmptyState;
