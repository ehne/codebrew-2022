import React from 'react';
import { ArrowDown, Filter, Plus } from 'baseui/icon';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import Link from 'next/link';
import { useDB } from 'react-pouchdb';
import EmptyState from '../components/EmptyState';
import ProductList from '../components/ProductList';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import {ButtonGroup} from 'baseui/button-group';

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
      <LoadingSpinner />
    )
  }

  return (
    <ErrorState href="/" />
  )
  
}


const Index = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      
      <ButtonGroup
        disabled
        shape="pill"
        size="mini"
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              marginTop: $theme.sizing.scale500,
              marginBottom: $theme.sizing.scale500
            })
          }
        }}
      > 
        <Button><Filter /></Button>
        <Button isSelected startEnhancer={ArrowDown}>Expiry</Button>
      </ButtonGroup>
      <Cards />
    </>
  )

  
}

export default Index;
