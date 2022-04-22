import React from 'react';
import {Card, StyledBody} from 'baseui/card';
import {Skeleton} from 'baseui/skeleton';
import {styled} from 'baseui';
import ExpiryProgress from './ExpiryProgress';

const MarginBottomCard = styled(Card, ({$theme}) => ({
  marginBottom: $theme.sizing.scale500
}))

const ProductCard = ({skeleton=false, title, expiryDate, addedDate}) => {
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
   <MarginBottomCard title={title}>
    <ExpiryProgress expiryDate={expiryDate} addedDate={addedDate} />
   </MarginBottomCard>
  );
}

export default ProductCard;
