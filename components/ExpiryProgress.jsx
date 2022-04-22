import React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

const ExpiryProgress = ({expiryDate, addedDate}) => {
  const currentTime = (new Date()).getTime();
  const expiryDateTime = expiryDate.getTime();
  const addedDateTime = addedDate.getTime();

  const daysSinceAdded = (currentTime - addedDateTime) / (1000 * 60 * 60 * 24);
  const daysUntilExpiry = (expiryDateTime - currentTime) / (1000 * 60 * 60 * 24);

  const totalTimeframe = daysSinceAdded + daysUntilExpiry;
  const percentageExpired = daysSinceAdded / totalTimeframe;

  return (
    <ProgressBar
      value={percentageExpired*100}
      getProgressLabel={() => `${Math.round(daysUntilExpiry)} day(s) left`}
      showLabel
      size="large"
      overrides={{
        BarContainer: {
          style: ({}) => ({
            margin: '0px'
          })
        } 
      }}
    />
  );
}

export default ExpiryProgress;
