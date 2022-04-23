import React from 'react';
import {Card, StyledAction, StyledBody} from 'baseui/card';
import {Skeleton} from 'baseui/skeleton';
import {styled} from 'baseui';
import ExpiryProgress from './ExpiryProgress';
import {Tag} from 'baseui/tag';


const MarginBottomCard = styled(Card, ({$theme}) => ({
  marginBottom: $theme.sizing.scale500
}))

const ProductCard = ({skeleton=false, productName, expiryDate, addedDate, storageLocation, isOpened}) => {
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
      <StyledBody>
        <Tag overrides={{
          Root: {style: ({}) => ({marginLeft: '0px'})}
        }} closeable={false}>Stored in: Fridge</Tag>
        <Tag closeable={false} kind={isOpened ? 'negative' : 'primary'}>{isOpened ? 'opened' : 'unopened'}</Tag>
      </StyledBody>
      <StyledAction>
        <ExpiryProgress expiryDate={expiryDate} addedDate={addedDate} />
      </StyledAction>
    </MarginBottomCard>
  );
}

export default ProductCard;
