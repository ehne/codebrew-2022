import React from 'react';
import {Card, StyledAction, StyledBody} from 'baseui/card';
import {Skeleton} from 'baseui/skeleton';
import {styled} from 'baseui';
import { Button } from 'baseui/button';
import ExpiryProgress from './ExpiryProgress';
import {Tag} from 'baseui/tag';
import { Delete } from 'baseui/icon';
import { useDB } from 'react-pouchdb';
import { useRouter } from 'next/router';


const MarginBottomCard = styled(Card, ({$theme}) => ({
  marginBottom: $theme.sizing.scale500,
  position: 'relative'
}))

const DeleteButton = styled(Button, ({$theme}) => ({
  position: 'absolute',
  top: $theme.sizing.scale200,
  right: $theme.sizing.scale200,
}))

const ProductCard = ({skeleton=false, productName, expiryDate, addedDate, storageLocation, isOpened, rev, id}) => {
  const db = useDB();
  const router = useRouter();

  const handleDelete = () => {
    if(confirm('Are you sure you want to delete this item?')) {
      db.remove(id, rev);
      router.reload();
    }
  }

  if (skeleton) {
    return (
      <MarginBottomCard
        title={<Skeleton animation height="32px" width={`${150 + (Math.random() *200)}px`}/>}
      >
        <Skeleton
         rows={2}
         width="100%"
         animation
       />
      </MarginBottomCard>
    )
  }

  return (
    <MarginBottomCard title={productName}>
      <DeleteButton onClick={handleDelete} size="mini" kind="secondary" shape="circle"><Delete /></DeleteButton>
      <StyledBody>
        <Tag overrides={{
          Root: {style: ({}) => ({marginLeft: '0px'})},
          Text: {
            style: ({ $theme }) => ({
              textOverflow: "nowrap",
              maxWidth: "100%"
            })
          }
        }} closeable={false}>Stored in: {storageLocation}</Tag>
        <Tag 
          closeable={false} 
          kind={isOpened ? 'negative' : 'primary'}
          overrides={{
            Text: {
              style: ({ $theme }) => ({
                textOverflow: "nowrap",
                maxWidth: "100%"
              })
            }
          }}
        >
          {isOpened ? 'opened' : 'unopened'}
        </Tag>
      </StyledBody>
      <StyledAction>
        <ExpiryProgress expiryDate={expiryDate} addedDate={addedDate} />
      </StyledAction>
    </MarginBottomCard>
  );
}

export default ProductCard;
