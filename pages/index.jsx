import React from 'react';
import { Plus } from 'baseui/icon';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';
import Link from 'next/link';
import { useDB } from 'react-pouchdb';
import EmptyState from '../components/EmptyState';
import ProductList from '../components/ProductList';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';


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
      <Cards />
    </>
  )

  
}

export default Index;
