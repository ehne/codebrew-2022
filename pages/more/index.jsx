import React from 'react';
import { Button } from 'baseui/button';
import { useDB } from 'react-pouchdb';


const Index = () => {
  const db = useDB();
  return (
    <div>
      <Button
        onClick={() => {db.destroy()}}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.negative,
              color: $theme.colors.contentOnColor
            })
          }
        }}
      >
        Delete Database
      </Button>
    </div>
  );
}

export default Index;
