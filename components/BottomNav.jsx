import React from 'react';
import { styled, ThemeProvider } from 'baseui';
import { Block } from 'baseui/block';
import { Layer } from 'baseui/layer';
import ScreenContainer from './ScreenContainer';
import {ButtonGroup} from 'baseui/button-group';
import {Button} from 'baseui/button';
import { useRouter } from 'next/router';

const NavContainer = styled(ScreenContainer, ({$theme}) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: $theme.colors.backgroundPrimary,
  boxShadow: $theme.lighting.shadow400,
  borderTopColor: $theme.borders.border300.borderColor,
  borderTopWidth: $theme.borders.border300.borderWidth,
  borderTopStyle: $theme.borders.border300.borderStyle,
  overflowX: 'scroll',
}))

const BottomNav = ({currentPage}) => {
  const router = useRouter()
  //console.log(router.pathname.split('/'))

  /* TODO: fix this so it uses next/link rather than router pushes*/
  const menuButtons = [['', 'Home'], ['addProduct', 'Add product'], ['more', 'More']].map(i => (
    <Button
      onClick={()=>{router.push(`/${i[0]}`)}}
      key={i[0]}
      isSelected={router.pathname.split('/')[1] === i[0]}
    >
      {i[1]}
    </Button>
  ))
  return (
    <Layer>
      <NavContainer>
        <ButtonGroup
          size="compact"
          shape="pill"
          mode="radio"
        >
          {menuButtons}          
        </ButtonGroup>
      </NavContainer>
    </Layer>
  );
}

export default BottomNav;
