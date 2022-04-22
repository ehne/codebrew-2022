import React from 'react';
import {Spinner} from 'baseui/spinner';
import { Alert, Plus } from 'baseui/icon';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import Link from 'next/link';
import { useDB } from 'react-pouchdb';
import { Block } from 'baseui/block';
import EmptyState from '../components/EmptyState';
import ProductList from '../components/ProductList';
import { ListHeading } from 'baseui/list';
import { HeadingLarge } from 'baseui/typography';


const Cards = () => {
  const [state, setState] = React.useState('loading')
  const db = useDB();
  
  React.useEffect(()=>{
    const isEmptyState = async () => {
      const allDocs = await db.allDocs();
      if (allDocs.total_rows === 0) {
        return true
      } else {
        return false
      }
    };
    isEmptyState().then(res => {
      if (res) {
        setState('emptyState')
      } else {
        setState('populatedState')
      }
    }).catch(res => {setState('error')})
  },[db])

  if (state === 'populatedState') {
    return <ProductList />
  }

  if (state === 'emptyState') {
    return (
      <EmptyState
        Icon={Plus}
        text="Looks like you haven't added any items yet"
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
    )
  }

  if (state === 'loading') {
    return (
      <Block display="flex" alignItems="center" justifyContent="center" padding="scale3200">
        <Spinner />
      </Block>
    )
  }

  return (
    <EmptyState
      Icon={Alert}
      text="Something went wrong"
      kind="negative"
      action={(
          <Button 
            size="compact"
            shape="pill"
            $as="a"
            href="/"
            //colors={{backgroundColor: theme.colors.accent, color: theme.colors.contentOnColor}}
          >
            Try reloading the page
          </Button>
      )} 
    />
  )
  
}


const Index = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <Cards />
    </>
  )

  
}

export default Index;
