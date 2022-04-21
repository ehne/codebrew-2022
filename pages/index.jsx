import React from 'react';
import { Block } from 'baseui/block';
import {ParagraphMedium} from 'baseui/typography';
import NonIdealState from '../components/NonIdealState';
import { Plus } from 'baseui/icon';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import Link from 'next/link';

const Index = () => {
  const [css, theme] = useStyletron();

  return (
    <Block>
      <NonIdealState
        Icon={Plus}
        text="Looks like you haven't added any items yet."
        action={(
          <Link href="/addProduct" passHref>
            <Button 
              size="compact"
              shape="pill"
              $as="a"
              //colors={{backgroundColor: theme.colors.accent, color: theme.colors.contentOnColor}}
            >
              Add new item
            </Button>
          </Link>
          
        )} 
      />
    </Block>
  );
}

export default Index;
