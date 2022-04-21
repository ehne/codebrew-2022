import React from 'react';
import { styled, ThemeProvider } from 'baseui';
import { Block } from 'baseui/block';
import { Layer } from 'baseui/layer';
import ScreenContainer from './ScreenContainer';
import {ButtonGroup} from 'baseui/button-group';
import {Button} from 'baseui/button';

const NavContainer = styled(ScreenContainer, ({$theme}) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: $theme.colors.backgroundPrimary,
  boxShadow: $theme.lighting.shadow400,
  borderTopColor: $theme.borders.border300.borderColor,
  borderTopWidth: $theme.borders.border300.borderWidth,
  borderTopStyle: $theme.borders.border300.borderStyle
}))

const BottomNav = () => {
  return (
    <Layer>
      <NavContainer>
        <ButtonGroup
          size="compact"
          shape="pill"
          mode="radio"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </NavContainer>
    </Layer>
  );
}

export default BottomNav;
