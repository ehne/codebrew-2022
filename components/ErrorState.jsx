import React from 'react';
import EmptyState from './EmptyState';
import {Button} from 'baseui/button';
import { Alert } from 'baseui/icon';

const ErrorState = ({href}) => {
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
            href={href}
            //colors={{backgroundColor: theme.colors.accent, color: theme.colors.contentOnColor}}
          >
            Try reloading the page
          </Button>
      )} 
    />
  );
}

export default ErrorState;
