import React from 'react';
import { Block } from 'baseui/block';
import {ParagraphMedium} from 'baseui/typography';
import { Plus } from 'baseui/icon';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import Link from 'next/link';
import EmptyState from '../components/EmptyState';

const Index = () => {
  const [css, theme] = useStyletron();

  return (
    <Block>
      <EmptyState
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
