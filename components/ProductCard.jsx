import React from 'react';
import {Card, StyledBody} from 'baseui/card';
import {Skeleton} from 'baseui/skeleton';
import {styled} from 'baseui';

const MarginBottomCard = styled(Card, ({$theme}) => ({
  marginBottom: $theme.sizing.scale500
}))

const ProductCard = ({skeleton=false, title}) => {
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
     <StyledBody>
       Proin ut dui sed metus pharetra hend rerit vel non mi.
       Nulla ornare faucibus ex, non facilisis nisl. Proin ut
       dui sed metus pharetra hend rerit vel non mi. Nulla
       ornare faucibus ex, non facilisis nisl.
     </StyledBody>
   </MarginBottomCard>
  );
}

export default ProductCard;
