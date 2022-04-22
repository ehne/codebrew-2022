import React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

const determineBarColor = (percent, $theme) => {
  if (percent <= 0.6) {
    return $theme.colors.positive
  }
  if (percent <= 0.85) {
    return $theme.colors.warning
  }
  return $theme.colors.negative
}

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
        },
        BarProgress: {
          style: ({ $theme, $value }) => ({
            backgroundColor: determineBarColor(percentageExpired, $theme),
            transform: `translateX(${-$value}%)`
          })
        }
      }}
    />
  );
}

export default ExpiryProgress;
